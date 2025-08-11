import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FiliadaDashboard from "./pages/filiada/FiliadaDashboard";
import PrestadorDashboard from "./pages/prestador/PrestadorDashboard";
import BeneficiarioDashboard from "./pages/beneficiario/BeneficiarioDashboard";
import DependenteDashboard from "./pages/dependente/DependenteDashboard";
import Providers from "./pages/public/Providers";
import VerifyCard from "./pages/public/VerifyCard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/first-access" element={<FirstAccess />} />

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["filiada"]} />}>
              <Route path="/filiada" element={<FiliadaDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["prestador"]} />}>
              <Route path="/prestador" element={<PrestadorDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["beneficiario"]} />}>
              <Route path="/beneficiario" element={<BeneficiarioDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["dependente"]} />}>
              <Route path="/dependente" element={<DependenteDashboard />} />
            </Route>

            <Route path="/public/providers" element={<Providers />} />
            <Route path="/verify/:cardNumber" element={<VerifyCard />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
