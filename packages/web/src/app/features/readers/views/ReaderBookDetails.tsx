import { Transition } from '@headlessui/react'
import { TCurrentTab } from '@shared/types'
import { Button } from "@heroui/react"
import { FaChevronRight } from 'react-icons/fa'
import { Icon, Input } from '@shared/components'
import { ImBooks } from 'react-icons/im'
import { Books, IBooksProps } from './components/Books'
import { FilterTabs, IFilterTabsProps } from './components/FilterTabs'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { TSearchBookSchema } from '../ReaderUtils'
import { IoSearch } from 'react-icons/io5'
import * as tv from '../ReaderTV'

export interface IReaderBookDetailsProps extends IFilterTabsProps, IBooksProps {
  isShowingBookDetails: boolean
  currentTab: TCurrentTab
  searchBook: UseFormReturn<TSearchBookSchema>
  toggleBookDetails: VoidFunction
}

export function ReaderBookDetails({
  isShowingBookDetails,
  books,
  searchBook,
  currentTab,
  totalReaders,
  totalReadersByBook,
  toggleBookDetails,
  filterByBook,
  handleFilterByAll
}: IReaderBookDetailsProps) {
  if (!books.length) return null

  const filterTabsProps: IFilterTabsProps = {
    currentTab,
    totalReaders,
    totalReadersByBook,
    handleFilterByAll
  }

  return (
    <>
      <Button
        color="primary"
        size="sm"
        className={tv.readerBookButtonTV({ isShowingBookDetails })}
        onClick={toggleBookDetails}
      >
        <Icon color="white" icon={isShowingBookDetails ? FaChevronRight : ImBooks} size="md" />
      </Button>
      <Transition
        className={tv.readerBookDetailsTV()}
        show={isShowingBookDetails}
        enter="transition-all duration-300"
        enterFrom="translate-x-72 opacity-0"
        enterTo="-translate-x-0 opacity-100"
        leave="transition-all duration-500"
        leaveFrom="-translate-x-0 opacity-100"
        leaveTo="translate-x-72 opacity-0"
      >
        <div className="pt-12">
          <FilterTabs {...filterTabsProps} />

          <FormProvider {...searchBook}>
            <Input.root className={tv.readerBookInputTV()}>
              <Input.field
                icon={IoSearch}
                variant="thin"
                name="bookTitle"
                placeholder="Buscar Título.."
              />
            </Input.root>
          </FormProvider>
        </div>
        <div className={tv.readerBookDetailsDividerTV()} />

        <ul className={tv.readerBookDetailsULTV()}>
          <Books filterByBook={filterByBook} books={books} />
        </ul>
      </Transition>
    </>
  )
}
