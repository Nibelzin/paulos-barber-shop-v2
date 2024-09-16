import { Avatar, AvatarImage } from "./ui/avatar"

interface BarberCardProps {
  barber: Barber
}

const BarberCard = ({ barber }: BarberCardProps) => {
  return (
    <div className="flex min-w-72 flex-col items-center gap-4 rounded-md border border-input bg-white p-6 drop-shadow-md">
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={`${barber.avatarImg === null || barber.avatarImg === "" ? "/default_profile_pic.jpg" : barber.avatarImg}`}
          style={{ objectFit: "cover" }}
        />
      </Avatar>
      <div>
        <h2 className="text-xl font-bold">{barber.name}</h2>
        <p className="text-sm font-semibold">{barber.description}</p>
      </div>
    </div>
  )
}

export default BarberCard
