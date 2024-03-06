import { User } from '@prisma/client'
import { prisma } from 'src/lib'
import { IUserRepository } from 'src/repositories/UserRepository'

export const databaseUserRepository = (): IUserRepository => {
  const createUser = async (user: User): Promise<User[]> => {
    const users = await prisma.user.create({
      data: user,
    })

    const updatedUsers = [{ ...users, ...user }]
    return updatedUsers
  }

  const getUserByEmail = async (email: string): Promise<User | null> => {
    const users = await prisma.user.findMany({
      where: {
        email,
      },
    })

    const exisintgUser = users.find((user) => user.email === email)

    return exisintgUser || null
  }

  const patchUserPicture = async (
    email: string,
    picture: string,
  ): Promise<User | null> => {
    const users = await prisma.user.findMany({
      where: {
        email,
      },
    })

    const exisintgUser = users.find((user) => user.email === email)

    if (exisintgUser) {
      const updatedUser = {
        ...exisintgUser,
        picture,
      }

      return await prisma.user.update({
        where: {
          email,
        },
        data: updatedUser,
      })
    }

    return null
  }

  const getAllUsers = async (): Promise<User[]> => {
    const existingUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return existingUsers || []
  }

  return { createUser, getUserByEmail, patchUserPicture, getAllUsers }
}
