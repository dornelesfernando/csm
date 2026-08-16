"use client"

import React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  FolderOpen,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  Upload,
  MoreHorizontal,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  X,
  CloudUpload,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const folders = [
  { name: "General Knowledge", files: 10, color: "bg-blue-500" },
  { name: "Onboarding", files: 15, color: "bg-emerald-500" },
  { name: "Integrations", files: 8, color: "bg-amber-500" },
  { name: "Design Assets", files: 24, color: "bg-pink-500" },
  { name: "Sprint Reports", files: 12, color: "bg-violet-500" },
  { name: "Contracts", files: 6, color: "bg-red-500" },
]

const files = [
  { id: 1, name: "wireframe-v3.fig", type: "design", size: "2.4 MB", addedBy: { name: "Fernando D.", initials: "FD" }, date: "08/02/2026", folder: "Design Assets" },
  { id: 2, name: "api-documentation.pdf", type: "pdf", size: "1.2 MB", addedBy: { name: "Maria S.", initials: "MS" }, date: "07/02/2026", folder: "Integrations" },
  { id: 3, name: "sprint-retrospective-w5.docx", type: "doc", size: "340 KB", addedBy: { name: "Carlos R.", initials: "CR" }, date: "07/02/2026", folder: "Sprint Reports" },
  { id: 4, name: "brand-guidelines.pdf", type: "pdf", size: "5.8 MB", addedBy: { name: "Julia M.", initials: "JM" }, date: "06/02/2026", folder: "Design Assets" },
  { id: 5, name: "budget-q1-2026.xlsx", type: "spreadsheet", size: "890 KB", addedBy: { name: "Ana L.", initials: "AL" }, date: "05/02/2026", folder: "General Knowledge" },
  { id: 6, name: "onboarding-checklist.md", type: "doc", size: "45 KB", addedBy: { name: "Fernando D.", initials: "FD" }, date: "04/02/2026", folder: "Onboarding" },
  { id: 7, name: "architecture-diagram.png", type: "image", size: "3.1 MB", addedBy: { name: "Carlos R.", initials: "CR" }, date: "03/02/2026", folder: "Integrations" },
  { id: 8, name: "user-research-findings.pdf", type: "pdf", size: "2.7 MB", addedBy: { name: "Julia M.", initials: "JM" }, date: "02/02/2026", folder: "General Knowledge" },
]

const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="size-5 text-red-500" />,
  doc: <FileText className="size-5 text-blue-500" />,
  spreadsheet: <FileSpreadsheet className="size-5 text-emerald-500" />,
  image: <ImageIcon className="size-5 text-pink-500" />,
  design: <FileText className="size-5 text-violet-500" />,
}

const mockUploads = [
  { name: "my-cv.pdf", size: "60 KB", progress: 100, status: "completed" as const },
  { name: "project-brief.docx", size: "245 KB", progress: 72, status: "uploading" as const },
  { name: "screenshot.png", size: "1.2 MB", progress: 35, status: "uploading" as const },
]

const treeFolders = [
  { name: "General Knowledge", count: 10, children: ["Guias", "Processos", "Templates"] },
  { name: "Onboarding", count: 15, children: ["Novos Membros", "Setup", "Cultura"] },
  { name: "Integrations", count: 8, children: ["APIs", "Webhooks"] },
  { name: "Design Assets", count: 24, children: ["UI Kit", "Icons", "Brand"] },
  { name: "Sprint Reports", count: 12, children: [] },
  { name: "Contracts", count: 6, children: [] },
]

export default function DocumentosPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesFolder = !selectedFolder || f.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
          <p className="text-sm text-muted-foreground">Gerenciador de arquivos e base de conhecimento</p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 size-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload de Arquivos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <CloudUpload className="size-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium truncate">Escolha um arquivo ou arraste aqui</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PNG, JPG ate 10MB</p>
              </div>
              <div className="space-y-3">
                {mockUploads.map((file) => (
                  <div key={file.name} className="flex items-center gap-3 rounded-lg border p-3">
                    <FileText className="size-8 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        {file.status === "completed" ? (
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="text-xs text-muted-foreground shrink-0">{file.progress}%</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                      <Progress value={file.progress} className="mt-1.5 h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6">
        {/* Tree sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-8 h-9" />
          </div>
          <Tabs defaultValue="folders">
            <TabsList className="w-full">
              <TabsTrigger value="folders" className="flex-1 text-xs">Pastas</TabsTrigger>
              <TabsTrigger value="tags" className="flex-1 text-xs">Tags</TabsTrigger>
            </TabsList>
            <TabsContent value="folders" className="mt-3">
              <ScrollArea className="h-[400px]">
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setSelectedFolder(null)}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${!selectedFolder ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                  >
                    <span>Todos os Arquivos</span>
                    <Badge variant="secondary" className="text-[10px] h-5">{files.length}</Badge>
                  </button>
                  {treeFolders.map((folder) => (
                    <button
                      key={folder.name}
                      type="button"
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${selectedFolder === folder.name ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                    >
                      <div className="flex items-center gap-2">
                        <FolderOpen className="size-4" />
                        <span className="truncate">{folder.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] h-5">{folder.count}</Badge>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="tags" className="mt-3">
              <div className="flex flex-wrap gap-2">
                {["Frontend", "Backend", "Design", "DevOps", "Docs", "Research"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-accent">{tag}</Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:hidden">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar arquivos..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="hidden lg:block relative flex-1">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar arquivos..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center border rounded-md">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-r-none" onClick={() => setView("grid")}>
                <Grid3X3 className="size-4" />
              </Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-l-none" onClick={() => setView("list")}>
                <List className="size-4" />
              </Button>
            </div>
          </div>

          {!selectedFolder && view === "grid" && (
            <div>
              <h2 className="text-sm font-semibold mb-3">Pastas</h2>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    type="button"
                    onClick={() => setSelectedFolder(folder.name)}
                    className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:shadow-md hover:border-primary/30"
                  >
                    <div className={`flex size-10 items-center justify-center rounded-lg ${folder.color}/10`}>
                      <FolderOpen className={`size-5 ${folder.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.files} arquivos</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            {selectedFolder && (
              <div className="flex items-center gap-2 mb-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedFolder(null)} className="text-xs text-muted-foreground">
                  Todos
                </Button>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-medium">{selectedFolder}</span>
                <Button variant="ghost" size="icon" className="size-6 ml-auto" onClick={() => setSelectedFolder(null)}>
                  <X className="size-3" />
                </Button>
              </div>
            )}
            <h2 className="text-sm font-semibold mb-3">Arquivos</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden md:table-cell">Adicionado por</TableHead>
                      <TableHead className="hidden md:table-cell">Pasta</TableHead>
                      <TableHead className="hidden md:table-cell">Tamanho</TableHead>
                      <TableHead className="hidden md:table-cell">Data</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {fileTypeIcons[file.type]}
                            <span className="text-sm font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{file.addedBy.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{file.addedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary" className="text-xs font-normal">{file.folder}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{file.size}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{file.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-7">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="mr-2 size-4" />Visualizar</DropdownMenuItem>
                              <DropdownMenuItem><Download className="mr-2 size-4" />Download</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 size-4" />Excluir</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
