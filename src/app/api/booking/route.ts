import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

dayjs.extend(utc)

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

export async function POST(request: NextRequest) {
  const {
    serviceId,
    barberId,
    userId,
    date,
    hour: time,
    timeZone,
  } = await request.json()

  const [hour, minute] = time.split(":").map(Number)
  const localDateHour = dayjs(date).tz(timeZone).hour(hour).minute(minute)

  const dateHourUtc = localDateHour.utc().toDate()

  const booking = {
    serviceId: serviceId,
    barberId: barberId,
    userId: userId,
    date: dateHourUtc,
  }

  console.log(booking)

  try {
    const result = await db.booking.create({
      data: {
        serviceId: serviceId,
        barberId: barberId,
        userId: userId,
        date: dateHourUtc,
      },
    })

    if (result) {
      return NextResponse.json(
        { message: "Serviço agendado com sucesso!" },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { message: "Erro ao agendar serviço." },
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
