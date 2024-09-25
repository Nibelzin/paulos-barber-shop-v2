"use client"
import ChangeNameEmailForm from "@/app/_components/ChangeNameEmailForm"
import EditBarbersForm from "@/app/_components/EditBarbersForm"
import { useToast } from "@/app/_components/hooks/use-toast"
import LoadingIcon from "@/app/_components/LoadingIcon"
import { Button } from "@/app/_components/ui/button"
import { Checkbox } from "@/app/_components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs"
import { getBarbers } from "@/lib/barbers"
import { getUsers, setUserAdmin } from "@/lib/users"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"

const Admin = () => {
  const session = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [users, setUsers] = useState<User[]>([])
  const [barbers, setBarbers] = useState<User[]>([])

  const [loading, setLoading] = useState(false)
  const [usersPage, setUsersPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(1)

  const [openEditDialogUserId, setOpenEditDialogUserId] = useState<
    number | undefined
  >(undefined)

  const [openDeleteDialogUserId, setOpenDeleteDialogUserId] = useState<
    number | undefined
  >(undefined)

  const [openEditBarbersDialog, setOpenEditBarbersDialog] = useState(false)

  const handleEditDialogOpen = (userId: number | undefined) => {
    setOpenEditDialogUserId(userId)
  }

  const handleEditDialogClose = () => {
    fetchBarbers()
    fetchUsers()
    setOpenEditDialogUserId(undefined)
  }

  const handleDeleteDialogOpen = (userId: number | undefined) => {
    setOpenDeleteDialogUserId(userId)
  }

  const handleDeleteDialogClose = () => {
    fetchBarbers()
    fetchUsers()
    setOpenDeleteDialogUserId(undefined)
  }

  const numOfPagesElements = []
  for (let i = 1; i <= numOfPages; i++) {
    numOfPagesElements.push(
      <PaginationItem key={i}>
        <PaginationLink isActive={i === usersPage}>{i}</PaginationLink>
      </PaginationItem>,
    )
  }

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers(usersPage)
    setUsers(fetchedUsers)
  }

  const fetchBarbers = async () => {
    const fetchedBarbers = await getBarbers()
    setBarbers(fetchedBarbers)
  }

  const handleAdminCheckButtonClick = async (
    setAdmin: boolean,
    id?: number,
  ) => {
    if (id) {
      await setUserAdmin(id, setAdmin)
    }
    fetchBarbers()
    fetchUsers()
    return
  }

  const handleDeleteUser = async (userId: number | undefined) => {
    setLoading(true)
    if (userId) {
      const result = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await result.json()

      if (result.ok) {
        setLoading(false)
        toast({
          description: "Usuario excluido com sucesso!",
        })
        handleDeleteDialogClose()
      } else {
        setLoading(false)
        toast({
          title: "Erro ao excluir usuario",
          description: data.message,
        })
      }
    }
  }

  const previousPage = () => {
    if (usersPage - 1 > 0) {
      setUsersPage(usersPage - 1)
    }
  }

  const nextPage = () => {
    if (usersPage + 1 <= numOfPages) {
      setUsersPage(usersPage + 1)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchBarbers()
  }, [])

  useEffect(() => {
    const numOfPages = Math.ceil(users.length / 10)
    setNumOfPages(numOfPages)
  }, [users])

  return (
    session && (
      <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 dark:bg-zinc-950 md:px-32 xl:px-64">
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="barbers">Barbeiros</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin?</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: User) => {
                  const currUser = user.email === session.data?.user.email

                  const userToChange = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    currUser,
                  }

                  return (
                    <>
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={user.admin}
                            disabled={
                              user.email === session.data?.user.email
                                ? true
                                : false
                            }
                            onClick={() =>
                              handleAdminCheckButtonClick(!user.admin, user.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog
                              open={openEditDialogUserId === user.id}
                              onOpenChange={() => {
                                if (openEditDialogUserId !== undefined) {
                                  setOpenEditDialogUserId(undefined)
                                } else {
                                  setOpenEditDialogUserId(user.id)
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleEditDialogOpen(user.id)}
                                >
                                  <FaRegEdit color="" size={15} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Editando {user.email}</DialogTitle>
                                <div>
                                  <ChangeNameEmailForm
                                    userToChange={userToChange}
                                    updateUserList={handleEditDialogClose}
                                  />
                                  <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={handleEditDialogClose}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="icon"
                              variant="outline"
                              disabled={session.data?.user.email === user.email}
                              onClick={() => {
                                if (session.data?.user.email !== user.email) {
                                  handleDeleteDialogOpen(user.id)
                                }
                              }}
                            >
                              <FaRegTrashAlt color="red" size={15} />
                            </Button>
                            <Dialog
                              open={openDeleteDialogUserId === user.id}
                              onOpenChange={() => {
                                if (openDeleteDialogUserId !== undefined) {
                                  setOpenDeleteDialogUserId(undefined)
                                } else {
                                  setOpenDeleteDialogUserId(user.id)
                                }
                              }}
                            >
                              <DialogContent>
                                <DialogTitle>Tem certeza ?</DialogTitle>
                                <DialogDescription>
                                  Você esta prestes a excluir o usuario{" "}
                                  {user.email}, esta acão não pode ser desfeita.
                                </DialogDescription>
                                <DialogFooter>
                                  <div className="flex w-full flex-col">
                                    <Button
                                      className="mb-4 w-full"
                                      variant="destructive"
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      {loading ? (
                                        <LoadingIcon />
                                      ) : (
                                        <p>Excluir</p>
                                      )}
                                    </Button>
                                    <Button
                                      className="w-full"
                                      variant="outline"
                                      onClick={handleDeleteDialogClose}
                                    >
                                      Cancelar
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent className="cursor-pointer">
                <PaginationItem>
                  <PaginationPrevious onClick={previousPage} />
                </PaginationItem>
                {numOfPagesElements}
                <PaginationItem>
                  <PaginationNext onClick={nextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
          <TabsContent value="barbers">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin?</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barbers.map((user: User) => {
                  const currUser = user.email === session.data?.user.email

                  const userToChange = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    currUser,
                  }

                  return (
                    <>
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={user.admin}
                            disabled={
                              user.email === session.data?.user.email
                                ? true
                                : false
                            }
                            onClick={() =>
                              handleAdminCheckButtonClick(!user.admin, user.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog
                              open={openEditDialogUserId === user.id}
                              onOpenChange={() => {
                                if (openEditDialogUserId !== undefined) {
                                  setOpenEditDialogUserId(undefined)
                                } else {
                                  setOpenEditDialogUserId(user.id)
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleEditDialogOpen(user.id)}
                                >
                                  <FaRegEdit color="" size={15} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Editando {user.email}</DialogTitle>
                                <div>
                                  <ChangeNameEmailForm
                                    userToChange={userToChange}
                                    updateUserList={handleEditDialogClose}
                                  />
                                  <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={handleEditDialogClose}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog
                              open={openDeleteDialogUserId === user.id}
                              onOpenChange={() => {
                                if (openDeleteDialogUserId !== undefined) {
                                  setOpenDeleteDialogUserId(undefined)
                                } else {
                                  setOpenDeleteDialogUserId(user.id)
                                }
                              }}
                            >
                              <DialogTrigger>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() =>
                                    handleDeleteDialogOpen(user.id)
                                  }
                                >
                                  <FaRegTrashAlt color="red" size={15} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Tem certeza ?</DialogTitle>
                                <DialogDescription>
                                  Você esta prestes a excluir o usuario{" "}
                                  {user.email}, esta acão não pode ser desfeita.
                                </DialogDescription>
                                <DialogFooter>
                                  <div className="flex w-full flex-col">
                                    <Button
                                      className="mb-4 w-full"
                                      variant="destructive"
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      {loading ? (
                                        <LoadingIcon />
                                      ) : (
                                        <p>Excluir</p>
                                      )}
                                    </Button>
                                    <Button
                                      className="w-full"
                                      variant="outline"
                                      onClick={handleDeleteDialogClose}
                                    >
                                      Cancelar
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
            <div className="flex w-full items-center justify-center">
              <p
                className="cursor-pointer text-blue-500 underline"
                onClick={() => setOpenEditBarbersDialog(true)}
              >
                Adicionar ou remover barbeiros
              </p>
              <Dialog
                open={openEditBarbersDialog}
                onOpenChange={setOpenEditBarbersDialog}
              >
                <DialogContent className="max-w-[900px]">
                  <EditBarbersForm />
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  )
}

export default Admin
