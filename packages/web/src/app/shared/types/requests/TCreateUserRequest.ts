export type TCreateUserRequest = {
  user?: {
    name: string
    email: string
    password: string
  }
  token?: string
}
