import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const { avatarName, userId } = await request.json()

  const result = await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      avatarImg: `https://dgaffgowljicqcbkgwsa.supabase.co/storage/v1/object/public/user_profile/${userId}/${avatarName}`,
    },
  })

  console.log(result)

  return NextResponse.json(
    { message: "Avatar alterado com sucesso!" },
    { status: 201 },
  )
}
