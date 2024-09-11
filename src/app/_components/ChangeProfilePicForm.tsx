"use client"

import { FaChevronRight } from "react-icons/fa6"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const ChangeProfilePicForm = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  console.log("SUPABASE", supabaseUrl)
  // const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  // const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

  const session = useSession()

  const [newAvatar, setNewAvatar] = useState<string | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      const imageUrl = URL.createObjectURL(image)
      setNewAvatar(imageUrl)
    } else {
      setNewAvatar(null)
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Avatar Atual</p>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={`${session.data?.user?.image}`}
              className="object-cover"
            />
          </Avatar>
        </div>
        <FaChevronRight />
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Novo Avatar</p>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={
                newAvatar
                  ? newAvatar
                  : "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
              }
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
        <Button>Salvar</Button>
        <Button variant="outline">Cancelar</Button>
      </div>
    </div>
  )
}

export default ChangeProfilePicForm
