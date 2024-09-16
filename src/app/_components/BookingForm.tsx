import { getFormattedDuration } from "@/lib/utils"

interface BookingFormProps {
  service: Service
}

const BookingForm = ({ service }: BookingFormProps) => {
  const duration = getFormattedDuration(service.duration)

  return (
    <div>
      <p>Tipo: {service.name}</p>
      <p>Duração: {duration}</p>
    </div>
  )
}

export default BookingForm
