import { GALLERY_STRIPS, SITE_PHOTO_SLOTS, getGalleryStrips, getSitePhotos } from "@/lib/sitePhotos";
import {
  addGalleryPhotos,
  addGalleryVideo,
  removeGalleryItem,
  resetSitePhoto,
  updateSitePhoto,
} from "@/lib/actions/sitePhotos";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { PhotoInput } from "@/components/ui/PhotoInput";

export default async function AdminFotosPage() {
  const [photos, strips] = await Promise.all([getSitePhotos(), getGalleryStrips()]);
  const sections = [...new Set(SITE_PHOTO_SLOTS.map((s) => s.section))];

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Fotos do site</h1>
        <p className="text-sm text-muted-foreground">
          Troque as fotos fixas da página inicial e monte as faixas de fotos entre
          as seções, com quantas fotos e vídeos quiser.
        </p>
      </div>

      <div>
        <h2 className="font-serif-display text-xl text-foreground">Faixas de fotos</h2>
        <p className="text-sm text-muted-foreground">
          São as tiras de fotos entre os textos da página inicial. Dá pra escolher
          várias fotos de uma vez (umas 20 por envio) e enviar quantas vezes quiser.
          Enquanto uma faixa não tem fotos suas, aparecem fotos de exemplo; ao
          enviar a primeira, elas continuam lá e você pode tirar uma por uma.
        </p>
      </div>

      {GALLERY_STRIPS.map((strip) => {
        const items = strips[strip.id];
        const isDefault = items.every((item) => item.slot === null);
        return (
          <section
            key={strip.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <h3 className="font-medium text-foreground">{strip.label}</h3>
              <p className="text-xs text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "itens"}
                {isDefault && " · fotos de exemplo"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((item, i) => (
                <div key={item.slot ?? `${item.url}-${i}`} className="flex flex-col gap-1">
                  {item.isVideo ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted p-2 text-center text-xs text-accent underline"
                    >
                      Vídeo
                    </a>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt=""
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  )}
                  {item.slot && (
                    <form action={removeGalleryItem.bind(null, item.slot)}>
                      <DeleteButton confirmText="Tirar esta foto da faixa?" label="Tirar" />
                    </form>
                  )}
                </div>
              ))}
            </div>

            <form
              action={addGalleryPhotos.bind(null, strip.id)}
              className="flex flex-col gap-2 border-t border-border pt-4"
            >
              <span className="text-sm text-muted-foreground">Adicionar fotos</span>
              <PhotoInput name="photos" multiple required className="input" />
              <div>
                <Button type="submit">Adicionar fotos</Button>
              </div>
            </form>

            <form
              action={addGalleryVideo.bind(null, strip.id)}
              className="flex flex-col gap-2"
            >
              <span className="text-sm text-muted-foreground">
                Ou adicionar um vídeo (link do YouTube, Vimeo ou arquivo .mp4)
              </span>
              <input
                name="url"
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="input"
              />
              <div>
                <Button type="submit" variant="outline">
                  Adicionar vídeo
                </Button>
              </div>
            </form>
          </section>
        );
      })}

      <div>
        <h2 className="font-serif-display text-xl text-foreground">Fotos fixas</h2>
        <p className="text-sm text-muted-foreground">
          Escolha a nova foto e clique em &quot;Trocar foto&quot;.
        </p>
      </div>

      {sections.map((section) => (
        <section
          key={section}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="font-medium text-foreground">{section}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {SITE_PHOTO_SLOTS.filter((s) => s.section === section).map((s) => {
              const current = photos[s.slot];
              const isCustom = current !== s.src;
              return (
                <div key={s.slot} className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current}
                    alt={s.label}
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                  <form
                    action={updateSitePhoto.bind(null, s.slot)}
                    className="flex flex-col gap-2"
                  >
                    <PhotoInput name="photo" required className="input" />
                    <div>
                      <Button type="submit">Trocar foto</Button>
                    </div>
                  </form>
                  {isCustom && (
                    <form action={resetSitePhoto.bind(null, s.slot)}>
                      <DeleteButton
                        confirmText="Voltar para a foto original?"
                        label="Voltar para a foto original"
                      />
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
