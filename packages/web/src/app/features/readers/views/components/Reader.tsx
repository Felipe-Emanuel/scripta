import { TReader } from '@shared/types'
import { Spinner } from '@shared/animations/Spinner'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from '@nextui-org/react'
import { Text, Title } from '@shared/components'
import { memo } from 'react'
import * as tv from './ReaderComponentsTV'

interface IReaderProps {
  reader?: TReader
  isShowing: boolean
}

const Reader = ({ reader, isShowing }: IReaderProps) => {
  return (
    <Card isFooterBlurred className={tv.readerWrapperTV()}>
      {!reader?.id && <Spinner />}
      {reader?.id && isShowing && (
        <>
          <CardHeader className={tv.readerCardHeaderTV()}>
            <Title
              as="h4"
              title={reader.name.split(' ')[0]}
              weight="bold"
              className="text-large"
            />
            {reader.booksCount > 0 && (
              <Text
                as="small"
                text={`${reader.booksCount} Livros`}
                color="gray"
              />
            )}
            {reader.hits > 0 && (
              <Text as="small" text={`${reader.hits} Acessos`} color="gray" />
            )}
          </CardHeader>
          <CardBody className={tv.readerCardBodyTV()}>
            <Image
              alt="Card background"
              className={tv.readerCardBodyImageTV()}
              src={reader.picture}
            />
            {reader.portfolioUrl && (
              <CardFooter className={tv.cardFooterTV()}>
                <Text
                  text="Portfólio"
                  className={tv.readerCardFooterLabelTV()}
                />
                <a target="_blank" href={reader.portfolioUrl}>
                  <Button
                    className={tv.cardAccessButtonTV()}
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Acessar
                  </Button>
                </a>
              </CardFooter>
            )}
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default memo(Reader, (p, n) => p.isShowing !== n.isShowing)
