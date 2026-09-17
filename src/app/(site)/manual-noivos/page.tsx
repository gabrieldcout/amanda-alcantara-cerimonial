import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Manual dos Noivos | Amanda Alcântara Cerimonial",
};

const SECTIONS: {
  title: string;
  image: string;
  alt: string;
  paragraphs: string[];
  reverse?: boolean;
}[] = [
  {
    title: "Lista de Convidados",
    image: "/fotos/manual-noivos/casal-campo.jpg",
    alt: "Casal caminhando entre convidados",
    paragraphs: [
      "A elaboração da lista de convidados é uma das etapas mais importantes do planejamento do casamento, pois está diretamente relacionada ao orçamento, à escolha do local e à dinâmica do evento. Para facilitar a organização, recomenda-se dividir os convidados por categorias, como família da noiva, família do noivo, amigos, colegas de trabalho e convidados sociais.",
      "Essa segmentação ajuda o casal a visualizar com mais clareza o número total de pessoas e ajustar a lista conforme as prioridades e o investimento disponível. É importante considerar uma média de 10% a 15% de ausência, fator comum em eventos desse porte.",
      "Construir a lista com atenção, diálogo e alinhamento entre o casal evita desconfortos ao longo do processo e garante que o casamento seja celebrado ao lado das pessoas que realmente fazem parte da história e da trajetória dos noivos.",
    ],
  },
  {
    title: "Planejamento do Orçamento",
    image: "/fotos/manual-noivos/aneis-detalhe.jpg",
    alt: "Detalhe dos preparativos do casamento",
    reverse: true,
    paragraphs: [
      "A definição e a correta divisão do budget são etapas fundamentais para um planejamento equilibrado e estratégico. Organizar o investimento por categorias permite mais clareza sobre as prioridades, evita gastos impulsivos e garante qualidade nos serviços mais relevantes para a experiência do evento.",
      "De forma geral, recomenda-se que a maior parte do orçamento seja destinada ao espaço e à gastronomia, que juntos costumam representar cerca de 35% a 40% do valor total. Em seguida, decoração, fotografia e filmagem também merecem atenção especial.",
      "É recomendável ainda reservar uma margem de aproximadamente 5% do orçamento total para imprevistos, garantindo maior segurança e tranquilidade durante todo o processo de organização.",
    ],
  },
  {
    title: "Escolha do Local",
    image: "/fotos/manual-noivos/casa-eventos.jpg",
    alt: "Espaço de casamento ao ar livre",
    paragraphs: [
      "Na escolha do local, é fundamental considerar fatores estratégicos que impactam diretamente a experiência do evento: a capacidade do espaço, a estrutura oferecida e a existência de um plano B para eventos ao ar livre, assegurando tranquilidade em caso de mudanças climáticas.",
      "A logística de acesso (localização, estacionamento e facilidade de deslocamento) contribui para a comodidade dos convidados, assim como os horários permitidos para montagem, realização da festa e encerramento.",
      "Por se tratar de um dos itens mais disputados no planejamento, o ideal é realizar a reserva do espaço com antecedência de 12 a 18 meses, garantindo maior disponibilidade de datas e melhores possibilidades de negociação.",
    ],
  },
  {
    title: "Fornecedores Essenciais",
    image: "/fotos/sobre-mim/mesa-posta.jpg",
    alt: "Mesa posta com detalhes de decoração",
    reverse: true,
    paragraphs: [
      "A escolha dos fornecedores é uma das etapas mais decisivas do planejamento, pois são eles os responsáveis por transformar o projeto idealizado em uma experiência real e memorável. Entre os essenciais estão a assessoria cerimonial, o espaço e o buffet.",
      "A decoração contribui para a identidade visual do casamento, enquanto fotografia e filmagem registram momentos únicos. Também fazem parte desse conjunto a música da cerimônia, o DJ ou banda, o bar, os doces e o bolo, a papelaria personalizada e os serviços de beleza.",
      "A contratação estratégica desses fornecedores, sempre com o acompanhamento da assessoria, contribui para um planejamento organizado, coerente com o orçamento e alinhado às expectativas do casal.",
    ],
  },
  {
    title: "O Roteiro do Grande Dia",
    image: "/fotos/manual-noivos/casal-guardachuva.jpg",
    alt: "Casal ao entardecer",
    paragraphs: [
      "O roteiro do grande dia é responsável por organizar a sequência dos acontecimentos e garantir que o casamento aconteça de forma fluida, leve e bem coordenada, permitindo que os noivos aproveitem cada momento com tranquilidade.",
      "O dia geralmente se inicia com o making of dos noivos, seguido da chegada dos convidados e do início da cerimônia, o ponto mais emocionante da celebração. Depois vêm as fotos protocolares, o welcome drink, a entrada oficial no salão, o brinde, o jantar e a abertura da pista de dança.",
      "Este roteiro serve como uma referência base, podendo e devendo ser personalizado de acordo com o perfil, os desejos e o estilo de cada casal.",
    ],
  },
  {
    title: "Guia do Making Of",
    image: "/fotos/manual-noivos/buque-detalhe.jpg",
    alt: "Detalhe do buquê da noiva",
    reverse: true,
    paragraphs: [
      "O making of é um dos momentos mais especiais do dia do casamento. Para a noiva, é importante escolher um local bem iluminado, organizado e confortável, deixar vestido e acessórios previamente separados e preparar uma playlist relaxante que ajude a criar um clima leve.",
      "Também é recomendável utilizar um robe elegante, garantir lanches leves e hidratação, e permitir momentos de silêncio e conexão para vivenciar esse instante com presença, evitando o excesso de pessoas no ambiente.",
      "Para o noivo, escolher um ambiente confortável, conferir o traje e os acessórios com antecedência e definir claramente os horários ajuda a prevenir imprevistos. Mais do que cumprir uma etapa do cronograma, é um momento para respirar e se conectar com a importância do dia.",
    ],
  },
];

export default function ManualNoivosPage() {
  return (
    <>
      <div className="relative overflow-hidden py-24 text-center text-white sm:py-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/manual-noivos/casal-por-do-sol.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <Container className="relative flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Guia exclusivo
          </span>
          <h1 className="max-w-2xl font-serif-display text-4xl sm:text-5xl">
            Manual dos Noivos
          </h1>
          <p className="max-w-xl text-white/85">
            Um guia exclusivo de planejamento do casamento, com tudo o que
            você precisa saber para viver essa jornada com leveza.
          </p>
        </Container>
      </div>

      <Container className="flex flex-col gap-20 py-20 sm:py-28">
        {SECTIONS.map((section) => (
          <section
            key={section.title}
            className={`grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10 lg:p-14 ${
              section.reverse ? "sm:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={section.image}
              alt={section.alt}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-4">
              <h2 className="font-serif-display text-2xl text-foreground sm:text-3xl">
                {section.title}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section className="relative overflow-hidden rounded-2xl py-20 text-center text-white sm:py-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/manual-noivos/casal-pb-beijo.jpg"
            alt="Casal se beijando"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/55" />
          <Container className="relative flex flex-col items-center gap-5">
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl">
              O casamento não é apenas sobre a celebração de um dia especial,
              mas sobre o significado de tudo o que ele representa: a união
              de duas histórias, o início de novos planos e a construção de
              uma vida em conjunto.
            </p>
            <p className="max-w-xl text-sm text-white/80">
              Confiem nas escolhas que fizeram, aproveitem os momentos,
              permitam-se sentir e celebrar intensamente. No grande dia,
              deixem as preocupações de lado e estejam presentes.
            </p>
          </Container>
        </section>

        <div className="mx-auto text-center">
          <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
        </div>
      </Container>
    </>
  );
}
