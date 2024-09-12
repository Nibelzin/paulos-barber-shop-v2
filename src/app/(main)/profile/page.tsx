"use client"

import ChangeProfilePicForm from "@/app/_components/ChangeProfilePicForm"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Input } from "@/app/_components/ui/input"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { FaPen } from "react-icons/fa6"

const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const session = useSession()

  const handleDialogChange = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
      <div className="flex flex-col items-center justify-center">
        <Dialog open={openDialog} onOpenChange={handleDialogChange}>
          <DialogTrigger>
            <div className="group/profile relative mb-12 h-32 w-32">
              <FaPen
                className="absolute right-12 top-12 z-50 opacity-0 transition-all group-hover/profile:opacity-100"
                color="white"
                size={30}
              />
              <Avatar className="relative mb-12 h-32 w-32 transition-all group-hover/profile:brightness-75">
                <AvatarImage
                  src={`${session.data?.user.image}`}
                  className="object-cover"
                />
              </Avatar>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="hidden">Mudar avatar</DialogTitle>
            <ChangeProfilePicForm closeDialog={handleDialogChange} />
          </DialogContent>
        </Dialog>

        <div className="w-96">
          <div className="mb-4 flex flex-col justify-between space-y-2">
            <p>Nome</p>
            <Input defaultValue={session.data?.user.name || ""}></Input>
          </div>
          <div className="mb-4 flex flex-col justify-between space-y-2">
            <p>Email</p>
            <Input defaultValue={session.data?.user.email || ""}></Input>
          </div>
          <div className="mb-12 flex flex-col justify-between space-y-2">
            <p>Senha</p>
            <Input defaultValue="" placeholder="****"></Input>
          </div>
          <Button className="w-full">Editar Informações da conta</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
