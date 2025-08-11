import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { setDocumentTitle } from "@/utils/seo";
import { Input } from "@/components/ui/input";

interface Provider {
  id: string;
  name: string;
  city: string;
  category: string;
}

const MOCK: Provider[] = [
  { id: "1", name: "Clínica Vida", city: "São Paulo", category: "Saúde" },
  { id: "2", name: "Odonto Sorriso", city: "Campinas", category: "Odontologia" },
  { id: "3", name: "Academia Forma", city: "São Paulo", category: "Fitness" },
  { id: "4", name: "Mercado Popular", city: "Santos", category: "Varejo" },
];

const Providers = () => {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => setDocumentTitle("Prestadores — CoopVantagens"), []);

  const filtered = useMemo(() =>
    MOCK.filter(p =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase())) &&
      (!city || p.city === city) &&
      (!category || p.category === category)
    ), [q, city, category]
  );

  const cities = Array.from(new Set(MOCK.map(p => p.city)));
  const categories = Array.from(new Set(MOCK.map(p => p.category)));

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-4">Rede de Prestadores</h1>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <Input placeholder="Buscar por nome" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="border rounded-md px-3 py-2 bg-background" value={city} onChange={(e)=>setCity(e.target.value)}>
          <option value="">Todas as cidades</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="border rounded-md px-3 py-2 bg-background" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Todas as categorias</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <ul className="grid gap-3">
        {filtered.map(p => (
          <li key={p.id} className="border rounded-md p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.category} • {p.city}</div>
          </li>
        ))}
        {filtered.length === 0 && (
          <div className="text-muted-foreground">Nenhum prestador encontrado.</div>
        )}
      </ul>
    </AppLayout>
  );
};

export default Providers;
