import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { getPublishedTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Depoimentos | Amanda Alcântara Cerimonial",
};

export default async function DepoimentosPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <Container className="py-20 sm:py-28">
      <div className="flex flex-col gap-14 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionHeading
            eyebrow="Depoimentos"
            title="Feedback de quem viveu o grande dia"
            subtitle="A opinião de quem viveu a experiência é o que mais importa."
          />
          <ButtonLink href="/depoimentos/novo" variant="outline">
            Já foi nossa cliente? Deixe seu depoimento
          </ButtonLink>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Em breve novos depoimentos por aqui.
          </p>
        )}

        <div className="mx-auto text-center">
          <p className="mb-4 text-muted-foreground">
            Quer ser a próxima história de sucesso?
          </p>
          <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
