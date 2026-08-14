export type CourseType = "required" | "elective" | "dcg"

export type CourseStatus =
  | "planned"
  | "current"
  | "approved"
  | "failed"
  | "exam"

export type Course = {
  id: string
  code: string
  name: string
  workload: number
  semester: number
  type: CourseType
  status: CourseStatus
  grade?: number
  prerequisites: string[]
  corequisites: string[]
  unlocks: string[]
  highPriority?: boolean
  scheduleConflict?: boolean
  description?: string
  syllabus?: string
  bibliography?: string[]
  notes?: string
}

export type Semester = {
  number: number
  label: string
  state: "completed" | "current" | "planned"
}

export type AISuggestion = {
  courseId: string
  reason: string
}

export type AIInsight = {
  id: string
  type: "tip" | "warning" | "progress" | "star"
  text: string
}

export const TYPE_LABELS: Record<CourseType, string> = {
  required: "Obrigatoria",
  elective: "Eletiva",
  dcg: "DCG",
}

export const STATUS_LABELS: Record<CourseStatus, string> = {
  planned: "Planejado",
  current: "Em andamento",
  approved: "Aprovado",
  failed: "Reprovado",
  exam: "Exame",
}

export const semesters: Semester[] = [
  { number: 1, label: "Semestre 1", state: "completed" },
  { number: 2, label: "Semestre 2", state: "completed" },
  { number: 3, label: "Semestre Atual (3o)", state: "current" },
  { number: 4, label: "Planejamento (4o)", state: "planned" },
  { number: 5, label: "Planejamento (5o)", state: "planned" },
  { number: 6, label: "Planejamento (6o)", state: "planned" },
]

export const courses: Course[] = [
  // Semestre 1
  {
    id: "c1",
    code: "MAT1001",
    name: "Calculo I",
    workload: 90,
    semester: 1,
    type: "required",
    status: "approved",
    grade: 8.5,
    prerequisites: [],
    corequisites: [],
    unlocks: ["c5"],
    description: "Limites, derivadas e integrais de funcoes de uma variavel.",
    syllabus:
      "Funcoes reais, limites e continuidade, derivadas e aplicacoes, integrais definidas e indefinidas.",
    bibliography: ["STEWART, J. Calculo Volume 1.", "GUIDORIZZI, H. Um Curso de Calculo."],
  },
  {
    id: "c2",
    code: "ELC1001",
    name: "Introducao a Programacao",
    workload: 60,
    semester: 1,
    type: "required",
    status: "approved",
    grade: 9.2,
    prerequisites: [],
    corequisites: [],
    unlocks: ["c6"],
    highPriority: true,
    description: "Fundamentos de logica de programacao e algoritmos.",
    syllabus: "Variaveis, estruturas de controle, funcoes, vetores e introducao a estruturas de dados.",
    bibliography: ["CORMEN, T. Algoritmos."],
  },
  {
    id: "c3",
    code: "FIS1001",
    name: "Fisica I",
    workload: 60,
    semester: 1,
    type: "required",
    status: "approved",
    grade: 7.0,
    prerequisites: [],
    corequisites: [],
    unlocks: [],
  },
  // Semestre 2
  {
    id: "c5",
    code: "MAT1002",
    name: "Calculo II",
    workload: 90,
    semester: 2,
    type: "required",
    status: "approved",
    grade: 7.8,
    prerequisites: ["c1"],
    corequisites: [],
    unlocks: ["c10"],
    description: "Calculo de funcoes de varias variaveis.",
  },
  {
    id: "c6",
    code: "ELC1067",
    name: "Estruturas de Dados",
    workload: 60,
    semester: 2,
    type: "required",
    status: "approved",
    grade: 8.5,
    prerequisites: ["c2"],
    corequisites: [],
    unlocks: ["c11", "c12"],
    highPriority: true,
    description: "Estruturas de dados lineares e nao lineares.",
    syllabus: "Listas, pilhas, filas, arvores, grafos e tabelas hash.",
    bibliography: ["CORMEN, T. Algoritmos.", "ZIVIANI, N. Projeto de Algoritmos."],
  },
  {
    id: "c7",
    code: "MAT2001",
    name: "Algebra Linear",
    workload: 60,
    semester: 2,
    type: "required",
    status: "approved",
    grade: 6.5,
    prerequisites: [],
    corequisites: [],
    unlocks: [],
  },
  // Semestre 3 (atual)
  {
    id: "c10",
    code: "MAT3001",
    name: "Probabilidade e Estatistica",
    workload: 60,
    semester: 3,
    type: "required",
    status: "current",
    prerequisites: ["c5"],
    corequisites: [],
    unlocks: ["s2"],
    description: "Fundamentos de probabilidade e inferencia estatistica.",
  },
  {
    id: "c11",
    code: "ELC2001",
    name: "Banco de Dados I",
    workload: 60,
    semester: 3,
    type: "required",
    status: "current",
    prerequisites: ["c6"],
    corequisites: [],
    unlocks: ["s1"],
    highPriority: true,
    description: "Modelagem e linguagem de consulta de bancos relacionais.",
    syllabus: "Modelo ER, normalizacao, SQL, transacoes.",
  },
  {
    id: "c12",
    code: "ELC2010",
    name: "Linguagens Formais e Automatos",
    workload: 60,
    semester: 3,
    type: "required",
    status: "exam",
    prerequisites: ["c6"],
    corequisites: [],
    unlocks: ["s4"],
    scheduleConflict: true,
    description: "Teoria de linguagens formais, automatos e gramaticas.",
  },
  {
    id: "c13",
    code: "DCG1001",
    name: "Empreendedorismo",
    workload: 30,
    semester: 3,
    type: "dcg",
    status: "current",
    prerequisites: [],
    corequisites: [],
    unlocks: [],
  },
  // Semestre 4 (planejado) - sugeridas pela IA aparecem aqui ao adicionar
  {
    id: "s1",
    code: "ELC3001",
    name: "Banco de Dados II",
    workload: 60,
    semester: 4,
    type: "required",
    status: "planned",
    prerequisites: ["c11"],
    corequisites: ["s5"],
    unlocks: [],
    highPriority: true,
    description: "Bancos de dados distribuidos, NoSQL e otimizacao de consultas.",
  },
  {
    id: "s5",
    code: "ELC3010",
    name: "Engenharia de Software",
    workload: 60,
    semester: 4,
    type: "required",
    status: "planned",
    prerequisites: ["c6"],
    corequisites: ["s1"],
    unlocks: [],
    description: "Processos, requisitos, arquitetura e qualidade de software.",
  },
]

// Sugestoes de matricula geradas pela IA para o 4o semestre
export const aiSuggestions: AISuggestion[] = [
  {
    courseId: "s1",
    reason: "Todos os pre-requisitos foram concluidos.",
  },
  {
    courseId: "s2",
    reason: "Equilibra a carga horaria do semestre.",
  },
  {
    courseId: "s3",
    reason: "Recomendado para manter o fluxo curricular.",
  },
  {
    courseId: "s4",
    reason: "Depende de Linguagens Formais, em exame neste semestre.",
  },
]

// Disciplinas candidatas referenciadas pelas sugestoes (ainda nao no planejamento)
export const suggestionCatalog: Record<string, { code: string; name: string; workload: number }> = {
  s1: { code: "ELC3001", name: "Banco de Dados II", workload: 60 },
  s2: { code: "MAT3010", name: "Probabilidade II", workload: 60 },
  s3: { code: "ELC3020", name: "Programacao Web", workload: 60 },
  s4: { code: "ELC3030", name: "Compiladores", workload: 90 },
}

export const aiInsights: AIInsight[] = [
  {
    id: "i1",
    type: "progress",
    text: "Voce podera concluir o curso um semestre antes mantendo esta distribuicao.",
  },
  {
    id: "i2",
    type: "warning",
    text: "A disciplina Compiladores depende de Linguagens Formais.",
  },
  {
    id: "i3",
    type: "tip",
    text: "Este planejamento mantem a carga horaria equilibrada.",
  },
  {
    id: "i4",
    type: "star",
    text: "Recomenda-se cursar Banco de Dados II junto com Engenharia de Software.",
  },
]

export type ProgressStats = {
  totalWorkload: { done: number; total: number }
  requiredPercent: number
  electiveWorkload: { done: number; total: number }
  currentSemester: { done: number; total: number }
  gpa: number
  pendingCourses: number
}

export const progressStats: ProgressStats = {
  totalWorkload: { done: 1800, total: 3600 },
  requiredPercent: 65,
  electiveWorkload: { done: 120, total: 300 },
  currentSemester: { done: 420, total: 480 },
  gpa: 8.42,
  pendingCourses: 18,
}
