import BookingCard from "../../_components/BookingCard"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { getConcludedBookings, getNextBookings } from "@/lib/bookings"

dayjs.extend(utc)

const Bookings = async () => {
  const nextBookings = await getNextBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
      <h2 className="text-2xl font-bold">Agendamentos</h2>
      {nextBookings.length !== 0 && (
        <div className="mt-8">
          <p className="text-xl font-semibold">Próximo(s)</p>
          <div className="mt-4 space-y-4">
            {nextBookings.map((booking) => (
              <BookingCard key={booking.id} page="booking" booking={booking} />
            ))}
          </div>
        </div>
      )}
      {concludedBookings.length !== 0 && (
        <div className="mt-8">
          <p className="text-xl font-semibold">Concluídos</p>
          <div className="mt-4 space-y-4">
            {concludedBookings.map((booking) => (
              <BookingCard key={booking.id} page="booking" booking={booking} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings
