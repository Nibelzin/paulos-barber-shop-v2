"use client"

import {
  generateTimeSlots,
  getFormattedDuration,
  getFormettedPrice,
} from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Badge } from "./ui/badge"
import BookingOrder from "./BookingOrder"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useToast } from "./hooks/use-toast"
import Image from "next/image"

interface BookingFormProps {
  service: Service
  bookings: Booking[]
  barbers: Barber[]
}

const BookingForm = ({ service, bookings, barbers }: BookingFormProps) => {
  const { toast } = useToast()
  const session = useSession()

  const duration = getFormattedDuration(service.duration)

  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedHour, setSelectedHour] = useState<String | undefined>()
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)

  const selectedDate = dayjs(date)
  const formattedPrice = getFormettedPrice(service.price)

  const handleHourBadgeClick = (hour: string) => {
    setSelectedHour(hour)
  }

  const setBookingBarber = (barber: Barber) => {
    setSelectedBarber(barber)
  }

  const makeABooking = async () => {
    setLoading(true)
    if (!session.data) {
      setLoading(false)
      return
    }

    const booking = {
      serviceId: service.id,
      barberId: selectedBarber ? selectedBarber.id : null,
      userId: parseInt(session.data?.user.id),
      date: date,
      hour: selectedHour,
    }

    const result = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      toast({
        description: "Serviço agendado com sucesso!",
      })
    } else {
      setLoading(false)
      toast({
        title: "Erro agendar serviço",
        description: data.message,
      })
    }
  }

  useEffect(() => {
    setSelectedHour(undefined)
  }, [date])

  const selectedDateBookings = bookings.filter((booking) => {
    if (selectedDate.isSame(dayjs(booking.date), "day")) {
      return booking
    }
  })

  const timeHours = generateTimeSlots("09:00", "18:00", 30)
  const hoursTaken: string[] = []

  const now = dayjs()

  const filteredTimeHours = timeHours.filter((hour) => {
    const hourTime = dayjs(hour, "HH:mm")
    if (
      (selectedDate.isSame(now, "day") && hourTime.isAfter(now)) ||
      !selectedDate.isSame(now, "day")
    ) {
      return hour
    }
  })

  selectedDateBookings.map((booking) => {
    const bookingHour = dayjs(booking.date)
    const numHoursTaken = Math.round(booking.service.duration / 30)

    let acumHour = bookingHour
    for (let i = 0; i < numHoursTaken; i++) {
      hoursTaken.push(acumHour.format("HH:mm"))
      acumHour = acumHour.add(30, "minute")
    }
  })

  const availableHours = filteredTimeHours.filter((hour) => {
    if (!hoursTaken.includes(hour)) {
      return hour
    }
  })

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-center">
        <Calendar
          fromDate={new Date()}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex h-full"
        />
      </div>
      <div className="space-y-2">
        <p className="font-bold">Horario</p>
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[320px] max-w-full gap-2 overflow-x-scroll sm:w-[420px]">
            {availableHours.map((hour) => (
              <Badge
                key={hour}
                className="cursor-pointer rounded-md p-2"
                variant={selectedHour === hour ? "default" : "outline"}
                onClick={() => handleHourBadgeClick(hour)}
              >
                {hour}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <BookingOrder
        service={service}
        barbers={barbers}
        date={date}
        hour={selectedHour}
        setBookingBarber={setBookingBarber}
      />
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">{formattedPrice}</p>
      </div>
      <Button
        className="w-full"
        onClick={makeABooking}
        disabled={selectedHour ? false : true}
      >
        {loading ? (
          <Image src="/loading.svg" width={20} height={20} alt="loading" />
        ) : (
          <p>Salvar</p>
        )}
      </Button>
    </div>
  )
}

export default BookingForm
