import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDocumentTitle, setMetaDescription } from "@/utils/seo";

const FirstAccess = () => {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    setDocumentTitle("Primeiro acesso — CoopVantagens");
    setMetaDescription("Defina sua nova senha para começar a usar o CoopVantagens.");
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirm) return;
    await updatePassword(password);
  };

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Primeiro acesso</h1>
      <p className="text-muted-foreground mb-4">Defina uma nova senha para continuar.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Nova senha</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Confirmar senha</label>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <Button type="submit" disabled={!password || password !== confirm}>Atualizar senha</Button>
      </form>
    </section>
  );
};

export default FirstAccess;
