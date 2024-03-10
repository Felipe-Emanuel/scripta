import { fakeBase64 } from '@constants/fakeBase64'
import { User } from '@prisma/client'
import { UserEntitie } from 'src/entities/User'
import { userEntitieMock } from 'src/entities/User/mocks/userEntitieMock'
import { throwUserMessages } from 'src/entities/User/utils'

describe('setUser', () => {
  it('should throw exception about rule', () => {
    const userWithWrongRule: User = {
      ...userEntitieMock,
      rule: 'admin',
    }

    const { setUser } = UserEntitie(userWithWrongRule)

    const sut = setUser()

    expect(sut).rejects.toThrow(throwUserMessages.ruleInvalid)
  })

  it('should throw a exception if user name is lower than 15', () => {
    const userWithWrongName: User = {
      ...userEntitieMock,
      name: 'John Doe',
    }

    const { setUser } = UserEntitie(userWithWrongName)

    const sut = setUser()

    expect(sut).rejects.toThrow(throwUserMessages.invalidName)
  })

  it('should throw exception about wrong password', () => {
    const userWithWrongPassword: User = {
      ...userEntitieMock,
      password: 'qwerty',
    }

    const { setUser } = UserEntitie(userWithWrongPassword)

    const sut = setUser()
    expect(sut).rejects.toThrow(throwUserMessages.strongPassword)
  })

  it('should throw exception about wrong empty fields', () => {
    const userWithWrongPassword: User = {
      ...userEntitieMock,
      email: '',
    }

    const { setUser } = UserEntitie(userWithWrongPassword)

    const sut = setUser()
    expect(sut).rejects.toThrow(throwUserMessages.areAllFieldsFilled)
  })

  it('should be able to create e new user', () => {
    const { setUser } = UserEntitie(userEntitieMock)

    const sut = setUser()
    expect(sut).resolves.toEqual(userEntitieMock)
  })
})

describe('getUserById', () => {
  it('should throw exception if user is not found', () => {
    const userWithoutId: User = {
      ...userEntitieMock,
      id: '',
    }

    const { getUserById } = UserEntitie(userWithoutId)

    const sut = getUserById(userWithoutId.id)

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should throw a exception if user does not exist', () => {
    const unexistingId = 'unexistentIdAtDatabase'

    const { getUserById } = UserEntitie(userEntitieMock)

    const sut = getUserById(unexistingId)

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should be able to return a existing user', () => {
    const { getUserById } = UserEntitie(userEntitieMock)

    const sut = getUserById(userEntitieMock.id)

    expect(sut).resolves.toEqual(userEntitieMock)
  })
})

describe('patchUserPicture', () => {
  it('should throw exception about user not found', () => {
    const { patchUserPicture } = UserEntitie(userEntitieMock)

    const sut = patchUserPicture('', fakeBase64)

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should throw exception about missing a base64', () => {
    const { patchUserPicture } = UserEntitie(userEntitieMock)

    const sut = patchUserPicture(userEntitieMock.email, '')

    expect(sut).rejects.toThrow(throwUserMessages.pictureMissing)
  })

  it('should throw exception about wrong base64 format', () => {
    const { patchUserPicture } = UserEntitie(userEntitieMock)

    const sut = patchUserPicture(userEntitieMock.email, 'fakeBase64')

    expect(sut).rejects.toThrow(throwUserMessages.wrongPictureFormat)
  })

  it('should be able to patch user picture', () => {
    const newPicture = 'VGVzdGUgZGF0YSBmb3IgYmFzZTY0IGVuY29kaW5nLg=='
    const { patchUserPicture } = UserEntitie(userEntitieMock)

    const sut = patchUserPicture(userEntitieMock.email, newPicture)

    const updatedUser: User = {
      ...userEntitieMock,
      picture: newPicture,
    }

    expect(sut).resolves.toEqual(updatedUser)
  })
})

describe('getUserByEmail', () => {
  it('should throw exception about invalid email', () => {
    const { getUserByEmail } = UserEntitie(userEntitieMock)

    const sut = getUserByEmail('unexistentemail@test.com')

    expect(sut).rejects.toThrow(throwUserMessages.wrongEmailOrPassword)
  })

  it('should be able toi return a existent user by email', () => {
    const { getUserByEmail } = UserEntitie(userEntitieMock)

    const sut = getUserByEmail(userEntitieMock.email)

    expect(sut).resolves.toEqual(userEntitieMock)
  })
})
