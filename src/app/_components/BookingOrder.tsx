import { getFormattedDuration } from "@/lib/utils"
import { Button } from "./ui/button"
import dayjs from "dayjs"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface BookingOrderProps {
  service: Service
  date: Date | undefined
  hour: String | undefined
}

const BookingOrder = ({ service, hour, date }: BookingOrderProps) => {
  const formattedDuration = getFormattedDuration(service.duration)
  const formattedDate = dayjs(date).format("DD/MM/YYYY")

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex justify-between">
        <div>
          <h2 className="mb-1 truncate text-lg font-bold">{service.name}</h2>
          <p className="text-xs font-bold text-slate-600">
            {formattedDuration}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-3xl font-bold">{hour}</p>
          <p className="text-sm font-bold text-slate-700">{formattedDate}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-bold">Profissional:</p>
          <div>
            <p>Sem preferencia</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Alterar</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>TESTE</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default BookingOrder
