const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ITEMS = [
  {
    type: "photo",
    url: "/fotos/amanda/com-noiva-rosas.jpg",
    caption: "Antes da cerimônia · Um brinde entre risadas",
    order: 0,
  },
  {
    type: "photo",
    url: "/fotos/sobre-mim/amanda-tablet.jpg",
    caption: "Nos bastidores · Ajustando cada detalhe",
    order: 1,
  },
  {
    type: "photo",
    url: "/fotos/sobre-mim/amanda-planejamento.jpg",
    caption: "Reunião de planejamento",
    order: 2,
  },
  {
    type: "photo",
    url: "/fotos/casal-3/com-amanda-noite.jpg",
    caption: "No grande dia · Ao lado da noiva",
    order: 3,
  },
  {
    type: "photo",
    url: "/fotos/amanda/direcionando.jpg",
    caption: "Direcionando cada momento",
    order: 4,
  },
];

async function main() {
  for (const item of ITEMS) {
    const existing = await prisma.backstageMedia.findFirst({ where: { url: item.url } });
    if (!existing) {
      await prisma.backstageMedia.create({ data: item });
    }
  }
  console.log("Bastidores populados com", ITEMS.length, "itens.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
