"use client"

import { FaChevronRight } from "react-icons/fa6"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"
import { useToast } from "./hooks/use-toast"

interface ChangeProfilePicFormProps {
  closeDialog: Function
}

const ChangeProfilePicForm = ({ closeDialog }: ChangeProfilePicFormProps) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  console.log("SUPABASE", supabaseUrl)
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

  const session = useSession()

  const oldAvatar = session.data?.user.image
  const oldAvatarName = oldAvatar?.split("/").pop()

  const { toast } = useToast()

  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      const imageUrl = URL.createObjectURL(image)
      setNewAvatar(image)
      setNewAvatarUrl(imageUrl)
    } else {
      setNewAvatar(null)
      setNewAvatarUrl(null)
    }
  }

  const handleUpload = async () => {
    setLoading(true)
    try {
      const oldAvatar = session.data?.user.image
      const oldAvatarName = oldAvatar?.split("/").pop()
      const oldAvatarPath = `${session.data?.user.id}/${oldAvatarName}`

      if (newAvatar) {
        const avatarExt = newAvatar.name.split(".").pop()
        const avatarName = `${uuidv4()}.${avatarExt}`
        const avatarPath = `${session.data?.user.id}/${avatarName}`

        const { error: uploadError } = await supabase.storage
          .from("user_profile")
          .upload(avatarPath, newAvatar)

        if (uploadError) {
          throw new Error("Não foi possível fazer o upload da imagem")
        }

        const result = await fetch("/api/change-avatar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarName, userId: session.data?.user.id }),
        })

        session.update({
          image: `https://dgaffgowljicqcbkgwsa.supabase.co/storage/v1/object/public/user_profile/${session.data?.user.id}/${avatarName}`,
        })

        const removeOldAvatar = await supabase.storage
          .from("user_profile")
          .remove([oldAvatarPath])

        closeDialog()

        toast({
          description: "Avatar alterado com sucesso!",
        })
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Avatar Atual</p>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={`${session.data?.user.image === "" ? "/default_profile_pic.jpg" : session.data?.user.image}`}
              className="object-cover"
            />
          </Avatar>
        </div>
        <FaChevronRight />
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Novo Avatar</p>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={newAvatarUrl ? newAvatarUrl : "/default_profile_pic.jpg"}
              className="object-cover"
            />
          </Avatar>
        </div>
      </div>
      <div>
        <Input
          type="file"
          onChange={handleAvatarChange}
          accept=".png, .jpg, .jpeg"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Button onClick={handleUpload}>
          {loading ? (
            <Image src="/loading.svg" width={20} height={20} alt="loading" />
          ) : (
            <p>Salvar</p>
          )}
        </Button>
        <Button variant="outline" onClick={() => closeDialog()}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default ChangeProfilePicForm
