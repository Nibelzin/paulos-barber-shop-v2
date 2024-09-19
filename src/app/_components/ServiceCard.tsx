"use client"

import { getFormattedDuration, getFormettedPrice } from "@/lib/utils"
import BookingForm from "./BookingForm"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"

interface ServiceCardProps {
  service: Service
  bookings?: Booking[]
  barbers?: Barber[]
}

const ServiceCard = ({ service, bookings, barbers }: ServiceCardProps) => {
  const [open, setOpen] = useState(false)

  const duration = getFormattedDuration(service.duration)
  const price = getFormettedPrice(service.price)

  return (
    <div className="rounded-md p-2">
      <hr className="my-4" />
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p className="text-xs font-bold text-slate-600">{duration}</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <p className="text-lg font-bold">{price}</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Reservar</Button>
            </DialogTrigger>
            <DialogContent className="h-[620px] overflow-y-auto md:h-fit">
              <DialogTitle className="text-xl">Agendar Serviço</DialogTitle>
              {bookings && barbers && (
                <BookingForm
                  service={service}
                  bookings={bookings}
                  barbers={barbers}
                  closeDialog={() => setOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
