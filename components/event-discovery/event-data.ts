import {
  Trophy,
  FlaskConical,
  Code2,
  Palette,
  type LucideIcon,
} from "lucide-react"

export type EventCategory =
  | "competition"
  | "scientific"
  | "hackathon"
  | "cultural"

export interface AcademicEvent {
  id: string
  title: string
  category: EventCategory
  description: string
  institution: string
  location?: string
  /** Data de inicio do evento (ISO) */
  startDate: string
  /** Data de termino do evento (ISO) */
  endDate?: string
  /** Compatibilidade com o perfil do usuario (0-100) */
  matchScore: number
  saved: boolean
  tags: string[]
  /** Rotulo de prazo, ex.: "Prazo em 15 dias" ou "Inscricoes abertas" */
  deadlineLabel: string
  /** Insight opcional gerado pela IA, exibido em destaque no card */
  aiInsight?: string
}

export interface EventCategoryMeta {
  value: EventCategory
  label: string
  icon: LucideIcon
  /** Classe utilitaria para o badge/dot da categoria */
  accent: string
  dot: string
}

export const eventCategories: EventCategoryMeta[] = [
  {
    value: "competition",
    label: "Competicoes",
    icon: Trophy,
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  {
    value: "scientific",
    label: "Eventos Cientificos",
    icon: FlaskConical,
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    value: "hackathon",
    label: "Hackathons",
    icon: Code2,
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  {
    value: "cultural",
    label: "Esportivos/Culturais",
    icon: Palette,
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
]

export const categoryMetaMap: Record<EventCategory, EventCategoryMeta> =
  eventCategories.reduce(
    (acc, meta) => {
      acc[meta.value] = meta
      return acc
    },
    {} as Record<EventCategory, EventCategoryMeta>,
  )

/** Rotulo curto por categoria, usado em badges compactos. */
export const categoryShortLabel: Record<EventCategory, string> = {
  competition: "Competicao",
  scientific: "Cientifico/Tecnico",
  hackathon: "Inovacao/Codigo",
  cultural: "Esporte/Cultura",
}

export interface EventStat {
  id: string
  label: string
  helper: string
  value: string
  trend?: string
}

export const eventStats: EventStat[] = [
  {
    id: "found",
    value: "48",
    label: "Eventos encontrados",
    helper: "Mapeados para o seu perfil",
    trend: "+12%",
  },
  {
    id: "relevant",
    value: "15",
    label: "Altamente relevantes",
    helper: "Compatibilidade acima de 85%",
    trend: "Alto",
  },
  {
    id: "saved",
    value: "6",
    label: "Salvos no calendario",
    helper: "Prontos para acompanhar",
  },
  {
    id: "networking",
    value: "23",
    label: "Networking previsto",
    helper: "Contatos estimados este mes",
    trend: "Este mes",
  },
]

export const academicEvents: AcademicEvent[] = [
  {
    id: "simposio-aeroespacial",
    title: "Simposio Sul-Brasileiro de Engenharia Aeroespacial",
    category: "scientific",
    description:
      "Submissao de artigos e networking para equipes de foguetemodelismo. Prazo de inscricao em 15 dias.",
    institution: "UFSC",
    location: "Florianopolis, SC",
    startDate: "2026-07-08",
    endDate: "2026-07-10",
    matchScore: 95,
    saved: false,
    tags: ["Graduacao", "Pesquisa", "Aeroespacial"],
    deadlineLabel: "Prazo em 15 dias",
  },
  {
    id: "xadrez-universitario",
    title: "Torneio Regional de Xadrez Universitario",
    category: "cultural",
    description:
      "Competicao presencial. Otimo para treinar raciocinio sob pressao e ampliar o networking entre cursos.",
    institution: "UFSM",
    location: "Santa Maria, RS",
    startDate: "2026-07-12",
    matchScore: 82,
    saved: false,
    tags: ["Universitario", "Presencial", "Xadrez"],
    deadlineLabel: "Inscricoes abertas",
  },
  {
    id: "hackathon-open-finance",
    title: "Hackathon Open Finance",
    category: "hackathon",
    description:
      "Focado em desenvolvimento Full-Stack com Node.js e bancos relacionais. Premiacao e mentoria com especialistas.",
    institution: "Open Finance Brasil",
    location: "Remoto",
    startDate: "2026-07-22",
    endDate: "2026-07-24",
    matchScore: 91,
    saved: false,
    tags: ["Node.js", "PostgreSQL", "Full-Stack"],
    deadlineLabel: "Evento em 22 dias",
    aiInsight:
      "A equipe de Gente e Gestao poderia aproveitar este workshop de lideranca!",
  },
  {
    id: "congresso-ia-aplicada",
    title: "Congresso de IA Aplicada e Cidades Inteligentes",
    category: "scientific",
    description:
      "Palestras e oficinas sobre modelos preditivos, visao computacional e dados urbanos. Forte aderencia ao seu perfil.",
    institution: "PUCRS",
    location: "Porto Alegre, RS",
    startDate: "2026-07-18",
    endDate: "2026-07-19",
    matchScore: 93,
    saved: true,
    tags: ["IA", "Pesquisa", "Smart Cities"],
    deadlineLabel: "Prazo em 9 dias",
  },
  {
    id: "desafio-robotica",
    title: "Desafio Nacional de Robotica Movel",
    category: "competition",
    description:
      "Competicao de robos autonomos com provas de navegacao e manipulacao. Ideal para equipes multidisciplinares.",
    institution: "ITA",
    location: "Sao Jose dos Campos, SP",
    startDate: "2026-08-02",
    endDate: "2026-08-04",
    matchScore: 77,
    saved: false,
    tags: ["Robotica", "Embarcados", "Competicao"],
    deadlineLabel: "Prazo em 28 dias",
  },
  {
    id: "festival-cultural-extensao",
    title: "Festival Cultural de Extensao Universitaria",
    category: "cultural",
    description:
      "Mostra de projetos artisticos e de impacto social. Excelente para ampliar repertorio e conexoes interdisciplinares.",
    institution: "UFRGS",
    location: "Porto Alegre, RS",
    startDate: "2026-07-26",
    matchScore: 64,
    saved: false,
    tags: ["Extensao", "Cultura", "Impacto"],
    deadlineLabel: "Inscricoes abertas",
  },
]

/** Eventos marcados no calendario do mes (dia -> rotulo curto). */
export interface CalendarMark {
  day: number
  label: string
  category: EventCategory
}

export const calendarMarks: CalendarMark[] = [
  { day: 8, label: "Simposio", category: "scientific" },
  { day: 12, label: "Xadrez", category: "cultural" },
  { day: 18, label: "Congresso IA", category: "scientific" },
  { day: 22, label: "Hackathon", category: "hackathon" },
  { day: 26, label: "Festival", category: "cultural" },
]

export interface AIInsight {
  summary: string
  highlightTitle: string
  highlightDescription: string
}

export const aiInsight: AIInsight = {
  summary:
    "Voce tem alta compatibilidade com eventos de IA aplicada, cidades inteligentes e desenvolvimento full-stack.",
  highlightTitle: "Hackathon Open Finance",
  highlightDescription:
    "Otima oportunidade para networking tecnico e para validar seu projeto com mentores.",
}
