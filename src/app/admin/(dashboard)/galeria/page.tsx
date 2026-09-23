import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createGalleryImage, deleteGalleryImage } from "@/lib/actions/gallery";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";

export default async function AdminGaleriaPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Galeria / Portfólio
        </h1>
        <p className="text-sm text-muted-foreground">
          Fotos exibidas na página de portfólio e na home.
        </p>
      </div>

      <form
        action={createGalleryImage}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">Nova foto</p>
        <div className="sm:col-span-2">
          <AdminField label="Foto" name="photo">
            <input type="file" name="photo" accept="image/*" required className="input" />
          </AdminField>
        </div>
        <AdminField label="Legenda (opcional)" name="caption">
          <input name="caption" className="input" />
        </AdminField>
        <AdminField label="Categoria (opcional)" name="category">
          <input name="category" placeholder="Ex: Casamento" className="input" />
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4" />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar foto</Button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.length === 0 && (
          <p className="text-muted-foreground">Nenhuma foto cadastrada.</p>
        )}
        {images.map((image) => (
          <div
            key={image.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3"
          >
            <Link href={`/admin/galeria/${image.id}`}>
              <MediaImage
                src={image.url}
                alt={image.caption ?? ""}
                className="aspect-square w-full rounded-lg object-cover"
              />
            </Link>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {image.caption || image.category || "Sem legenda"}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  image.published
                    ? "bg-green-50 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {image.published ? "Publicado" : "Rascunho"}
              </span>
              <form action={deleteGalleryImage.bind(null, image.id)}>
                <DeleteButton confirmText="Excluir esta foto?" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
