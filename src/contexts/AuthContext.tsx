import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "admin" | "filiada" | "prestador" | "beneficiario" | "dependente" | "unknown";

interface AuthContextValue {
  loading: boolean;
  session: Session | null;
  role: UserRole;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: any }>;
  updatePassword: (password: string) => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>("unknown");
  const [mustChangePassword, setMustChangePassword] = useState(false);

  useEffect(() => {
    // Register listener first to avoid missing auth events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user?.id) {
        // Defer any Supabase calls to avoid deadlocks
        setTimeout(() => {
          loadProfile(sess.user!.id);
        }, 0);
      } else {
        setRole("unknown");
        setMustChangePassword(false);
      }
    });

    // Then fetch existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user?.id) {
        loadProfile(data.session.user.id);
      }
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, beneficiary_id, dependent_id")
        .eq("user_id", userId)
        .maybeSingle();

      let derivedRole: UserRole = "unknown";
      let must = false;

      if (profile) {
        derivedRole = (profile.role as UserRole) ?? "unknown";

        if (profile.beneficiary_id) {
          const { data: ben } = await supabase
            .from("beneficiaries")
            .select("must_change_password")
            .eq("id", profile.beneficiary_id)
            .maybeSingle();
          must = !!ben?.must_change_password;
        } else if (profile.dependent_id) {
          const { data: dep } = await supabase
            .from("dependents")
            .select("beneficiary_id")
            .eq("id", profile.dependent_id)
            .maybeSingle();
          if (dep?.beneficiary_id) {
            const { data: ben } = await supabase
              .from("beneficiaries")
              .select("must_change_password")
              .eq("id", dep.beneficiary_id)
              .maybeSingle();
            must = !!ben?.must_change_password;
          }
        }
      }

      setRole(derivedRole);
      setMustChangePassword(must);
    } catch (_e) {
      // Tables may not exist yet; keep safe defaults
      setRole("unknown");
      setMustChangePassword(false);
    }
  };

  const login: AuthContextValue["login"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword: AuthContextValue["resetPassword"] = async (email) => {
    const redirectTo = `${window.location.origin}/first-access`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error };
  };

  const updatePassword: AuthContextValue["updatePassword"] = async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  const value = useMemo(
    () => ({ loading, session, role, mustChangePassword, login, logout, resetPassword, updatePassword }),
    [loading, session, role, mustChangePassword, login, logout, resetPassword, updatePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
