"use client"

import { z } from "zod"
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
import { FaKey, FaPen } from "react-icons/fa6"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ChangeNameEmailForm from "@/app/_components/ChangeNameEmailForm"
import { Label } from "@/app/_components/ui/label"
import ChangePasswordForm from "@/app/_components/ChangePasswordForm"

const Profile = () => {
  const [credentialsMode, setCredentialsMode] = useState<
    "view" | "changeNameEmail" | "changePassword"
  >("view")

  const [openDialog, setOpenDialog] = useState(false)
  const session = useSession()

  const handleDialogChange = () => {
    setOpenDialog(!openDialog)
  }

  const handleCancelButtonClick = () => {
    setCredentialsMode("view")
  }

  return (
    <div className="bg-man relative flex h-full items-center justify-center bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
      <div className="flex w-96 flex-col items-center">
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

        <div className="w-full">
          {(() => {
            switch (credentialsMode) {
              case "view":
                return (
                  <>
                    <div>
                      <div className="mb-4 space-y-2">
                        <Label>Nome</Label>
                        <Input
                          className="mt-3"
                          readOnly
                          defaultValue={session.data?.user.name}
                        />
                      </div>
                      <div className="mb-12 space-y-2">
                        <Label>Email</Label>
                        <Input
                          className="mt-3"
                          readOnly
                          defaultValue={session.data?.user.email}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => setCredentialsMode("changeNameEmail")}
                      className="mb-4 w-full"
                    >
                      Editar Informações da conta
                    </Button>
                    <Button
                      onClick={() => setCredentialsMode("changePassword")}
                      className="flex w-full gap-2"
                    >
                      <FaKey /> Alterar Senha
                    </Button>
                  </>
                )
              case "changeNameEmail":
                return (
                  <>
                    <ChangeNameEmailForm cancelEdit={handleCancelButtonClick} />
                  </>
                )
              case "changePassword":
                return (
                  <>
                    <ChangePasswordForm cancelEdit={handleCancelButtonClick} />
                  </>
                )
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default Profile
