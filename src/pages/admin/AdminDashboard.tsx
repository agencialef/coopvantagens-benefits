import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";

const AdminDashboard = () => {
  useEffect(() => setDocumentTitle("Admin — CoopVantagens"), []);
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Admin</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Filiadas</h2>
          <div className="text-sm text-muted-foreground">CRUD placeholder</div>
        </article>
        <article className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Prestadores</h2>
          <div className="text-sm text-muted-foreground">CRUD placeholder</div>
        </article>
        <article className="border rounded-md p-4 md:col-span-2">
          <h2 className="font-semibold mb-2">Vincular usuário a papel</h2>
          <div className="text-sm text-muted-foreground">Form placeholder</div>
        </article>
      </section>
    </AppLayout>
  );
};

export default AdminDashboard;
