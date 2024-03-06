import { User } from '@prisma/client'

export interface IUserRepository {
  createUser: (user: User) => Promise<User[]>
  patchUserPicture: (email: string, picture: string) => Promise<User | null>
  getUserByEmail: (email: string) => Promise<User | null>
  getAllUsers: () => Promise<User[]>
}
