import { Book, Reader, User } from '@prisma/client'
import { IUserRepository } from '@repositories'
import { TUserEntitie } from '@services'
import { TCreateUserResponseSchema } from '@schemas'
import { bookEntitieMock, mockReader } from '~/src/shared/mocks'

type ExtendedUser = User & { books?: Book[]; readers?: Reader[] }

let users: ExtendedUser[] = []

export const inMemoryUserRepository = (): IUserRepository => {
  const createUser = async (user: TUserEntitie): Promise<TCreateUserResponseSchema[]> => {
    const updatedUsers = (users = [
      ...users,
      {
        ...users[0],
        ...user
      }
    ])

    return updatedUsers
  }

  const getUserByEmail = async (
    email: string,
    includeBook?: boolean,
    includeReaders?: boolean
  ): Promise<User | null> => {
    const existingUser = users.find((user) => user.email === email) as ExtendedUser
    const readers: Reader[] = [mockReader]
    const books: Book[] = [bookEntitieMock]

    if (includeBook) {
      existingUser.books = books
    }

    if (includeReaders) {
      existingUser.readers = readers
    }

    return existingUser || null
  }

  const getByUserId = async (userId: string): Promise<User | null> => {
    const existentUser = users.find((user) => user.id === userId)

    return existentUser || null
  }

  const getAllUsers = async (): Promise<User[]> => {
    const allUsers = users

    return allUsers || []
  }

  return {
    createUser,
    getUserByEmail,
    getAllUsers,
    getByUserId
  }
}
