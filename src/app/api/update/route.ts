import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function PUT(request: NextRequest) {
  const { id, username, email, passwordChange, password } = await request.json()

  try {
    const user = await db.user.findFirst({
      where: { id: parseInt(id) },
    })

    const emailExists = await db.user.findFirst({
      where: { email: email },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não autenticado" },
        { status: 500 },
      )
    }

    if (email && emailExists && email !== user.email) {
      return NextResponse.json(
        { message: "Email não disponivel." },
        { status: 400 },
      )
    }

    if (passwordChange) {
      const samePassword = await bcrypt.compare(password, user?.password)

      if (samePassword) {
        return NextResponse.json(
          { message: "A nova senha não pode ser igual a anterior." },
          { status: 400 },
        )
      }

      const hashNewPassowd = await bcrypt.hash(password, 10)

      const result = await db.user.update({
        where: { id: parseInt(id) },
        data: { password: hashNewPassowd },
      })

      if (result) {
        return NextResponse.json(
          { message: "Senha alterada com sucesso!" },
          { status: 200 },
        )
      } else {
        return NextResponse.json(
          { message: "Erro ao atualizar senha." },
          { status: 500 },
        )
      }
    }

    const result = await db.user.update({
      where: { id: parseInt(id) },
      data: {
        name: username,
        email: email,
      },
    })

    if (result) {
      return NextResponse.json(
        { message: "Dados alterados com sucesso!" },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { message: "Erro ao atualizar dados." },
        { status: 500 },
      )
    }
  } catch (e: any) {
    return NextResponse.json(
      { message: `Erro${e.message ? `: ${e.message}` : "!"}` },
      { status: 500 },
    )
  }
}
