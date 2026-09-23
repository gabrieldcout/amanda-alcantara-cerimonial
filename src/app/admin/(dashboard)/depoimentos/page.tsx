import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createTestimonial } from "@/lib/actions/testimonials";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default async function AdminDepoimentosPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Depoimentos</h1>
        <p className="text-sm text-muted-foreground">
          Adicione e organize os depoimentos exibidos no site.
        </p>
      </div>

      <form
        action={createTestimonial}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">
          Novo depoimento
        </p>
        <AdminField label="Nome do cliente" name="clientName">
          <input name="clientName" required className="input" />
        </AdminField>
        <AdminField label="Tipo de evento" name="eventType">
          <input name="eventType" placeholder="Ex: Casamento" className="input" />
        </AdminField>
        <AdminField label="Nota (1 a 5)" name="rating">
          <select name="rating" defaultValue="5" className="input">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Foto (opcional)" name="photo">
          <input type="file" name="photo" accept="image/*" className="input" />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Depoimento" name="quote">
            <RichTextEditor name="quote" rows={3} />
          </AdminField>
        </div>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4" />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar depoimento</Button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {testimonials.length === 0 && (
          <p className="text-muted-foreground">Nenhum depoimento cadastrado.</p>
        )}
        {testimonials.map((t) => (
          <Link
            key={t.id}
            href={`/admin/depoimentos/${t.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-sm"
          >
            <div>
              <p className="font-medium text-foreground">
                {t.clientName}{" "}
                {t.eventType && (
                  <span className="text-muted-foreground">· {t.eventType}</span>
                )}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                {t.quote}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                t.published
                  ? "bg-green-50 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {t.published ? "Publicado" : "Rascunho"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
