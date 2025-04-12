import { User } from '@prisma/client'
import { TCreateUserResponseSchema } from '@schemas'
import { TUserEntitie } from '@services'

export interface IUserRepository {
  createUser: (user: TUserEntitie) => Promise<TCreateUserResponseSchema[]>
  getUserByEmail: (
    email: string,
    includeBook?: boolean,
    includeReaders?: boolean
  ) => Promise<User | null>
  getByUserId: (userId: string) => Promise<User | null>
  getAllUsers: () => Promise<User[]>
}
