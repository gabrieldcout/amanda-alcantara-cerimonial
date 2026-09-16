import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoupleCard } from "@/components/site/CoupleCard";
import { getPublishedCouples } from "@/lib/data";

export const metadata: Metadata = {
  title: "Histórias reais | Amanda Alcântara Cerimonial",
};

export default async function CasaisPage() {
  const couples = await getPublishedCouples();

  return (
    <Container className="py-20 sm:py-28">
      <div className="flex flex-col gap-14 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
        <SectionHeading
          eyebrow="Histórias reais"
          title="Histórias que merecem ser contadas"
          subtitle="Conheça um pouco de cada casal, com fotos, vídeos e a história por trás do grande dia."
        />

        {couples.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Em breve, novos casais por aqui.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {couples.map((couple) => (
              <CoupleCard key={couple.id} couple={couple} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
