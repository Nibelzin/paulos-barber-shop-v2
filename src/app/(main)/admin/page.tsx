"use client"
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
import { getUsers } from "@/lib/users"
import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"

const Admin = () => {
  const [users, setUsers] = useState<User[]>([])
  const [usersPage, setUsersPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(1)

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
  }, [])

  useEffect(() => {
    const numOfPages = Math.ceil(users.length / 10)
    setNumOfPages(numOfPages)
  }, [users])

  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
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
              {users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.admin ? "true" : "false"}</TableCell>
                  <TableCell>
                    <FaRegTrashAlt color="red" />
                  </TableCell>
                </TableRow>
              ))}
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
        <TabsContent value="barbers"></TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
