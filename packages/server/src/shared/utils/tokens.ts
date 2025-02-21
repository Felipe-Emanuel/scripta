import jwt from 'jsonwebtoken'
import { throwUserMessages } from 'src/entities/User/utils'

const secretKey = process.env.SECRET_TOKEN_KEY

interface TGenerateToken {
  sub: string
}

export const generateToken = (data: TGenerateToken): string => {
  if (secretKey) {
    return jwt?.sign(data, secretKey, { algorithm: 'HS256', expiresIn: '1day' })
  }
}

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token) as { sub: string; email: string }

    return decoded
  } catch (error) {
    throw new Error(throwUserMessages.invalidJWT)
  }
}
