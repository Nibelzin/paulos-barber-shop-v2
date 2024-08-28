import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"
import BarberCard from "./_components/BarberCard"

const barber = [
  {
    name: "Luan Henrique",
    description: "15 Anos de experiencia",
    imageURL: "",
  },
]

const carrouselImages = [
  "/carrousel_1.jpg",
  "/carrousel_2.jpg",
  "/carrousel_3.jpg",
]

export default function Home() {
  return (
    <div className="bg-man relative h-full bg-slate-50 px-12 md:px-32">
      <Image
        src="/bg_man.svg"
        width={900}
        height={600}
        className="fixed -right-10 top-80 opacity-20"
        alt="bg man"
      />
      <div className="z-10">
        <div className="mb-16 flex w-full flex-col items-center gap-16 xl:flex-row">
          <div className="mt-16 flex">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="max-w-[700px]">
                {carrouselImages.map((image) => (
                  <CarouselItem key={image} className="flex justify-center">
                    <Image
                      src={image}
                      width={700}
                      height={600}
                      className="rounded-lg"
                      objectFit="contains"
                      alt="carrousel 1"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="w-full space-y-2 text-left xl:w-fit">
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
        <div className="space-y-4">
          <p className="text-2xl font-bold">Membros da equipe</p>
          <BarberCard />
        </div>
      </div>
    </div>
  )
}
