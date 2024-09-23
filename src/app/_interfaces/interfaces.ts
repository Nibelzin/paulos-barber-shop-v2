declare interface User {
  id?: number
  name: string
  email: string
  password: string
  avatarImg?: string | null
  admin: boolean
}

declare interface SignUpFormProps {
  openSuccessDialog: Function
}

declare interface Booking {
  id: number
  serviceId: number
  barberId: number | null
  userId: number
  date: Date
  service: {
    id: number
    name: string
    duration: number
    price: number
    combo: boolean
  }
  barber: {
    id: number
    name: string
    avatarImg: string | null
    description: string | null
  } | null
}

declare interface Service {
  id: number
  name: string
  duration: number
  price: number
  combo: boolean
}

declare interface Barber {
  id: number | null
  name: string
  avatarImg: string | null
  description: string | null
}
