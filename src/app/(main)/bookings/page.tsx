import BookingCard from "../../_components/BookingCard"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { getConcludedBookings, getNextBookings } from "@/lib/bookings"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

dayjs.extend(utc)

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const nextBookings = await getNextBookings()
  const concludedBookings = await getConcludedBookings()

  const nextServices = await getNextBookings(true)
  const concludedServices = await getConcludedBookings(true)

  const showMyBookings =
    session?.user.isBarber === false ||
    nextBookings.length > 0 ||
    concludedBookings.length > 0
  const showMyServices = session?.user.isBarber === true

  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 dark:bg-zinc-950 md:px-32 xl:px-64">
      <div className="mb-12">
        {showMyServices && (
          <>
            <h2 className="text-2xl font-bold">Meus Serviços</h2>
            {nextServices.length !== 0 && (
              <div className="mt-8">
                <p className="text-xl font-semibold">Próximo(s)</p>
                <div className="mt-4 space-y-4">
                  {nextServices.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      page="booking"
                      booking={booking}
                    />
                  ))}
                </div>
              </div>
            )}
            {concludedServices.length !== 0 && (
              <div className="mt-8">
                <p className="text-xl font-semibold">Concluídos</p>
                <div className="mt-4 space-y-4">
                  {concludedServices.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      page="booking"
                      booking={booking}
                    />
                  ))}
                </div>
              </div>
            )}
            {concludedServices.length === 0 && nextBookings.length === 0 && (
              <p className="mt-2">Sem agendamentos</p>
            )}
          </>
        )}
      </div>
      <div>
        {showMyBookings && (
          <>
            <h2 className="text-2xl font-bold">Meus Agendamentos</h2>
            {nextBookings.length !== 0 && (
              <div className="mt-8">
                <p className="text-xl font-semibold">Próximo(s)</p>
                <div className="mt-4 space-y-4">
                  {nextBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      page="booking"
                      booking={booking}
                    />
                  ))}
                </div>
              </div>
            )}
            {concludedBookings.length !== 0 && (
              <div className="mt-8">
                <p className="text-xl font-semibold">Concluídos</p>
                <div className="mt-4 space-y-4">
                  {concludedBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      page="booking"
                      booking={booking}
                    />
                  ))}
                </div>
              </div>
            )}
            {concludedBookings.length === 0 && nextBookings.length === 0 && (
              <p className="mt-2">Sem agendamentos</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Bookings
