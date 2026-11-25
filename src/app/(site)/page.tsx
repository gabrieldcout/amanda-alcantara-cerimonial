import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WeddingCountdown } from "@/components/site/WeddingCountdown";
import { GalleryStrip } from "@/components/site/GalleryStrip";
import { getUpcomingCouple, getSiteSettings } from "@/lib/data";
import { getGalleryStrips, getSitePhotos } from "@/lib/sitePhotos";
import { getSiteTexts, paragraphs } from "@/lib/siteTexts";

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
  const [upcomingCouple, settings, photos, t, strips] = await Promise.all([
    getUpcomingCouple(),
    getSiteSettings(),
    getSitePhotos(),
    getSiteTexts(),
    getGalleryStrips(),
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

      <GalleryStrip items={strips["faixa-1"]} layout="row" />

      {/* Próximo casamento */}
      {upcomingCouple && (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={upcomingCouple.coverUrl ?? undefined}
                alt={upcomingCouple.names}
                className="mx-auto h-auto w-full max-w-sm rounded-lg object-contain"
              />
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
      <section className="py-14 sm:py-24">
        <Container className="max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim"]}
                alt="Amanda Alcântara"
                className="col-span-2 aspect-[4/5] w-full rounded-lg object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim-2"]}
                alt="Amanda planejando um evento"
                className="aspect-square w-full rounded-lg object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos["sobre-mim-3"]}
                alt="Amanda trabalhando"
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow={t["sobre.eyebrow"]} title={t["sobre.title"]} align="left" />
              <Paragraphs text={t["sobre.text"]} className="leading-relaxed text-muted-foreground" />
            </div>
          </div>
        </Container>
      </section>

      <GalleryStrip items={strips["faixa-2"]} layout="mosaic" />

      {/* O meu compromisso */}
      <section className="py-14 sm:py-24">
        <Container className="max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={t["compromisso.eyebrow"]}
                title={t["compromisso.title"]}
                align="left"
              />
              <Paragraphs
                text={t["compromisso.text"]}
                className="leading-relaxed text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-1"]}
                  alt="Casal no dia do casamento"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-3"]}
                  alt="Noiva sorrindo"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-2"]}
                  alt="Casal se abraçando ao entardecer"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos["compromisso-4"]}
                  alt="Cerimônia de casamento"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sobre a minha assessoria */}
      <section className="py-14 sm:py-24">
        <Container className="flex max-w-7xl flex-col gap-10">
          <SectionHeading
            eyebrow={t["assessoria.eyebrow"]}
            title={t["assessoria.title"]}
            subtitle={t["assessoria.subtitle"]}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {ASSESSORIA_SLOTS.map((slot) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={slot}
                src={photos[slot]}
                alt="Momento de casamento assessorado pela Amanda"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </Container>
      </section>

      <GalleryStrip items={strips["faixa-3"]} layout="row" />

      {/* Como te acompanho */}
      <section className="py-14 sm:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={t["acompanho.eyebrow"]}
            title={t["acompanho.title"]}
            titleClassName="text-black font-bold"
          />
          <ol className="mx-auto flex w-full max-w-3xl flex-col">
            {CARD_KEYS.map((n) => (
              <li
                key={n}
                className="grid gap-2 border-t border-border py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="font-serif-display text-3xl text-accent">
                  {String(n).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif-display text-xl font-bold text-black">
                    {t[`acompanho.card${n}.title`]}
                  </h3>
                  <Paragraphs
                    text={t[`acompanho.card${n}.text`]}
                    className="leading-relaxed text-muted-foreground"
                  />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <GalleryStrip items={strips["faixa-4"]} layout="mosaic" />

      {/* Isso é pra você se */}
      <section className="py-14 sm:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={t["identifica.eyebrow"]}
            title={t["identifica.title"]}
            subtitle={t["identifica.subtitle"]}
          />
          <ul className="mx-auto flex w-full max-w-3xl flex-col">
            {paragraphs(t["identifica.items"]).map((text, i) => (
              <li
                key={i}
                className="flex gap-4 border-t border-border py-5 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 text-accent">✦</span>
                <p className="leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Destaques */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {DESTAQUE_KEYS.map((n) => (
              <div key={n} className="flex flex-col items-center gap-2 px-3 text-center">
                <span className="font-serif-display text-2xl font-bold text-black sm:text-3xl">
                  {t[`destaque${n}.stat`]}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t[`destaque${n}.label`]}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <GalleryStrip items={strips["faixa-5"]} layout="row" />

      {/* CTA final */}
      <section className="relative overflow-hidden py-24 text-center text-white sm:py-32">
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
          <ButtonLink
            href="/orcamento"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Solicitar orçamento
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
