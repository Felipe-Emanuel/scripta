import jwt from 'jsonwebtoken'
import { throwUserMessages } from '@utils'

const secretKey = process.env.SECRET_TOKEN_KEY

export type TGenerateToken = {
  id: string
}

export type TUserByAuth = {
  id?: string
  email: string
  picture?: string
  name: string
}

export const generateToken = (data: TGenerateToken): string => {
  if (!secretKey) {
    throw new Error(throwUserMessages.invalidSecret)
  }

  return jwt.sign({ id: data.id }, secretKey, { algorithm: 'HS256', expiresIn: '3d' })
}

/**
 *
 * @param token jwt que vem dos headers da requisição do front
 * @returns retorna informações do usuário. Se não for autenticação via oAuth2, apenas id será preenchido
 * @example
 * const decoded = await verifyToken(req.headers.authorization)
 */

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token) as TUserByAuth & { sub?: string }

    return {
      email: decoded?.email,
      name: decoded?.name,
      id: decoded?.sub || decoded?.id,
      picture: decoded?.picture
    }
  } catch (error) {
    throw new Error(throwUserMessages.invalidJWT)
  }
}
