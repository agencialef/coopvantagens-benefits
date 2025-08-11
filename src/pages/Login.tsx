import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDocumentTitle, setMetaDescription } from "@/utils/seo";

const Login = () => {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendingReset, setSendingReset] = useState(false);

  useEffect(() => {
    setDocumentTitle("Entrar — CoopVantagens");
    setMetaDescription("Faça login para acessar seus benefícios no CoopVantagens.");
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const onReset = async () => {
    setSendingReset(true);
    await resetPassword(email);
    setSendingReset(false);
  };

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Acessar</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Senha</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit">Entrar</Button>
          <Button type="button" variant="outline" onClick={onReset} disabled={!email || sendingReset}>
            Enviar reset de senha
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
