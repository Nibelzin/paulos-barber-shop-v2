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
