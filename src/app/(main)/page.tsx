import Image from "next/image"
import BarberCard from "../_components/BarberCard"
import ServiceCard from "../_components/ServiceCard"
import Map from "../_components/Map"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import BookingCard from "../_components/BookingCard"
import { getBookings, getNextBookings } from "@/lib/bookings"
import { getComboServices, getSoloServices } from "@/lib/services"
import { getBarbers } from "@/lib/barbers"
import BarberShopCarousel from "../_components/BarberShopCarousel"

export default async function Home() {
  const nextBookings = await getNextBookings()

  const soloServices = await getSoloServices()
  const comboServices = await getComboServices()

  const bookings = await getBookings()
  const barbers = await getBarbers()

  return (
    <div className="bg_man z-0 h-full bg-slate-50 px-8 pt-16 dark:bg-neutral-950 md:px-32 xl:px-64">
      <div className="z-10">
        <div className="mb-16 flex w-full flex-col items-center gap-16 md:flex-row">
          <div className="mt-16 flex">
            <BarberShopCarousel />
          </div>
          <div className="w-full space-y-2 text-left md:w-96">
            <Image
              src="paulo_logo.svg"
              width={500}
              height={90}
              className="brightness-0 saturate-100 filter dark:invert"
              alt="Paulo's Barbershop Logo"
            />
            <p>
              Onde tradição e experiencia se encontram para oferecer a você a
              melhor experiencia em cortes.
            </p>
            <p></p>
          </div>
        </div>
        {nextBookings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Próximo Agendamento</h2>
            <div className="flex w-full gap-4 overflow-x-auto">
              {nextBookings.map((booking) => (
                <BookingCard key={booking.id} page="home" booking={booking} />
              ))}
            </div>
          </div>
        )}
        <hr className="my-16" />
        <div className="mb-16 flex w-full flex-col gap-6 xl:flex-row">
          <div className="relative h-fit flex-1 rounded-md border bg-white p-4 drop-shadow dark:bg-neutral-900">
            <Image
              src="/scissor.png"
              width={60}
              height={60}
              alt="Scissor"
              className="absolute -right-6 -top-6"
            />
            <h2 className="text-2xl font-bold">Serviços</h2>
            <div>
              {soloServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  barbers={barbers}
                  bookings={bookings}
                />
              ))}
            </div>
          </div>
          <div className="relative h-fit flex-1 rounded-md border bg-white p-4 drop-shadow dark:bg-neutral-900">
            <Image
              src="/scissor.png"
              width={60}
              height={60}
              alt="Scissor"
              className="absolute -right-6 -top-6"
            />
            <h2 className="text-2xl font-bold">Combos</h2>
            <div>
              {comboServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  barbers={barbers}
                  bookings={bookings}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mb-16 space-y-4">
          <h2 className="text-2xl font-bold">Membros da equipe</h2>
          <div className="flex gap-4 overflow-x-scroll">
            {barbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>
        </div>
        <div className="mb-16 flex w-full flex-col gap-6 md:flex-row">
          <div className="mb-16 flex flex-1 flex-col">
            <h2 className="mb-4 text-2xl font-bold">
              Horário de Funcionamento
            </h2>
            <div className="space-y-2 dark:text-white">
              <div className="flex justify-between font-bold">
                <p>Segunda-Feira</p>
                <p>Fechado</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Terça-Feira</p>
                <p>09:00 - 20:00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Quarta-Feira</p>
                <p>09:00 - 20:00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Quinta-Feira</p>
                <p>09:00 - 20:00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Sexta-Feira</p>
                <p>09:00 - 20:00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Sábado</p>
                <p>08:00 - 20:00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Domingo</p>
                <p>08:00 - 15:00</p>
              </div>
            </div>
            <hr className="my-4" />
            <h2 className="mb-4 text-2xl font-bold">Contato</h2>
            <div className="mb-4 flex gap-2">
              <FaWhatsapp size={25} fill="green" />
              <p className="font-bold">(11) 97654-3210</p>
            </div>
            <div className="flex gap-2">
              <div>
                <svg width="0" height="0">
                  <linearGradient
                    id="blue-gradient"
                    x1="100%"
                    y1="50%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop stopColor="#833ab4" offset="0%" />
                    <stop stopColor="#fd1d1d" offset="50%" />
                    <stop stopColor="#fcb045" offset="100%" />
                  </linearGradient>
                </svg>
                <FaInstagram
                  size={25}
                  style={{ fill: "url(#blue-gradient)" }}
                />
              </div>
              <p className="font-bold">@paulosbarbershop</p>
            </div>
          </div>
          <div className="w-full md:flex-1">
            <div className="mb-4 h-96 w-full overflow-hidden rounded-md shadow-md md:flex-1">
              <Map />
            </div>
            <h2 className="text-xl font-bold">
              Av. Ficticia Por Razões, 1345, 01234-10
            </h2>
            <h2 className="text-lg font-bold">São Paulo - SP</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
