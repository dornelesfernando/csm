"use client"

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FormEvent,
} from "react"
import { Search, Plus, Pencil, KeyRound, ShieldOff, MoveHorizontal as MoreHorizontal, Loader as Loader2, Users } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Role = "Super Admin" | "Admin de Centro" | "Publicador"
type Status = "Ativo" | "Inativo"

interface User {
  id: string
  name: string
  email: string
  role: Role
  center: string
  status: Status
  createdAt: string
}

const CENTERS = [
  "Centro de Tecnologia",
  "Centro de Saúde",
  "Centro de Humanas",
  "Centro de Ciências Agrárias",
  "Biblioteca Central",
  "Reitoria",
]

const roleBadgeClass: Record<Role, string> = {
  "Super Admin": "bg-purple-100 text-purple-800",
  "Admin de Centro": "bg-blue-100 text-blue-800",
  Publicador: "bg-amber-100 text-amber-800",
}

const statusBadgeClass: Record<Status, string> = {
  Ativo: "bg-emerald-100 text-emerald-800",
  Inativo: "bg-red-100 text-red-800",
}

const MOCK_USERS: User[] = [
  { id: "u1", name: "Ana Beatriz Costa", email: "ana.costa@uni.edu", role: "Super Admin", center: "Todos", status: "Ativo", createdAt: "2024-01-15T10:00:00Z" },
  { id: "u2", name: "Bruno Ferreira Lima", email: "bruno.lima@uni.edu", role: "Super Admin", center: "Todos", status: "Ativo", createdAt: "2024-02-01T10:00:00Z" },
  { id: "u3", name: "Carla Mendes Rocha", email: "carla.rocha@uni.edu", role: "Admin de Centro", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-02-10T10:00:00Z" },
  { id: "u4", name: "Diego Santos Silva", email: "diego.silva@uni.edu", role: "Admin de Centro", center: "Centro de Saúde", status: "Ativo", createdAt: "2024-03-01T10:00:00Z" },
  { id: "u5", name: "Eduarda Alves Nunes", email: "eduarda.nunes@uni.edu", role: "Admin de Centro", center: "Centro de Humanas", status: "Inativo", createdAt: "2024-03-05T10:00:00Z" },
  { id: "u6", name: "Felipe Oliveira Souza", email: "felipe.souza@uni.edu", role: "Admin de Centro", center: "Biblioteca Central", status: "Ativo", createdAt: "2024-03-12T10:00:00Z" },
  { id: "u7", name: "Gabriela Pereira Dias", email: "gabriela.dias@uni.edu", role: "Admin de Centro", center: "Reitoria", status: "Ativo", createdAt: "2024-04-01T10:00:00Z" },
  { id: "u8", name: "Henrique Costa Araújo", email: "henrique.araujo@uni.edu", role: "Admin de Centro", center: "Centro de Ciências Agrárias", status: "Inativo", createdAt: "2024-04-10T10:00:00Z" },
  { id: "u9", name: "Isabela Carvalho Ramos", email: "isabela.ramos@uni.edu", role: "Admin de Centro", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-04-15T10:00:00Z" },
  { id: "u10", name: "João Pedro Martins", email: "joao.martins@uni.edu", role: "Admin de Centro", center: "Centro de Saúde", status: "Ativo", createdAt: "2024-05-01T10:00:00Z" },
  { id: "u11", name: "Larissa Fernandes Gomes", email: "larissa.gomes@uni.edu", role: "Publicador", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-05-05T10:00:00Z" },
  { id: "u12", name: "Marcelo Ribeiro Castro", email: "marcelo.castro@uni.edu", role: "Publicador", center: "Centro de Humanas", status: "Ativo", createdAt: "2024-05-10T10:00:00Z" },
  { id: "u13", name: "Natália Sousa Pinto", email: "natalia.pinto@uni.edu", role: "Publicador", center: "Biblioteca Central", status: "Inativo", createdAt: "2024-05-15T10:00:00Z" },
  { id: "u14", name: "Otávio Henrique Lopes", email: "otavio.lopes@uni.edu", role: "Publicador", center: "Reitoria", status: "Ativo", createdAt: "2024-06-01T10:00:00Z" },
  { id: "u15", name: "Patrícia Almeida Cruz", email: "patricia.cruz@uni.edu", role: "Publicador", center: "Centro de Saúde", status: "Ativo", createdAt: "2024-06-05T10:00:00Z" },
  { id: "u16", name: "Rafael Monteiro Barros", email: "rafael.barros@uni.edu", role: "Publicador", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-06-10T10:00:00Z" },
  { id: "u17", name: "Sofia Batista Vieira", email: "sofia.vieira@uni.edu", role: "Publicador", center: "Centro de Ciências Agrárias", status: "Inativo", createdAt: "2024-06-15T10:00:00Z" },
  { id: "u18", name: "Thiago Moreira Cardoso", email: "thiago.cardoso@uni.edu", role: "Publicador", center: "Centro de Humanas", status: "Ativo", createdAt: "2024-07-01T10:00:00Z" },
  { id: "u19", name: "Vanessa Correia Dias", email: "vanessa.dias@uni.edu", role: "Publicador", center: "Biblioteca Central", status: "Ativo", createdAt: "2024-07-05T10:00:00Z" },
  { id: "u20", name: "William Andrade Teixeira", email: "william.teixeira@uni.edu", role: "Publicador", center: "Reitoria", status: "Ativo", createdAt: "2024-07-10T10:00:00Z" },
  { id: "u21", name: "Amanda Rocha Figueira", email: "amanda.figueira@uni.edu", role: "Publicador", center: "Centro de Saúde", status: "Inativo", createdAt: "2024-07-15T10:00:00Z" },
  { id: "u22", name: "Bruno César Nogueira", email: "bruno.nogueira@uni.edu", role: "Publicador", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-08-01T10:00:00Z" },
  { id: "u23", name: "Camila Duarte Pires", email: "camila.pires@uni.edu", role: "Publicador", center: "Centro de Humanas", status: "Ativo", createdAt: "2024-08-05T10:00:00Z" },
  { id: "u24", name: "Daniel Lopes Furtado", email: "daniel.furtado@uni.edu", role: "Publicador", center: "Centro de Ciências Agrárias", status: "Ativo", createdAt: "2024-08-10T10:00:00Z" },
  { id: "u25", name: "Erika Sales Barbosa", email: "erika.barbosa@uni.edu", role: "Publicador", center: "Biblioteca Central", status: "Inativo", createdAt: "2024-08-15T10:00:00Z" },
  { id: "u26", name: "Fábio Augusto Melo", email: "fabio.melo@uni.edu", role: "Publicador", center: "Reitoria", status: "Ativo", createdAt: "2024-09-01T10:00:00Z" },
  { id: "u27", name: "Gisele Tavares Reis", email: "gisele.reis@uni.edu", role: "Publicador", center: "Centro de Tecnologia", status: "Ativo", createdAt: "2024-09-05T10:00:00Z" },
  { id: "u28", name: "Hugo Nascimento Peixoto", email: "hugo.peixoto@uni.edu", role: "Publicador", center: "Centro de Saúde", status: "Ativo", createdAt: "2024-09-10T10:00:00Z" },
  { id: "u29", name: "Igor Pacheco Lemos", email: "igor.lemos@uni.edu", role: "Publicador", center: "Centro de Humanas", status: "Inativo", createdAt: "2024-09-15T10:00:00Z" },
  { id: "u30", name: "Juliana Marques Bento", email: "juliana.bento@uni.edu", role: "Publicador", center: "Biblioteca Central", status: "Ativo", createdAt: "2024-10-01T10:00:00Z" },
  { id: "u31", name: "Leandro Gouvea Prado", email: "leandro.prado@uni.edu", role: "Publicador", center: "Reitoria", status: "Ativo", createdAt: "2024-10-05T10:00:00Z" },
  { id: "u32", name: "Marcia Beltrão Sá", email: "marcia.sa@uni.edu", role: "Publicador", center: "Centro de Ciências Agrárias", status: "Ativo", createdAt: "2024-10-10T10:00:00Z" },
]

const PAGE_SIZE = 10
const LOAD_DELAY = 800

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [search, setSearch] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  // Form state
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formRole, setFormRole] = useState<Role>("Publicador")
  const [formCenter, setFormCenter] = useState(CENTERS[0])
  const [formStatus, setFormStatus] = useState<Status>("Ativo")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const filteredUsers = useCallback(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }, [users, search])

  const filtered = filteredUsers()
  const visibleUsers = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reset pagination when search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search])

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setVisibleCount((prev) => prev + PAGE_SIZE)
            setIsLoading(false)
          }, LOAD_DELAY)
        }
      },
      { rootMargin: "100px" },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading])

  const openCreateDialog = useCallback(() => {
    setEditingUser(null)
    setFormName("")
    setFormEmail("")
    setFormRole("Publicador")
    setFormCenter(CENTERS[0])
    setFormStatus("Ativo")
    setErrors({})
    setDialogOpen(true)
  }, [])

  const openEditDialog = useCallback((user: User) => {
    setEditingUser(user)
    setFormName(user.name)
    setFormEmail(user.email)
    setFormRole(user.role)
    setFormCenter(user.center === "Todos" ? CENTERS[0] : user.center)
    setFormStatus(user.status)
    setErrors({})
    setDialogOpen(true)
  }, [])

  const validate = useCallback(() => {
    const next: Record<string, string> = {}
    if (formName.trim().length < 3)
      next.name = "Nome deve ter no mínimo 3 caracteres"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail))
      next.email = "Informe um email válido"
    setErrors(next)
    return Object.keys(next).length === 0
  }, [formName, formEmail])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (!validate()) return

      const centerValue = formRole === "Super Admin" ? "Todos" : formCenter

      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  name: formName.trim(),
                  email: formEmail.trim(),
                  role: formRole,
                  center: centerValue,
                  status: formStatus,
                }
              : u,
          ),
        )
        toast.success("Permissões atualizadas", {
          description: `${formName.trim()} foi atualizado com sucesso.`,
        })
      } else {
        const newUser: User = {
          id: `u-${Date.now()}`,
          name: formName.trim(),
          email: formEmail.trim(),
          role: formRole,
          center: centerValue,
          status: "Ativo",
          createdAt: new Date().toISOString(),
        }
        setUsers((prev) => [newUser, ...prev])
        toast.success("Usuário criado", {
          description: `${newUser.name} foi adicionado ao sistema.`,
        })
      }

      setDialogOpen(false)
    },
    [validate, editingUser, formName, formEmail, formRole, formCenter, formStatus],
  )

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
    toast.success("Acesso revogado", {
      description: `${deleteTarget.name} foi removido do sistema.`,
    })
    setDeleteTarget(null)
  }, [deleteTarget])

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Usuários</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie os níveis de acesso e permissões do sistema
          </p>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="size-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome / Email</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Centro Vinculado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn("font-medium", roleBadgeClass[user.role])}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{user.center}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn("font-medium", statusBadgeClass[user.status])}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Abrir menu de ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => openEditDialog(user)}>
                        <Pencil className="size-4" />
                        Editar Permissões
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          toast.info("Redefinição de senha enviada", {
                            description: `Um email foi enviado para ${user.email}.`,
                          })
                        }
                      >
                        <KeyRound className="size-4" />
                        Redefinir Senha
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => setDeleteTarget(user)}
                      >
                        <ShieldOff className="size-4" />
                        Revogar Acesso
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {visibleUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Users className="size-10 text-muted-foreground/40" />
            <p className="text-sm font-medium">Nenhum usuário encontrado</p>
            <p className="text-xs text-muted-foreground">
              Tente ajustar a busca para encontrar o que procura.
            </p>
          </div>
        )}

        {/* Infinite scroll sentinel + loading */}
        {visibleUsers.length > 0 && (
          <div
            ref={sentinelRef}
            className="flex items-center justify-center py-6"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
                Carregando mais usuários...
              </div>
            ) : !hasMore ? (
              <p className="text-sm text-muted-foreground">
                Todos os usuários foram carregados
              </p>
            ) : null}
          </div>
        )}
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser
                ? `Editar Permissões — ${editingUser.name}`
                : "Novo Usuário"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Ajuste os dados e permissões deste usuário."
                : "Preencha os dados para criar um novo usuário no sistema."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Nome Completo</Label>
              <Input
                id="form-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Maria Silva Santos"
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-email">Email</Label>
              <Input
                id="form-email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="exemplo@uni.edu"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nível de Acesso</Label>
                <Select
                  value={formRole}
                  onValueChange={(v) => setFormRole(v as Role)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin de Centro">Admin de Centro</SelectItem>
                    <SelectItem value="Publicador">Publicador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formRole !== "Super Admin" && (
                <div className="space-y-2">
                  <Label>Centro / Prédio</Label>
                  <Select
                    value={formCenter}
                    onValueChange={setFormCenter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CENTERS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {editingUser && (
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formStatus}
                  onValueChange={(v) => setFormStatus(v as Status)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Revogar acesso de {deleteTarget?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá permanentemente o acesso deste usuário ao
              sistema. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revogar Acesso
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
