import { Navbar } from "./Navbar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto flex-1 py-6">{children}</main>
      <footer className="border-t text-sm text-muted-foreground py-6">
        <div className="container mx-auto">© {new Date().getFullYear()} CoopVantagens</div>
      </footer>
    </div>
  );
};
