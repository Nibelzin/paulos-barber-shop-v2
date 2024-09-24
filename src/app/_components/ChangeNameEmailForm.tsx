import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useToast } from "./hooks/use-toast"
import Image from "next/image"
import LoadingIcon from "./LoadingIcon"

const ChangeNameEmailFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "O nome deve conter pelo menos 2 caracteres",
    })
    .max(50, { message: "O nome pode conter no máximo 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
})

interface ChangeNameEmailFormProps {
  cancelEdit?: Function
  updateUserList?: Function
  userToChange?: {
    id: number | undefined
    name: string | undefined
    email: string | undefined
    currUser: boolean
  }
}

const ChangeNameEmailForm = ({
  cancelEdit,
  userToChange,
  updateUserList,
}: ChangeNameEmailFormProps) => {
  const session = useSession()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [enableSave, setEnableSave] = useState(false)

  let defaultUsername = session.data?.user.name
  let defaultEmail = session.data?.user.email
  let id: number | undefined = parseInt(session.data?.user.id!)

  if (userToChange) {
    defaultUsername = userToChange.name
    defaultEmail = userToChange.email
    id = userToChange.id
  }

  const changeNameEmailForm = useForm<
    z.infer<typeof ChangeNameEmailFormSchema>
  >({
    resolver: zodResolver(ChangeNameEmailFormSchema),
    defaultValues: {
      username: `${defaultUsername}`,
      email: `${defaultEmail}`,
    },
  })

  const { watch } = changeNameEmailForm
  const inputUsername = watch("username")
  const inputEmail = watch("email")

  useEffect(() => {
    if (inputUsername !== defaultUsername || inputEmail !== defaultEmail) {
      setEnableSave(true)
    } else {
      setEnableSave(false)
    }
  }, [inputUsername, inputEmail, defaultEmail, defaultUsername])

  async function onSubmit(values: z.infer<typeof ChangeNameEmailFormSchema>) {
    setLoading(true)

    const result = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        passwordChange: false,
        id: id,
      }),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      toast({
        description: "Dados alterados com sucesso",
      })
      if (!userToChange || userToChange.currUser === true) {
        session.update({
          name: values.username,
          email: values.email,
        })
      }
      if (updateUserList) {
        updateUserList()
      }
    } else {
      setLoading(false)
      toast({
        title: "Erro ao alterar dados",
        description: data.message,
      })
    }
  }

  return (
    <Form {...changeNameEmailForm}>
      <form onSubmit={changeNameEmailForm.handleSubmit(onSubmit)}>
        <FormField
          control={changeNameEmailForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} className="border-dashed" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={changeNameEmailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="border-dashed" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mb-4 w-full" disabled={!enableSave}>
          {loading ? <LoadingIcon /> : <p>Salvar</p>}
        </Button>
        {cancelEdit && (
          <Button
            onClick={() => cancelEdit && cancelEdit()}
            className="w-full"
            variant="outline"
          >
            Cancelar
          </Button>
        )}
      </form>
    </Form>
  )
}

export default ChangeNameEmailForm
