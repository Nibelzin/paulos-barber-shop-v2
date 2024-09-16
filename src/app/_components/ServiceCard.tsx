import { getFormattedDuration, getFormettedPrice } from "@/lib/utils"
import BookingForm from "./BookingForm"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"

interface ServiceCardProps {
  service: Service
}

const ServiceCard = ({ service }: ServiceCardProps) => {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Reservar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Agendar Serviço</DialogTitle>
              <BookingForm service={service} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
