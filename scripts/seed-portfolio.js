const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Desativa os destaques antigos (fotos reaproveitadas dos casais do book),
  // já que agora o portfólio tem fotos próprias.
  await prisma.galleryImage.updateMany({
    where: {
      url: {
        in: [
          "/fotos/casal-1/capa-beijo-cachoeira.jpg",
          "/fotos/casal-1/beijo-caverna.jpg",
          "/fotos/casal-3/capa-recepcao.jpg",
          "/fotos/casal-2/capa-buque.jpg",
        ],
      },
    },
    data: { published: false },
  });

  const photos = Array.from({ length: 10 }, (_, i) => ({
    url: `/fotos/portfolio/casamento-${String(i + 1).padStart(2, "0")}.jpg`,
    category: "Casamento",
    order: i,
  }));

  for (const p of photos) {
    const existing = await prisma.galleryImage.findFirst({ where: { url: p.url } });
    if (!existing) {
      await prisma.galleryImage.create({ data: p });
    } else {
      await prisma.galleryImage.update({
        where: { id: existing.id },
        data: { published: true, order: p.order, category: p.category },
      });
    }
  }

  console.log("Portfólio atualizado com as fotos de casamentos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
