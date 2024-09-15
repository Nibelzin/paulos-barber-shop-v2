import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import bcrypt from "bcryptjs"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "./hooks/use-toast"
import Image from "next/image"

const ChangePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não são iguais",
        path: ["confirmPassword"],
      })
    }
  })

interface ChangePasswordFormProps {
  cancelEdit: Function
}

const ChangePasswordForm = ({ cancelEdit }: ChangePasswordFormProps) => {
  const session = useSession()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [enableSave, setEnableSave] = useState(false)

  async function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
    setLoading(true)
    const { password } = values

    const result = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        passwordChange: true,
        id: session.data?.user.id,
      }),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      toast({
        description: "Senha alterada com sucesso",
      })
    } else {
      setLoading(false)
      toast({
        title: "Erro ao alterar a senha",
        description: data.message,
      })
    }
  }

  const changePasswordForm = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
  })

  const { watch } = changePasswordForm
  const passwordInput = watch("password")
  const newPasswordInput = watch("confirmPassword")

  const emptyInputs =
    passwordInput === undefined ||
    passwordInput === "" ||
    newPasswordInput === undefined ||
    newPasswordInput === undefined

  useEffect(() => {
    if (emptyInputs) {
      setEnableSave(false)
    } else {
      setEnableSave(true)
    }
  }, [passwordInput, newPasswordInput])

  return (
    <Form {...changePasswordForm}>
      <form onSubmit={changePasswordForm.handleSubmit(onSubmit)}>
        <FormField
          control={changePasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input {...field} className="border-dashed" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={changePasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Confirmar nova senha</FormLabel>
              <FormControl>
                <Input {...field} className="border-dashed" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mb-4 w-full" disabled={!enableSave}>
          {loading ? (
            <Image src="/loading.svg" width={20} height={20} alt="loading" />
          ) : (
            <p>Alterar Senha</p>
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

export default ChangePasswordForm
