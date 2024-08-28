import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"
import BarberCard from "./_components/BarberCard"
import ServiceCard from "./_components/ServiceCard"

const barbers = [
  {
    id: 1,
    name: "Luan Henrique",
    description: "10 Anos de experiencia",
    imageUrl: "/profile_1.jpg",
  },
  {
    id: 2,
    name: "Paulo Souza",
    description: "2 Anos de experiencia",
    imageUrl: "/profile_2.jpg",
  },
  {
    id: 3,
    name: "Lucas Simplício",
    description: "4 Anos de experiencia",
    imageUrl: "/profile_3.jpg",
  },
]

const carrouselImages = [
  {
    id: 1,
    img: "/carrousel_1.jpg",
  },
  {
    id: 2,
    img: "/carrousel_2.jpg",
  },
  {
    id: 3,
    img: "/carrousel_3.jpg",
  },
]

export default function Home() {
  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 md:px-32 xl:px-64">
      <Image
        src="/bg_man.svg"
        width={900}
        height={600}
        className="fixed -right-10 top-80 opacity-20"
        alt="bg man"
      />
      <div className="z-10">
        <div className="mb-16 flex w-full flex-col items-center gap-16 md:flex-row">
          <div className="mt-16 flex">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="max-w-[700px]">
                {carrouselImages.map((image) => (
                  <CarouselItem key={image.id} className="flex justify-center">
                    <Image
                      src={image.img}
                      width={700}
                      height={600}
                      className="rounded-lg"
                      style={{
                        objectFit: "contain",
                      }}
                      alt="carrousel 1"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="w-full space-y-2 text-left md:w-96">
            <Image
              src="paulo_logo.svg"
              width={300}
              height={20}
              style={{
                filter: "brightness(0) saturate(100%)",
              }}
              alt="Paulo's Barbershop Logo"
            />
            <p>
              Onde tradição e experiencia se encontram para oferecer a você a
              melhor experiencia em cortes.
            </p>
          </div>
        </div>
        <div className="mb-16 flex w-full flex-col gap-6 xl:flex-row">
          <div className="relative h-fit flex-1 rounded-md border bg-white p-4 drop-shadow">
            <Image
              src="/scissor.png"
              width={60}
              height={60}
              alt="Scissor"
              className="absolute -right-6 -top-6"
            />
            <h2 className="text-2xl font-bold">Serviços</h2>
            <div>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </div>
          </div>
          <div className="relative h-fit flex-1 rounded-md border bg-white p-4 drop-shadow">
            <Image
              src="/scissor.png"
              width={60}
              height={60}
              alt="Scissor"
              className="absolute -right-6 -top-6"
            />
            <h2 className="text-2xl font-bold">Combos</h2>
            <div>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </div>
          </div>
        </div>
        <div className="mb-16 space-y-4">
          <h2 className="text-2xl font-bold">Membros da equipe</h2>
          <div className="flex gap-4 overflow-x-scroll">
            {barbers.map((barber) => (
              <BarberCard
                key={barber.id}
                name={barber.name}
                imageUrl={barber.imageUrl}
                description={barber.description}
              />
            ))}
          </div>
        </div>
        <div className="mb-16 space-y-4">
          <h2 className="text-2xl font-bold">Horário de Funcionamento</h2>
          <div className="max-w-[700px] space-y-2">
            <div className="flex justify-between font-bold text-slate-700">
              <p>Segunda-Feira</p>
              <p>Fechado</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Terça-Feira</p>
              <p>09:00 - 20:00</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Quarta-Feira</p>
              <p>09:00 - 20:00</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Quinta-Feira</p>
              <p>09:00 - 20:00</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Sexta-Feira</p>
              <p>09:00 - 20:00</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Sábado</p>
              <p>08:00 - 20:00</p>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <p>Domingo</p>
              <p>08:00 - 15:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
