import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

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
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) await loadProfile(data.session.user.id);
      setLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user?.id) {
        loadProfile(sess.user.id);
      } else {
        setRole("unknown");
        setMustChangePassword(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, must_change_password")
        .eq("id", userId)
        .maybeSingle();

      if (profile) {
        const r = (profile.role as UserRole) ?? "unknown";
        setRole(r);
        setMustChangePassword(!!profile.must_change_password);
      } else {
        // Fallback: try beneficiary record if exists
        const { data: beneficiario } = await supabase
          .from("beneficiarios")
          .select("must_change_password")
          .eq("user_id", userId)
          .maybeSingle();
        setRole("unknown");
        setMustChangePassword(!!beneficiario?.must_change_password);
      }
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
    const redirectTo = import.meta.env.VITE_RESET_REDIRECT_TO || `${window.location.origin}/first-access`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error };
  };

  const updatePassword: AuthContextValue["updatePassword"] = async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  const value = useMemo(
    () => ({ loading, session, role, mustChangePassword, login, logout, resetPassword, updatePassword }),
    [loading, session, role, mustChangePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
