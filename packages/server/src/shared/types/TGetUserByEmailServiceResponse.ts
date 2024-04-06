import { Reader, User } from '@prisma/client'

export type TGetUserByEmailServiceResponse = {
  readers?: Reader[]
} & User
