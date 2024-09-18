"use client"

import { generateTimeSlots, getFormattedDuration } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Badge } from "./ui/badge"
import BookingOrder from "./BookingOrder"
import { Button } from "./ui/button"

interface BookingFormProps {
  service: Service
  bookings: Booking[]
}

const BookingForm = ({ service, bookings }: BookingFormProps) => {
  const duration = getFormattedDuration(service.duration)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedHour, setSelectedHour] = useState<String | undefined>()

  const selectedDate = dayjs(date)

  const handleHourBadgeClick = (hour: string) => {
    setSelectedHour(hour)
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

  selectedDateBookings.map((booking) => {
    const bookingHour = dayjs(booking.date)
    const numHoursTaken = Math.round(booking.service.duration / 30)

    let acumHour = bookingHour
    for (let i = 0; i < numHoursTaken; i++) {
      hoursTaken.push(acumHour.format("HH:mm"))
      acumHour = acumHour.add(30, "minute")
    }
  })

  const availableHours = timeHours.filter((hour) => {
    if (!hoursTaken.includes(hour)) {
      return hour
    }
  })

  console.log(availableHours)

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
      <BookingOrder service={service} date={date} hour={selectedHour} />
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">R$ 20,00</p>
      </div>
      <Button className="w-full">Agendar</Button>
    </div>
  )
}

export default BookingForm
