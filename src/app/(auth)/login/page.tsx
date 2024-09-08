"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "../../_components/ui/card"
import SignInForm from "../../_components/SignInForm"
import { useState } from "react"
import { Button } from "../../_components/ui/button"
import { FaChevronLeft } from "react-icons/fa6"
import Link from "next/link"
import SignUpForm from "../../_components/SingUpForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import { FaCheckCircle } from "react-icons/fa"
import { DialogDescription } from "@radix-ui/react-dialog"

const Login = () => {
  const [signUpMode, setSignUpMode] = useState(false)
  const [SuccessDialog, setSuccessDialog] = useState(false)

  const handleSignUpSuccess = () => {
    setSuccessDialog(!SuccessDialog)
  }

  const handleDialogClick = () => {
    setSuccessDialog(false)
    setSignUpMode(false)
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-black">
      <Button
        className="absolute left-10 top-10 z-50 rounded-full"
        variant="outline"
        size="icon"
      >
        <Link href="/">
          <FaChevronLeft />
        </Link>
      </Button>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute right-0 top-0 h-full w-full object-cover opacity-25"
      >
        <source src="/login_background.mp4" type="video/mp4" />
      </video>
      <Image
        src="paulo_logo.svg"
        width={200}
        height={20}
        alt="Paulo's Barbershop Logo"
        className="z-50 mb-4"
      />
      <Dialog open={SuccessDialog} onOpenChange={handleSignUpSuccess}>
        <DialogContent className="flex max-w-96 flex-col items-center justify-center space-y-4">
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle className="flex justify-center text-xl">
              Conta cadastrada com sucesso!
            </DialogTitle>
            <DialogDescription>Faça login para continuar</DialogDescription>
          </DialogHeader>
          <FaCheckCircle size={140} color="green" />
          <Button className="w-full" onClick={handleDialogClick}>
            Fazer Login
          </Button>
        </DialogContent>
      </Dialog>
      <Card className="z-50 w-96">
        <CardHeader className="flex justify-between">
          {signUpMode ? (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Registrar-se</h1>
              <div className="flex gap-1 text-sm text-slate-600">
                <p>Já possui uma conta?</p>
                <button
                  className="underline"
                  onClick={() => setSignUpMode(false)}
                >
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Login</h1>
              <div className="flex gap-1 text-sm text-slate-600">
                <p>Não possui uma conta?</p>
                <button
                  className="underline"
                  onClick={() => setSignUpMode(true)}
                >
                  Registrar-se
                </button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {signUpMode ? (
            <SignUpForm openSuccessDialog={handleSignUpSuccess} />
          ) : (
            <SignInForm />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
