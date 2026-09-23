import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPartner } from "@/lib/actions/partners";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";

export default async function AdminParceriasPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Parcerias</h1>
        <p className="text-sm text-muted-foreground">
          Fornecedores e parceiros que aparecem no site.
        </p>
      </div>

      <form
        action={createPartner}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">
          Nova parceria
        </p>
        <AdminField label="Nome" name="name">
          <input name="name" required className="input" />
        </AdminField>
        <AdminField label="Categoria" name="category">
          <input name="category" placeholder="Ex: Fotografia" className="input" />
        </AdminField>
        <AdminField label="Logo (opcional)" name="photo">
          <input type="file" name="photo" accept="image/*" className="input" />
        </AdminField>
        <AdminField label="Site / Instagram (opcional)" name="website">
          <input name="website" placeholder="https://..." className="input" />
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4" />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar parceria</Button>
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        {partners.length === 0 && (
          <p className="text-muted-foreground">Nenhuma parceria cadastrada.</p>
        )}
        {partners.map((partner) => (
          <Link
            key={partner.id}
            href={`/admin/parcerias/${partner.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-sm"
          >
            <div>
              <p className="font-medium text-foreground">{partner.name}</p>
              {partner.category && (
                <p className="text-sm text-muted-foreground">{partner.category}</p>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                partner.published
                  ? "bg-green-50 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {partner.published ? "Publicado" : "Rascunho"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
