import { TBookResponse } from '@shared/types'
import { Icon, Text, Title } from '@shared/components'
import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Chip,
  Tooltip,
  Button
} from "@heroui/react"
import * as tv from './ReaderComponentsTV'

export interface IBooksProps {
  books: TBookResponse[]
  filterByBook: (bookId: string) => Promise<void>
}

export function Books({ books = [], filterByBook }: IBooksProps) {
  return (
    <>
      {books.map((book, index) => (
        <Card
          as="li"
          key={index}
          isFooterBlurred
          className={tv.cardTV()}
          shadow="sm"
          isPressable
          onPress={() => filterByBook(book.id)}
        >
          <CardHeader className={tv.cardHeaderTV()}>
            <div className={tv.cardHeaderTitleAndChipTV()}>
              <Title
                as="h4"
                title={book.title}
                size="md"
                weight="bold"
                className={tv.cardHeaderTitleTV()}
              />
              {book.conclued && (
                <Chip size="sm" color="default" variant="bordered">
                  Concluído
                </Chip>
              )}
            </div>
            <span className={tv.cardHeaderSpanInfoTV()}>
              <Text text={book.Gender} as="b" color="gray" /> {'/ '}
              <Text text={book.Theme} as="b" color="gray" />
            </span>
            {book.hits > 0 && <Text as="small" text={`${book.hits} Acessos`} color="gray" />}
          </CardHeader>
          <CardBody className={tv.cardBodyTV()}>
            <Image alt="Card background" className={tv.cardBodyImageTV()} src={book?.heroPathUrl} />
          </CardBody>
          <CardFooter className={tv.cardFooterTV()}>
            <Tooltip showArrow content="Personagens">
              <div className="flex gap-2">
                <Icon icon={FaUserSecret} color="white" />
                <Text as="small" text={book.characters?.length} className="text-gray-400" />
              </div>
            </Tooltip>
            <Tooltip showArrow content="Reações">
              <div className="flex gap-2">
                <Icon icon={BsEmojiHeartEyes} color="white" />
                <Text as="small" text={book.reaction?.length} className="text-gray-400" />
              </div>
            </Tooltip>
            <Button
              onPress={() => filterByBook(book.id)}
              className={tv.cardAccessButtonTV()}
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Buscar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
