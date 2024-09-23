import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const { avatarName, userId } = await request.json()
  const supaBaseProfileStorage =
    process.env.NEXT_PUBLIC_SUPABASE_PROFILE_STORAGE

  try {
    const result = await db.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        avatarImg: `${supaBaseProfileStorage}${userId}/${avatarName}`,
      },
    })

    console.log(result)

    return NextResponse.json(
      { message: "Avatar alterado com sucesso!" },
      { status: 201 },
    )
  } catch (e: any) {
    return NextResponse.json(
      { message: `Erro${e.message ? `: ${e.message}` : "!"}` },
      { status: 500 },
    )
  }
}
