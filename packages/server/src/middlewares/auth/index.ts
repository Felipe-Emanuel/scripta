import { FastifyReply } from 'fastify'
import { globalErrorMessage } from '@utils'
import { verifyToken } from '@utils'

export const authorization = async (accessToken: string, reply: FastifyReply) => {
  let isTokenValid = false
  const veryfiedToken = await verifyToken(accessToken)
  const decoded = accessToken && veryfiedToken

  if (accessToken) {
    decoded ? (isTokenValid = true) : (isTokenValid = false)
  }

  if (!isTokenValid) reply.status(401).send({ message: globalErrorMessage.unauthorized })
}
