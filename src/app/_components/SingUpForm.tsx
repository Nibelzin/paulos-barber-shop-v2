import { z } from "zod"
import { Button } from "./ui/button"
import bcrypt from "bcryptjs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Image from "next/image"
import LoadingIcon from "./LoadingIcon"

const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "O nome deve conter pelo menos 2 caracteres",
      })
      .max(50, { message: "O nome pode conter no máximo 50 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
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

const SignUpForm = ({ openSuccessDialog }: SignUpFormProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setLoading(true)
    const hashPassword = await bcrypt.hash(values.password, 10)
    const user: User = {
      name: values.username,
      email: values.email.toLowerCase(),
      password: hashPassword,
      admin: false,
    }
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      form.reset()
      openSuccessDialog()
    } else {
      setLoading(false)
      form.setError("email", {
        type: "validate",
        message: "Email já cadastrado",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Paulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="paulo@barber.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input placeholder="****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {loading ? <LoadingIcon /> : <p>Registrar</p>}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
