import {
  FileText,
  Award,
  Briefcase,
  Mail,
  Search,
  GraduationCap,
  Sparkles,
  Map,
  BookOpen,
  CalendarSearch,
  Plane,
  School,
  Share2,
  BarChart3,
  Linkedin,
  Calculator,
  Building2,
  Rocket,
  Users,
  Focus,
  type LucideIcon,
} from "lucide-react"

export type ToolStatus = "disponivel" | "em-breve"

export type ToolCategory =
  | "Curriculo e Carreira"
  | "Pesquisa e Producao Cientifica"
  | "Planejamento Academico"
  | "Oportunidades"
  | "Documentacao"
  | "Inteligencia Academica"

export interface AcademicTool {
  id: string
  name: string
  tagline: string
  description: string
  category: ToolCategory
  status: ToolStatus
  icon: LucideIcon
  uses?: number
  isNew?: boolean
  /** Ultima interacao do usuario, exibida apenas em ferramentas ativas */
  lastUsed?: string
  /** Numero de estudantes interessados, usado no mural de votacao */
  interested?: number
  /** Indica se a ferramenta esta fixada no Acesso Rapido */
  pinned?: boolean
}

export const categories: { label: ToolCategory; color: string }[] = [
  { label: "Curriculo e Carreira", color: "bg-blue-500" },
  { label: "Pesquisa e Producao Cientifica", color: "bg-emerald-500" },
  { label: "Planejamento Academico", color: "bg-amber-500" },
  { label: "Oportunidades", color: "bg-rose-500" },
  { label: "Documentacao", color: "bg-cyan-500" },
  { label: "Inteligencia Academica", color: "bg-indigo-500" },
]

export const tools: AcademicTool[] = [
  {
    id: "resume-builder",
    name: "Resume Builder",
    tagline: "Gerador inteligente de curriculo academico e profissional",
    description:
      "Transforme experiencias, projetos, certificacoes e atividades academicas em curriculos profissionais.",
    category: "Curriculo e Carreira",
    status: "em-breve",
    icon: FileText,
    interested: 1284,
    isNew: true,
    lastUsed: "Ultimo curriculo gerado: Ha 2 dias",
    pinned: true,
  },
  {
    id: "lattes-assistant",
    name: "Lattes Assistant",
    tagline: "Organize informacoes para o Curriculo Lattes",
    description:
      "Auxilia na organizacao e preparacao de informacoes para atualizacao do Curriculo Lattes.",
    category: "Curriculo e Carreira",
    status: "disponivel",
    icon: Award,
    uses: 642,
    interested: 38,
    lastUsed: "Radar: 3 novas indicacoes",
    pinned: true,
  },
  {
    id: "portfolio-builder",
    name: "Academic Portfolio Builder",
    tagline: "Portfolio academico gerado automaticamente",
    description:
      "Gera automaticamente um portfolio academico a partir da trajetoria do estudante.",
    category: "Curriculo e Carreira",
    status: "em-breve",
    icon: Briefcase,
    // uses: 531,
    isNew: true,
    interested: 27,
  },
  {
    id: "cover-letter",
    name: "Cover Letter Generator",
    tagline: "Cartas de apresentacao para oportunidades",
    description:
      "Cria cartas de apresentacao para bolsas, estagios e oportunidades.",
    category: "Curriculo e Carreira",
    status: "em-breve",
    icon: Mail,
    // uses: 489,
    interested: 19,
  },
  {
    id: "research-finder",
    name: "Research Opportunity Finder",
    tagline: "Iniciacao cientifica e grupos de pesquisa",
    description:
      "Encontra oportunidades de iniciacao cientifica e grupos de pesquisa compativeis com o perfil do estudante.",
    category: "Pesquisa e Producao Cientifica",
    status: "em-breve",
    icon: Search,
    // uses: 873,
    interested: 54,
  },
  {
    id: "publication-assistant",
    name: "Publication Assistant",
    tagline: "Preparacao de artigos e producoes cientificas",
    description:
      "Auxilia na preparacao de artigos, resumos e producoes cientificas.",
    category: "Pesquisa e Producao Cientifica",
    status: "em-breve",
    icon: BookOpen,
    // uses: 367,
    interested: 23,
  },
  {
    id: "scholarship-finder",
    name: "Scholarship Finder",
    tagline: "Bolsas e editais recomendados",
    description: "Busca bolsas e editais recomendados para o estudante.",
    category: "Oportunidades",
    status: "disponivel",
    icon: GraduationCap,
    uses: 912,
    isNew: true,
    interested: 61,
    lastUsed: "Ultima busca: Ha 3 horas",
    pinned: true,
  },
  {
    id: "event-discovery",
    name: "Event Discovery",
    tagline: "Congressos, workshops e competicoes",
    description:
      "Descobre congressos, workshops, palestras e competicoes relevantes.",
    category: "Oportunidades",
    status: "disponivel",
    icon: CalendarSearch,
    uses: 728,
    interested: 33,
    lastUsed: "Ultima busca: Ha 1 dia",
    pinned: true,
  },
  {
    id: "exchange-planner",
    name: "Exchange Planner",
    tagline: "Intercambios e oportunidades internacionais",
    description:
      "Planeja intercambios academicos e identifica oportunidades internacionais.",
    category: "Oportunidades",
    status: "em-breve",
    icon: Plane,
    // uses: 414,
    interested: 17,
  },
  {
    id: "roadmap-planner",
    name: "Academic Roadmap Planner",
    tagline: "Planeje disciplinas, estagios e metas",
    description:
      "Ajuda a planejar disciplinas, estagios, pesquisa e metas de carreira.",
    category: "Planejamento Academico",
    status: "disponivel",
    icon: Map,
    uses: 596,
    interested: 29,
    isNew: true,
    lastUsed: "Planejamento ate o 6o periodo",
    pinned: true,
  },
  {
    id: "graduate-advisor",
    name: "Graduate School Advisor",
    tagline: "Caminho para mestrado e doutorado",
    description:
      "Auxilia estudantes interessados em mestrado e doutorado.",
    category: "Planejamento Academico",
    status: "em-breve",
    icon: School,
    // uses: 322,
    interested: 14,
  },
  {
    id: "timeline-exporter",
    name: "Academic Timeline Exporter",
    tagline: "Relatorio visual compartilhavel da trajetoria",
    description:
      "Transforma a trajetoria academica em um relatorio visual compartilhavel.",
    category: "Documentacao",
    status: "em-breve",
    icon: Share2,
    // uses: 458,
    interested: 21,
  },
  {
    id: "competency-analyzer",
    name: "Competency Analyzer",
    tagline: "Identifica competencias desenvolvidas",
    description:
      "Analisa experiencias e identifica competencias desenvolvidas ao longo da trajetoria.",
    category: "Inteligencia Academica",
    status: "em-breve",
    icon: Sparkles,
    // uses: 805,
    isNew: true,
    interested: 47,
  },
  {
    id: "analytics-studio",
    name: "Academic Analytics Studio",
    tagline: "Analise da evolucao academica",
    description:
      "Ferramentas de analise da evolucao academica do estudante.",
    category: "Inteligencia Academica",
    status: "em-breve",
    icon: BarChart3,
    // uses: 277,
    interested: 12,
  },
  {
    id: "linkedin-impact-builder",
    name: "LinkedIn Impact Builder",
    tagline: "Transforme conquistas academicas em autoridade profissional",
    description:
      "Transforme conquistas academicas em relevancia profissional no LinkedIn.",
    category: "Curriculo e Carreira",
    status: "disponivel",
    icon: Linkedin,
    uses: 318,
    isNew: true,
    lastUsed: "Ultima publicacao gerada: Ha 5 horas",
    pinned: true,
  },
  {
    id: "acg-tracker",
    name: "ACG / Horas Complementares Tracker",
    tagline: "Calculadora inteligente de horas complementares",
    description:
      "Calculadora e organizadora inteligente de Atividades Complementares de Graduacao (leitura via OCR).",
    category: "Planejamento Academico",
    status: "em-breve",
    icon: Calculator,
    // uses: 540,
    interested: 85,
    isNew: true,
  },
  {
    id: "architecture-generator",
    name: "Architecture & Blueprint Generator",
    tagline: "Documentacao tecnica e estrutural padronizada",
    description:
      "Gera documentacao tecnica e estrutural padronizada (READMEs, Monorepos, Shared Kernels).",
    category: "Documentacao",
    status: "em-breve",
    icon: Building2,
    // uses: 412,
    interested: 67,
  },
  {
    id: "hackathon-pitch",
    name: "Hackathon & Pitch Deck Assistant",
    tagline: "Acelerador de ideacao e apresentacao",
    description:
      "Acelerador de ideacao e apresentacao para competicoes de inovacao.",
    category: "Oportunidades",
    status: "em-breve",
    icon: Rocket,
    // uses: 298,
    interested: 39,
  },
  {
    id: "extracurricular-sync",
    name: "Extracurricular & Team Sync",
    tagline: "Gestor de impacto para equipes e extensao",
    description:
      "Gestor de impacto para equipes de competicao e extensao multidisciplinares.",
    category: "Curriculo e Carreira",
    status: "em-breve",
    icon: Users,
    // uses: 356,
    interested: 51,
  },
  {
    id: "deep-work-optimizer",
    name: "Deep Work & Setup Optimizer",
    tagline: "Otimizacao de ambiente e foco para estudo",
    description:
      "Otimizacao de ambiente e foco para sessoes de estudo ou codigo, integrando metricas de bem-estar.",
    category: "Inteligencia Academica",
    status: "em-breve",
    icon: Focus,
    // uses: 489,
    interested: 73,
    isNew: true,
  },
]
