import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";

const statusFrom = (card: string) => (Number(card.slice(-1)) % 2 === 0 ? "Ativo" : "Inativo");

const VerifyCard = () => {
  const { cardNumber = "" } = useParams();

  useEffect(() => setDocumentTitle(`Verificação do cartão ${cardNumber} — CoopVantagens`), [cardNumber]);

  const status = statusFrom(cardNumber);

  return (
    <AppLayout>
      <article className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">Verificação de Cartão</h1>
        <p className="text-muted-foreground mb-6">Número: {cardNumber}</p>
        <div className={`mx-auto w-fit px-4 py-2 rounded-md border ${status === "Ativo" ? "bg-secondary" : "bg-accent"}`}>
          Status: <span className="font-semibold">{status}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Esta é uma verificação pública. A integração real será adicionada depois.</p>
      </article>
    </AppLayout>
  );
};

export default VerifyCard;
