import { User } from '@prisma/client'
import { isBase64, isPasswordStrong } from '@utils'
import { throwUserMessages } from 'src/entities/User/utils'

export const UserEntitie = (user: User) => {
  const setUser = async () => {
    if (user.rule !== 'client') throw new Error(throwUserMessages.ruleInvalid)

    if (user.name.length < 15) throw new Error(throwUserMessages.invalidName)

    if (!isPasswordStrong(user.password))
      throw new Error(throwUserMessages.strongPassword)

    if (!user.email || !user.password || !user.name)
      throw new Error(throwUserMessages.areAllFieldsFilled)

    return user
  }

  const getUserByEmail = async (email: string) => {
    if (email !== user.email)
      throw new Error(throwUserMessages.wrongEmailOrPassword)

    if (email === user.email) return user
  }

  const getUserById = async (id: string) => {
    if (!id) throw new Error(throwUserMessages.userNotFound)

    if (id !== user.id) throw new Error(throwUserMessages.userNotFound)

    if (id === user.id) return user
  }

  const patchUserPicture = async (email: string, picture: string) => {
    if (!email) throw new Error(throwUserMessages.userNotFound)

    if (!picture) throw new Error(throwUserMessages.pictureMissing)

    if (!isBase64(picture))
      throw new Error(throwUserMessages.wrongPictureFormat)

    return { ...user, picture }
  }

  return { setUser, getUserById, patchUserPicture, getUserByEmail }
}
