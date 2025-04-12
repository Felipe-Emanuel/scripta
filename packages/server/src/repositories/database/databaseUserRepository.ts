import { User } from '@prisma/client'
import { prisma } from 'src/lib'
import { IUserRepository } from '@repositories'
import { TCreateUserResponseSchema } from '@schemas'
import { TUserEntitie } from '@services'

export const databaseUserRepository = (): IUserRepository => {
  const createUser = async (user: TUserEntitie): Promise<TCreateUserResponseSchema[]> => {
    const { email, name, id } = user

    const users = await prisma.user.create({
      data: {
        id,
        email,
        name,
        password: user?.password,
        rule: '_C'
      }
    })

    const updatedUsers = [{ ...users, ...user }]

    return updatedUsers
  }

  const getUserByEmail = async (
    email: string,
    includeBook = false,
    includeReaders = false
  ): Promise<User | null> => {
    const users = await prisma.user.findMany({
      where: {
        email
      },
      include: {
        books: includeBook,
        readers: includeReaders
      }
    })

    const exisintgUser = users.find((user) => user.email === email)

    return exisintgUser || null
  }

  const getAllUsers = async (): Promise<User[]> => {
    const existingUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return existingUsers || []
  }

  const getByUserId = async (userId: string): Promise<User> => {
    const existingUsers = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return existingUsers || null
  }

  return { createUser, getUserByEmail, getByUserId, getAllUsers }
}
