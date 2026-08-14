import {
  BookOpen,
  FolderGit2,
  CalendarDays,
  GraduationCap,
  Briefcase,
  Trophy,
  BadgeCheck,
  ScrollText,
  type LucideIcon,
} from "lucide-react"

export type CategoryKey =
  | "disciplinas"
  | "projetos"
  | "eventos"
  | "cursos"
  | "estagios"
  | "competicoes"
  | "certificacoes"
  | "publicacoes"

export type CategoryMeta = {
  key: CategoryKey
  label: string
  icon: LucideIcon
  // text + bg + border classes for badges/dots
  text: string
  bg: string
  dot: string
}

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  disciplinas: {
    key: "disciplinas",
    label: "Disciplinas",
    icon: BookOpen,
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    dot: "bg-blue-500",
  },
  projetos: {
    key: "projetos",
    label: "Projetos",
    icon: FolderGit2,
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  eventos: {
    key: "eventos",
    label: "Eventos",
    icon: CalendarDays,
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    dot: "bg-violet-500",
  },
  cursos: {
    key: "cursos",
    label: "Cursos",
    icon: GraduationCap,
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    dot: "bg-cyan-500",
  },
  estagios: {
    key: "estagios",
    label: "Estagios",
    icon: Briefcase,
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
  },
  competicoes: {
    key: "competicoes",
    label: "Competicoes",
    icon: Trophy,
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    dot: "bg-orange-500",
  },
  certificacoes: {
    key: "certificacoes",
    label: "Certificacoes",
    icon: BadgeCheck,
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10",
    dot: "bg-teal-500",
  },
  publicacoes: {
    key: "publicacoes",
    label: "Publicacoes",
    icon: ScrollText,
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    dot: "bg-rose-500",
  },
}

export type TimelineEntry = {
  id: string
  category: CategoryKey
  title: string
  description: string
  date: string // ISO yyyy-mm-dd
  dateLabel: string
  period: string // e.g. "2025.2"
  tags?: string[]
  meta?: string // e.g. "Aprovado - 9.2", "1o lugar"
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: "1",
    category: "competicoes",
    title: "1o lugar no Hackathon de Inovacao Universitaria",
    description:
      "Liderei o time vencedor com uma solucao de recomendacao academica baseada em IA, apresentada para uma banca de 6 avaliadores.",
    date: "2025-11-15",
    dateLabel: "15 Nov 2025",
    period: "2025.2",
    tags: ["Lideranca", "IA", "Pitch"],
    meta: "1o lugar - 120 participantes",
  },
  {
    id: "2",
    category: "publicacoes",
    title: "Artigo aceito no Congresso de Iniciacao Cientifica",
    description:
      "Publicacao sobre modelos preditivos aplicados a evasao academica, em coautoria com o orientador da Iniciacao Cientifica.",
    date: "2025-11-03",
    dateLabel: "03 Nov 2025",
    period: "2025.2",
    tags: ["Pesquisa", "Machine Learning"],
    meta: "Anais do evento",
  },
  {
    id: "3",
    category: "projetos",
    title: "API de recomendacao com Node.js e PostgreSQL",
    description:
      "Desenvolvi do zero uma API REST com autenticacao, testes automatizados e deploy continuo, usada como base do projeto do hackathon.",
    date: "2025-10-20",
    dateLabel: "20 Out 2025",
    period: "2025.2",
    tags: ["Node.js", "PostgreSQL", "CI/CD"],
  },
  {
    id: "4",
    category: "estagios",
    title: "Estagio em Engenharia de Dados - TechCorp",
    description:
      "Atuacao em pipelines de dados e dashboards analiticos, trabalhando com Python, Airflow e BigQuery em um time de 8 pessoas.",
    date: "2025-09-01",
    dateLabel: "Set 2025 - atual",
    period: "2025.2",
    tags: ["Python", "Airflow", "Dados"],
    meta: "Em andamento",
  },
  {
    id: "5",
    category: "disciplinas",
    title: "Inteligencia Artificial",
    description:
      "Disciplina com foco em algoritmos de busca, aprendizado de maquina e redes neurais. Projeto final sobre classificacao de imagens.",
    date: "2025-08-10",
    dateLabel: "Ago 2025",
    period: "2025.2",
    tags: ["IA", "Redes Neurais"],
    meta: "Aprovada - 9.4",
  },
  {
    id: "6",
    category: "certificacoes",
    title: "Certificacao AWS Cloud Practitioner",
    description:
      "Certificacao oficial validando fundamentos de computacao em nuvem, servicos core da AWS e boas praticas de seguranca.",
    date: "2025-07-22",
    dateLabel: "22 Jul 2025",
    period: "2025.1",
    tags: ["AWS", "Cloud"],
    meta: "Score 892/1000",
  },
  {
    id: "7",
    category: "eventos",
    title: "Workshop de UX Research aplicado a produtos",
    description:
      "Imersao pratica em entrevistas com usuarios, testes de usabilidade e sintese de insights para decisoes de produto.",
    date: "2025-06-14",
    dateLabel: "14 Jun 2025",
    period: "2025.1",
    tags: ["UX", "Pesquisa"],
  },
  {
    id: "8",
    category: "cursos",
    title: "Curso de TypeScript Avancado",
    description:
      "Aprofundamento em tipos genericos, utility types e padroes de arquitetura para aplicacoes escalaveis.",
    date: "2025-05-30",
    dateLabel: "30 Mai 2025",
    period: "2025.1",
    tags: ["TypeScript", "Arquitetura"],
    meta: "40h",
  },
  {
    id: "9",
    category: "disciplinas",
    title: "Banco de Dados",
    description:
      "Modelagem relacional, normalizacao, transacoes e otimizacao de consultas. Projeto de um sistema de biblioteca completo.",
    date: "2025-03-12",
    dateLabel: "Mar 2025",
    period: "2025.1",
    tags: ["SQL", "Modelagem"],
    meta: "Aprovada - 9.0",
  },
  {
    id: "10",
    category: "projetos",
    title: "App de gestao financeira pessoal",
    description:
      "Projeto pessoal full stack com React Native e Firebase, publicado na loja com mais de 300 downloads.",
    date: "2024-12-05",
    dateLabel: "05 Dez 2024",
    period: "2024.2",
    tags: ["React Native", "Firebase"],
    meta: "300+ downloads",
  },
  {
    id: "11",
    category: "competicoes",
    title: "Maratona de Programacao - fase regional",
    description:
      "Classificacao para a fase regional resolvendo problemas de algoritmos e estruturas de dados sob tempo limitado.",
    date: "2024-10-18",
    dateLabel: "18 Out 2024",
    period: "2024.2",
    tags: ["Algoritmos", "C++"],
    meta: "Top 15 regional",
  },
  {
    id: "12",
    category: "disciplinas",
    title: "Estrutura de Dados",
    description:
      "Listas, arvores, grafos e analise de complexidade. Base fundamental para os desafios de programacao competitiva.",
    date: "2024-08-15",
    dateLabel: "Ago 2024",
    period: "2024.2",
    tags: ["Algoritmos"],
    meta: "Aprovada - 8.8",
  },
]
