import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ASSESSORIA_CARDS = [
  {
    title: "O início do planejamento juntos",
    text: "Atendimento personalizado para entender o perfil do casal, seus desejos, sonhos, orçamento e estilo de evento. Apresentação da proposta de trabalho e cronograma de atuação com checklist mês a mês, além de acesso a plataforma, grupo no WhatsApp e planilha de organização financeira.",
  },
  {
    title: "Curadoria de fornecedores",
    text: "Indicação baseada em experiência, sensibilidade e entendimento profundo do estilo, orçamento e personalidade dos noivos. Cada profissional indicado já foi previamente validado. Acompanho visitas técnicas e degustações, e negocio sempre buscando o melhor custo-benefício.",
  },
  {
    title: "Controle financeiro",
    text: "Planilha personalizada e exclusiva para o casal, com controle de prazos, orçamentos e status de cada contratação. Lembretes para pagamentos, provas e ensaios, além de análise de contratos e assinatura digital de todos os documentos do evento.",
  },
  {
    title: "Durante o casamento",
    text: "Suporte completo ao casal, centralizando informações e acompanhando cada etapa. Gestão de convites e RSVP, mapeamento estratégico das mesas, cronograma oficial do grande dia e grupo exclusivo no WhatsApp para alinhar cortejo, padrinhos e madrinhas.",
  },
  {
    title: "No pós-evento",
    text: "Acompanho a desmontagem até o término do evento, faço a conferência final com fornecedores, auxilio no feedback e em questões pontuais do pós-casamento, e entrego um resumo completo com o cronograma executado e a planilha financeira consolidada.",
  },
];

const VOCE_SE_IDENTIFICA = [
  "Você nunca organizou um evento desse porte antes e está com medo de esquecer algo importante ou cometer erros por falta de experiência.",
  "Você trabalha, estuda ou tem a agenda cheia e falta tempo para cuidar de tudo com calma.",
  "Você não sabe por onde começar, local, buffet, decoração, DJ, convite, cerimonial, e só de pensar dá um nó na cabeça.",
  "Você quer curtir o seu evento sem preocupações e, no dia da festa, viver cada momento sem se preocupar com cronograma, fornecedores ou imprevistos.",
  "Você valoriza um evento bem organizado, bonito, com emoção, e sonha com uma celebração fluida, elegante, sem correria.",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/sobre-mim/por-do-sol-caminhando.jpg"
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.55] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/35 to-background" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Assessoria Cerimonial
          </span>
          <h1 className="max-w-3xl font-serif-display text-4xl leading-tight text-foreground sm:text-6xl">
            Amanda Alcântara
          </h1>
          <p className="font-serif-display text-xl italic text-accent-dark sm:text-2xl">
            bem mais que uma assessoria
          </p>
          <p className="max-w-xl text-lg text-foreground">
            Experiências bem construídas não acontecem por acaso. Elas
            nascem da sensibilidade em perceber o que realmente importa, da
            escuta atenta que acolhe desejos, histórias e expectativas, e de
            escolhas feitas com intenção em cada detalhe.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
            <ButtonLink href="/casais" variant="outline">
              Ver histórias reais
            </ButtonLink>
          </div>
        </Container>
      </section>


      {/* Sobre mim */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10 lg:p-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/sobre-mim/amanda-poltrona.jpg"
              alt="Amanda Alcântara"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="Sobre mim" title="Uma paixão que veio de longe" align="left" />
              <p className="text-muted-foreground leading-relaxed">
                Sou carioca, esposa do Lucas, mamãe da Ayla e uma mulher
                apaixonada por celebrar a vida. Desde pequena, o encantamento
                por festas e comemorações já fazia parte de quem eu sou.
                Organizar festas e criar momentos especiais sempre foi natural
                para mim, mas meu caminho inicial foi guiado por outra paixão:
                o Direito.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Graduada na área e com trajetória sólida em grandes empresas,
                como L&apos;Oréal Brasil e AMBEV, desenvolvi habilidades como
                planejamento, organização, liderança e atenção aos detalhes,
                que hoje são pilares no meu trabalho com eventos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hoje minha trajetória combina formação em Direito, MBA em
                Marketing e especialização técnica em eventos, trazendo uma
                abordagem estratégica, criativa e detalhista para cada evento
                que eu assessoro.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* O meu compromisso */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-accent/25 p-6 sm:grid-cols-2 sm:items-center sm:p-10 lg:p-14">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fotos/sobre-mim/casal-cerimonia-1.jpg"
                alt="Casal no dia do casamento"
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fotos/sobre-mim/casal-cerimonia-2.jpg"
                alt="Casal se abraçando ao entardecer"
                className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="O meu compromisso"
                title="Que vocês sejam protagonistas da própria história"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed">
                É transformar o planejamento em uma experiência tranquila e
                inspiradora, onde o casal se sinta acolhido, confiante e
                verdadeiramente protagonista da própria história. Com uma
                assessoria completa, integro todos os aspectos do evento:
                planejamento, curadoria de fornecedores, gestão de prazos e
                contratos, construção de cronogramas e coordenação total do
                grande dia, garantindo harmonia entre o sonho e a execução.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O resultado é um casamento que reflete quem vocês são:
                autêntico, memorável e feliz.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sobre a minha assessoria */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
            <SectionHeading
              eyebrow="Sobre a minha assessoria"
              title="Acompanhamento personalizado em cada etapa"
              subtitle="Cada reunião, cada escolha e cada decisão são conduzidas de forma estratégica e sensível, respeitando a essência e os desejos de vocês. Mais do que organizar, meu papel é orientar, simplificar processos e trazer segurança em cada passo."
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { src: "/fotos/sobre-mim/mesa-posta.jpg", alt: "Mesa posta com detalhes" },
                { src: "/fotos/sobre-mim/criancas-girassois.jpg", alt: "Pajens com girassóis" },
                { src: "/fotos/sobre-mim/ajustando-vestido-janela.jpg", alt: "Ajustando o vestido da noiva" },
                { src: "/fotos/sobre-mim/noiva-madrinha-noite.jpg", alt: "Noiva e madrinha à noite" },
              ].map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Como te acompanho */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Como te acompanho"
            title="Do primeiro encontro ao pós-evento"
            titleClassName="text-accent"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ASSESSORIA_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-serif-display text-lg text-accent-dark">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-accent-dark">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Isso é pra você se */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Organizar um casamento"
            title="Vai muito além de escolher fornecedores e definir datas"
            subtitle="Envolve planejamento, logística, controle de prazos, gestão de imprevistos e, claro, emoção. Se vocês se identificam com alguns destes pontos, é sinal de que a assessoria cerimonial é essencial:"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {VOCE_SE_IDENTIFICA.map((text) => (
              <div
                key={text}
                className="flex gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <span className="mt-1 text-accent">•</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-border py-20 text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/sobre-mim/celebracao-confete.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-accent-dark/85" />
        <Container className="relative flex flex-col items-center gap-6">
          <h2 className="font-serif-display text-3xl sm:text-4xl">
            Vamos planejar o seu grande dia?
          </h2>
          <p className="max-w-lg text-white/85">
            Conte um pouco sobre o seu evento e receba um orçamento
            personalizado.
          </p>
          <ButtonLink href="/orcamento" variant="outline" className="border-white text-white hover:bg-white/10">
            Solicitar orçamento
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
