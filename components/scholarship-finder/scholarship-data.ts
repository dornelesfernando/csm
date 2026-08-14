import {
  Search,
  Sparkles,
  FileClock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"

export type ApplicationStatus = "draft" | "submitted" | "review" | "approved"

export interface ScholarshipOpportunity {
  id: string
  institution: string
  /** Sigla/iniciais usadas como logo textual */
  institutionLogo?: string
  title: string
  description: string
  /** Compatibilidade com o perfil (0-100) */
  matchScore: number
  value?: string
  benefits: string[]
  requirements: string[]
  /** Data limite (ISO) */
  deadline: string
  /** Data de publicacao (ISO) */
  publishedAt: string
  category: string
  state: string
  modality: "Presencial" | "Remoto" | "Hibrido"
  level: "Graduacao" | "Pos-Graduacao" | "Tecnico"
  status?: ApplicationStatus
}

export interface SearchProfile {
  course: string
  semester: string
  interests: string[]
  goal: string
  lastUpdated: string
}

export const searchProfile: SearchProfile = {
  course: "Engenharia de Computacao",
  semester: "3o",
  interests: [
    "Resiliencia Climatica",
    "Cidades Inteligentes",
    "Inteligencia Artificial",
    "Pesquisa",
  ],
  goal: "Iniciacao Cientifica",
  lastUpdated: "ha 2 dias",
}

export interface ScholarshipStat {
  id: string
  value: string
  label: string
  icon: LucideIcon
  accent: string
}

export const scholarshipStats: ScholarshipStat[] = [
  {
    id: "found",
    value: "32",
    label: "oportunidades encontradas",
    icon: Search,
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "highly",
    value: "8",
    label: "altamente compativeis",
    icon: Sparkles,
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "ongoing",
    value: "3",
    label: "inscricoes em andamento",
    icon: FileClock,
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    id: "approved",
    value: "1",
    label: "aprovado recentemente",
    icon: CheckCircle2,
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
]

export const opportunities: ScholarshipOpportunity[] = [
  {
    id: "fapergs-smart-cities",
    institution: "FAPERGS",
    institutionLogo: "FG",
    title: "Bolsa de Pesquisa - Cidades Inteligentes",
    description:
      "Apoio a projetos de pesquisa em sensoriamento urbano e mobilidade inteligente, com orientacao de grupos consolidados.",
    matchScore: 95,
    value: "R$ 700/mes",
    benefits: ["R$ 700/mes", "Auxilio Moradia", "Auxilio Transporte"],
    requirements: ["Graduacao", "Pesquisa", "Extensao", "CR minimo"],
    deadline: "2026-07-03",
    publishedAt: "2026-06-25",
    category: "Iniciacao Cientifica",
    state: "RS",
    modality: "Hibrido",
    level: "Graduacao",
  },
  {
    id: "cnpq-ia-climatica",
    institution: "CNPq",
    institutionLogo: "CQ",
    title: "Edital PIBIC - IA Aplicada a Resiliencia Climatica",
    description:
      "Bolsa de iniciacao cientifica para modelos preditivos voltados a prevencao de desastres e analise de dados climaticos.",
    matchScore: 92,
    value: "R$ 788/mes",
    benefits: ["R$ 788/mes", "Participacao em congressos"],
    requirements: ["Graduacao", "Pesquisa", "Python"],
    deadline: "2026-07-10",
    publishedAt: "2026-06-22",
    category: "Iniciacao Cientifica",
    state: "Nacional",
    modality: "Remoto",
    level: "Graduacao",
  },
  {
    id: "capes-print-intercambio",
    institution: "CAPES",
    institutionLogo: "CP",
    title: "CAPES-PrInt - Mobilidade Internacional",
    description:
      "Auxilio para periodo de pesquisa no exterior em instituicoes parceiras com foco em sustentabilidade urbana.",
    matchScore: 88,
    value: "Bolsa integral",
    benefits: ["Passagem", "Seguro", "Auxilio instalacao"],
    requirements: ["Pos-Graduacao", "Ingles avancado", "Projeto aprovado"],
    deadline: "2026-08-15",
    publishedAt: "2026-06-18",
    category: "Intercambio",
    state: "Nacional",
    modality: "Presencial",
    level: "Pos-Graduacao",
  },
  {
    id: "rs-talentos",
    institution: "Governo RS",
    institutionLogo: "RS",
    title: "Programa RS Talentos em Tecnologia",
    description:
      "Auxilio financeiro para estudantes de tecnologia com bom desempenho academico e projetos de impacto regional.",
    matchScore: 84,
    value: "R$ 600/mes",
    benefits: ["R$ 600/mes", "Mentoria", "Networking"],
    requirements: ["Graduacao", "CR minimo", "Residencia no RS"],
    deadline: "2026-07-05",
    publishedAt: "2026-06-20",
    category: "Auxilio Financeiro",
    state: "RS",
    modality: "Hibrido",
    level: "Graduacao",
  },
  {
    id: "ufsm-permanencia",
    institution: "UFSM",
    institutionLogo: "SM",
    title: "Auxilio Permanencia Universitaria",
    description:
      "Programa de assistencia estudantil para apoio a permanencia e conclusao da graduacao com seguranca financeira.",
    matchScore: 71,
    value: "R$ 500/mes",
    benefits: ["R$ 500/mes", "Auxilio Alimentacao"],
    requirements: ["Graduacao", "Analise socioeconomica"],
    deadline: "2026-07-20",
    publishedAt: "2026-06-15",
    category: "Auxilio Financeiro",
    state: "RS",
    modality: "Presencial",
    level: "Graduacao",
  },
  {
    id: "fundacao-estudar",
    institution: "Fundacao Estudar",
    institutionLogo: "FE",
    title: "Lideres Estudar - Desenvolvimento de Lideranca",
    description:
      "Programa de bolsas e formacao de lideranca para estudantes de alto desempenho com perfil empreendedor.",
    matchScore: 67,
    value: "Formacao + rede",
    benefits: ["Mentoria", "Eventos exclusivos", "Rede de alumni"],
    requirements: ["Graduacao", "Processo seletivo", "Ingles intermediario"],
    deadline: "2026-09-01",
    publishedAt: "2026-06-10",
    category: "Desenvolvimento",
    state: "Nacional",
    modality: "Hibrido",
    level: "Graduacao",
  },
]

export interface FilterGroup {
  id: string
  label: string
  options: string[]
}

export const filterGroups: FilterGroup[] = [
  { id: "course", label: "Curso", options: ["Engenharia de Computacao", "Ciencia da Computacao", "Sistemas de Informacao"] },
  { id: "state", label: "Estado", options: ["RS", "SC", "SP", "Nacional"] },
  { id: "institution", label: "Instituicao", options: ["FAPERGS", "CNPq", "CAPES", "UFSM", "Governo RS"] },
  { id: "type", label: "Tipo", options: ["Iniciacao Cientifica", "Auxilio Financeiro", "Intercambio", "Desenvolvimento"] },
  { id: "value", label: "Valor", options: ["Ate R$ 500", "R$ 500 - R$ 800", "Acima de R$ 800", "Bolsa integral"] },
  { id: "modality", label: "Modalidade", options: ["Presencial", "Remoto", "Hibrido"] },
  { id: "research-area", label: "Area de Pesquisa", options: ["IA", "Cidades Inteligentes", "Clima", "Mobilidade"] },
  { id: "level", label: "Nivel Academico", options: ["Graduacao", "Pos-Graduacao", "Tecnico"] },
  { id: "situation", label: "Situacao", options: ["Inscricoes abertas", "Em breve", "Encerrado"] },
  { id: "deadline", label: "Prazo", options: ["Esta semana", "Este mes", "Proximos 3 meses"] },
]

export type SortOption =
  | "match"
  | "recent"
  | "deadline"
  | "value"
  | "alphabetical"

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "match", label: "Melhor Match" },
  { value: "recent", label: "Mais Recentes" },
  { value: "deadline", label: "Prazo mais proximo" },
  { value: "value", label: "Maior Valor" },
  { value: "alphabetical", label: "Ordem Alfabetica" },
]

export interface Application {
  id: string
  title: string
  institution: string
  deadline: string
  status: ApplicationStatus
  lastMovement: string
}

export interface KanbanColumnData {
  id: ApplicationStatus
  title: string
  accent: string
  applications: Application[]
}

export const kanbanColumns: KanbanColumnData[] = [
  {
    id: "draft",
    title: "Preparando Documentacao",
    accent: "bg-amber-500",
    applications: [
      {
        id: "app-rs-talentos",
        title: "Bolsa RS Talentos",
        institution: "Governo RS",
        deadline: "05/07/2026",
        status: "draft",
        lastMovement: "Documentos atualizados ha 1 dia",
      },
      {
        id: "app-ufsm-permanencia",
        title: "Auxilio Permanencia UFSM",
        institution: "UFSM",
        deadline: "20/07/2026",
        status: "draft",
        lastMovement: "Iniciado ha 3 dias",
      },
    ],
  },
  {
    id: "review",
    title: "Em Analise",
    accent: "bg-blue-500",
    applications: [
      {
        id: "app-fapergs-ic",
        title: "FAPERGS IC",
        institution: "FAPERGS",
        deadline: "03/07/2026",
        status: "review",
        lastMovement: "Enviado para avaliacao ha 5 dias",
      },
    ],
  },
  {
    id: "approved",
    title: "Aprovado",
    accent: "bg-emerald-500",
    applications: [
      {
        id: "app-cnpq-pibic",
        title: "PIBIC CNPq - IA Climatica",
        institution: "CNPq",
        deadline: "Concluido",
        status: "approved",
        lastMovement: "Aprovada ha 2 dias",
      },
    ],
  },
]
