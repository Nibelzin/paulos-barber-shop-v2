import BookingCard from "../_components/BookingCard"

const Bookings = () => {
  return (
    <div className="bg-man relative h-full bg-slate-50 px-8 pb-16 pt-32 md:px-32 xl:px-64">
      <h2 className="text-2xl font-bold">Agendamentos</h2>
      <div className="mt-8 space-y-4">
        <BookingCard page="booking" />
        <BookingCard page="booking" />
        <BookingCard page="booking" />
        <BookingCard page="booking" />
        <BookingCard page="booking" />
      </div>
    </div>
  )
}

export default Bookings
