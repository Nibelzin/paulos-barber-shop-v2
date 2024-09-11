import { z } from "zod"
import { Button } from "./ui/button"
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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

const signInFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
})

const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(user: z.infer<typeof signInFormSchema>) {
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    })

    if (result?.ok) {
      setLoading(false)
      router.push("/")
    }

    if (result?.error) {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 space-y-2">
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
        </div>
        <Button type="submit" className="w-full">
          {loading ? (
            <Image src="/loading.svg" width={20} height={20} alt="loading" />
          ) : (
            <p>Entrar</p>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
