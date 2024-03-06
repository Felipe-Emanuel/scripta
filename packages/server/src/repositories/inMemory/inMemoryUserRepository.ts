import { User } from '@prisma/client'
import { IUserRepository } from 'src/repositories/UserRepository'

let users: User[] = []

export const inMemomoryUserRepository = (): IUserRepository => {
  const createUser = async (user: User): Promise<User[]> => {
    const updatedUsers = (users = [{ ...user, ...user }])
    return updatedUsers
  }

  const getUserByEmail = async (email: string): Promise<User | null> => {
    const exisintgUser = users.find((user) => user.email === email)

    return exisintgUser || null
  }

  const patchUserPicture = async (
    email: string,
    picture: string,
  ): Promise<User | null> => {
    const exisintgUser = users.find((user) => user.email === email)

    if (exisintgUser) {
      return {
        ...exisintgUser,
        picture,
      }
    }

    return null
  }

  const getAllUsers = async (): Promise<User[]> => {
    const allUsers = users

    return allUsers || []
  }

  return {
    createUser,
    getUserByEmail,
    patchUserPicture,
    getAllUsers,
  }
}
