import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  const { bookingId } = await request.json()

  try {
    const result = await db.booking.delete({
      where: {
        id: parseInt(bookingId),
      },
    })

    if (result) {
      return NextResponse.json(
        { message: "Agendamento cancelado com sucesso!" },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { message: "Erro ao cancelar agendamento" },
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
