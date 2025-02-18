import { FastifyReply } from 'fastify'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'
import { verifyToken } from 'src/shared/utils/tokens'

export const authorization = async (
  provider: string | string[],
  accessToken: string,
  reply: FastifyReply
) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log('🚀 Executando em ambiente de desenvolvimento!')
  }

  let isTokenValid = false
  const decoded = accessToken && (await verifyToken(accessToken))

  if (provider) {
    isTokenValid = true
  }

  if (accessToken) {
    decoded ? (isTokenValid = true) : (isTokenValid = false)
  }

  if (!isTokenValid) reply.status(401).send({ message: globalErrorMessage.unauthorized })

  if (provider && accessToken) reply.status(409).send({ message: globalErrorMessage.conflict })
}
