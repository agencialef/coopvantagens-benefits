-- Fix recursive RLS by making helper functions run as SECURITY DEFINER
-- and setting a safe search_path.

create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid()
$$;

create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.profiles where user_id = auth.uid()
$$;

create or replace function public.current_provider_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select provider_id from public.profiles where user_id = auth.uid()
$$;

create or replace function public.current_beneficiary_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select beneficiary_id from public.profiles where user_id = auth.uid()
$$;

create or replace function public.current_dependent_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select dependent_id from public.profiles where user_id = auth.uid()
$$;