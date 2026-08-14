import type { LucideIcon } from "lucide-react"

export type Citation = {
  label: string
  category: string
}

export type AssistantReply = {
  text: string
  citations?: Citation[]
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  citations?: Citation[]
}

export type SuggestedPrompt = {
  label: string
  query: string
  group: "Trajetoria" | "Competencias" | "Foco" | "Planejamento"
}

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { label: "O que eu realizei neste semestre?", query: "O que eu realizei neste semestre?", group: "Trajetoria" },
  { label: "Quais competencias estou desenvolvendo?", query: "Quais competencias estou desenvolvendo?", group: "Competencias" },
  { label: "Em quais areas estou mais ativo?", query: "Em quais areas estou mais ativo?", group: "Trajetoria" },
  { label: "O que eu deveria priorizar?", query: "O que eu deveria priorizar agora?", group: "Foco" },
  { label: "Estou pronto para iniciacao cientifica?", query: "Estou pronto para iniciacao cientifica?", group: "Planejamento" },
  { label: "Resuma minha evolucao ate aqui", query: "Resuma minha evolucao academica ate aqui", group: "Trajetoria" },
]

// Contexto que o copiloto "conhece" sobre a estudante
export const STUDENT_CONTEXT = {
  name: "Laura",
  semester: "2025.2",
  course: "Ciencia da Computacao",
  period: "6o periodo",
}

type Matcher = {
  keywords: string[]
  reply: AssistantReply
}

const MATCHERS: Matcher[] = [
  {
    keywords: ["realizei", "realizou", "conquistei", "fiz", "semestre atual", "neste semestre"],
    reply: {
      text:
        "Neste semestre (2025.2) voce ja acumulou marcos importantes. Os destaques sao: 1o lugar no Hackathon de Inovacao Universitaria como lider de time, o inicio do Estagio em Engenharia de Dados, e o aceite do seu artigo sobre evasao academica no Congresso de Iniciacao Cientifica. Voce tambem concluiu a disciplina de Inteligencia Artificial com nota 9.4. No total, sao 9 registros novos na sua linha do tempo neste periodo.",
      citations: [
        { label: "Hackathon de Inovacao", category: "competicoes" },
        { label: "Estagio em Engenharia de Dados", category: "estagios" },
        { label: "Artigo no Congresso de IC", category: "publicacoes" },
      ],
    },
  },
  {
    keywords: ["competencia", "competencias", "desenvolvendo", "habilidade"],
    reply: {
      text:
        "Voce esta desenvolvendo 8 competencias mapeadas a partir de experiencias reais. As mais avancadas sao Programacao e Logica (82%) e Lideranca e Trabalho em Equipe (71%). As que mais cresceram recentemente foram Inteligencia Artificial e Dados (+15%) e Visao de Produto e UX (+11%). Cada uma delas vem de evidencias concretas, nao de autoavaliacao: por exemplo, sua competencia em IA esta ligada ao estagio, a disciplina de IA e ao artigo publicado.",
      citations: [
        { label: "Programacao e Logica - 82%", category: "competencias" },
        { label: "IA e Dados - +15%", category: "competencias" },
        { label: "Lideranca - 71%", category: "competencias" },
      ],
    },
  },
  {
    keywords: ["area", "areas", "mais ativo", "ativa", "atuando", "foco atual"],
    reply: {
      text:
        "Sua area de maior atividade e a Tecnica, que concentra cerca de 45% dos seus registros (projetos, disciplinas e competicoes de programacao). Em segundo vem Pesquisa, impulsionada pelo artigo e pela iniciacao cientifica em andamento. As areas Interpessoal e Gestao aparecem de forma transversal: elas surgem dentro das mesmas experiencias tecnicas, como o Hackathon, onde voce liderou e apresentou o pitch. Vale notar que sua atividade em Pesquisa cresceu bastante nos ultimos 3 meses.",
      citations: [
        { label: "Tecnica - 45% dos registros", category: "competencias" },
        { label: "Pesquisa em crescimento", category: "publicacoes" },
      ],
    },
  },
  {
    keywords: ["priorizar", "prioridade", "deveria fazer", "foco", "proximo passo", "proximos passos"],
    reply: {
      text:
        "Com base na sua trajetoria, sugiro 3 prioridades: 1) Consolidar a area de Pesquisa - voce ja tem um artigo aceito e iniciacao cientifica, entao formalizar um plano de IC com seu orientador potencializa esse momento. 2) Fortalecer Cloud e Infraestrutura (hoje em 46%), que e a competencia tecnica com maior lacuna em relacao ao seu perfil de Engenharia de Dados. 3) Documentar suas conquistas no Resume Builder, ja que voce tem material forte para bolsas e processos seletivos. O Hackathon e o estagio sao seus maiores diferenciais hoje.",
      citations: [
        { label: "Pesquisa Cientifica - 54%", category: "competencias" },
        { label: "Cloud e Infraestrutura - 46%", category: "competencias" },
        { label: "Resume Builder", category: "toolkit" },
      ],
    },
  },
  {
    keywords: ["iniciacao", "cientifica", "pesquisa cientifica", "mestrado", "ic"],
    reply: {
      text:
        "Sim, seu perfil esta maduro para iniciacao cientifica. Voce ja tem um artigo aceito no Congresso de IC, concluiu Inteligencia Artificial com 9.4 e participou de um Workshop de UX Research. Sua competencia em Pesquisa Cientifica esta em 54% e crescendo (+12%). O proximo passo natural seria formalizar um projeto com um orientador da area de IA/Dados, aproveitando o tema de evasao academica que voce ja explorou no artigo.",
      citations: [
        { label: "Artigo no Congresso de IC", category: "publicacoes" },
        { label: "Inteligencia Artificial - 9.4", category: "disciplinas" },
      ],
    },
  },
  {
    keywords: ["evolucao", "evoluiu", "resuma", "resumo", "trajetoria", "ate aqui", "progresso"],
    reply: {
      text:
        "Em resumo: ao longo da graduacao voce construiu uma base tecnica solida e comecou a se diferenciar em pesquisa e lideranca. Sua linha do tempo reune projetos full stack, uma certificacao AWS, competicoes com bons resultados e agora um estagio em engenharia de dados. O movimento mais interessante e a transicao de 'executora tecnica' para 'protagonista de projetos': voce passou a liderar times, apresentar resultados e produzir conhecimento. Suas 8 competencias mapeadas mostram um perfil em forma de T - profundidade em programacao, com amplitude crescente em pesquisa, gestao e comunicacao.",
      citations: [
        { label: "Linha do Tempo completa", category: "timeline" },
        { label: "8 competencias mapeadas", category: "competencias" },
      ],
    },
  },
]

export function generateReply(query: string): AssistantReply {
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  for (const matcher of MATCHERS) {
    if (matcher.keywords.some((k) => normalized.includes(k))) {
      return matcher.reply
    }
  }

  return {
    text:
      "Posso te ajudar a entender sua propria trajetoria. Eu conheco suas atividades registradas, competencias, objetivos e linha do tempo. Experimente perguntar sobre o que voce realizou neste semestre, quais competencias esta desenvolvendo, em quais areas esta mais ativo ou o que deveria priorizar agora.",
  }
}

export const CATEGORY_COLORS: Record<string, string> = {
  competicoes: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  estagios: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
  publicacoes: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
  competencias: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  disciplinas: "text-sky-600 dark:text-sky-400 bg-sky-500/10",
  toolkit: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  timeline: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
}
