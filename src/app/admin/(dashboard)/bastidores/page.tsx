import { prisma } from "@/lib/prisma";
import {
  createBackstageMedia,
  deleteBackstageMedia,
} from "@/lib/actions/backstage";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";
import { VideoEmbed } from "@/components/site/VideoEmbed";

export default async function AdminBastidoresPage() {
  const items = await prisma.backstageMedia.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Bastidores
        </h1>
        <p className="text-sm text-muted-foreground">
          Fotos e vídeos dos bastidores dos eventos. Pra vídeo, cole o link do
          YouTube/Vimeo ou de um arquivo de vídeo; pra foto, envie o arquivo
          direto.
        </p>
      </div>

      <form
        action={createBackstageMedia}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">Novo bastidor</p>
        <AdminField label="Tipo" name="type">
          <select name="type" required className="input" defaultValue="video">
            <option value="video">Vídeo</option>
            <option value="photo">Foto</option>
          </select>
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <AdminField label="Foto (se o tipo for Foto)" name="photo">
          <input type="file" name="photo" accept="image/*" className="input" />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField
            label="URL do vídeo (se o tipo for Vídeo — YouTube, Vimeo ou link direto)"
            name="url"
          >
            <input name="url" placeholder="https://..." className="input" />
          </AdminField>
        </div>
        <div className="sm:col-span-2">
          <AdminField label="Legenda (opcional)" name="caption">
            <input name="caption" className="input" />
          </AdminField>
        </div>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar bastidor</Button>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <p className="text-muted-foreground">Nenhum bastidor cadastrado.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3"
          >
            {item.type === "video" ? (
              <VideoEmbed url={item.url} />
            ) : (
              <MediaImage
                src={item.url}
                alt={item.caption ?? ""}
                className="aspect-video w-full rounded-lg object-cover"
              />
            )}
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {item.caption || (item.type === "video" ? "Vídeo" : "Foto")}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  item.published
                    ? "bg-green-50 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.published ? "Publicado" : "Rascunho"}
              </span>
              <form action={deleteBackstageMedia.bind(null, item.id)}>
                <DeleteButton confirmText="Excluir este bastidor?" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
