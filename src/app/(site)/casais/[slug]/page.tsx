import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/site/MediaImage";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { getCoupleBySlug } from "@/lib/data";

// Posição de crop da capa por casal (pra ajustar quando a composição da
// foto tem foco fora do centro). Default: center 45%.
const COVER_POSITION: Record<string, string> = {
  "luisa-e-guilherme": "center 30%",
  "bea-e-paulo": "center 45%",
  "larissa-e-fernando": "center 50%",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const couple = await getCoupleBySlug(slug);
  return { title: couple ? `${couple.names} | Histórias reais` : "Histórias reais" };
}

export default async function CoupleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const couple = await getCoupleBySlug(slug);
  if (!couple) notFound();

  const photos = couple.media.filter((m) => m.type === "photo");
  const videos = couple.media.filter((m) => m.type === "video");

  return (
    <>
      <div className="aspect-[3/2] w-full overflow-hidden bg-muted sm:aspect-[4/3]">
        <MediaImage
          src={couple.coverUrl}
          alt={couple.names}
          className="h-full w-full object-cover"
          style={{ objectPosition: COVER_POSITION[couple.slug] ?? "center 45%" }}
          placeholderLabel={couple.names}
        />
      </div>

      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-12 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="font-serif-display text-4xl text-foreground">
              {couple.names}
            </h1>
            {couple.weddingDate && (
              <p className="text-muted-foreground">
                {new Date(couple.weddingDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          {couple.story && (
            <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center text-foreground/90 leading-relaxed">
              {couple.story.split(/\n{2,}/).map((paragraph, i) => {
                const trimmed = paragraph.trim();
                const isItalic =
                  trimmed.startsWith("*") && trimmed.endsWith("*");
                const text = isItalic ? trimmed.slice(1, -1) : trimmed;
                return isItalic ? (
                  <p key={i} className="whitespace-pre-line italic text-accent-dark">
                    {text}
                  </p>
                ) : (
                  <p key={i} className="whitespace-pre-line">
                    {text}
                  </p>
                );
              })}
            </div>
          )}

          {videos.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif-display text-xl text-foreground">Vídeos</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {videos.map((video) => (
                  <div key={video.id} className="flex flex-col gap-2">
                    <VideoEmbed url={video.url} />
                    {video.caption && (
                      <p className="text-sm text-muted-foreground">{video.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {photos.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif-display text-xl text-foreground">Fotos</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo) => (
                  <figure
                    key={photo.id}
                    className="aspect-[3/4] overflow-hidden rounded-xl bg-background/40"
                  >
                    <MediaImage
                      src={photo.url}
                      alt={photo.caption ?? couple.names}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
