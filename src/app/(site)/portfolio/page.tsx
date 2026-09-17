import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { getPublishedGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfólio | Amanda Alcântara Cerimonial",
};

export default async function PortfolioPage() {
  const images = await getPublishedGallery();

  return (
    <Container className="pb-10 pt-16 sm:pb-14 sm:pt-24">
      <div className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Portfólio
        </span>
        <h1 className="font-serif-display text-3xl text-foreground sm:text-4xl">
          Casamentos que conduzimos
        </h1>
      </div>

      <GalleryGrid images={images} />
    </Container>
  );
}
