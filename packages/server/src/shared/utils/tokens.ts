import jwt from 'jsonwebtoken'
import { throwUserMessages } from 'src/entities/User/utils'
import 'dotenv/config'

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
    const decoded = jwt.verify(token, secretKey, {
      algorithms: ['HS384', 'HS256'],
    })

    return decoded
  } catch (error) {
    throw new Error(throwUserMessages.invalidJWT)
  }
}
