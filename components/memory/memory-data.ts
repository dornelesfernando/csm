export type MemoryType = "Aprendizado" | "Reflexao" | "Insight" | "Conquista" | "Duvida"

export type MemoryFormat = "texto" | "audio" | "imagem"

export interface Memory {
  id: string
  type: MemoryType
  format: MemoryFormat
  text: string
  tags: string[]
  course?: string
  date: string
  dayLabel: string
  durationLabel?: string
}

export const memoryTypes: { value: MemoryType; color: string; dot: string }[] = [
  { value: "Aprendizado", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  { value: "Reflexao", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  { value: "Insight", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  { value: "Conquista", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  { value: "Duvida", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400", dot: "bg-rose-500" },
]

export function typeMeta(type: MemoryType) {
  return memoryTypes.find((t) => t.value === type) ?? memoryTypes[0]
}

export const initialMemories: Memory[] = [
  {
    id: "m1",
    type: "Aprendizado",
    format: "texto",
    text: "Entendi na pratica como a normalizacao evita redundancia e melhora a integridade dos dados. Aplicar a 3FN no projeto da disciplina deixou as consultas muito mais previsiveis.",
    tags: ["Banco de Dados II", "Modelagem"],
    course: "Banco de Dados II",
    date: "Hoje, 14:20",
    dayLabel: "Hoje",
  },
  {
    id: "m2",
    type: "Reflexao",
    format: "audio",
    text: "Liderar o grupo do hackathon me mostrou que organizar o time e tao importante quanto codar. Preciso melhorar a forma como distribuo tarefas sob pressao.",
    tags: ["Soft Skills", "Lideranca"],
    date: "Hoje, 09:05",
    dayLabel: "Hoje",
    durationLabel: "1:42",
  },
  {
    id: "m3",
    type: "Insight",
    format: "texto",
    text: "Conectei conceitos de algebra linear com o funcionamento de redes neurais. Multiplicacao de matrizes finalmente fez sentido visualmente.",
    tags: ["Inteligencia Artificial", "Matematica"],
    course: "Inteligencia Artificial",
    date: "Ontem, 19:30",
    dayLabel: "Ontem",
  },
  {
    id: "m4",
    type: "Conquista",
    format: "imagem",
    text: "Apresentei o artigo no seminario de iniciacao cientifica e recebi feedback muito positivo da banca sobre a metodologia.",
    tags: ["Pesquisa", "Iniciacao Cientifica"],
    date: "Ontem, 16:10",
    dayLabel: "Ontem",
  },
  {
    id: "m5",
    type: "Duvida",
    format: "texto",
    text: "Ainda nao entendi totalmente quando usar memoizacao em React. Preciso revisar useMemo vs useCallback com exemplos reais.",
    tags: ["Desenvolvimento Web", "React"],
    course: "Desenvolvimento Web",
    date: "3 dias atras",
    dayLabel: "Esta semana",
  },
  {
    id: "m6",
    type: "Aprendizado",
    format: "texto",
    text: "Aprendi a estruturar commits semanticos e isso melhorou muito o historico do repositorio do trabalho em grupo.",
    tags: ["Git", "Boas Praticas"],
    date: "5 dias atras",
    dayLabel: "Esta semana",
  },
]
