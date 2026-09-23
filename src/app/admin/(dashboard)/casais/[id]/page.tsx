import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  updateCouple,
  deleteCouple,
  addCoupleMedia,
  deleteCoupleMedia,
} from "@/lib/actions/couples";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default async function EditCouplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const couple = await prisma.couple.findUnique({
    where: { id },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!couple) notFound();

  const weddingDateValue = couple.weddingDate
    ? couple.weddingDate.toISOString().slice(0, 10)
    : "";

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Editar casal
        </h1>
      </div>

      <form
        action={updateCouple.bind(null, id)}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <AdminField label="Nomes do casal" name="names">
          <input name="names" required defaultValue={couple.names} className="input" />
        </AdminField>
        <AdminField label="Slug (URL)" name="slug">
          <input
            name="slug"
            required
            defaultValue={couple.slug}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            className="input"
          />
        </AdminField>
        <AdminField label="Data do casamento (opcional)" name="weddingDate">
          <input
            name="weddingDate"
            type="date"
            defaultValue={weddingDateValue}
            className="input"
          />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Foto de capa (opcional)" name="photo">
            {couple.coverUrl && (
              <MediaImage
                src={couple.coverUrl}
                alt=""
                className="mb-2 aspect-video w-full max-w-xs rounded-lg object-cover"
              />
            )}
            <input type="file" name="photo" accept="image/*" className="input" />
            {couple.coverUrl && (
              <p className="mt-1 text-xs text-muted-foreground">
                Deixe em branco pra manter a foto atual.
              </p>
            )}
          </AdminField>
        </div>
        <div className="sm:col-span-2">
          <AdminField label="História do casal (opcional)" name="story">
            <RichTextEditor name="story" defaultValue={couple.story} rows={4} />
          </AdminField>
        </div>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={couple.order} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={couple.published}
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>

      <form action={deleteCouple.bind(null, id)} className="self-start">
        <DeleteButton
          confirmText="Excluir este casal e toda a mídia associada?"
          label="Excluir casal"
        />
      </form>

      <div className="flex flex-col gap-4">
        <h2 className="font-serif-display text-xl text-foreground">
          Fotos e vídeos
        </h2>

        <form
          action={addCoupleMedia.bind(null, id)}
          className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
        >
          <AdminField label="Tipo" name="type">
            <select name="type" className="input" defaultValue="photo">
              <option value="photo">Foto</option>
              <option value="video">Vídeo</option>
            </select>
          </AdminField>
          <AdminField label="Foto (se o tipo for Foto)" name="photo">
            <input type="file" name="photo" accept="image/*" className="input" />
          </AdminField>
          <div className="sm:col-span-2">
            <AdminField label="URL do vídeo (se o tipo for Vídeo — YouTube, Vimeo ou link direto)" name="url">
              <input name="url" placeholder="https://..." className="input" />
            </AdminField>
          </div>
          <AdminField label="Legenda (opcional)" name="caption">
            <input name="caption" className="input" />
          </AdminField>
          <AdminField label="Ordem" name="order">
            <input name="order" type="number" defaultValue={0} className="input" />
          </AdminField>
          <div className="sm:col-span-2">
            <Button type="submit">Adicionar mídia</Button>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {couple.media.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3"
            >
              {item.type === "photo" ? (
                <MediaImage
                  src={item.url}
                  alt={item.caption ?? ""}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                  Vídeo
                </div>
              )}
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {item.caption || item.url}
              </p>
              <form action={deleteCoupleMedia.bind(null, item.id, id)}>
                <DeleteButton confirmText="Remover este arquivo?" />
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
