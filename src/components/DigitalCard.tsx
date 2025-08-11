import QRCode from "react-qr-code";

interface DigitalCardProps {
  name: string;
  cardNumber: string;
}

const maskCard = (n: string) => n.replace(/\d(?=\d{4})/g, "•");

export const DigitalCard = ({ name, cardNumber }: DigitalCardProps) => {
  const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(cardNumber)}`;
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/90 to-primary shadow-lg text-primary-foreground transform-gpu transition will-change-transform hover:rotate-[-0.5deg]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">CoopVantagens</h3>
          <span className="text-xs opacity-80">Cartão Digital</span>
        </div>
        <div className="mt-10 text-2xl tracking-widest font-semibold">
          {maskCard(cardNumber)}
        </div>
        <div className="mt-6 text-sm opacity-90">
          <div>Nome</div>
          <div className="font-medium">{name}</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <QRCode value={verifyUrl} size={160} fgColor="hsl(var(--foreground))" bgColor="transparent" />
        <p className="text-sm text-muted-foreground text-center">
          Apresente este QR Code ao prestador para validação do cartão.
        </p>
      </div>
    </section>
  );
};
