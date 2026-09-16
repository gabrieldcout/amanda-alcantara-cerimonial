"use client";

import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/site/MediaImage";
import { resolveVideoSource } from "@/lib/videoEmbed";

export type BackstageItem = {
  id: string;
  type: string;
  url: string;
  caption: string | null;
};

export function BackstageFeed({ items }: { items: BackstageItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Índice do único vídeo que pode tocar com som. -1 = todos mudos.
  const [audioOwner, setAudioOwner] = useState<number>(-1);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const openItem = openIndex !== null ? items[openIndex] : null;
  const openSource =
    openItem?.type === "video" ? resolveVideoSource(openItem.url) : null;

  return (
    <>
      <div
        className="mx-auto flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:grid sm:snap-none sm:justify-center sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 260px))",
        }}
      >
        {items.map((item, i) => (
          <figure
            key={item.id}
            className="group flex w-[75%] shrink-0 snap-center flex-col gap-2.5 sm:w-auto sm:shrink"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(i);
                }
              }}
              aria-label={item.caption ?? "Abrir bastidor"}
              className="relative block cursor-pointer overflow-hidden rounded-2xl bg-black transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(120,70,40,0.18)]"
              style={{ aspectRatio: "9 / 16" }}
            >
              {item.type === "video" ? (
                <VideoCard
                  item={item}
                  autoPlay={i === 0}
                  index={i}
                  audioOwner={audioOwner}
                  onClaimAudio={() => setAudioOwner(i)}
                  onReleaseAudio={() =>
                    setAudioOwner((cur) => (cur === i ? -1 : cur))
                  }
                />
              ) : (
                <PhotoCard item={item} />
              )}
              {/* Gradiente sutil na base pra contrastar com qualquer cena */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-black/45 to-transparent"
              />
            </div>
            <figcaption className="min-h-[2.6em] px-1 text-sm leading-[1.3] text-foreground/80 [text-wrap:pretty]">
              {item.caption?.split(" · ").map((chunk, idx, arr) => (
                <span key={idx}>
                  {chunk}
                  {idx < arr.length - 1 && (
                    <span className="mx-1.5 text-accent-dark">·</span>
                  )}
                </span>
              ))}
            </figcaption>
          </figure>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          <div
            className="relative max-h-full w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {openItem.type === "video" && openSource?.kind === "file" && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={openSource.url}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full rounded-2xl bg-black"
              />
            )}
            {openItem.type === "video" &&
              (openSource?.kind === "youtube" || openSource?.kind === "vimeo") && (
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                  <iframe
                    src={openSource.embedUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            {openItem.type === "photo" && (
              <MediaImage
                src={openItem.url}
                alt={openItem.caption ?? "Bastidor"}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            )}
            {openItem.caption && (
              <p className="mt-3 text-center text-sm text-white/80">
                {openItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PhotoCard({ item }: { item: BackstageItem }) {
  return (
    <>
      <MediaImage
        src={item.url}
        alt={item.caption ?? "Bastidor"}
        className="h-full w-full object-cover"
      />
      {/* Badge discreto no canto pra sinalizar que é foto (não vídeo) */}
      <span
        aria-hidden
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M9 2 7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </span>
    </>
  );
}

function VideoCard({
  item,
  autoPlay,
  index,
  audioOwner,
  onClaimAudio,
  onReleaseAudio,
}: {
  item: BackstageItem;
  autoPlay: boolean;
  index: number;
  audioOwner: number;
  onClaimAudio: () => void;
  onReleaseAudio: () => void;
}) {
  const source = resolveVideoSource(item.url);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!autoPlay) {
      // Vídeo pausado: mostra o primeiro frame em vez de tela preta.
      const onLoaded = () => {
        try {
          v.currentTime = 0.01;
        } catch {
          /* ignore */
        }
      };
      v.addEventListener("loadedmetadata", onLoaded);
      return () => v.removeEventListener("loadedmetadata", onLoaded);
    }

    // Respeita a preferência de "reduzir animações" do sistema.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const onLoaded = () => {
        try {
          v.currentTime = 0.01;
        } catch {
          /* ignore */
        }
      };
      v.addEventListener("loadedmetadata", onLoaded);
      return () => v.removeEventListener("loadedmetadata", onLoaded);
    }

    // Tenta tocar com áudio; se o browser bloquear, cai pra mudo.
    v.muted = false;
    v.play()
      .then(() => {
        setPlaying(true);
        setMuted(false);
        onClaimAudio();
      })
      .catch(() => {
        v.muted = true;
        v.play()
          .then(() => {
            setPlaying(true);
            setMuted(true);
          })
          .catch(() => setPlaying(false));
      });
    // Deliberadamente sem onClaimAudio nas deps — só rodar no mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  // Se outro vídeo pegou o "audio owner", silencia este.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (audioOwner !== index && audioOwner !== -1 && !v.muted) {
      v.muted = true;
      setMuted(true);
    }
  }, [audioOwner, index]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !v.muted;
    v.muted = nextMuted;
    setMuted(nextMuted);
    if (nextMuted) {
      onReleaseAudio();
    } else {
      onClaimAudio();
    }
  };

  if (source.kind !== "file") {
    return <div className="h-full w-full bg-neutral-900" />;
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={source.url}
        loop={autoPlay}
        playsInline
        preload="metadata"
        className="pointer-events-none h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-1.5 p-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent-dark transition hover:bg-white"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar vídeo"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent-dark transition hover:bg-white"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63Zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02ZM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77Z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
