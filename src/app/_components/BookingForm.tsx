"use client"

import { generateTimeSlots, getFormattedDuration } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import dayjs from "dayjs"

interface BookingFormProps {
  service: Service
  bookings: Booking[]
}

const BookingForm = ({ service, bookings }: BookingFormProps) => {
  const duration = getFormattedDuration(service.duration)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedDate = dayjs(date)

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
    <div>
      <div className="mb-6 space-y-1">
        <p>
          <span className="font-bold">Tipo:</span> {service.name}
        </p>
        <p>
          <span className="font-bold">Duração:</span> {duration}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Calendar
          fromDate={new Date()}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex h-full"
        />
      </div>
      <div>
        <p>Horario</p>
      </div>
    </div>
  )
}

export default BookingForm
