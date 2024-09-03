"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../_components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "O Nome deve conter pelo menos 2 caracteres",
    })
    .max(50),
  email: z.string().email(),
  password: z.string().min(2).max(50),
})

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex h-full items-center justify-center bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute right-0 top-0 h-full w-full object-cover opacity-25"
      >
        <source src="/login_background.mp4" type="video/mp4" />
      </video>
      <Card className="z-50 w-96">
        <CardHeader className="">
          <Image
            src="paulo_logo.svg"
            width={200}
            height={20}
            style={{
              filter: "brightness(0) saturate(100%)",
            }}
            alt="Paulo's Barbershop Logo"
          />
        </CardHeader>
        <CardContent>
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
                        <Input placeholder="****" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Registrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
