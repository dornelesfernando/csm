import type { CategoryKey } from "@/components/timeline/timeline-data"

export type EvidenceSource = {
  title: string
  category: CategoryKey
  detail?: string
}

export type CompetencyLevel = "Iniciante" | "Em desenvolvimento" | "Proficiente" | "Avancado"

export type Competency = {
  id: string
  name: string
  area: "Tecnica" | "Interpessoal" | "Pesquisa" | "Gestao"
  level: number // 0-100
  levelLabel: CompetencyLevel
  trend: string
  summary: string
  evidences: EvidenceSource[]
}

export const AREA_META: Record<
  Competency["area"],
  { label: string; text: string; bg: string; dot: string }
> = {
  Tecnica: {
    label: "Tecnica",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    dot: "bg-blue-500",
  },
  Interpessoal: {
    label: "Interpessoal",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  Pesquisa: {
    label: "Pesquisa",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    dot: "bg-rose-500",
  },
  Gestao: {
    label: "Gestao",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
  },
}

export function levelFromValue(value: number): CompetencyLevel {
  if (value >= 80) return "Avancado"
  if (value >= 60) return "Proficiente"
  if (value >= 35) return "Em desenvolvimento"
  return "Iniciante"
}

export const COMPETENCIES: Competency[] = [
  {
    id: "programacao",
    name: "Programacao e Logica",
    area: "Tecnica",
    level: 82,
    levelLabel: "Avancado",
    trend: "+8%",
    summary:
      "Desenvolvimento de aplicacoes completas, estruturas de dados e algoritmos aplicados em projetos e competicoes.",
    evidences: [
      { title: "API de recomendacao com Node.js e PostgreSQL", category: "projetos", detail: "Projeto full stack" },
      { title: "Estrutura de Dados", category: "disciplinas", detail: "Aprovada - 8.8" },
      { title: "Maratona de Programacao", category: "competicoes", detail: "Top 15 regional" },
      { title: "Curso de TypeScript Avancado", category: "cursos", detail: "40h" },
    ],
  },
  {
    id: "ia-dados",
    name: "Inteligencia Artificial e Dados",
    area: "Tecnica",
    level: 68,
    levelLabel: "Proficiente",
    trend: "+15%",
    summary:
      "Modelos preditivos, aprendizado de maquina e pipelines de dados aplicados em pesquisa e estagio.",
    evidences: [
      { title: "Inteligencia Artificial", category: "disciplinas", detail: "Aprovada - 9.4" },
      { title: "Estagio em Engenharia de Dados", category: "estagios", detail: "Em andamento" },
      { title: "Artigo sobre evasao academica", category: "publicacoes", detail: "Congresso de IC" },
    ],
  },
  {
    id: "pesquisa",
    name: "Pesquisa Cientifica",
    area: "Pesquisa",
    level: 54,
    levelLabel: "Em desenvolvimento",
    trend: "+12%",
    summary:
      "Metodo cientifico, escrita academica e producao de artigos em coautoria com orientador.",
    evidences: [
      { title: "Artigo aceito no Congresso de IC", category: "publicacoes", detail: "Anais do evento" },
      { title: "Workshop de UX Research", category: "eventos", detail: "Pesquisa com usuarios" },
      { title: "Inteligencia Artificial", category: "disciplinas", detail: "Projeto final" },
    ],
  },
  {
    id: "lideranca",
    name: "Lideranca e Trabalho em Equipe",
    area: "Interpessoal",
    level: 71,
    levelLabel: "Proficiente",
    trend: "+10%",
    summary:
      "Coordenacao de times multidisciplinares em projetos, competicoes e ambiente profissional.",
    evidences: [
      { title: "1o lugar no Hackathon de Inovacao", category: "competicoes", detail: "Lider do time" },
      { title: "Estagio em Engenharia de Dados", category: "estagios", detail: "Time de 8 pessoas" },
      { title: "API de recomendacao", category: "projetos", detail: "Trabalho em squad" },
    ],
  },
  {
    id: "comunicacao",
    name: "Comunicacao e Apresentacao",
    area: "Interpessoal",
    level: 58,
    levelLabel: "Em desenvolvimento",
    trend: "+9%",
    summary:
      "Pitch de solucoes, defesa de projetos para bancas e apresentacao de resultados de pesquisa.",
    evidences: [
      { title: "1o lugar no Hackathon de Inovacao", category: "competicoes", detail: "Pitch para 6 avaliadores" },
      { title: "Artigo aceito no Congresso de IC", category: "publicacoes", detail: "Apresentacao oral" },
      { title: "Workshop de UX Research", category: "eventos", detail: "Sintese de insights" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud e Infraestrutura",
    area: "Tecnica",
    level: 46,
    levelLabel: "Em desenvolvimento",
    trend: "+6%",
    summary:
      "Fundamentos de computacao em nuvem, deploy continuo e servicos gerenciados.",
    evidences: [
      { title: "Certificacao AWS Cloud Practitioner", category: "certificacoes", detail: "Score 892/1000" },
      { title: "API de recomendacao", category: "projetos", detail: "CI/CD e deploy" },
    ],
  },
  {
    id: "gestao",
    name: "Gestao de Projetos",
    area: "Gestao",
    level: 49,
    levelLabel: "Em desenvolvimento",
    trend: "+7%",
    summary:
      "Planejamento, organizacao de entregas e acompanhamento de metas em projetos academicos e pessoais.",
    evidences: [
      { title: "App de gestao financeira pessoal", category: "projetos", detail: "300+ downloads" },
      { title: "1o lugar no Hackathon de Inovacao", category: "competicoes", detail: "Gestao de tempo" },
    ],
  },
  {
    id: "produto",
    name: "Visao de Produto e UX",
    area: "Gestao",
    level: 38,
    levelLabel: "Em desenvolvimento",
    trend: "+11%",
    summary:
      "Pesquisa com usuarios, decisoes orientadas a dados e desenvolvimento de produtos centrados no usuario.",
    evidences: [
      { title: "Workshop de UX Research", category: "eventos", detail: "Testes de usabilidade" },
      { title: "App de gestao financeira pessoal", category: "projetos", detail: "Produto publicado" },
    ],
  },
]
