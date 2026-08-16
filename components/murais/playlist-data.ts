import {
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Centros & Predios (hierarchical locations)
// ---------------------------------------------------------------------------
export interface Centro {
  id: string
  nome: string
  sigla: string
  cor: string
}

export interface Predio {
  id: string
  nome: string
  centroId: string
}

export const CENTROS: Centro[] = [
  { id: "cct", nome: "Centro de Tecnologia", sigla: "CCT", cor: "bg-blue-500" },
  { id: "cch", nome: "Centro de Ciencias Humanas", sigla: "CCH", cor: "bg-violet-500" },
  { id: "ccs", nome: "Centro de Ciencias da Saude", sigla: "CCS", cor: "bg-emerald-500" },
  { id: "cca", nome: "Centro de Ciencias Agrarias", sigla: "CCA", cor: "bg-amber-500" },
  { id: "biblioteca", nome: "Biblioteca Central", sigla: "BC", cor: "bg-rose-500" },
  { id: "reitoria", nome: "Reitoria e Administracao", sigla: "RA", cor: "bg-cyan-500" },
]

export const PREDIOS: Predio[] = [
  { id: "p-cct-1", nome: "Bloco A", centroId: "cct" },
  { id: "p-cct-2", nome: "Bloco B", centroId: "cct" },
  { id: "p-cct-3", nome: "Predio 7", centroId: "cct" },
  { id: "p-cct-4", nome: "Anexo I", centroId: "cct" },
  { id: "p-cch-1", nome: "Bloco Norte", centroId: "cch" },
  { id: "p-cch-2", nome: "Bloco Sul", centroId: "cch" },
  { id: "p-cch-3", nome: "Casa da Cultura", centroId: "cch" },
  { id: "p-ccs-1", nome: "Predio Principal", centroId: "ccs" },
  { id: "p-ccs-2", nome: "Anexo Clinico", centroId: "ccs" },
  { id: "p-ccs-3", nome: "Lab de Analises", centroId: "ccs" },
  { id: "p-cca-1", nome: "Predio Central", centroId: "cca" },
  { id: "p-cca-2", nome: "Estacao Experimental", centroId: "cca" },
  { id: "p-bib-1", nome: "Edificio Principal", centroId: "biblioteca" },
  { id: "p-bib-2", nome: "Anexo Periodicos", centroId: "biblioteca" },
  { id: "p-rei-1", nome: "Predio da Reitoria", centroId: "reitoria" },
  { id: "p-rei-2", nome: "Anexo Administrativo", centroId: "reitoria" },
  { id: "p-rei-3", nome: "Auditorio Central", centroId: "reitoria" },
]

export function prediosByCentro(centroId: string): Predio[] {
  return PREDIOS.filter((p) => p.centroId === centroId)
}

export function centroById(id: string): Centro | undefined {
  return CENTROS.find((c) => c.id === id)
}

export function predioById(id: string): Predio | undefined {
  return PREDIOS.find((p) => p.id === id)
}

// ---------------------------------------------------------------------------
// Media types
// ---------------------------------------------------------------------------
export type MediaType = "imagem" | "video" | "link"

export const MEDIA_TYPES: Record<
  MediaType,
  { label: string; icon: LucideIcon; badgeClass: string }
> = {
  imagem: {
    label: "Imagem",
    icon: ImageIcon,
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  video: {
    label: "Video",
    icon: Video,
    badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  link: {
    label: "Link",
    icon: LinkIcon,
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
}

// ---------------------------------------------------------------------------
// Content / Playlist items
// ---------------------------------------------------------------------------
export interface ContentItem {
  id: string
  titulo: string
  tipo: MediaType
  thumb: string
  duracaoReal: number
}

export interface PlaylistItem extends ContentItem {
  segundos: number
}

export const ACERVO_MOCK: ContentItem[] = [
  { id: "m-1", titulo: "Bem-vindo ao Campus", tipo: "imagem", thumb: "from-blue-500 to-cyan-400", duracaoReal: 8 },
  { id: "m-2", titulo: "Video Institucional 2026", tipo: "video", thumb: "from-violet-500 to-purple-400", duracaoReal: 45 },
  { id: "m-3", titulo: "Calendario Academico", tipo: "imagem", thumb: "from-amber-500 to-orange-400", duracaoReal: 10 },
  { id: "m-4", titulo: "Cardapio do RU", tipo: "imagem", thumb: "from-emerald-500 to-teal-400", duracaoReal: 6 },
  { id: "m-5", titulo: "Link: Portal do Aluno", tipo: "link", thumb: "from-sky-500 to-blue-400", duracaoReal: 5 },
  { id: "m-6", titulo: "Tutorial de Matricula", tipo: "video", thumb: "from-rose-500 to-red-400", duracaoReal: 120 },
  { id: "m-7", titulo: "Horario de Onibus", tipo: "imagem", thumb: "from-indigo-500 to-blue-400", duracaoReal: 7 },
  { id: "m-8", titulo: "Link: Biblioteca Digital", tipo: "link", thumb: "from-green-500 to-emerald-400", duracaoReal: 5 },
  { id: "m-9", titulo: "Programa de Bolsas", tipo: "imagem", thumb: "from-fuchsia-500 to-pink-400", duracaoReal: 12 },
  { id: "m-10", titulo: "Palestra de Abertura", tipo: "video", thumb: "from-slate-500 to-gray-400", duracaoReal: 90 },
]

// ---------------------------------------------------------------------------
// Playlist locations for the Select dropdown
// ---------------------------------------------------------------------------
export const PLAYLIST_LOCATIONS = [
  { id: "cct", label: "Centro de Tecnologia" },
  { id: "cch", label: "Centro de Ciencias Humanas" },
  { id: "ccs", label: "Centro de Ciencias da Saude" },
  { id: "cca", label: "Centro de Ciencias Agrarias" },
  { id: "biblioteca", label: "Biblioteca Central" },
  { id: "reitoria", label: "Reitoria e Administracao" },
]

// ---------------------------------------------------------------------------
// Form types (for ContentForm / ContentEditDialog)
// ---------------------------------------------------------------------------
export type PostType = "noticia" | "evento" | "aviso" | "alerta" | "galeria"
export type PostStatus = "ativo" | "rascunho" | "agendado" | "expirado"

export interface PostConteudo {
  id: string
  titulo: string
  resumo: string
  link: string
  tipo: PostType
  status: PostStatus
  locais: string[]
  inicio: string
  fim: string
  autor: string
  thumb: string
}

export const POST_TYPES: Record<PostType, { label: string }> = {
  noticia: { label: "Noticia" },
  evento: { label: "Evento" },
  aviso: { label: "Aviso" },
  alerta: { label: "Alerta" },
  galeria: { label: "Galeria" },
}

export const POST_STATUS: Record<PostStatus, { label: string }> = {
  ativo: { label: "Ativo" },
  rascunho: { label: "Rascunho" },
  agendado: { label: "Agendado" },
  expirado: { label: "Expirado" },
}

export const POST_CONTEUDOS: PostConteudo[] = [
  {
    id: "c-001",
    titulo: "Semana Academica de Computacao 2026",
    resumo: "Palestras, workshops e hackathon reunindo estudantes e empresas parceiras durante toda a semana no CCT.",
    link: "https://ufs.edu.br/semanacomputacao",
    tipo: "evento",
    status: "ativo",
    locais: ["p-cct-1", "p-cct-2", "p-bib-1"],
    inicio: "2026-08-10",
    fim: "2026-08-16",
    autor: "Coord. Computacao",
    thumb: "from-blue-500 to-cyan-400",
  },
  {
    id: "c-002",
    titulo: "Novo horario de funcionamento da Biblioteca Central",
    resumo: "A partir desta semana a Biblioteca Central passa a funcionar ate as 23h de segunda a sexta.",
    link: "",
    tipo: "aviso",
    status: "ativo",
    locais: ["p-bib-1", "p-bib-2", "p-cct-1", "p-cch-1", "p-ccs-1", "p-cca-1"],
    inicio: "2026-08-05",
    fim: "2026-09-05",
    autor: "Diretoria Biblioteca",
    thumb: "from-amber-500 to-orange-400",
  },
  {
    id: "c-003",
    titulo: "Manutencao eletrica programada no Bloco B",
    resumo: "Interrupcao no fornecimento de energia no Bloco B do CCT no proximo sabado, das 7h as 12h.",
    link: "",
    tipo: "alerta",
    status: "agendado",
    locais: ["p-cct-2"],
    inicio: "2026-08-22",
    fim: "2026-08-22",
    autor: "Infraestrutura",
    thumb: "from-rose-500 to-red-400",
  },
  {
    id: "c-004",
    titulo: "Inscricoes abertas para Monitoria 2026.2",
    resumo: "Estudantes interessados em atuar como monitores ja podem se inscrever pelo portal academico.",
    link: "https://portal.ufs.edu.br/monitoria",
    tipo: "noticia",
    status: "ativo",
    locais: ["p-cct-1", "p-cct-2", "p-cch-1", "p-ccs-1", "p-cca-1"],
    inicio: "2026-08-01",
    fim: "2026-08-30",
    autor: "Pro-Reitoria de Ensino",
    thumb: "from-violet-500 to-purple-400",
  },
  {
    id: "c-005",
    titulo: "Simposio de Saude Coletiva",
    resumo: "Evento com pesquisadores convidados debatendo os avancos em saude publica na regiao.",
    link: "https://ufs.edu.br/simposiosaude",
    tipo: "evento",
    status: "agendado",
    locais: ["p-ccs-1", "p-ccs-2"],
    inicio: "2026-09-12",
    fim: "2026-09-14",
    autor: "Coord. Enfermagem",
    thumb: "from-emerald-500 to-teal-400",
  },
  {
    id: "c-006",
    titulo: "Exposicao fotografica: Campus em Movimento",
    resumo: "Galeria de fotos produzidas por estudantes retratando o cotidiano do campus universitario.",
    link: "",
    tipo: "galeria",
    status: "rascunho",
    locais: ["p-cch-1", "p-cch-2", "p-bib-1"],
    inicio: "2026-08-18",
    fim: "2026-09-01",
    autor: "Centro Academico CCH",
    thumb: "from-fuchsia-500 to-pink-400",
  },
  {
    id: "c-007",
    titulo: "Feira de Estagios e Carreiras",
    resumo: "Empresas parceiras apresentam oportunidades de estagio e trainee para estudantes de todos os cursos.",
    link: "https://carreiras.ufs.edu.br/feira",
    tipo: "evento",
    status: "ativo",
    locais: ["p-cct-1", "p-cch-1", "p-ccs-1", "p-cca-1", "p-rei-1"],
    inicio: "2026-08-08",
    fim: "2026-08-20",
    autor: "Nucleo de Carreiras",
    thumb: "from-sky-500 to-blue-400",
  },
  {
    id: "c-008",
    titulo: "Resultado do edital de Iniciacao Cientifica",
    resumo: "Confira a lista dos projetos contemplados no edital PIBIC deste ciclo.",
    link: "",
    tipo: "noticia",
    status: "expirado",
    locais: ["p-cct-1", "p-cca-1"],
    inicio: "2026-06-01",
    fim: "2026-07-15",
    autor: "Pro-Reitoria de Pesquisa",
    thumb: "from-slate-500 to-gray-400",
  },
]

export const POST_TYPE_KEYS = Object.keys(POST_TYPES) as PostType[]
export const POST_STATUS_KEYS = Object.keys(POST_STATUS) as PostStatus[]
