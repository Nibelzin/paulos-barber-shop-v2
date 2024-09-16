import { Button } from "./ui/button"

interface ServiceCardProps {
  service: Service
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const getFormattedDuration = () => {
    if (service.duration < 60) {
      return service.duration + " min"
    } else {
      const hours = Math.floor(service.duration / 60)
      const minutes = service.duration % 60
      return hours + " hr " + minutes + " min"
    }
  }

  const duration = getFormattedDuration()
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(service.price)

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
          <Button>Reservar</Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
