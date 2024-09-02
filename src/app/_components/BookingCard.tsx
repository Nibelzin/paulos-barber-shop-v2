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

interface BookingCardProps {
  page?: "home" | "booking"
}

const BookingCard = ({ page }: BookingCardProps) => {
  return (
    <div
      className={`${page === "home" ? "max-w-96" : "max-w-full"} max-w-96 space-y-4 rounded-md border bg-white p-4 drop-shadow-md`}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="mb-1 text-lg font-bold">
            Corte + Barba + Sobrancelha
          </h2>
          <div className="w-fit rounded-full border border-green-300 bg-green-100 px-2 py-1">
            <p className="text-xs font-bold text-green-700">Confirmado</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-3xl font-bold">12:30</p>
          <p className="text-sm font-bold text-slate-700">01/09/2024</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <div
          className={`flex justify-between gap-4 ${page === "home" ? "flex-1" : ""}`}
        >
          <p className="font-bold">Profissional:</p>
          <div className="flex items-center gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/profile_1.jpg" />
            </Avatar>
            <p className="text-sm font-bold">Luan Henrique</p>
          </div>
        </div>
        {page == "booking" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <BsThreeDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-1 text-red-500">
                <FaRegTrashAlt />
                <p className="font-bold">Cancelar</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default BookingCard
