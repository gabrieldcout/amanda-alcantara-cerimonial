import { SITE_PHOTO_SLOTS, getSitePhotos } from "@/lib/sitePhotos";
import { updateSitePhoto, resetSitePhoto } from "@/lib/actions/sitePhotos";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { PhotoInput } from "@/components/ui/PhotoInput";

export default async function AdminFotosPage() {
  const photos = await getSitePhotos();
  const sections = [...new Set(SITE_PHOTO_SLOTS.map((s) => s.section))];

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Fotos do site</h1>
        <p className="text-sm text-muted-foreground">
          Troque as fotos fixas da página inicial. Escolha a nova foto e clique em
          &quot;Trocar foto&quot;.
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
