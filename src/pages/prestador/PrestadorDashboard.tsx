import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PrestadorDashboard = () => {
  const [query, setQuery] = useState("");
  const [discount, setDiscount] = useState("");
  useEffect(() => setDocumentTitle("Prestador — CoopVantagens"), []);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Prestador</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Validar Cartão</h2>
          <Input placeholder="Número / CPF / Nome" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <Button className="mt-3">Validar</Button>
        </article>
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Aplicar Desconto</h2>
          <Input placeholder="% de desconto" value={discount} onChange={(e)=>setDiscount(e.target.value)} />
          <Button className="mt-3">Aplicar</Button>
        </article>
      </section>
    </AppLayout>
  );
};

export default PrestadorDashboard;
