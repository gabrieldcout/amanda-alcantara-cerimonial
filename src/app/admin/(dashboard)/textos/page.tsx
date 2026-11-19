import { SITE_TEXT_FIELDS, getSiteTexts } from "@/lib/siteTexts";
import { updateSiteTexts } from "@/lib/actions/siteTexts";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";

export default async function AdminTextosPage() {
  const texts = await getSiteTexts();
  const sections = [...new Set(SITE_TEXT_FIELDS.map((f) => f.section))];

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Textos do site</h1>
        <p className="text-sm text-muted-foreground">
          Títulos e textos da página inicial. Nos textos maiores, deixe uma linha
          em branco para começar um parágrafo novo. Se apagar tudo de um campo, ele
          volta para o texto original. O título e o subtítulo principais ficam em
          Configurações do site.
        </p>
      </div>

      <form action={updateSiteTexts} className="flex flex-col gap-6">
        {sections.map((section) => (
          <section
            key={section}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="font-medium text-foreground">{section}</h2>
            {SITE_TEXT_FIELDS.filter((f) => f.section === section).map((f) => (
              <AdminField key={f.key} label={f.label} name={f.key}>
                {"multiline" in f && f.multiline ? (
                  <textarea
                    name={f.key}
                    defaultValue={texts[f.key]}
                    rows={Math.min(14, Math.max(3, Math.ceil(texts[f.key].length / 80)))}
                    className="input"
                  />
                ) : (
                  <input name={f.key} defaultValue={texts[f.key]} className="input" />
                )}
              </AdminField>
            ))}
          </section>
        ))}
        <div className="sticky bottom-4">
          <Button type="submit">Salvar textos</Button>
        </div>
      </form>
    </div>
  );
}
