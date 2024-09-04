import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const user: User = await request.json()

  const userExists = await db.user.findFirst({
    where: {
      email: user.email,
    },
  })

  if (userExists) {
    return NextResponse.json({ message: "Usuário já existe" }, { status: 400 })
  }

  const result = await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      admin: user.admin,
      avatarImg: "",
    },
  })

  return NextResponse.json(
    { message: "Usuário cadastrado com sucesso!" },
    { status: 201 },
  )
}
