import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialSubmitForm } from "@/components/site/TestimonialSubmitForm";
import { getBrideSession } from "@/lib/brideAuth";

export const metadata: Metadata = {
  title: "Deixe seu depoimento | Amanda Alcântara Cerimonial",
};

export default async function NovoDepoimentoPage() {
  const session = await getBrideSession();

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-xl flex-col gap-10">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Conte como foi sua experiência"
          subtitle="Já foi nossa cliente? Adoraríamos ouvir sobre o seu grande dia."
        />
        <TestimonialSubmitForm defaultName={session?.name} />
      </div>
    </Container>
  );
}
