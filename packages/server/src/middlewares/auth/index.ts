import { FastifyReply } from 'fastify'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'
import { verifyToken } from 'src/shared/utils/tokens'

export const authorization = async (
  provider: string | string[],
  accessToken: string,
  apply: FastifyReply
) => {
  let isTokenValid = false
  const decoded = accessToken && (await verifyToken(accessToken))

  if (provider) {
    isTokenValid = true
  }

  if (accessToken) {
    decoded ? (isTokenValid = true) : (isTokenValid = false)
  }

  if (!isTokenValid) apply.status(401).send({ message: globalErrorMessage.unauthorized })

  if (provider && accessToken) apply.status(409).send({ message: globalErrorMessage.conflict })
}
