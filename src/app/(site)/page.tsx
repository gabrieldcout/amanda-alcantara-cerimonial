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

const DESTAQUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 21s-6.7-4.35-9.33-8.2C.87 10.2 1.4 6.9 4.1 5.2c2.2-1.4 4.9-.8 6.5 1.1L12 7.9l1.4-1.6c1.6-1.9 4.3-2.5 6.5-1.1 2.7 1.7 3.23 5 1.43 7.6C18.7 16.65 12 21 12 21Z" />
      </svg>
    ),
    stat: "+20",
    label: "Casamentos realizados",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 14l10 5 10-5-10-5Z" />
      </svg>
    ),
    stat: "100%",
    label: "Atendimento personalizado",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 11Zm0 2c-2.67 0-8 1.34-8 4v3h9.28A5.98 5.98 0 0 1 9 16c0-1.5.53-2.88 1.4-4A11.6 11.6 0 0 0 8 13Zm8 0c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Z" />
      </svg>
    ),
    stat: "Equipe própria",
    label: "Presente no grande dia",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 8v10H5V10Zm-9.6 7.6 4.9-4.9-1.4-1.4-3.5 3.5-1.5-1.5-1.4 1.4Z" />
      </svg>
    ),
    stat: "Do início ao fim",
    label: "Acompanhamento completo",
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
            titleClassName="text-black font-bold"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ASSESSORIA_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-serif-display text-lg font-bold text-black">
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

      {/* Destaques */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DESTAQUES.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                  {item.icon}
                </span>
                <span className="font-serif-display text-2xl font-bold text-black">
                  {item.stat}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
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
