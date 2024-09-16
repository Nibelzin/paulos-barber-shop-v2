declare interface User {
  name: string
  email: string
  password: string
  avatarImg?: string
  admin: boolean
}

declare interface SignUpFormProps {
  openSuccessDialog: Function
}

declare interface Booking {
  id: number
  serviceId: number
  barberId: number
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
  }
}

declare interface Service {
  id: number
  name: string
  duration: number
  price: number
  combo: boolean
}

declare interface Barber {
  id: number
  name: string
  avatarImg: string | null
  description: string | null
}
