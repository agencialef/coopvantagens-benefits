-- 1) Remove incorrect/overly-permissive policies and add safer ones

-- Beneficiaries: drop redundant/incorrect self policy
DROP POLICY IF EXISTS "Usuário pode ver seu beneficiário" ON public.beneficiaries;

-- Attachments: tighten access (drop public select)
DROP POLICY IF EXISTS "att_filiada_select" ON public.attachments;

-- Allow owners to see their own attachments
CREATE POLICY "att_owner_select_self"
ON public.attachments
FOR SELECT
USING (
  (owner_type = 'beneficiary' AND owner_id = public.current_beneficiary_id()) OR
  (owner_type = 'dependent'   AND owner_id = public.current_dependent_id())   OR
  (owner_type = 'provider'    AND owner_id = public.current_provider_id())
);

-- Allow filiada to see organization-scoped attachments and those of their beneficiaries/dependents
CREATE POLICY "att_filiada_select_org"
ON public.attachments
FOR SELECT
USING (
  (owner_type = 'organization' AND owner_id = public.current_org_id()) OR
  (owner_type = 'beneficiary' AND EXISTS (
      SELECT 1 FROM public.beneficiaries b
      WHERE b.id = attachments.owner_id AND b.organization_id = public.current_org_id()
  )) OR
  (owner_type = 'dependent' AND EXISTS (
      SELECT 1 FROM public.dependents d
      JOIN public.beneficiaries b ON b.id = d.beneficiary_id
      WHERE d.id = attachments.owner_id AND b.organization_id = public.current_org_id()
  ))
);

-- 2) Ensure sensitive system table has RLS enabled and locked down
ALTER TABLE public.card_sequences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cs_admin_all" ON public.card_sequences;
CREATE POLICY "cs_admin_all" ON public.card_sequences FOR ALL
USING (public.current_role() = 'admin');

-- 3) Restrict execution of validate_card to authenticated users only
REVOKE ALL ON FUNCTION public.validate_card(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_card(text) TO authenticated;