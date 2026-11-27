import { Container } from "@/components/ui/Container";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import type { GalleryItem } from "@/lib/sitePhotos";

// Faixa de fotos entre as seções da home. "row" desliza sozinha de ponta a
// ponta; "mosaic" é um mosaico de colunas. Aceita qualquer quantidade.
export function GalleryStrip({
  items,
  layout,
}: {
  items: readonly GalleryItem[];
  layout: "row" | "mosaic";
}) {
  if (items.length === 0) return null;

  if (layout === "mosaic") {
    return (
      <section className="py-3 sm:py-4">
        <Container className="max-w-7xl">
          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
            {items.map((item, i) => (
              <div key={item.slot ?? i} className="mb-3 break-inside-avoid sm:mb-4">
                {item.isVideo ? (
                  <VideoEmbed url={item.url} className="rounded-lg" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt=""
                    loading="lazy"
                    className="w-full rounded-lg object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  const hasVideo = items.some((item) => item.isVideo);
  const renderItems = (hidden: boolean) =>
    items.map((item, i) => (
      <div
        key={`${hidden ? "b" : "a"}-${item.slot ?? i}`}
        aria-hidden={hidden || undefined}
        className="h-[300px] shrink-0 pr-3 sm:h-[440px] sm:pr-4"
      >
        {item.isVideo ? (
          <div className="aspect-video h-full">
            <VideoEmbed url={item.url} className="h-full rounded-lg" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt=""
            loading="lazy"
            className="h-full w-auto max-w-none rounded-lg object-cover"
          />
        )}
      </div>
    ));

  // Com vídeo não dá pra duplicar (tocaria dois players), então vira rolagem.
  if (hasVideo) {
    return (
      <section className="py-3 sm:py-4">
        <div className="flex overflow-x-auto px-3 sm:px-4">{renderItems(false)}</div>
      </section>
    );
  }

  return (
    <section className="py-3 sm:py-4">
      <div className="photo-marquee">
        <div
          className="photo-marquee-track"
          style={{ ["--marquee-duration" as string]: `${Math.max(30, items.length * 7)}s` }}
        >
          <div className="flex">{renderItems(false)}</div>
          <div className="flex" aria-hidden="true">
            {renderItems(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
