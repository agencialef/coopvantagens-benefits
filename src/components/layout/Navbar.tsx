import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-accent hover:text-accent-foreground"
  }`;

export const Navbar = () => {
  const { session, role, logout } = useAuth();

  return (
    <header className="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between h-14">
        <Link to="/" className="font-bold tracking-tight">
          CoopVantagens
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/public/providers" className={navLinkClass}>
            Rede de Prestadores
          </NavLink>
          <NavLink to="/verify/0000" className={navLinkClass}>
            Verificar Cartão
          </NavLink>
          {session ? (
            <div className="flex items-center gap-2 ml-2">
              {role === "admin" && (
                <NavLink to="/admin" className={navLinkClass}>
                  Admin
                </NavLink>
              )}
              {role === "filiada" && (
                <NavLink to="/filiada" className={navLinkClass}>
                  Filiada
                </NavLink>
              )}
              {role === "prestador" && (
                <NavLink to="/prestador" className={navLinkClass}>
                  Prestador
                </NavLink>
              )}
              {role === "beneficiario" && (
                <NavLink to="/beneficiario" className={navLinkClass}>
                  Beneficiário
                </NavLink>
              )}
              {role === "dependente" && (
                <NavLink to="/dependente" className={navLinkClass}>
                  Dependente
                </NavLink>
              )}
              <Button variant="outline" onClick={logout}>
                Sair
              </Button>
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Entrar
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
