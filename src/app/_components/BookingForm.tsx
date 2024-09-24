"use client"

import { generateTimeSlots, getFormettedPrice } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { createRef, useEffect, useState } from "react"
import dayjs from "dayjs"
import { Badge } from "./ui/badge"
import BookingOrder from "./BookingOrder"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useToast } from "./hooks/use-toast"
import { useRouter } from "next/navigation"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import LoadingIcon from "./LoadingIcon"

interface BookingFormProps {
  service: Service
  bookings: Booking[]
  barbers: Barber[]
  closeDialog: Function
}

const BookingForm = ({
  service,
  bookings,
  barbers,
  closeDialog,
}: BookingFormProps) => {
  const [hoursScrollPosition, setHoursScrollPosition] = useState(0)
  const hoursContainerRef = createRef<HTMLDivElement>()

  const handleScrollButtonClick = (scrollAmount: number) => {
    const newScrollPosition = hoursScrollPosition + scrollAmount

    setHoursScrollPosition(newScrollPosition)

    if (hoursContainerRef.current) {
      hoursContainerRef.current.scrollLeft = newScrollPosition
    }
  }

  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedHour, setSelectedHour] = useState<string | undefined>()
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)

  const selectedDate = dayjs(date)
  const formattedPrice = getFormettedPrice(service.price)

  const handleHourBadgeClick = (hour: string) => {
    setSelectedHour(hour)
  }

  const setBookingBarber = (barber: Barber) => {
    setSelectedBarber(barber)
  }

  useEffect(() => {
    setSelectedHour(undefined)
  }, [date])

  const timeHours = generateTimeSlots("09:00", "18:00", 30)

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

  const barberAvailableHours = barbers.map((barber) => {
    const selectedDateBookings = bookings.filter((booking) => {
      if (
        selectedDate.isSame(dayjs(booking.date), "day") &&
        booking.barberId === barber.id
      ) {
        return booking
      }
    })

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

    const availableHours = filteredTimeHours.filter((hour) => {
      if (!hoursTaken.includes(hour)) {
        return hour
      }
    })

    return {
      barberId: barber.id,
      availableHours: availableHours,
    }
  })

  const combinedBarberHours = barberAvailableHours
    .map((barber) => {
      return barber.availableHours
    })
    .flat()

  const noPreferenceAvailableHours = Array.from(
    new Set(combinedBarberHours),
  ).sort((a, b) => {
    return a.localeCompare(b)
  })

  barberAvailableHours.push({
    barberId: -1,
    availableHours: noPreferenceAvailableHours,
  })

  const makeABooking = async () => {
    setLoading(true)
    if (!session.data || !selectedHour) {
      toast({
        description: "É preciso estar logado para agendar um serviço!",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    let barberId = null

    if (!selectedBarber) {
      const availableBarbers = barberAvailableHours.filter((barber) => {
        return (
          barber.availableHours.includes(selectedHour) && barber.barberId !== -1
        )
      })

      const randomIndex = Math.floor(Math.random() * availableBarbers.length)
      barberId = availableBarbers[randomIndex].barberId
    } else {
      barberId = selectedBarber.id
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const booking = {
      serviceId: service.id,
      barberId: barberId,
      userId: parseInt(session.data?.user.id),
      date: date,
      hour: selectedHour,
      timeZone: timeZone,
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
      closeDialog()
      router.refresh()
    } else {
      setLoading(false)
      toast({
        title: "Erro agendar serviço",
        description: data.message,
      })
    }
  }

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
        <div className="flex w-full items-center justify-between gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleScrollButtonClick(-250)}
          >
            <FaChevronLeft />
          </Button>
          <div
            className="no-scrollbar flex w-[200px] gap-2 overflow-x-auto scroll-smooth sm:w-[350px]"
            ref={hoursContainerRef}
          >
            {barberAvailableHours.length > 0 ? (
              barberAvailableHours.map((barber) => {
                if (
                  barber.barberId ===
                  (selectedBarber?.id ? selectedBarber.id : -1)
                ) {
                  return barber.availableHours.map((hour) => (
                    <Badge
                      key={hour}
                      className="cursor-pointer rounded-md p-2"
                      variant={selectedHour === hour ? "default" : "outline"}
                      onClick={() => handleHourBadgeClick(hour)}
                    >
                      {hour}
                    </Badge>
                  ))
                }
              })
            ) : (
              <p>Sem horários disponiveis</p>
            )}
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleScrollButtonClick(250)}
          >
            <FaChevronRight />
          </Button>
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
      <div className="flex flex-col items-center">
        <Button
          className="w-full"
          onClick={makeABooking}
          disabled={selectedHour ? false : true}
        >
          {loading ? <LoadingIcon /> : <p>Salvar</p>}
        </Button>
      </div>
    </div>
  )
}

export default BookingForm
