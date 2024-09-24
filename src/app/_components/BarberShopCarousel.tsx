import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

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

const BarberShopCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="max-w-[700px]">
        {carrouselImages.map((image) => (
          <CarouselItem key={image.id} className="flex justify-center">
            <div>
              <Image
                src={image.img}
                width={700}
                height={100}
                className="rounded-lg"
                style={{
                  objectFit: "contain",
                }}
                alt="carrousel 1"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default BarberShopCarousel
