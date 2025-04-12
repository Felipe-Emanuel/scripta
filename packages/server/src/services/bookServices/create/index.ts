import { IBooksRepository } from '@repositories'
import { TreateBookBodySchemaRequest, TreateBookBodySchemaReponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type TCreateBookServiceRequest = {
  actions: Pick<IBooksRepository, 'createBook' | 'getAllBooks'>
  book: TreateBookBodySchemaRequest['book']
  authorId: string
}

type TCreateBookServiceResponse = TreateBookBodySchemaReponse

export const CreateBookService = async ({
  actions,
  book,
  authorId
}: TCreateBookServiceRequest): Promise<TCreateBookServiceResponse> => {
  const { createBook, getAllBooks } = actions

  const onlyFirstChapter = false
  const allBooks = await getAllBooks(authorId, onlyFirstChapter)

  const alreadyExists = allBooks.find((existentBook) => existentBook.title === book.title)

  if (alreadyExists) {
    throw new Error(throwBookMessages.alreadyExists)
  }

  const createdBook = await createBook(book, authorId)

  if (!createdBook?.id) {
    throw new Error(throwBookMessages.uncreatedBook)
  }

  const recordBook: TCreateBookServiceResponse & { userId: string } = {
    ...book,
    userId: authorId,
    id: createdBook.id,
    conclued: createdBook.conclued,
    isActive: createdBook.isActive,
    totalWords: createdBook.totalWords,
    hits: createdBook.hits
  }

  return recordBook
}
