import { FaHome } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <header className="flex justify-between border-b px-8 py-3 md:px-32 xl:px-64">
      <div className="flex items-center gap-4">
        <Button size="sm" className="flex items-center gap-2">
          <FaHome size={18} />
          <p className="font-semibold">Home</p>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FaCalendarAlt size={18} />
          Agendamentos
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <p className="text-sm font-semibold">Perfil</p>
      </div>
    </header>
  )
}

export default Header
