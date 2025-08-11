import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";
import { DigitalCard } from "@/components/DigitalCard";

const DependenteDashboard = () => {
  useEffect(() => setDocumentTitle("Cartão do Dependente — CoopVantagens"), []);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Cartão do Dependente</h1>
      <DigitalCard name="Maria Souza" cardNumber="6543210987654321" />
    </AppLayout>
  );
};

export default DependenteDashboard;
