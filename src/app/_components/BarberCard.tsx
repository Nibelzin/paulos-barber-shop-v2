import { Avatar, AvatarImage } from "./ui/avatar"

interface BarberCardProps {
  name: string
  imageUrl: string
  description?: string
}

const BarberCard = ({ name, imageUrl, description }: BarberCardProps) => {
  return (
    <div className="flex min-w-72 flex-col items-center gap-4 rounded-md border border-input bg-white p-6 drop-shadow-md">
      <Avatar className="h-20 w-20">
        <AvatarImage src={imageUrl} style={{ objectFit: "cover" }} />
      </Avatar>
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm font-semibold">{description}</p>
      </div>
    </div>
  )
}

export default BarberCard
