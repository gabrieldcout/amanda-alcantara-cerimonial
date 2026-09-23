import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateGalleryImage, deleteGalleryImage } from "@/lib/actions/gallery";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";

export default async function EditGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({ where: { id } });
  if (!image) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-serif-display text-2xl text-foreground">Editar foto</h1>

      <MediaImage
        src={image.url}
        alt={image.caption ?? ""}
        className="aspect-video w-full rounded-xl object-cover"
      />

      <form
        action={updateGalleryImage.bind(null, id)}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <AdminField label="Foto" name="photo">
            <input type="file" name="photo" accept="image/*" className="input" />
            <p className="mt-1 text-xs text-muted-foreground">
              Deixe em branco pra manter a foto atual.
            </p>
          </AdminField>
        </div>
        <AdminField label="Legenda (opcional)" name="caption">
          <input name="caption" defaultValue={image.caption ?? ""} className="input" />
        </AdminField>
        <AdminField label="Categoria (opcional)" name="category">
          <input name="category" defaultValue={image.category ?? ""} className="input" />
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={image.order} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={image.published}
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>

      <form action={deleteGalleryImage.bind(null, id)} className="self-start">
        <DeleteButton confirmText="Excluir esta foto permanentemente?" label="Excluir foto" />
      </form>
    </div>
  );
}
