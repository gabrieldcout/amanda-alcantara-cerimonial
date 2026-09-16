export type VideoSource =
  | { kind: "youtube"; embedUrl: string }
  | { kind: "vimeo"; embedUrl: string }
  | { kind: "file"; url: string }
  | { kind: "link"; url: string };

export function resolveVideoSource(url: string): VideoSource {
  // Caminho relativo (ex: /videos/bastidores/foo.mp4) — trata como arquivo direto
  if (url.startsWith("/") && /\.(mp4|webm|ogg)$/i.test(url)) {
    return { kind: "file", url };
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return { kind: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
      const shortsMatch = parsed.pathname.match(/\/shorts\/([^/]+)/);
      if (shortsMatch) {
        return {
          kind: "youtube",
          embedUrl: `https://www.youtube.com/embed/${shortsMatch[1]}`,
        };
      }
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return { kind: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.replace("/", "");
      if (id) return { kind: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }

    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return { kind: "file", url };
    }
  } catch {
    // URL inválida, cai no fallback abaixo
  }

  return { kind: "link", url };
}
