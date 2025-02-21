import { FastifyReply } from 'fastify'
import { globalErrorMessage } from '@utils'
import { verifyToken } from '@utils'

export const authorization = async (
  provider: string | string[],
  accessToken: string,
  reply: FastifyReply
) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log('🚀 Executando em ambiente de desenvolvimento!')
  }

  let isTokenValid = false
  const veryfiedToken = await verifyToken(accessToken)
  const decoded = accessToken && veryfiedToken

  if (accessToken) {
    decoded ? (isTokenValid = true) : (isTokenValid = false)
  }

  if (!isTokenValid) reply.status(401).send({ message: globalErrorMessage.unauthorized })

  if (provider && accessToken) reply.status(409).send({ message: globalErrorMessage.conflict })
}
