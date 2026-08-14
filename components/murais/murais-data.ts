import {
  Newspaper,
  CalendarClock,
  Megaphone,
  AlertTriangle,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react"

// ----------------------------------------------------------------------------
// Centros academicos / predios da universidade
// ----------------------------------------------------------------------------
export type Centro = {
  id: string
  nome: string
  sigla: string
  cor: string // classe tailwind de cor (bg)
}

export const CENTROS: Centro[] = [
  { id: "cct", nome: "Centro de Ciencias Tecnologicas", sigla: "CCT", cor: "bg-blue-500" },
  { id: "cch", nome: "Centro de Ciencias Humanas", sigla: "CCH", cor: "bg-violet-500" },
  { id: "ccs", nome: "Centro de Ciencias da Saude", sigla: "CCS", cor: "bg-emerald-500" },
  { id: "cca", nome: "Centro de Ciencias Agrarias", sigla: "CCA", cor: "bg-amber-500" },
  { id: "biblioteca", nome: "Biblioteca Central", sigla: "BC", cor: "bg-rose-500" },
  { id: "reitoria", nome: "Reitoria e Administracao", sigla: "RA", cor: "bg-cyan-500" },
]

export function centroById(id: string) {
  return CENTROS.find((c) => c.id === id)
}

// ----------------------------------------------------------------------------
// Tipos de conteudo
// ----------------------------------------------------------------------------
export type ContentType = "noticia" | "evento" | "aviso" | "alerta" | "galeria"

export const CONTENT_TYPES: Record<
  ContentType,
  { label: string; icon: LucideIcon; text: string; bg: string }
> = {
  noticia: { label: "Noticia", icon: Newspaper, text: "text-blue-600", bg: "bg-blue-500/10" },
  evento: { label: "Evento", icon: CalendarClock, text: "text-violet-600", bg: "bg-violet-500/10" },
  aviso: { label: "Aviso", icon: Megaphone, text: "text-amber-600", bg: "bg-amber-500/10" },
  alerta: { label: "Alerta", icon: AlertTriangle, text: "text-rose-600", bg: "bg-rose-500/10" },
  galeria: { label: "Galeria", icon: ImageIcon, text: "text-emerald-600", bg: "bg-emerald-500/10" },
}

// ----------------------------------------------------------------------------
// Status de conteudo
// ----------------------------------------------------------------------------
export type ContentStatus = "ativo" | "rascunho" | "agendado" | "expirado"

export const CONTENT_STATUS: Record<
  ContentStatus,
  { label: string; className: string }
> = {
  ativo: {
    label: "Ativo",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  rascunho: {
    label: "Rascunho",
    className:
      "border-muted-foreground/30 bg-muted text-muted-foreground",
  },
  agendado: {
    label: "Agendado",
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  expirado: {
    label: "Expirado",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
}

// ----------------------------------------------------------------------------
// Conteudos (postagens)
// ----------------------------------------------------------------------------
export type Conteudo = {
  id: string
  titulo: string
  resumo: string
  tipo: ContentType
  status: ContentStatus
  alvo: string[] // ids de centros
  inicio: string // ISO
  fim: string // ISO
  autor: string
  thumb: string // classe de gradiente para miniatura
}

export const CONTEUDOS: Conteudo[] = [
  {
    id: "c-001",
    titulo: "Semana Academica de Computacao 2026",
    resumo:
      "Palestras, workshops e hackathon reunindo estudantes e empresas parceiras durante toda a semana no CCT.",
    tipo: "evento",
    status: "ativo",
    alvo: ["cct", "biblioteca"],
    inicio: "2026-08-10",
    fim: "2026-08-16",
    autor: "Coord. Computacao",
    thumb: "from-blue-500 to-cyan-400",
  },
  {
    id: "c-002",
    titulo: "Novo horario de funcionamento da Biblioteca Central",
    resumo:
      "A partir desta semana a Biblioteca Central passa a funcionar ate as 23h de segunda a sexta.",
    tipo: "aviso",
    status: "ativo",
    alvo: ["biblioteca", "cct", "cch", "ccs", "cca"],
    inicio: "2026-08-05",
    fim: "2026-09-05",
    autor: "Diretoria Biblioteca",
    thumb: "from-amber-500 to-orange-400",
  },
  {
    id: "c-003",
    titulo: "Manutencao eletrica programada no Bloco B",
    resumo:
      "Interrupcao no fornecimento de energia no Bloco B do CCT no proximo sabado, das 7h as 12h.",
    tipo: "alerta",
    status: "agendado",
    alvo: ["cct"],
    inicio: "2026-08-22",
    fim: "2026-08-22",
    autor: "Infraestrutura",
    thumb: "from-rose-500 to-red-400",
  },
  {
    id: "c-004",
    titulo: "Inscricoes abertas para Monitoria 2026.2",
    resumo:
      "Estudantes interessados em atuar como monitores ja podem se inscrever pelo portal academico.",
    tipo: "noticia",
    status: "ativo",
    alvo: ["cct", "cch", "ccs", "cca"],
    inicio: "2026-08-01",
    fim: "2026-08-30",
    autor: "Pro-Reitoria de Ensino",
    thumb: "from-violet-500 to-purple-400",
  },
  {
    id: "c-005",
    titulo: "Simposio de Saude Coletiva",
    resumo:
      "Evento com pesquisadores convidados debatendo os avancos em saude publica na regiao.",
    tipo: "evento",
    status: "agendado",
    alvo: ["ccs"],
    inicio: "2026-09-12",
    fim: "2026-09-14",
    autor: "Coord. Enfermagem",
    thumb: "from-emerald-500 to-teal-400",
  },
  {
    id: "c-006",
    titulo: "Exposicao fotografica: Campus em Movimento",
    resumo:
      "Galeria de fotos produzidas por estudantes retratando o cotidiano do campus universitario.",
    tipo: "galeria",
    status: "rascunho",
    alvo: ["cch", "biblioteca"],
    inicio: "2026-08-18",
    fim: "2026-09-01",
    autor: "Centro Academico CCH",
    thumb: "from-fuchsia-500 to-pink-400",
  },
  {
    id: "c-007",
    titulo: "Feira de Estagios e Carreiras",
    resumo:
      "Empresas parceiras apresentam oportunidades de estagio e trainee para estudantes de todos os cursos.",
    tipo: "evento",
    status: "ativo",
    alvo: ["cct", "cch", "ccs", "cca", "reitoria"],
    inicio: "2026-08-08",
    fim: "2026-08-20",
    autor: "Nucleo de Carreiras",
    thumb: "from-sky-500 to-blue-400",
  },
  {
    id: "c-008",
    titulo: "Resultado do edital de Iniciacao Cientifica",
    resumo:
      "Confira a lista dos projetos contemplados no edital PIBIC deste ciclo.",
    tipo: "noticia",
    status: "expirado",
    alvo: ["cct", "cca"],
    inicio: "2026-06-01",
    fim: "2026-07-15",
    autor: "Pro-Reitoria de Pesquisa",
    thumb: "from-slate-500 to-gray-400",
  },
  {
    id: "c-009",
    titulo: "Campanha de vacinacao no campus",
    resumo:
      "Ponto de vacinacao montado no hall do CCS oferece imunizacao gratuita para a comunidade academica.",
    tipo: "aviso",
    status: "ativo",
    alvo: ["ccs", "reitoria"],
    inicio: "2026-08-11",
    fim: "2026-08-25",
    autor: "Coord. Saude",
    thumb: "from-green-500 to-emerald-400",
  },
  {
    id: "c-010",
    titulo: "Palestra: Agricultura de precisao e IA",
    resumo:
      "Especialista convidado discute o uso de inteligencia artificial no agronegocio moderno.",
    tipo: "evento",
    status: "rascunho",
    alvo: ["cca"],
    inicio: "2026-09-02",
    fim: "2026-09-02",
    autor: "Coord. Agronomia",
    thumb: "from-lime-500 to-green-400",
  },
  {
    id: "c-011",
    titulo: "Aviso: revisao do calendario academico",
    resumo:
      "O calendario academico foi atualizado. Confira as novas datas de provas e recessos.",
    tipo: "aviso",
    status: "expirado",
    alvo: ["cct", "cch", "ccs", "cca"],
    inicio: "2026-05-10",
    fim: "2026-06-10",
    autor: "Secretaria Academica",
    thumb: "from-yellow-500 to-amber-400",
  },
  {
    id: "c-012",
    titulo: "Torneio interdisciplinar de robotica",
    resumo:
      "Equipes de diferentes cursos competem em desafios de robotica e automacao no ginasio do CCT.",
    tipo: "evento",
    status: "agendado",
    alvo: ["cct"],
    inicio: "2026-10-01",
    fim: "2026-10-03",
    autor: "Liga de Robotica",
    thumb: "from-indigo-500 to-blue-400",
  },
]

// ----------------------------------------------------------------------------
// Telas / dispositivos (TVs)
// ----------------------------------------------------------------------------
export type ScreenStatus = "online" | "offline" | "sincronizando"

export type Tela = {
  id: string
  nome: string
  local: string
  centro: string // id de centro
  ip: string
  status: ScreenStatus
  ultimaSync: string
  resolucao: string
  conteudosAtivos: number
}

export const TELAS: Tela[] = [
  {
    id: "tv-01",
    nome: "Hall Principal",
    local: "Entrada do CCT - Terreo",
    centro: "cct",
    ip: "10.0.14.21",
    status: "online",
    ultimaSync: "ha 2 min",
    resolucao: "1920x1080",
    conteudosAtivos: 5,
  },
  {
    id: "tv-02",
    nome: "Corredor Laboratorios",
    local: "Bloco B - 2o andar",
    centro: "cct",
    ip: "10.0.14.22",
    status: "online",
    ultimaSync: "ha 1 min",
    resolucao: "1920x1080",
    conteudosAtivos: 4,
  },
  {
    id: "tv-03",
    nome: "Saguao Biblioteca",
    local: "Biblioteca Central - Entrada",
    centro: "biblioteca",
    ip: "10.0.09.10",
    status: "online",
    ultimaSync: "ha 5 min",
    resolucao: "3840x2160",
    conteudosAtivos: 6,
  },
  {
    id: "tv-04",
    nome: "Recepcao Saude",
    local: "CCS - Hall de entrada",
    centro: "ccs",
    ip: "10.0.22.05",
    status: "offline",
    ultimaSync: "ha 3 h",
    resolucao: "1920x1080",
    conteudosAtivos: 0,
  },
  {
    id: "tv-05",
    nome: "Atrio Humanas",
    local: "CCH - Convivencia",
    centro: "cch",
    ip: "10.0.31.14",
    status: "sincronizando",
    ultimaSync: "agora",
    resolucao: "1920x1080",
    conteudosAtivos: 3,
  },
  {
    id: "tv-06",
    nome: "Restaurante Universitario",
    local: "RU - Fila principal",
    centro: "reitoria",
    ip: "10.0.02.40",
    status: "online",
    ultimaSync: "ha 4 min",
    resolucao: "1920x1080",
    conteudosAtivos: 7,
  },
  {
    id: "tv-07",
    nome: "Galpao Agrarias",
    local: "CCA - Pavilhao de aulas",
    centro: "cca",
    ip: "10.0.45.03",
    status: "online",
    ultimaSync: "ha 8 min",
    resolucao: "1920x1080",
    conteudosAtivos: 2,
  },
  {
    id: "tv-08",
    nome: "Auditorio Central",
    local: "Reitoria - Foyer",
    centro: "reitoria",
    ip: "10.0.02.41",
    status: "offline",
    ultimaSync: "ha 1 dia",
    resolucao: "3840x2160",
    conteudosAtivos: 0,
  },
]

// ----------------------------------------------------------------------------
// Atividade recente do sistema
// ----------------------------------------------------------------------------
export type Atividade = {
  id: string
  tipo: "publicacao" | "sync" | "tela" | "expiracao" | "edicao"
  titulo: string
  detalhe: string
  tempo: string
}

export const ATIVIDADES: Atividade[] = [
  {
    id: "a-1",
    tipo: "publicacao",
    titulo: "Novo conteudo publicado",
    detalhe: '"Feira de Estagios e Carreiras" foi para 5 centros',
    tempo: "ha 12 min",
  },
  {
    id: "a-2",
    tipo: "tela",
    titulo: "Tela ficou offline",
    detalhe: "Recepcao Saude (CCS) parou de responder",
    tempo: "ha 3 h",
  },
  {
    id: "a-3",
    tipo: "sync",
    titulo: "Sincronizacao concluida",
    detalhe: "8 telas atualizadas com a nova programacao",
    tempo: "ha 4 h",
  },
  {
    id: "a-4",
    tipo: "expiracao",
    titulo: "Conteudo expirado",
    detalhe: '"Resultado do edital de IC" saiu de exibicao',
    tempo: "ontem",
  },
  {
    id: "a-5",
    tipo: "edicao",
    titulo: "Conteudo editado",
    detalhe: 'Laura Mendes ajustou "Campanha de vacinacao"',
    tempo: "ontem",
  },
  {
    id: "a-6",
    tipo: "publicacao",
    titulo: "Rascunho criado",
    detalhe: '"Torneio interdisciplinar de robotica" aguardando revisao',
    tempo: "2 dias atras",
  },
]

// Volume de atualizacoes por centro (para o grafico do dashboard)
export const VOLUME_POR_CENTRO = [
  { centro: "CCT", atualizacoes: 42, ativos: 18 },
  { centro: "CCH", atualizacoes: 28, ativos: 11 },
  { centro: "CCS", atualizacoes: 34, ativos: 14 },
  { centro: "CCA", atualizacoes: 19, ativos: 8 },
  { centro: "BC", atualizacoes: 25, ativos: 10 },
  { centro: "RA", atualizacoes: 31, ativos: 13 },
]

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES) as ContentType[]
export const CONTENT_STATUS_KEYS = Object.keys(CONTENT_STATUS) as ContentStatus[]
