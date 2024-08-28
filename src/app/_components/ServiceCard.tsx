import { Button } from "./ui/button"

const ServiceCard = () => {
  return (
    <div className="rounded-md p-2">
      <hr className="my-4" />
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">Corte + Barba + Sobrancelha</h3>
          <p className="text-xs font-bold text-slate-600">45 min</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <p className="text-lg font-bold">R$ 30,00</p>
          <Button>Reservar</Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
