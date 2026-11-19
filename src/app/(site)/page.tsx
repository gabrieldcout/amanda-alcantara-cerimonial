import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WeddingCountdown } from "@/components/site/WeddingCountdown";
import { getUpcomingCouple, getSiteSettings } from "@/lib/data";
import { getSitePhotos } from "@/lib/sitePhotos";
import { getSiteTexts, paragraphs } from "@/lib/siteTexts";

// Ícones dos destaques; número e texto vêm de Textos do site.
const DESTAQUE_ICONS = [
  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 21s-6.7-4.35-9.33-8.2C.87 10.2 1.4 6.9 4.1 5.2c2.2-1.4 4.9-.8 6.5 1.1L12 7.9l1.4-1.6c1.6-1.9 4.3-2.5 6.5-1.1 2.7 1.7 3.23 5 1.43 7.6C18.7 16.65 12 21 12 21Z" />
      </svg>
  ),
  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 14l10 5 10-5-10-5Z" />
      </svg>
  ),
  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 11Zm0 2c-2.67 0-8 1.34-8 4v3h9.28A5.98 5.98 0 0 1 9 16c0-1.5.53-2.88 1.4-4A11.6 11.6 0 0 0 8 13Zm8 0c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Z" />
      </svg>
  ),
  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 8v10H5V10Zm-9.6 7.6 4.9-4.9-1.4-1.4-3.5 3.5-1.5-1.5-1.4 1.4Z" />
      </svg>
  ),
];


function Paragraphs({ text, className }: { text: string; className: string }) {
  return paragraphs(text).map((p, i) => (
    <p key={i} className={className}>
      {p}
    </p>
  ));
}

const CARD_KEYS = [1, 2, 3, 4, 5] as const;
const DESTAQUE_KEYS = [1, 2, 3, 4] as const;
const ASSESSORIA_SLOTS = [
  "assessoria-1",
  "assessoria-2",
  "assessoria-3",
  "assessoria-4",
  "assessoria-5",
  "assessoria-6",
  "assessoria-7",
  "assessoria-8",
] as const;

export default async function HomePage() {
  const [upcomingCouple, settings, photos, t] = await Promise.all([
    getUpcomingCouple(),
    getSiteSettings(),
    getSitePhotos(),
    getSiteTexts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos.hero}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.55] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/35 to-background" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t["hero.eyebrow"]}
          </span>
          <h1
            className="rich-text max-w-3xl font-serif-display text-4xl leading-tight text-foreground sm:text-6xl"
            dangerouslySetInnerHTML={{ __html: settings.heroTitle }}
          />
          <div
            className="rich-text font-serif-display text-xl italic text-accent-dark sm:text-2xl"
            dangerouslySetInnerHTML={{ __html: settings.heroSubtitle }}
          />
          <Paragraphs text={t["hero.text"]} className="max-w-xl text-lg text-foreground" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
            <ButtonLink href="/casais" variant="outline">
              Ver histórias reais
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Próximo casamento */}
      {upcomingCouple && (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10 lg:p-14">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={upcomingCouple.coverUrl ?? undefined}
                  alt={upcomingCouple.names}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex flex-col items-start gap-5">
                <SectionHeading
                  eyebrow="Próximo casamento"
                  title={upcomingCouple.names}
                  align="left"
                />
                <p className="text-muted-foreground">
                  {new Date(upcomingCouple.weddingDate!).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <WeddingCountdown weddingDate={upcomingCouple.weddingDate!.toISOString()} />
              </div>
            </div>
          </Container>
        </section>
      )}


      {/* Sobre mim */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10 lg:p-14">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim"]}
                alt="Amanda Alcântara"
                className="col-span-2 aspect-[4/5] w-full rounded-2xl object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim-2"]}
                alt="Amanda planejando um evento"
                className="aspect-square w-full rounded-2xl object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim-3"]}
                alt="Amanda trabalhando"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow={t["sobre.eyebrow"]} title={t["sobre.title"]} align="left" />
              <Paragraphs text={t["sobre.text"]} className="text-muted-foreground leading-relaxed" />
            </div>
          </div>
        </Container>
      </section>

      {/* O meu compromisso */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:p-10 lg:p-14">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-1"]}
                  alt="Casal no dia do casamento"
                  className="aspect-[3/4] w-full rounded-2xl object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-3"]}
                  alt="Noiva sorrindo"
                  className="aspect-[3/4] w-full rounded-2xl object-cover"
                />
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-2"]}
                  alt="Casal se abraçando ao entardecer"
                  className="aspect-[3/4] w-full rounded-2xl object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-4"]}
                  alt="Cerimônia de casamento"
                  className="aspect-[3/4] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={t["compromisso.eyebrow"]}
                title={t["compromisso.title"]}
                align="left"
              />
              <Paragraphs text={t["compromisso.text"]} className="text-muted-foreground leading-relaxed" />
            </div>
          </div>
        </Container>
      </section>

      {/* Sobre a minha assessoria */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
            <SectionHeading
              eyebrow={t["assessoria.eyebrow"]}
              title={t["assessoria.title"]}
              subtitle={t["assessoria.subtitle"]}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {ASSESSORIA_SLOTS.map((slot) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={slot}
                  src={photos[slot]}
                  alt="Momento de casamento assessorado pela Amanda"
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Como te acompanho */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={t["acompanho.eyebrow"]}
            title={t["acompanho.title"]}
            titleClassName="text-black font-bold"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARD_KEYS.map((n) => (
              <div
                key={n}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-serif-display text-lg font-bold text-black">
                  {t[`acompanho.card${n}.title`]}
                </h3>
                <Paragraphs
                  text={t[`acompanho.card${n}.text`]}
                  className="text-sm leading-relaxed text-accent-dark"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Isso é pra você se */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={t["identifica.eyebrow"]}
            title={t["identifica.title"]}
            subtitle={t["identifica.subtitle"]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {paragraphs(t["identifica.items"]).map((text, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <span className="mt-1 text-accent">•</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Destaques */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DESTAQUE_KEYS.map((n, i) => (
              <div
                key={n}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                  {DESTAQUE_ICONS[i]}
                </span>
                <span className="font-serif-display text-2xl font-bold text-black">
                  {t[`destaque${n}.stat`]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t[`destaque${n}.label`]}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-border py-20 text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos["cta-final"]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-accent-dark/85" />
        <Container className="relative flex flex-col items-center gap-6">
          <h2 className="font-serif-display text-3xl sm:text-4xl">{t["cta.title"]}</h2>
          <Paragraphs text={t["cta.text"]} className="max-w-lg text-white/85" />
          <ButtonLink href="/orcamento" variant="outline" className="border-white text-white hover:bg-white/10">
            Solicitar orçamento
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
