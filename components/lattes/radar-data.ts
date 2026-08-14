import type { LucideIcon } from "lucide-react"
import {
  Award,
  Briefcase,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
  HeartHandshake,
  FileText,
} from "lucide-react"

export type LattesCategory =
  | "professional"
  | "extension"
  | "research"
  | "award"
  | "publication"
  | "teaching"
  | "course"
  | "committee"

export type SuggestionStatus = "pending" | "prepared" | "confirmed" | "ignored"

export type DetectedField = {
  label: string
  value: string
}

export type LattesSuggestion = {
  id: string
  title: string
  subtitle?: string
  description: string
  aiContext: string
  category: LattesCategory
  confidence: number
  detectedFrom: string[]
  institution?: string
  detectedAt: string
  status: SuggestionStatus
  preview?: string
  detectedFields: DetectedField[]
  presentFields: string[]
  missingFields: string[]
}

export type CategoryMeta = {
  label: string
  icon: LucideIcon
}

export const CATEGORY_META: Record<LattesCategory, CategoryMeta> = {
  professional: { label: "Atuacao Profissional", icon: Briefcase },
  extension: { label: "Extensao", icon: HeartHandshake },
  research: { label: "Pesquisa", icon: FlaskConical },
  award: { label: "Premiacao", icon: Award },
  publication: { label: "Publicacao", icon: FileText },
  teaching: { label: "Ensino", icon: GraduationCap },
  course: { label: "Curso / Certificado", icon: BookOpen },
  committee: { label: "Banca / Comissao", icon: Users },
}

export const STATUS_LABELS: Record<SuggestionStatus, string> = {
  pending: "Pendente",
  prepared: "Preparada",
  confirmed: "Confirmada",
  ignored: "Ignorada",
}

export const lattesSuggestions: LattesSuggestion[] = [
  {
    id: "sug-1",
    title: "Trainee em Gente e Gestao",
    subtitle: "Escola Piloto de Engenharia Aeroespacial",
    description:
      "Participacao recorrente em atividades de lideranca e gestao de pessoas ao longo do ultimo semestre, com responsabilidade sobre processos de selecao e integracao de novos membros.",
    aiContext:
      "Detectei participacao recorrente em atividades de lideranca durante o ultimo semestre. Esta experiencia possui forte aderencia a secao \"Atuacao Profissional\" do Curriculo Lattes.",
    category: "professional",
    confidence: 98,
    detectedFrom: ["Memoria Academica", "Competencias", "Lideranca"],
    institution: "Escola Piloto de Engenharia Aeroespacial",
    detectedAt: "Marco de 2026",
    status: "pending",
    preview:
      "Atuacao como Trainee em Gente e Gestao na Escola Piloto de Engenharia Aeroespacial (mar/2026 - atual), responsavel por processos de selecao, integracao e desenvolvimento de membros.",
    detectedFields: [
      { label: "Data", value: "Marco de 2026" },
      { label: "Instituicao", value: "Escola Piloto de Engenharia Aeroespacial" },
      { label: "Categoria sugerida", value: "Atuacao Profissional" },
      { label: "Status", value: "Ainda nao encontrado no curriculo" },
    ],
    presentFields: ["Titulo do vinculo", "Instituicao", "Periodo de inicio"],
    missingFields: ["Data de termino", "Carga horaria semanal", "Descricao das atividades"],
  },
  {
    id: "sug-2",
    title: "Membro da Banca de Selecao",
    subtitle: "Tau Rocket Team",
    description:
      "Atuacao como avaliador no processo seletivo da equipe de competicao, conduzindo entrevistas tecnicas e comportamentais.",
    aiContext:
      "Foi encontrada uma participacao em banca de selecao registrada na Memoria Academica, mas ainda nao localizada no curriculo oficial.",
    category: "committee",
    confidence: 91,
    detectedFrom: ["Memoria Academica", "Projeto Integrador"],
    institution: "Tau Rocket Team",
    detectedAt: "Fevereiro de 2026",
    status: "pending",
    preview:
      "Participacao em banca de selecao da Tau Rocket Team (fev/2026), responsavel pela avaliacao tecnica de candidatos.",
    detectedFields: [
      { label: "Data", value: "Fevereiro de 2026" },
      { label: "Instituicao", value: "Tau Rocket Team" },
      { label: "Categoria sugerida", value: "Participacao em Banca" },
      { label: "Status", value: "Ainda nao encontrado no curriculo" },
    ],
    presentFields: ["Tipo de banca", "Instituicao", "Data"],
    missingFields: ["Nome do candidato avaliado", "Natureza da banca"],
  },
  {
    id: "sug-3",
    title: "Premiacao em Torneio Regional de Xadrez",
    description:
      "Conquista de premiacao em torneio regional, registrada na Memoria Academica a partir de um certificado anexado.",
    aiContext:
      "Foi encontrada uma premiacao registrada na Memoria Academica, mas ainda nao localizada no curriculo oficial.",
    category: "award",
    confidence: 87,
    detectedFrom: ["Memoria Academica", "Certificados"],
    institution: "Federacao Regional de Xadrez",
    detectedAt: "Janeiro de 2026",
    status: "pending",
    preview:
      "Premiacao: 3o lugar no Torneio Regional de Xadrez (jan/2026), promovido pela Federacao Regional de Xadrez.",
    detectedFields: [
      { label: "Data", value: "Janeiro de 2026" },
      { label: "Instituicao", value: "Federacao Regional de Xadrez" },
      { label: "Categoria sugerida", value: "Premios e Titulos" },
      { label: "Status", value: "Ainda nao encontrado no curriculo" },
    ],
    presentFields: ["Nome da premiacao", "Entidade promotora", "Ano"],
    missingFields: ["Colocacao oficial", "Ambito da premiacao"],
  },
  {
    id: "sug-4",
    title: "Certificado em Fundamentos de Machine Learning",
    description:
      "Conclusao de curso livre com carga horaria suficiente para gerar automaticamente um registro completo de qualificacao.",
    aiContext:
      "Este certificado possui informacoes suficientes para gerar automaticamente um registro completo para o Lattes.",
    category: "course",
    confidence: 95,
    detectedFrom: ["Event Discovery", "Certificados"],
    institution: "Coursera",
    detectedAt: "Dezembro de 2025",
    status: "pending",
    preview:
      "Curso de curta duracao: Fundamentos de Machine Learning (40h), concluido em dez/2025 via Coursera.",
    detectedFields: [
      { label: "Data", value: "Dezembro de 2025" },
      { label: "Instituicao", value: "Coursera" },
      { label: "Categoria sugerida", value: "Formacao Complementar" },
      { label: "Carga horaria", value: "40 horas" },
    ],
    presentFields: ["Nome do curso", "Instituicao", "Carga horaria", "Data de conclusao"],
    missingFields: [],
  },
  {
    id: "sug-5",
    title: "Bolsa de Iniciacao Cientifica",
    subtitle: "Laboratorio de Sistemas Embarcados",
    description:
      "Vinculo de pesquisa identificado a partir das competencias e do edital encontrado no Scholarship Finder.",
    aiContext:
      "Identifiquei um vinculo de iniciacao cientifica com base nas suas competencias de Pesquisa e em um edital salvo no Scholarship Finder.",
    category: "research",
    confidence: 72,
    detectedFrom: ["Scholarship Finder", "Competencias"],
    institution: "Laboratorio de Sistemas Embarcados",
    detectedAt: "Novembro de 2025",
    status: "pending",
    preview:
      "Iniciacao Cientifica no Laboratorio de Sistemas Embarcados (nov/2025 - atual), com foco em sistemas de tempo real.",
    detectedFields: [
      { label: "Data", value: "Novembro de 2025" },
      { label: "Instituicao", value: "Laboratorio de Sistemas Embarcados" },
      { label: "Categoria sugerida", value: "Pesquisa e Desenvolvimento" },
      { label: "Status", value: "Vinculo parcialmente documentado" },
    ],
    presentFields: ["Area de pesquisa", "Laboratorio"],
    missingFields: ["Nome do orientador", "Agencia de fomento", "Titulo do projeto"],
  },
  {
    id: "sug-6",
    title: "Monitoria de Algoritmos e Estruturas de Dados",
    description:
      "Atividade de ensino detectada a partir de registros recorrentes na Memoria Academica durante o semestre.",
    aiContext:
      "Detectei atividade de monitoria recorrente que se enquadra na secao de Ensino do Curriculo Lattes.",
    category: "teaching",
    confidence: 84,
    detectedFrom: ["Memoria Academica"],
    institution: "Universidade Federal",
    detectedAt: "Agosto de 2025",
    status: "prepared",
    preview:
      "Monitoria voluntaria de Algoritmos e Estruturas de Dados (ago/2025 - dez/2025) na Universidade Federal.",
    detectedFields: [
      { label: "Data", value: "Agosto de 2025" },
      { label: "Instituicao", value: "Universidade Federal" },
      { label: "Categoria sugerida", value: "Ensino" },
      { label: "Status", value: "Preparada para revisao" },
    ],
    presentFields: ["Disciplina", "Instituicao", "Periodo"],
    missingFields: ["Carga horaria semanal"],
  },
  {
    id: "sug-7",
    title: "Projeto de Extensao em Robotica Educacional",
    description:
      "Participacao em projeto de extensao com escolas publicas, registrada via certificados e memoria academica.",
    aiContext:
      "Encontrei um projeto de extensao ja registrado e adicionado ao seu curriculo em uma versao anterior.",
    category: "extension",
    confidence: 93,
    detectedFrom: ["Memoria Academica", "Certificados"],
    institution: "Programa de Extensao Universitaria",
    detectedAt: "Maio de 2025",
    status: "confirmed",
    preview:
      "Projeto de extensao em Robotica Educacional (mai/2025 - nov/2025) junto a escolas publicas.",
    detectedFields: [
      { label: "Data", value: "Maio de 2025" },
      { label: "Instituicao", value: "Programa de Extensao Universitaria" },
      { label: "Categoria sugerida", value: "Extensao" },
      { label: "Status", value: "Confirmado no curriculo" },
    ],
    presentFields: ["Titulo do projeto", "Instituicao", "Periodo", "Funcao"],
    missingFields: [],
  },
  {
    id: "sug-8",
    title: "Participacao em Workshop de UX",
    description:
      "Evento de curta duracao detectado, considerado de baixa relevancia para o curriculo academico.",
    aiContext:
      "Este evento foi ignorado anteriormente por ter baixa aderencia ao perfil academico atual.",
    category: "course",
    confidence: 58,
    detectedFrom: ["Event Discovery"],
    institution: "Meetup Local",
    detectedAt: "Abril de 2025",
    status: "ignored",
    preview:
      "Participacao em workshop de UX (abr/2025), evento de 4h promovido por meetup local.",
    detectedFields: [
      { label: "Data", value: "Abril de 2025" },
      { label: "Instituicao", value: "Meetup Local" },
      { label: "Categoria sugerida", value: "Formacao Complementar" },
      { label: "Status", value: "Ignorado" },
    ],
    presentFields: ["Nome do evento", "Data"],
    missingFields: ["Carga horaria", "Certificado"],
  },
]
