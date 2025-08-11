export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      allocations: {
        Row: {
          allocated_cents: number
          available_cents: number
          beneficiary_id: string
          created_at: string | null
          id: string
          status: string
          wallet_id: string
        }
        Insert: {
          allocated_cents?: number
          available_cents?: number
          beneficiary_id: string
          created_at?: string | null
          id?: string
          status?: string
          wallet_id: string
        }
        Update: {
          allocated_cents?: number
          available_cents?: number
          beneficiary_id?: string
          created_at?: string | null
          id?: string
          status?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "allocations_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allocations_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          created_at: string | null
          file_url: string
          id: string
          kind: string | null
          owner_id: string
          owner_type: string
        }
        Insert: {
          created_at?: string | null
          file_url: string
          id?: string
          kind?: string | null
          owner_id: string
          owner_type: string
        }
        Update: {
          created_at?: string | null
          file_url?: string
          id?: string
          kind?: string | null
          owner_id?: string
          owner_type?: string
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          cost_center_id: string | null
          cpf: string
          created_at: string | null
          dob: string
          email: string
          id: string
          must_change_password: boolean
          name: string
          organization_id: string
          phone: string | null
          status: string
        }
        Insert: {
          cost_center_id?: string | null
          cpf: string
          created_at?: string | null
          dob: string
          email: string
          id?: string
          must_change_password?: boolean
          name: string
          organization_id: string
          phone?: string | null
          status?: string
        }
        Update: {
          cost_center_id?: string | null
          cpf?: string
          created_at?: string | null
          dob?: string
          email?: string
          id?: string
          must_change_password?: boolean
          name?: string
          organization_id?: string
          phone?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beneficiaries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      card_sequences: {
        Row: {
          last_seq: number
          organization_id: string
        }
        Insert: {
          last_seq?: number
          organization_id: string
        }
        Update: {
          last_seq?: number
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_sequences_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          beneficiary_id: string
          card_number: string
          dependent_id: string | null
          expires_at: string | null
          id: string
          issued_at: string
          status: string
        }
        Insert: {
          beneficiary_id: string
          card_number: string
          dependent_id?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          status?: string
        }
        Update: {
          beneficiary_id?: string
          card_number?: string
          dependent_id?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_dependent_id_fkey"
            columns: ["dependent_id"]
            isOneToOne: false
            referencedRelation: "dependents"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_centers: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          name: string
          organization_id: string
          status: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          name: string
          organization_id: string
          status?: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string
          organization_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      dependents: {
        Row: {
          beneficiary_id: string
          cpf: string | null
          created_at: string | null
          dob: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          beneficiary_id: string
          cpf?: string | null
          created_at?: string | null
          dob?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          beneficiary_id?: string
          cpf?: string | null
          created_at?: string | null
          dob?: string | null
          id?: string
          name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "dependents_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          provider_id: string
          status: string
          terms: string | null
          title: string
          type: string
          value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          provider_id: string
          status?: string
          terms?: string | null
          title: string
          type: string
          value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          provider_id?: string
          status?: string
          terms?: string | null
          title?: string
          type?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discounts_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          period_end: string
          period_start: string
          provider_id: string
          status: string
          total_cents: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          period_end: string
          period_start: string
          provider_id: string
          status?: string
          total_cents?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          period_end?: string
          period_start?: string
          provider_id?: string
          status?: string
          total_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          amount_cents: number
          beneficiary_id: string | null
          cost_center_id: string | null
          created_at: string | null
          id: string
          organization_id: string
          provider_id: string | null
          ref_invoice_id: string | null
          ref_redemption_id: string | null
          type: string
        }
        Insert: {
          amount_cents: number
          beneficiary_id?: string | null
          cost_center_id?: string | null
          created_at?: string | null
          id?: string
          organization_id: string
          provider_id?: string | null
          ref_invoice_id?: string | null
          ref_redemption_id?: string | null
          type: string
        }
        Update: {
          amount_cents?: number
          beneficiary_id?: string | null
          cost_center_id?: string | null
          created_at?: string | null
          id?: string
          organization_id?: string
          provider_id?: string | null
          ref_invoice_id?: string | null
          ref_redemption_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_ref_invoice_id_fkey"
            columns: ["ref_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_ref_redemption_id_fkey"
            columns: ["ref_redemption_id"]
            isOneToOne: false
            referencedRelation: "redemptions"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          cnpj: string | null
          created_at: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          cnpj?: string | null
          created_at?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          cnpj?: string | null
          created_at?: string | null
          id?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          beneficiary_id: string | null
          created_at: string | null
          dependent_id: string | null
          organization_id: string | null
          provider_id: string | null
          role: string
          user_id: string
        }
        Insert: {
          beneficiary_id?: string | null
          created_at?: string | null
          dependent_id?: string | null
          organization_id?: string | null
          provider_id?: string | null
          role: string
          user_id: string
        }
        Update: {
          beneficiary_id?: string | null
          created_at?: string | null
          dependent_id?: string | null
          organization_id?: string | null
          provider_id?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_dependent_id_fkey"
            columns: ["dependent_id"]
            isOneToOne: false
            referencedRelation: "dependents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          city: string | null
          cnpj: string | null
          created_at: string | null
          id: string
          status: string
          trade_name: string
        }
        Insert: {
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          id?: string
          status?: string
          trade_name: string
        }
        Update: {
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          id?: string
          status?: string
          trade_name?: string
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          beneficiary_id: string
          card_id: string
          created_at: string | null
          dependent_id: string | null
          discount_amount: number
          discount_id: string | null
          id: string
          provider_id: string
          purchase_amount: number
        }
        Insert: {
          beneficiary_id: string
          card_id: string
          created_at?: string | null
          dependent_id?: string | null
          discount_amount?: number
          discount_id?: string | null
          id?: string
          provider_id: string
          purchase_amount: number
        }
        Update: {
          beneficiary_id?: string
          card_id?: string
          created_at?: string | null
          dependent_id?: string | null
          discount_amount?: number
          discount_id?: string | null
          id?: string
          provider_id?: string
          purchase_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_dependent_id_fkey"
            columns: ["dependent_id"]
            isOneToOne: false
            referencedRelation: "dependents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance_cents: number
          cost_center_id: string | null
          created_at: string | null
          id: string
          organization_id: string
          status: string
        }
        Insert: {
          balance_cents?: number
          cost_center_id?: string | null
          created_at?: string | null
          id?: string
          organization_id: string
          status?: string
        }
        Update: {
          balance_cents?: number
          cost_center_id?: string | null
          created_at?: string | null
          id?: string
          organization_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_beneficiary_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_dependent_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_org_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_provider_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_card: {
        Args: { p_beneficiary_id: string; p_dependent_id?: string }
        Returns: {
          beneficiary_id: string
          card_number: string
          dependent_id: string | null
          expires_at: string | null
          id: string
          issued_at: string
          status: string
        }
      }
      generate_card_number: {
        Args: { p_org_id: string; p_seq: number }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      luhn_checksum: {
        Args: { num: string }
        Returns: number
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
      validate_card: {
        Args: { p_query: string }
        Returns: {
          card_number: string
          status: string
          holder_name: string
          organization_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
