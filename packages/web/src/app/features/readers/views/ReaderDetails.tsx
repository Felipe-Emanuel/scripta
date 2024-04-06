import { Transition } from '@headlessui/react'
import { TReader } from '@shared/types'
import { Button } from '@nextui-org/react'
import { FaChevronLeft } from 'react-icons/fa'
import { Icon } from '@shared/components'
import Reader from './components/Reader'
import { readerDetailsButtonTV, readerDetailsTV } from '../ReaderTV'

export interface IReaderDetailsProps {
  reader: TReader | undefined
  isShowingDetails: boolean
  toggleDetails: () => void
}

export function ReaderDetails({ isShowingDetails, reader, toggleDetails }: IReaderDetailsProps) {
  return (
    <>
      <Transition
        className={readerDetailsTV()}
        show={isShowingDetails}
        enter="transition-all duration-300"
        enterFrom="-translate-x-72 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-all duration-500"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-72 opacity-0"
      >
        {isShowingDetails && (
          <Button
            color="primary"
            size="sm"
            className={readerDetailsButtonTV()}
            onClick={toggleDetails}
          >
            <Icon data-testid="toggleDetails" color="white" icon={FaChevronLeft} size="md" />
          </Button>
        )}
        <Reader isShowing={isShowingDetails} reader={reader} />
      </Transition>
    </>
  )
}
