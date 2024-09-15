import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const { id, username, email, passwordChange, password } = await request.json()

  try {
    if (passwordChange) {
      const result = await db.user.update({
        where: { id: parseInt(id) },
        data: { password: password },
      })

      if (result) {
        return NextResponse.json(
          { message: "Senha alterada com sucesso!" },
          { status: 200 },
        )
      } else {
        return NextResponse.json(
          { message: "Erro ao atualizar senha" },
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
        { message: "Erro ao atualizar dados" },
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
