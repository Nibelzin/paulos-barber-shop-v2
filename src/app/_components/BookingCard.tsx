"use client"

import { BsThreeDots } from "react-icons/bs"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { FaRegTrashAlt } from "react-icons/fa"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog"
import { useToast } from "./hooks/use-toast"
import Image from "next/image"
import LoadingIcon from "./LoadingIcon"

interface BookingCardProps {
  page?: "home" | "booking"
  booking: Booking
}

const BookingCard = ({ page, booking }: BookingCardProps) => {
  const [loading, setLoading] = useState(false)
  const [openCancelDialog, setOpenCancelDialog] = useState(false)

  const router = useRouter()
  const bookingDate = dayjs(booking.date)

  const { toast } = useToast()

  const getDate = bookingDate.format("DD/MM/YYYY")
  const getHours = bookingDate.format("HH:mm")

  const isPast = bookingDate.isBefore(dayjs())

  const handleCancelDialog = () => {
    setOpenCancelDialog(!openCancelDialog)
  }

  const handleBookingClick = () => {
    router.push("/bookings")
  }

  const cancelBooking = async () => {
    setLoading(true)

    const result = await fetch("/api/booking", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: booking.id,
      }),
    })

    const data = await result.json()

    if (result.ok) {
      setLoading(false)
      toast({
        description: "Agendamento cancelado com sucesso!",
      })
    } else {
      setLoading(false)
      toast({
        title: "Erro cancelar agendamento",
        description: data.message,
      })
    }

    router.refresh()
    handleCancelDialog()
  }

  return (
    <div
      className={`${page === "home" ? "w-96 cursor-pointer" : "max-w-full"} max-w-96 space-y-4 rounded-md border bg-white p-4 drop-shadow-md dark:bg-neutral-900`}
      onClick={handleBookingClick}
    >
      <div className="flex justify-between">
        <div className="w-72">
          <h2 className="mb-1 text-lg font-bold">{booking.service.name}</h2>
          {isPast ? (
            <div className="w-fit rounded-full border border-blue-300 bg-blue-100 px-2 py-1">
              <p className="text-xs font-bold text-blue-700">Concluido</p>
            </div>
          ) : (
            <div className="w-fit rounded-full border border-green-300 bg-green-100 px-2 py-1">
              <p className="text-xs font-bold text-green-700">Confirmado</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-3xl font-bold">{getHours}</p>
          <p className="text-sm font-bold text-neutral-700">{getDate}</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <div
          className={`flex justify-between gap-4 ${page === "home" ? "flex-1" : ""}`}
        >
          <p className="font-bold">Profissional:</p>
          <div className="flex items-center gap-1">
            {booking.barber ? (
              <>
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`${booking.barber.avatarImg === null || booking.barber.avatarImg === "" ? "/default_profile_pic.jpg" : booking.barber.avatarImg}`}
                    className="object-cover"
                  />
                </Avatar>
                <p className="text-sm font-bold">{booking.barber.name}</p>
              </>
            ) : (
              <p>Sem preferencia</p>
            )}
          </div>
        </div>
        {page == "booking" && !isPast && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <BsThreeDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex gap-1 text-red-500"
                onClick={handleCancelDialog}
              >
                <FaRegTrashAlt />
                <p className="font-bold">Cancelar</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Dialog open={openCancelDialog} onOpenChange={handleCancelDialog}>
        <DialogContent>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Esta ação ira cancelar o agendamento do dia {getDate} as {getHours}.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={cancelBooking}
              className="w-full"
              variant="destructive"
            >
              {loading ? <LoadingIcon /> : <p>Confirmar</p>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BookingCard
