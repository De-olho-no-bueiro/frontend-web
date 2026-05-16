export interface InstallationGuideItem {
  id: 'android' | 'ios-pwa';
  platformLabel: string;
  title: string;
  summary: string;
  steps: string[];
  note?: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface SupportNote {
  title: string;
  description: string;
}

export interface HowToUseTocItem {
  id: 'instalacao' | 'funcionalidades-app' | 'funcionalidades-dashboard';
  label: string;
}

export const howToUseTocItems: HowToUseTocItem[] = [
  {
    id: 'instalacao',
    label: 'Guia de instalacao',
  },
  {
    id: 'funcionalidades-app',
    label: 'Aplicativo mobile',
  },
  {
    id: 'funcionalidades-dashboard',
    label: 'Dashboard web',
  },
];

export const installationGuideItems: InstallationGuideItem[] = [
  {
    id: 'android',
    platformLabel: 'Android',
    title: 'Instale o APK com permissao segura',
    summary: 'Baixe o arquivo, permita a instalacao quando o sistema solicitar e conclua a configuracao inicial do aplicativo.',
    steps: [
      'Abra o link de download enviado pela equipe ou disponibilizado na plataforma e toque para baixar o arquivo APK.',
      'Quando o Android avisar sobre instalacao fora da loja, permita a instalacao para o navegador ou gerenciador de arquivos usado no download.',
      'Acesse a pasta de downloads, toque no APK e confirme a instalacao do aplicativo.',
      'Abra o app apos a instalacao e aceite as permissoes de localizacao e notificacoes para registrar ocorrencias com contexto completo.',
      'Conclua o primeiro acesso verificando o mapa, os filtros e a opcao de novo relato antes de usar em campo.',
    ],
    note: 'Se o aparelho bloquear a instalacao, revise a configuracao de "Instalar apps desconhecidos" apenas para o app que fez o download.',
  },
  {
    id: 'ios-pwa',
    platformLabel: 'iOS PWA',
    title: 'Adicione o app a tela inicial pelo Safari',
    summary: 'No iPhone, o acesso funciona como app web instalado a partir do Safari, sem precisar de APK ou App Store.',
    steps: [
      'Abra o endereco da aplicacao no Safari. Outros navegadores do iOS nao exibem o fluxo completo de instalacao.',
      'Com a pagina carregada, toque no botao Compartilhar na barra inferior do Safari.',
      'Deslize a lista de acoes e escolha "Adicionar a Tela de Inicio".',
      'Confirme o nome do atalho e toque em "Adicionar" para criar o icone na tela inicial.',
      'Abra o atalho criado para usar a experiencia em tela cheia e manter o acesso rapido ao mapa e aos relatos.',
    ],
    note: 'Para melhor funcionamento, permita notificacoes e localizacao quando o navegador ou o atalho solicitar acesso.',
  },
];

export const installationSupportNotes: SupportNote[] = [
  {
    title: 'Localizacao',
    description: 'Permite posicionar ocorrencias com mais precisao e centralizar o mapa na regiao do usuario.',
  },
  {
    title: 'Notificacoes',
    description: 'Mantem o usuario informado sobre alertas, atualizacoes de areas monitoradas e comunicados operacionais.',
  },
  {
    title: 'Conectividade',
    description: 'Sincroniza relatos, filtros e indicadores publicos sempre que houver rede disponivel.',
  },
];

export const mobileAppFeatures: FeatureCard[] = [
  {
    id: 'mapa',
    title: 'Mapa operacional no celular',
    description: 'A tela principal entrega uma leitura rapida do territorio para quem precisa circular, consultar ou reportar ocorrencias.',
    bullets: [
      'Visualizacao de alagamentos e bueiros em um mesmo mapa.',
      'Acesso imediato a busca, filtros e leitura por bairro.',
      'Atualizacao continua da base publica conforme novos registros entram.',
    ],
  },
  {
    id: 'relato',
    title: 'Registro guiado de ocorrencias',
    description: 'O fluxo de envio foi pensado para reduzir atrito e aumentar a qualidade das informacoes coletadas em campo.',
    bullets: [
      'Selecao do tipo de problema observado.',
      'Inclusao de localizacao e detalhes relevantes para triagem.',
      'Envio de dados que alimentam a leitura publica e o painel web.',
    ],
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento e resposta',
    description: 'Depois da instalacao, o app vira um ponto de consulta recorrente para acompanhar mudancas no territorio.',
    bullets: [
      'Leitura rapida de pontos criticos antes de sair.',
      'Base para compartilhar informacoes com a comunidade e equipes.',
      'Uso em campo com foco em velocidade, clareza e contexto.',
    ],
  },
];

export const dashboardFeatures: FeatureCard[] = [
  {
    id: 'visao-geral',
    title: 'Visao geral do territorio',
    description: 'O dashboard concentra mapa, indicadores e leitura de ocorrencias em uma mesma tela operacional.',
    bullets: [
      'Mapa com foco em ocorrencias publicas de alagamento e bueiros.',
      'Cards de resumo para volume total, recortes por tipo e gravidade.',
      'Leitura da ultima atualizacao e do tamanho da base ativa.',
    ],
  },
  {
    id: 'filtros',
    title: 'Filtros e recortes analiticos',
    description: 'A navegacao suporta exploracao rapida por periodo, tipo, nivel e bairro, sem depender de consultas externas.',
    bullets: [
      'Filtro por ano e mes para comparacoes sazonais.',
      'Busca textual e selecao por bairro.',
      'Recorte combinado para cards, graficos, mapa e tabela.',
    ],
  },
  {
    id: 'gestao',
    title: 'Gestao e exportacao',
    description: 'A camada de analise ajuda equipes a transformar observacao em acompanhamento tecnico e compartilhamento.',
    bullets: [
      'Alternancia entre visualizacao em cards e tabela.',
      'Ordenacao e paginacao para leitura detalhada.',
      'Exportacao CSV das linhas filtradas do painel.',
    ],
  },
];
