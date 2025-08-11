import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";
import { DigitalCard } from "@/components/DigitalCard";

const BeneficiarioDashboard = () => {
  useEffect(() => setDocumentTitle("Meu cartão — CoopVantagens"), []);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Meu Cartão</h1>
      <DigitalCard name="João da Silva" cardNumber="1234567890123456" />
      <section className="mt-8 border rounded-md p-4">
        <h2 className="font-semibold mb-2">Histórico</h2>
        <div className="text-sm text-muted-foreground">Sem lançamentos ainda.</div>
      </section>
    </AppLayout>
  );
};

export default BeneficiarioDashboard;
