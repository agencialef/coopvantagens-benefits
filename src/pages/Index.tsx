import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle, setMetaDescription } from "@/utils/seo";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    setDocumentTitle("CoopVantagens — Benefícios Cooperativos");
    setMetaDescription("Gestão de benefícios para cooperados, prestadores e filiadas.");
  }, []);

  return (
    <AppLayout>
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Benefícios cooperativos simples e acessíveis</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Um app PWA para administrar vantagens, rede de prestadores e cartões digitais.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <a href="/login">Entrar</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/public/providers">Rede de Prestadores</a>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
