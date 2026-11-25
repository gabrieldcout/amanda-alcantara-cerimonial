import { prisma } from "@/lib/prisma";

export const SITE_PHOTO_SLOTS = [
  { slot: "hero", section: "Topo da página", label: "Fundo do topo", src: "/fotos/sobre-mim/por-do-sol-caminhando.jpg" },
  { slot: "sobre-mim", section: "Sobre mim", label: "Foto grande", src: "/fotos/sobre-mim/amanda-poltrona.jpg" },
  { slot: "sobre-mim-2", section: "Sobre mim", label: "Foto pequena da esquerda", src: "/fotos/sobre-mim/amanda-planejamento.jpg" },
  { slot: "sobre-mim-3", section: "Sobre mim", label: "Foto pequena da direita", src: "/fotos/sobre-mim/amanda-tablet.jpg" },
  { slot: "compromisso-1", section: "O meu compromisso", label: "Esquerda, em cima", src: "/fotos/sobre-mim/casal-cerimonia-1.jpg" },
  { slot: "compromisso-2", section: "O meu compromisso", label: "Direita, em cima", src: "/fotos/sobre-mim/casal-beijo-noite.jpg" },
  { slot: "compromisso-3", section: "O meu compromisso", label: "Esquerda, embaixo", src: "/fotos/sobre-mim/noiva-rindo-anel.jpg" },
  { slot: "compromisso-4", section: "O meu compromisso", label: "Direita, embaixo", src: "/fotos/sobre-mim/casal-cerimonia-2.jpg" },
  { slot: "assessoria-1", section: "Sobre a minha assessoria", label: "Foto 1", src: "/fotos/sobre-mim/mesa-posta.jpg" },
  { slot: "assessoria-2", section: "Sobre a minha assessoria", label: "Foto 2", src: "/fotos/sobre-mim/criancas-girassois.jpg" },
  { slot: "assessoria-3", section: "Sobre a minha assessoria", label: "Foto 3", src: "/fotos/sobre-mim/ajustando-vestido-janela.jpg" },
  { slot: "assessoria-4", section: "Sobre a minha assessoria", label: "Foto 4", src: "/fotos/sobre-mim/noiva-madrinha-noite.jpg" },
  { slot: "assessoria-5", section: "Sobre a minha assessoria", label: "Foto 5", src: "/fotos/amanda/com-noiva-rosas.jpg" },
  { slot: "assessoria-6", section: "Sobre a minha assessoria", label: "Foto 6", src: "/fotos/sobre-mim/noiva-porta.jpg" },
  { slot: "assessoria-7", section: "Sobre a minha assessoria", label: "Foto 7", src: "/fotos/amanda/ajustando-vestido.jpg" },
  { slot: "assessoria-8", section: "Sobre a minha assessoria", label: "Foto 8", src: "/fotos/bea-e-paulo/cerimonia-alianca.jpg" },
  { slot: "cta-final", section: "Rodapé (chamada final)", label: "Fundo da chamada final", src: "/fotos/sobre-mim/celebracao-confete.jpg" },
] as const;

export type SitePhotoSlot = (typeof SITE_PHOTO_SLOTS)[number]["slot"];

export function isSitePhotoSlot(value: string): value is SitePhotoSlot {
  return SITE_PHOTO_SLOTS.some((s) => s.slot === value);
}

// Devolve a URL de cada slot: a foto enviada pelo painel ou a padrão.
// Se a tabela ainda não existir em produção, cai nas padrões sem quebrar o site.
export async function getSitePhotos(): Promise<Record<SitePhotoSlot, string>> {
  const result = Object.fromEntries(
    SITE_PHOTO_SLOTS.map((s) => [s.slot, s.src]),
  ) as Record<SitePhotoSlot, string>;
  try {
    const rows = await prisma.sitePhoto.findMany();
    for (const row of rows) {
      if (isSitePhotoSlot(row.slot)) result[row.slot] = row.url;
    }
  } catch (error) {
    console.error("SitePhoto indisponível, usando fotos padrão:", error);
  }
  return result;
}

// Faixas de fotos entre as seções da home. Cada uma aceita quantas fotos (ou
// vídeos) a Amanda quiser. Ficam na mesma tabela SitePhoto, com slot
// "<faixa>:<timestamp>-<aleatório>", então não precisa de tabela nova.
export const GALLERY_STRIPS = [
  {
    id: "faixa-1",
    label: "Faixa 1 · logo abaixo do topo",
    layout: "row",
    defaults: [
      "/fotos/larissa-e-fernando/beijo-arco.jpg",
      "/fotos/bea-e-paulo/saida-petalas.jpg",
      "/fotos/casal-1/votos-caverna.jpg",
      "/fotos/portfolio/casamento-01.jpg",
      "/fotos/larissa-e-fernando/aliancas.jpg",
      "/fotos/bea-e-paulo/por-do-sol-abraco.jpg",
      "/fotos/portfolio/casamento-02.jpg",
      "/fotos/casal-1/maos-aliancas.jpg",
    ],
  },
  {
    id: "faixa-2",
    label: "Faixa 2 · entre Sobre mim e O meu compromisso",
    layout: "mosaic",
    defaults: [
      "/fotos/manual-noivos/casal-campo.jpg",
      "/fotos/portfolio/casamento-03.jpg",
      "/fotos/manual-noivos/buque-detalhe.jpg",
      "/fotos/casal-1/caminhando.jpg",
      "/fotos/portfolio/casamento-04.jpg",
      "/fotos/manual-noivos/aneis-detalhe.jpg",
      "/fotos/larissa-e-fernando/caminhando-praia.jpg",
      "/fotos/portfolio/casamento-05.jpg",
    ],
  },
  {
    id: "faixa-3",
    label: "Faixa 3 · depois de Sobre a minha assessoria",
    layout: "row",
    defaults: [
      "/fotos/portfolio/casamento-06.jpg",
      "/fotos/bea-e-paulo/cerimonia-beijo.jpg",
      "/fotos/manual-noivos/casal-pb-beijo.jpg",
      "/fotos/larissa-e-fernando/brinde-beijo.jpg",
      "/fotos/portfolio/casamento-07.jpg",
      "/fotos/casal-3/com-amanda-noite.jpg",
      "/fotos/manual-noivos/convite-flatlay.jpg",
      "/fotos/bea-e-paulo/caminhando-araucaria.jpg",
    ],
  },
  {
    id: "faixa-4",
    label: "Faixa 4 · depois de Como te acompanho",
    layout: "mosaic",
    defaults: [
      "/fotos/portfolio/casamento-08.jpg",
      "/fotos/larissa-e-fernando/abraco-mar.jpg",
      "/fotos/manual-noivos/casal-guardachuva.jpg",
      "/fotos/sobre-mim/paisagem-recepcao.jpg",
      "/fotos/portfolio/casamento-09.jpg",
      "/fotos/casal-1/retrato-noiva.jpg",
      "/fotos/bea-e-paulo/casal-rindo.jpg",
      "/fotos/manual-noivos/casal-por-do-sol.jpg",
    ],
  },
  {
    id: "faixa-5",
    label: "Faixa 5 · antes da chamada final",
    layout: "row",
    defaults: [
      "/fotos/portfolio/casamento-10.jpg",
      "/fotos/larissa-e-fernando/abraco-altar.jpg",
      "/fotos/casal-1/beijo-caverna.jpg",
      "/fotos/manual-noivos/casal-abraco.jpg",
      "/fotos/amanda/direcionando.jpg",
      "/fotos/cronograma/casal-noite-luzes.jpg",
      "/fotos/inicio/nath-e-andre-1.jpeg",
      "/fotos/inicio/nath-e-andre-2.jpeg",
    ],
  },
] as const;

export type GalleryStripId = (typeof GALLERY_STRIPS)[number]["id"];
export type GalleryItem = { slot: string | null; url: string; isVideo: boolean };

export function isGalleryStripId(value: string): value is GalleryStripId {
  return GALLERY_STRIPS.some((s) => s.id === value);
}

export function stripOfSlot(slot: string): GalleryStripId | null {
  const id = slot.split(":")[0];
  return slot.includes(":") && isGalleryStripId(id) ? id : null;
}

export function isVideoUrl(url: string): boolean {
  return !url.startsWith("/uploads/") && !url.startsWith("/fotos/");
}

// Sem nenhuma foto cadastrada numa faixa, mostra as fotos de exemplo.
export async function getGalleryStrips(): Promise<Record<GalleryStripId, GalleryItem[]>> {
  const result = Object.fromEntries(
    GALLERY_STRIPS.map((s) => [
      s.id,
      s.defaults.map((url) => ({ slot: null, url, isVideo: false })),
    ]),
  ) as Record<GalleryStripId, GalleryItem[]>;
  try {
    const rows = await prisma.sitePhoto.findMany({
      where: { slot: { contains: ":" } },
      orderBy: { slot: "asc" },
    });
    const custom: Partial<Record<GalleryStripId, GalleryItem[]>> = {};
    for (const row of rows) {
      const id = stripOfSlot(row.slot);
      if (!id) continue;
      (custom[id] ??= []).push({ slot: row.slot, url: row.url, isVideo: isVideoUrl(row.url) });
    }
    Object.assign(result, custom);
  } catch (error) {
    console.error("SitePhoto indisponível, usando faixas padrão:", error);
  }
  return result;
}
