type Topic = {
  title: string;
  items: string[];
};

const TOPICS: Topic[] = [
  {
    title: "Pedidos de orçamento",
    items: [
      'Toda vez que alguém preenche o formulário de orçamento no site, o pedido aparece em "Pedidos de orçamento".',
      "Abra um pedido pra ver os dados de contato e a data pretendida do evento.",
      "Você pode marcar o status do pedido (ex: novo, em conversa, fechado) pra organizar o que já foi respondido.",
    ],
  },
  {
    title: "Agenda (datas disponíveis, reservadas e indisponíveis)",
    items: [
      "Clique numa data no calendário pra selecioná-la.",
      'Escolha um status: "Disponível", "Indisponível" ou "Reservado" — o calendário do site (na página de orçamento) mostra isso automaticamente pros visitantes.',
      "Você pode escrever uma observação na data (ex: nome do casal que reservou) — isso é só pra você, não aparece pro público.",
      'Se uma data marcada não vale mais (ex: cliente desistiu, ou você marcou errado), selecione a data e clique em "Remover marcação (voltar a disponível)". Isso apaga a marcação e a data volta a ficar livre no site.',
    ],
  },
  {
    title: "Checklist dos noivos",
    items: [
      'O checklist é ligado ao cadastro do casamento: primeiro cadastre o casal em "Histórias reais" com a data do casamento preenchida. Sem a data, o casal não aparece em "Checklist dos noivos".',
      'Assim que o casamento estiver cadastrado, ele aparece em "Checklist dos noivos" com nomes e data — é só clicar em "Fazer checklist". (Também dá pra fazer pela página do casal em "Histórias reais".)',
      'Nomes e data do checklist vêm do cadastro do casal: se mudar a data em "Histórias reais", os prazos do checklist se ajustam sozinhos.',
      "O checklist já vem pronto com todas as etapas do cronograma de contratação, divididas por fase (12 a 18 meses antes, 10 a 12 meses antes etc.).",
      'Cada casamento é de um jeito: na reunião de briefing, use "Adicionar item" no topo do checklist (ex: "Contratar tenda"), escolha a fase e aperte Enter — o item aparece na hora pro casal. Se preferir montar tudo do zero, desmarque "Começar com o cronograma padrão" ao criar o checklist.',
      'Em qualquer item, clique em "Editar" pra mudar o texto, trocar de fase ou marcar como "★ Prioridade" (os itens prioritários aparecem primeiro e em destaque pro casal). Itens que não fazem sentido pro casamento podem ser apagados no botão vermelho "Excluir", à direita de cada item.',
      'Copie o link ou clique em "Enviar pelo WhatsApp" — os noivos abrem no celular, sem precisar criar conta, e vão marcando o que já fizeram.',
      "Com a data preenchida, cada fase mostra o prazo ideal e fica marcada como \"Atrasada\" se passar do prazo com itens pendentes.",
      "O casal pode escrever anotações em cada item (fornecedor, valor, contato) e adicionar itens próprios. Você também pode adicionar, marcar ou remover itens pelo painel.",
      'Se alguma etapa não fizer sentido pro casamento, o casal (ou você) pode marcar "Não se aplica": o item fica riscado e sai da conta do progresso. No painel aparece "marcado pelo casal", e dá pra desfazer em "Voltar a valer".',
      "O casal só consegue excluir os itens que ele mesmo adicionou — os que você colocou, só você exclui.",
      "Na lista você vê de relance o % concluído, quantos itens estão atrasados e quando foi o último check de cada casal.",
      'O link é secreto, mas quem tiver ele consegue mexer. Se ele cair na mão errada, use "Gerar novo link" e mande o novo pro casal.',
    ],
  },
  {
    title: "Histórias reais (casais) e o \"Próximo casamento\" da home",
    items: [
      'Cadastrar um casal NÃO coloca ele na página "Histórias reais" do site. Ele só aparece lá (com página própria em "/casais/nome-do-casal", fotos, vídeos e história) se a caixinha "Mostrar em Histórias reais" estiver marcada.',
      'Pra casais que só vão aparecer no "Próximo casamento" da home, deixe "Mostrar em Histórias reais" desmarcada.',
      "A página inicial do site mostra um contador regressivo pro próximo casamento — isso é automático, você não precisa mexer em nada além de cadastrar o casal certo.",
      'Regra: o site pega o casal "Publicado" com a data de casamento mais próxima no futuro. Assim que essa data passar, o próximo casal com data futura assume o lugar sozinho.',
      'Sempre que fechar um casamento novo (ou quiser que ele apareça na contagem), cadastre o casal aqui com a "Data do casamento" preenchida e a caixinha "Publicado no site" marcada.',
      'Se ninguém tiver uma data futura publicada, a seção "Próximo casamento" simplesmente não aparece na home — sem erro, sem quebrar nada.',
      'Na lista de casais, o que está aparecendo na home agora vem marcado com a etiqueta "Na home agora".',
      "Depois de criar o casal, entre na página dele pra adicionar fotos e vídeos (YouTube, Vimeo ou link direto de arquivo de vídeo).",
    ],
  },
  {
    title: "Bastidores",
    items: [
      "Fotos e vídeos de bastidores dos eventos, mostrados numa galeria separada do portfólio.",
      "Funciona como a Galeria: adicione o link da imagem ou vídeo, uma legenda opcional e a ordem de exibição.",
    ],
  },
  {
    title: "Comunidade Noivas AA",
    items: [
      "Qualquer visitante pode criar uma conta em /comunidade/cadastro e postar, comentar e reagir aos posts de outras noivas.",
      'Posts e comentários novos ficam pendentes até você aprovar em "Comunidade · Posts" e "Comunidade · Comentários". Enquanto isso, só a autora vê o próprio conteúdo (marcado como "aguardando aprovação").',
      "Reações (❤️ 🎉 🥰 👏) são liberadas na hora, sem precisar de aprovação.",
      'Em "Comunidade · Usuárias" você pode bloquear ou excluir contas — use pra remover contas de teste/demo ou alguém que esteja usando de forma inadequada.',
    ],
  },
  {
    title: "Depoimentos",
    items: [
      "Depoimentos de clientes que aparecem na página /depoimentos e em destaques pelo site.",
      "Preencha nome, tipo de evento, o texto do depoimento e a nota (estrelas). Foto é opcional.",
      'Use "Publicado" pra controlar o que já pode aparecer no site — dá pra deixar depoimentos em rascunho antes de revisar.',
    ],
  },
  {
    title: "Equipe",
    items: [
      "Quem aparece na página /equipe: nome, cargo, uma bio curta e foto (opcional).",
      'A ordem de exibição controla quem aparece primeiro — número menor aparece antes.',
    ],
  },
  {
    title: "Parcerias",
    items: [
      "Fornecedores parceiros (fotografia, buffet, decoração etc.) que aparecem na página /servicos ou onde o site listar parcerias.",
      "Preencha nome, categoria, logo (URL da imagem) e o site do parceiro, se tiver.",
    ],
  },
  {
    title: "Galeria / Portfólio",
    items: [
      "Fotos que aparecem na página /portfolio.",
      "Cole a URL de uma imagem já hospedada (veja a seção \"Como coloco uma foto?\" abaixo) e defina a ordem de exibição.",
    ],
  },
  {
    title: "Configurações do site",
    items: [
      "Textos gerais do site: título do hero, texto sobre você, e os contatos (Instagram, TikTok, WhatsApp, e-mail).",
      "Mudar esses campos atualiza o site inteiro na hora — não precisa mexer em código.",
    ],
  },
  {
    title: "Como eu coloco uma foto?",
    items: [
      "As imagens do painel são cadastradas por link (URL), não por upload direto.",
      "Suba a foto num serviço gratuito de hospedagem de imagem (ex: imgbb.com ou cloudinary.com), copie o link direto da imagem (geralmente termina em .jpg, .png ou .jpeg) e cole no campo de foto/capa/logo do painel.",
    ],
  },
  {
    title: "Login e senha",
    items: [
      "O painel é de uso exclusivo seu — só existe um login (o e-mail e senha cadastrados).",
      "Se precisar trocar a senha, peça pro Gabriel gerar uma nova — é um processo rápido, mas precisa mexer num arquivo de configuração do site.",
      'Pra sair do painel, use o botão "Sair" no final do menu lateral.',
    ],
  },
];

export default function AdminTutorialPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Tutorial do painel
        </h1>
        <p className="text-sm text-muted-foreground">
          Um guia rápido de cada parte do painel. Clique em cada tópico pra
          abrir.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {TOPICS.map((topic) => (
          <details
            key={topic.title}
            className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {topic.title}
                <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
              {topic.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5 text-sm text-foreground">
        <p className="font-medium">Ficou com dúvida em alguma parte?</p>
        <p className="mt-1 text-muted-foreground">
          Chama o Gabriel — qualquer ajuste que precise mexer em código (nova
          seção, mudança de layout, etc.) passa por ele.
        </p>
      </div>
    </div>
  );
}
