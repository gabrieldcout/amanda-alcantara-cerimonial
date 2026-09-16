import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BackstageFeed } from "@/components/site/BackstageFeed";
import { getPublishedBackstage, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bastidores | Amanda Alcântara Cerimonial",
};

export default async function BastidoresPage() {
  const [items, settings] = await Promise.all([
    getPublishedBackstage(),
    getSiteSettings(),
  ]);

  const feedItems = items.map((item) => ({
    id: item.id,
    type: item.type,
    url: item.url,
    caption: item.caption,
  }));

  return (
    <Container className="pb-10 pt-16 sm:pb-14 sm:pt-24">
      <div className="mb-12 flex scroll-mt-32 flex-col items-center gap-3 text-center sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Bastidores
        </span>
        <h1 className="font-serif-display text-3xl text-foreground sm:text-4xl">
          O que acontece por trás de cada evento
        </h1>
        <p className="mx-auto max-w-[560px] text-muted-foreground [text-wrap:balance]">
          Registros dos momentos que ninguém vê — a preparação, a equipe em
          ação, o cuidado com cada detalhe.
        </p>
      </div>

      {feedItems.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Em breve, novos bastidores por aqui.
        </p>
      ) : (
        <BackstageFeed items={feedItems} />
      )}

      {/* CTA final */}
      <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-5 border-t border-border/50 pt-14 text-center sm:mt-20">
        <p className="font-serif-display text-2xl text-foreground sm:text-3xl">
          Quer esse cuidado no seu casamento?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
          {settings.instagramUrl && (
            <ButtonLink href={settings.instagramUrl} variant="outline">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23a3.72 3.72 0 0 1-.9 1.38 3.72 3.72 0 0 1-1.38.9c-.42.16-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.42C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.87 5.87 0 0 0-2.13 1.38A5.87 5.87 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.87 5.87 0 0 0 1.38 2.13c.66.66 1.32 1.06 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.13-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
              </svg>
              Ver mais no Instagram
            </ButtonLink>
          )}
        </div>
      </div>
    </Container>
  );
}
