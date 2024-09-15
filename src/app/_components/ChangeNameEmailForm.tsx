import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useToast } from "./hooks/use-toast"
import Image from "next/image"

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
  cancelEdit: Function
}

const ChangeNameEmailForm = ({ cancelEdit }: ChangeNameEmailFormProps) => {
  const session = useSession()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [enableSave, setEnableSave] = useState(false)

  const defaultUsername = session.data?.user.name
  const defaultEmail = session.data?.user.email

  const changeNameEmailForm = useForm<
    z.infer<typeof ChangeNameEmailFormSchema>
  >({
    resolver: zodResolver(ChangeNameEmailFormSchema),
    defaultValues: {
      username: `${session.data?.user.name}`,
      email: `${session.data?.user.email}`,
    },
  })

  const { watch } = changeNameEmailForm
  const inputUsername = watch("username")
  const inputEmail = watch("email")

  useEffect(() => {
    console.log("teste")
    if (inputUsername !== defaultUsername || inputEmail !== defaultEmail) {
      setEnableSave(true)
    } else {
      setEnableSave(false)
    }
  }, [inputUsername, inputEmail, defaultEmail, defaultUsername])

  async function onSubmit(values: z.infer<typeof ChangeNameEmailFormSchema>) {
    setLoading(true)

    const result = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        passwordChange: false,
        id: session.data?.user.id,
      }),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      toast({
        description: "Dados alterados com sucesso",
      })
      session.update({
        name: values.username,
        email: values.email,
      })
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
            </FormItem>
          )}
        />
        <Button className="mb-4 w-full" disabled={!enableSave}>
          {loading ? (
            <Image src="/loading.svg" width={20} height={20} alt="loading" />
          ) : (
            <p>Salvar</p>
          )}
        </Button>
        <Button
          onClick={() => cancelEdit()}
          className="w-full"
          variant="outline"
        >
          Cancelar
        </Button>
      </form>
    </Form>
  )
}

export default ChangeNameEmailForm
