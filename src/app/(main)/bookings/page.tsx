import { db } from "@/lib/prisma"
import BookingCard from "../../_components/BookingCard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  const getBookings = async () => {
    if (!session?.user) {
      return []
    }
    return db.booking.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
      include: {
        service: {},
        barber: {},
      },
    })
  }

  const bookings = await getBookings()

  console.log(bookings)

  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
      <h2 className="text-2xl font-bold">Agendamentos</h2>
      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} page="booking" booking={booking} />
        ))}
      </div>
    </div>
  )
}

export default Bookings
