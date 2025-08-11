import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";
import { Button } from "@/components/ui/button";

const FiliadaDashboard = () => {
  useEffect(() => setDocumentTitle("Filiada — CoopVantagens"), []);
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Filiada</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Unidades</h2>
          <div className="text-sm text-muted-foreground">CRUD placeholder</div>
        </article>
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Beneficiários</h2>
          <div className="text-sm text-muted-foreground">CRUD placeholder</div>
        </article>
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Dependentes</h2>
          <div className="text-sm text-muted-foreground">CRUD placeholder</div>
        </article>
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Ações</h2>
          <div className="flex gap-2">
            <Button variant="secondary">Emitir Cartão</Button>
            <Button variant="outline">Enviar reset</Button>
          </div>
        </article>
      </section>
    </AppLayout>
  );
};

export default FiliadaDashboard;
