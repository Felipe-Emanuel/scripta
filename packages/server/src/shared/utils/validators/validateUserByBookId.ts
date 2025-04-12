import { GetBookByIdService, TGetBookByIdServiceRequest } from '@services'
import { FastifyReply } from 'fastify'
import { globalErrorMessage, TUserByAuth } from '@utils'

export type TValidateUser = {
  action: TGetBookByIdServiceRequest['action']
  decoded: TUserByAuth
  bookId: string
  reply: FastifyReply
}

export const validateUserByBookId = async ({ action, decoded, bookId, reply }: TValidateUser) => {
  const { getBookById } = action

  const shouldReturnAuthorId = true

  const bookToBeDeleted = await GetBookByIdService({
    action: {
      getBookById
    },
    bookId,
    shouldReturnAuthorId
  })

  if (bookToBeDeleted?.userId !== decoded?.id) {
    return reply.status(401).send({ message: globalErrorMessage.unauthorized })
  }
}
