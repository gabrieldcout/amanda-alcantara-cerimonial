import { prisma } from "@/lib/prisma";

export const DEFAULT_SETTINGS = {
  heroTitle: "Amanda Alcântara",
  heroSubtitle:
    "Assessoria intencional, estratégica e personalizada para quem deseja viver o grande dia.",
  aboutText:
    "Cuido de cada detalhe da sua cerimônia com carinho, organização e experiência, para que você viva o seu grande dia com leveza, do planejamento ao último brinde.",
  instagramUrl: "https://instagram.com/aamandacerimonial",
  tiktokUrl: "https://www.tiktok.com/@aamanda.cerimoniall",
  whatsappNumber: "+55 48 8444-8087",
  email: "",
};

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return settings ?? { id: 1, ...DEFAULT_SETTINGS };
}

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedTeam() {
  return prisma.teamMember.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPublishedPartners() {
  return prisma.partner.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPublishedGallery() {
  return prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getAvailabilityForRange(start: Date, end: Date) {
  return prisma.availabilityDate.findMany({
    where: { date: { gte: start, lte: end } },
  });
}

export async function getFeedPosts(currentUserId?: string) {
  return prisma.post.findMany({
    where: currentUserId
      ? { OR: [{ published: true }, { authorId: currentUserId }] }
      : { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      reactions: true,
      _count: { select: { comments: { where: { published: true } } } },
    },
  });
}

export async function getPostWithComments(postId: string, currentUserId?: string) {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      reactions: true,
      comments: {
        where: currentUserId
          ? { OR: [{ published: true }, { authorId: currentUserId }] }
          : { published: true },
        orderBy: { createdAt: "asc" },
        include: { author: { select: { id: true, name: true, avatarUrl: true } } },
      },
    },
  });
}

export async function getPublishedCouples() {
  return prisma.couple.findMany({
    where: { published: true, showInStories: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedBackstage() {
  return prisma.backstageMedia.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getCoupleBySlug(slug: string) {
  return prisma.couple.findFirst({
    where: { slug, published: true, showInStories: true },
    include: { media: { orderBy: { order: "asc" } } },
  });
}

export async function getUpcomingCouple() {
  return prisma.couple.findFirst({
    where: { published: true, weddingDate: { gte: new Date() } },
    orderBy: { weddingDate: "asc" },
    include: { media: { orderBy: { order: "asc" } } },
  });
}
