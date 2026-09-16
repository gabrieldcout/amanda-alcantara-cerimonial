import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "O que está incluso | Amanda Alcântara Cerimonial",
};

const SERVICE_GROUPS = [
  {
    title: "Planejamento Estratégico",
    items: [
      "Reunião inicial de alinhamento com o casal",
      "Definição do perfil, prioridades e necessidades do casamento",
      "Estruturação do cronograma geral de planejamento",
      "Checklist personalizado de todas as etapas",
      "Acompanhamento periódico da evolução do planejamento",
      "Organização das próximas tarefas e respectivos prazos",
      "Orientação ao casal durante todo o processo de organização",
      "Centralização das informações do evento",
    ],
  },
  {
    title: "Gestão de Fornecedores",
    items: [
      "Indicação e curadoria de fornecedores, conforme necessidade do casal",
      "Auxílio na análise de propostas e orçamentos",
      "Orientação na contratação dos serviços",
      "Conferência dos contratos",
      "Acompanhamento dos fornecedores já contratados",
      "Alinhamento de escopo, horários, entregas e responsabilidades",
      "Centralização da comunicação com os principais fornecedores",
      "Acompanhamento das demandas e pendências de cada fornecedor",
    ],
  },
  {
    title: "Cronograma do Casamento",
    items: [
      "Desenvolvimento do cronograma oficial do grande dia",
      "Definição dos horários de montagem",
      "Cronograma de chegada dos fornecedores",
      "Organização dos horários de preparação dos noivos",
      "Cronograma da cerimônia",
      "Organização do cortejo",
      "Cronograma da recepção",
      "Organização dos momentos especiais",
      "Horários de fotos, alimentação, atrações e protocolos",
      "Cronograma de desmontagem e encerramento",
      "Distribuição do cronograma aos fornecedores e equipe envolvida",
    ],
  },
  {
    title: "Cerimônia",
    items: [
      "Organização do cortejo",
      "Orientação de padrinhos e madrinhas",
      "Organização da entrada dos pais",
      "Organização da entrada dos noivos",
      "Alinhamento com celebrante ou responsável pela cerimônia",
      "Orientação de pajens, daminhas e demais participantes",
      "Organização da ordem das entradas",
      "Coordenação dos momentos especiais da cerimônia",
      "Supervisão da execução do roteiro",
    ],
  },
  {
    title: "Gestão Financeira",
    items: [
      "Organização da planilha financeira do casamento",
      "Controle dos valores contratados",
      "Controle de pagamentos e vencimentos",
      "Acompanhamento de saldos pendentes",
      "Organização dos contratos e compromissos financeiros",
      "Atualização do investimento ao longo do planejamento",
      "Conferência dos valores finais dos fornecedores",
      "Entrega da planilha financeira consolidada ao final do evento",
    ],
  },
  {
    title: "Convidados, Convites e RSVP",
    items: [
      "Orientação sobre organização da lista de convidados",
      "Acompanhamento da gestão dos convites",
      "Controle e acompanhamento das confirmações de presença",
      "RSVP ativo, quando contratado/incluso no pacote",
      "Atualização da lista de convidados",
      "Organização do mapa de convidados",
      "Planejamento estratégico da distribuição das mesas",
      "Apoio na organização de situações específicas envolvendo convidados",
    ],
  },
  {
    title: "Grupos e Comunicação",
    items: [
      "Grupo exclusivo do casal no WhatsApp",
      "Grupo específico para padrinhos e madrinhas",
      "Orientação sobre cortejo, horários e responsabilidades",
      "Comunicação com fornecedores durante o planejamento",
      "Centralização de informações importantes",
      "Acompanhamento das decisões e aprovações do casal",
    ],
  },
  {
    title: "Visita Técnica e Logística",
    items: [
      "Visita técnica ao local do evento",
      "Análise dos acessos e circulação",
      "Avaliação dos espaços destinados à cerimônia e recepção",
      "Análise de logística de montagem e desmontagem",
      "Identificação dos pontos estratégicos para fornecedores",
      "Avaliação de necessidades operacionais do espaço",
      "Reunião de alinhamento com os principais fornecedores no local",
      "Planejamento da dinâmica de chegada e saída das equipes",
    ],
  },
  {
    title: "Pré-Evento",
    items: [
      "Reunião final de alinhamento com o casal",
      "Reunião/alinhamento final com fornecedores",
      "Conferência dos contratos e serviços contratados",
      "Conferência de horários e entregas",
      "Checagem das pendências",
      "Revisão do cronograma",
      "Confirmação de fornecedores",
      "Organização das informações finais do evento",
      "Alinhamento de toda a equipe de cerimonial",
    ],
  },
  {
    title: "Produção e Coordenação do Grande Dia",
    items: [
      "Supervisão da montagem",
      "Recepção e orientação dos fornecedores",
      "Conferência das entregas",
      "Acompanhamento da montagem da decoração",
      "Organização dos espaços conforme planejamento",
      "Supervisão da cerimônia",
      "Coordenação do cortejo",
      "Organização da entrada dos convidados",
      "Acompanhamento da recepção",
      "Coordenação dos horários previstos no cronograma",
      "Supervisão dos momentos especiais",
      "Interface entre casal, família, convidados e fornecedores",
      "Resolução de imprevistos operacionais",
      "Acompanhamento de desmontagem e encerramento",
    ],
  },
  {
    title: "Experiência dos Noivos e Convidados",
    items: [
      "Recepção acolhedora dos convidados",
      "Orientação aos convidados durante o evento",
      "Apoio aos familiares e pessoas previamente indicadas pelo casal",
      "Atenção às necessidades dos noivos durante a celebração",
      "Organização para que os noivos não precisem administrar fornecedores ou questões operacionais",
      "Acompanhamento dos momentos importantes para que o casal possa aproveitar o próprio casamento",
    ],
  },
  {
    title: "Pós-Evento",
    items: [
      "Acompanhamento da desmontagem",
      "Conferência das retiradas e devoluções, quando aplicável",
      "Conferência final dos materiais e itens contratados",
      "Organização das pendências financeiras finais",
      "Consolidação das informações financeiras",
      "Encerramento dos fornecedores e contratos",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <div className="relative overflow-hidden py-20 text-center text-white sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/amanda/direcionando.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-accent-dark/80" />
        <Container className="relative flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Do planejamento à execução
          </span>
          <h1 className="max-w-2xl font-serif-display text-3xl sm:text-4xl">
            O que está incluso na minha assessoria cerimonial
          </h1>
          <p className="max-w-xl text-white/80">
            Uma assessoria pensada para cuidar de cada detalhe antes, durante
            e depois do casamento.
          </p>
        </Container>
      </div>

      <Container className="flex flex-col gap-14 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Escopo completo"
          title="Cuidado com cada etapa do seu casamento"
          subtitle="Desde a primeira reunião até o encerramento do evento, cada detalhe é acompanhado de perto."
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {SERVICE_GROUPS.map((group) => (
            <div
              key={group.title}
              className="flex flex-col gap-5 rounded-2xl bg-accent/25 p-6 sm:p-8"
            >
              <h2 className="font-serif-display text-xl text-foreground">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1 text-accent">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto text-center">
          <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
        </div>
      </Container>
    </>
  );
}
