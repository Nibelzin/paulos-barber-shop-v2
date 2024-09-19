import { getFormattedDuration } from "@/lib/utils"
import { Button } from "./ui/button"
import dayjs from "dayjs"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command"
import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "./ui/avatar"

interface BookingOrderProps {
  service: Service
  date: Date | undefined
  hour: String | undefined
  barbers: Barber[]
  setBookingBarber?: Function
}

const BookingOrder = ({
  service,
  hour,
  date,
  barbers,
  setBookingBarber,
}: BookingOrderProps) => {
  const formattedDuration = getFormattedDuration(service.duration)
  const formattedDate = dayjs(date).format("DD/MM/YYYY")

  const [openSelectBarber, setOpenSelectBarber] = useState(false)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)

  useEffect(() => {
    if (setBookingBarber) {
      setBookingBarber(selectedBarber)
    }
  }, [selectedBarber, setBookingBarber])

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex justify-between">
        <div>
          <h2 className="mb-1 text-lg font-bold">{service.name}</h2>
          <p className="text-xs font-bold text-slate-600">
            {formattedDuration}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          {hour ? (
            <p className="text-3xl font-bold">{hour ? hour : "Sel. Horario"}</p>
          ) : (
            <p>Sel. Horário</p>
          )}
          <p className="text-sm font-bold text-slate-700">{formattedDate}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <div>
          <p className="mb-2 text-sm font-bold">Profissional:</p>
          <div className="flex items-center justify-center gap-2">
            {selectedBarber && (
              <Avatar className="h-4 w-4">
                <AvatarImage
                  src={
                    selectedBarber.avatarImg
                      ? selectedBarber.avatarImg
                      : "/default_profile_pic.jpg"
                  }
                />
              </Avatar>
            )}
            <p className="text-sm">
              {selectedBarber ? selectedBarber.name : "Sem Preferencia"}
            </p>
          </div>
        </div>
        <Popover open={openSelectBarber} onOpenChange={setOpenSelectBarber}>
          <PopoverTrigger asChild>
            <Button variant="outline">Alterar</Button>
          </PopoverTrigger>
          <PopoverContent className="p-2">
            <Command>
              <CommandList>
                <CommandEmpty>Nenhum barbeiro encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedBarber(null)
                      setOpenSelectBarber(false)
                    }}
                  >
                    Sem preferencia
                  </CommandItem>
                  {barbers.map((barber) => (
                    <CommandItem
                      key={barber.id}
                      value={barber.name}
                      onSelect={(value) => {
                        setSelectedBarber(
                          value === selectedBarber?.name ? null : barber,
                        )
                        setOpenSelectBarber(false)
                      }}
                    >
                      {barber.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default BookingOrder
