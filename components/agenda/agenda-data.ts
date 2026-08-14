export type BlockType = "disciplina" | "reuniao" | "estudo" | "evento"

export interface TimeBlock {
  id: string
  title: string
  type: BlockType
  start: string // "HH:MM"
  end: string // "HH:MM"
  location?: string
  weekday: number // 0 = domingo ... 6 = sabado
}

export const blockStyles: Record<
  BlockType,
  { label: string; dot: string; bar: string; chip: string }
> = {
  disciplina: {
    label: "Disciplina",
    dot: "bg-blue-500",
    bar: "border-l-blue-500 bg-blue-500/10",
    chip: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  },
  reuniao: {
    label: "Reuniao de projeto",
    dot: "bg-emerald-500",
    bar: "border-l-emerald-500 bg-emerald-500/10",
    chip: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  },
  estudo: {
    label: "Estudo",
    dot: "bg-amber-500",
    bar: "border-l-amber-500 bg-amber-500/10",
    chip: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  },
  evento: {
    label: "Evento",
    dot: "bg-violet-500",
    bar: "border-l-violet-500 bg-violet-500/10",
    chip: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  },
}

// Time blocks recorrentes da semana (segunda a sexta principalmente)
export const timeBlocks: TimeBlock[] = [
  // Segunda
  { id: "b1", title: "Algoritmos e Estruturas de Dados", type: "disciplina", start: "08:00", end: "10:00", location: "Sala B-204", weekday: 1 },
  { id: "b2", title: "Daily do Projeto Atlas", type: "reuniao", start: "10:30", end: "11:00", location: "Online", weekday: 1 },
  { id: "b3", title: "Estudo dirigido - Calculo", type: "estudo", start: "14:00", end: "16:00", location: "Biblioteca", weekday: 1 },
  // Terca
  { id: "b4", title: "Banco de Dados", type: "disciplina", start: "08:00", end: "10:00", location: "Lab 3", weekday: 2 },
  { id: "b5", title: "Engenharia de Software", type: "disciplina", start: "10:00", end: "12:00", location: "Sala A-101", weekday: 2 },
  { id: "b6", title: "Mentoria de Iniciacao Cientifica", type: "reuniao", start: "16:00", end: "17:00", location: "Bloco C", weekday: 2 },
  // Quarta
  { id: "b7", title: "Calculo III", type: "disciplina", start: "08:00", end: "10:00", location: "Sala B-204", weekday: 3 },
  { id: "b8", title: "Sprint Planning - Projeto Atlas", type: "reuniao", start: "13:30", end: "15:00", location: "Online", weekday: 3 },
  { id: "b9", title: "Estudo - Banco de Dados", type: "estudo", start: "15:30", end: "17:00", location: "Biblioteca", weekday: 3 },
  // Quinta
  { id: "b10", title: "Inteligencia Artificial", type: "disciplina", start: "10:00", end: "12:00", location: "Lab 5", weekday: 4 },
  { id: "b11", title: "Reuniao do grupo de pesquisa", type: "reuniao", start: "14:00", end: "15:30", location: "Bloco C", weekday: 4 },
  { id: "b12", title: "Workshop de Open Source", type: "evento", start: "19:00", end: "21:00", location: "Auditorio", weekday: 4 },
  // Sexta
  { id: "b13", title: "Algoritmos e Estruturas de Dados", type: "disciplina", start: "08:00", end: "10:00", location: "Sala B-204", weekday: 5 },
  { id: "b14", title: "Entrega - Projeto Atlas (Sprint 4)", type: "reuniao", start: "11:00", end: "12:00", location: "Online", weekday: 5 },
  { id: "b15", title: "Estudo - Inteligencia Artificial", type: "estudo", start: "14:00", end: "16:00", location: "Biblioteca", weekday: 5 },
]

export const weekdayLabels = [
  "Domingo",
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
]

export const weekdayShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

// Dias do mes que possuem compromissos (para marcar no calendario mensal)
export const busyDaysOfMonth = [2, 4, 5, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 25, 26, 29]

// Eventos por dia do mes: cada dia mapeia para os tipos de evento daquele dia.
// Usado para renderizar os dots empilhados nas celulas do calendario mensal.
export const monthEventTypes: Record<number, BlockType[]> = {
  2: ["disciplina"],
  4: ["disciplina", "estudo"],
  5: ["reuniao"],
  8: ["disciplina", "reuniao", "estudo"],
  9: ["evento"],
  11: ["disciplina", "reuniao"],
  12: ["estudo"],
  15: ["disciplina", "reuniao", "evento"],
  16: ["disciplina"],
  18: ["reuniao", "estudo"],
  19: ["disciplina", "reuniao", "estudo", "evento"],
  22: ["disciplina"],
  23: ["reuniao", "evento"],
  25: ["estudo"],
  26: ["disciplina", "reuniao"],
  29: ["disciplina", "evento"],
}

export function getBlocksForWeekday(weekday: number): TimeBlock[] {
  return timeBlocks
    .filter((b) => b.weekday === weekday)
    .sort((a, b) => a.start.localeCompare(b.start))
}

export function minutesFromStart(time: string, dayStart = 7): number {
  const [h, m] = time.split(":").map(Number)
  return (h - dayStart) * 60 + m
}
