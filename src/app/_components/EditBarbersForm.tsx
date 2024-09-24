import { getBarbers, setBarberToUser } from "@/lib/barbers"
import { getAllUsers, getUsers, setUserToBarber } from "@/lib/users"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useToast } from "./hooks/use-toast"
import { useRouter } from "next/navigation"

const EditBarbersForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const [barbers, setBarbers] = useState<User[]>([])
  const [users, setUsers] = useState<User[]>([])

  const [openBarberToUserDialog, setOpenBarberToUserDialog] = useState<
    number | undefined
  >(undefined)

  const handleBarberToUserDialogOpen = (barberId: number | undefined) => {
    setOpenBarberToUserDialog(barberId)
  }

  const handleBarberToUserDialogClose = () => {
    fetchBarbersAndUsers()
    setOpenBarberToUserDialog(undefined)
  }

  const fetchBarbersAndUsers = async () => {
    const fetchedBarbers = await getBarbers()
    const fetchedUsers = await getAllUsers()
    setUsers(fetchedUsers)
    setBarbers(fetchedBarbers)
  }

  const handleUserToBarber = async (id?: number, name?: string) => {
    if (id) {
      const result = await setUserToBarber(id)
    }
    toast({
      description: `${name} agora é um barbeiro!`,
    })
    fetchBarbersAndUsers()
    router.refresh()
  }

  const handleBarberToUser = async (id?: number, name?: string) => {
    if (id) {
      const result = await setBarberToUser(id)
    }
    toast({
      description: `${name} agora é um usuario comum!`,
    })
    fetchBarbersAndUsers()
    handleBarberToUserDialogClose()
    router.refresh()
  }

  useEffect(() => {
    fetchBarbersAndUsers()
  }, [])

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-bold">Barbeiros</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barbers.map((barber) => (
              <>
                <TableRow key={barber.id}>
                  <TableCell>{barber.name}</TableCell>
                  <TableCell>{barber.email}</TableCell>
                  <TableCell
                    className="cursor-pointer text-blue-500 underline"
                    onClick={() => handleBarberToUserDialogOpen(barber.id)}
                  >
                    Transformar em usuario
                  </TableCell>
                </TableRow>
                <Dialog
                  open={openBarberToUserDialog === barber.id}
                  onOpenChange={() => {
                    if (openBarberToUserDialog !== undefined) {
                      setOpenBarberToUserDialog(undefined)
                    } else {
                      setOpenBarberToUserDialog(barber.id)
                    }
                  }}
                >
                  <DialogContent>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>
                      Transformar {barber.name} em usuario removerá todos seus
                      agendamentos.
                    </DialogDescription>
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={() =>
                          handleBarberToUser(barber.id, barber.name)
                        }
                      >
                        Confirmar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleBarberToUserDialogClose}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="font-bold">Usuários</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  className="cursor-pointer text-blue-500 underline"
                  onClick={() => handleUserToBarber(user.id, user.name)}
                >
                  Transformar em barbeiro
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EditBarbersForm
