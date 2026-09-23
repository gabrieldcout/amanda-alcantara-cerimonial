import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePartner, deletePartner } from "@/lib/actions/partners";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-serif-display text-2xl text-foreground">
        Editar parceria
      </h1>

      <form
        action={updatePartner.bind(null, id)}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <AdminField label="Nome" name="name">
          <input name="name" required defaultValue={partner.name} className="input" />
        </AdminField>
        <AdminField label="Categoria" name="category">
          <input name="category" defaultValue={partner.category ?? ""} className="input" />
        </AdminField>
        <AdminField label="Logo (opcional)" name="photo">
          {partner.logoUrl && (
            <MediaImage
              src={partner.logoUrl}
              alt=""
              className="mb-2 h-16 w-16 rounded-lg object-contain"
            />
          )}
          <input type="file" name="photo" accept="image/*" className="input" />
          {partner.logoUrl && (
            <p className="mt-1 text-xs text-muted-foreground">
              Deixe em branco pra manter o logo atual.
            </p>
          )}
        </AdminField>
        <AdminField label="Site / Instagram (opcional)" name="website">
          <input name="website" defaultValue={partner.website ?? ""} className="input" />
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={partner.order} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={partner.published}
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>

      <form action={deletePartner.bind(null, id)} className="self-start">
        <DeleteButton
          confirmText="Excluir esta parceria permanentemente?"
          label="Excluir parceria"
        />
      </form>
    </div>
  );
}
