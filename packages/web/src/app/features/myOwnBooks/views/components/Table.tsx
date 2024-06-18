import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  DropdownSection,
  SlotsToClasses,
  TableSlots
} from '@nextui-org/react'

import { columns, statusOptions } from '@features/myOwnBooks/MyOwnBooksUtils'
import { TBookResponse } from '@shared/types'
import { formatNumber } from '@shared/utils/validation'
import { capitalizeName } from '@shared/utils/transformers'
import { Icon, Text } from '@shared/components'

import { FaTrashCan } from 'react-icons/fa6'
import { BsThreeDotsVertical, BsEyeFill } from 'react-icons/bs'
// import { MdEditSquare } from 'react-icons/md'
import { FaSearch, FaChevronDown, FaPlus } from 'react-icons/fa'

import { useBook } from '@shared/hooks/contexts/useBook'
import { EditModal } from '@features/BookInformation/views/modals/EditModal'
import { IconContent } from '@features/BookInformation/views/components/IconContent'
import { useMyOwnBooks } from '@features/myOwnBooks/controller'

const INITIAL_VISIBLE_COLUMNS = ['hits', 'book', 'gender', 'theme', 'isActive', 'actions']

const renderNumberContent = (qtd: number) => (
  <div className="flex flex-col items-center justify-center">
    <Text text={formatNumber(qtd)} weight="light" textStyle="capitalize" color="gray" size="xs" />
  </div>
)

const renderBoolContent = (
  situation: boolean,
  negativeColor: 'danger' | 'warning',
  positiveText: string,
  negativeText: string
) => (
  <Chip
    className="capitalize border-none gap-1 text-gray-400"
    color={situation ? 'success' : negativeColor}
    size="sm"
    variant="dot"
  >
    <Text
      text={situation ? positiveText : negativeText}
      weight="light"
      textStyle="capitalize"
      color="gray"
      size="xs"
    />
  </Chip>
)

const renderBasicContent = (content: React.ReactNode) => (
  <div className="flex flex-col overflow-auto h-10 scrollbar-thin">
    <Text text={content} weight="light" textStyle="capitalize" color="gray" size="xs" />
  </div>
)

export default function BooksTable() {
  const { action, books, choisedBook, toggleEditing, setChoisedBook } = useMyOwnBooks()
  const { handleToggleCreateBook, choiseBookToSeeInfo } = useBook()

  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending'
  })
  const [page, setPage] = React.useState(1)

  const pages = (books && Math.ceil(books?.length / rowsPerPage)) || 0

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...(books || [])]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((book) =>
        book.title.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((book) => book.conclued)
    }

    return filteredUsers
  }, [books, filterValue, hasSearchFilter, statusFilter])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TBookResponse, b: TBookResponse) => {
      const first = a[sortDescriptor.column as keyof TBookResponse] as number
      const second = b[sortDescriptor.column as keyof TBookResponse] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback(
    (book: TBookResponse, columnKey: React.Key) => {
      const cellValue = book[columnKey as keyof TBookResponse]

      switch (columnKey) {
        case 'book':
          return (
            <User
              avatarProps={{
                radius: 'sm',
                size: 'sm',
                src: book.heroPathUrl,
                className: 'flex-shrink-0'
              }}
              classNames={{
                description: 'text-default-500 truncate',
                name: 'text-gray-400'
              }}
              description={`${book.description.substring(0, 35)}...`}
              name={capitalizeName(book.title)}
            />
          )
        case 'gender':
          return renderBasicContent(book.Gender)
        case 'theme':
          return renderBasicContent(book.Theme)
        case 'description':
          return renderBasicContent(book.description)
        case 'character':
          return renderNumberContent(book.characters?.length)
        case 'reaction':
          return renderNumberContent(book.reaction?.length || 0)
        case 'hits':
          return renderNumberContent(book.hits)
        case 'totalWords':
          return renderNumberContent(book.totalWords)
        case 'isActive':
          return renderBoolContent(book.isActive, 'danger', 'Público', 'Oculto')
        case 'conclued':
          return renderBoolContent(book.conclued, 'warning', 'Concluído', 'Em escrita...')
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2 ">
              <Dropdown
                aria-label="Menu de ações do livro selecionado"
                showArrow
                className="bg-white/10 backdrop-blur-md ring-1 ring-white/50"
              >
                <DropdownTrigger aria-label="Ativação do menu de ação do livro selecionado">
                  <Button color="secondary" isIconOnly radius="full" size="sm" variant="light">
                    <Icon icon={BsThreeDotsVertical} color="gray" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Menu de seleção de ações do livro selecionado">
                  <DropdownItem
                    data-testid="dorpdown-item-book-information-action-edit"
                    onClick={() => choiseBookToSeeInfo(book)}
                    textValue="Visualizar"
                    key="view"
                    startContent={<IconContent icon={BsEyeFill} />}
                  >
                    <Text weight="semi-bold" text="Visualizar" />
                  </DropdownItem>
                  {/* <DropdownItem
                    data-testid="dorpdown-item-book-information-action-edit"
                    onClick={() => {
                      toggleEditing()
                      console.log(book)
                      setChoisedBook(book)
                    }}
                    textValue="Editar"
                    key="edit"
                    startContent={<IconContent icon={MdEditSquare} />}
                  >
                    <Text weight="semi-bold" text="Editar" />
                  </DropdownItem> */}
                  <DropdownSection title="Zona de perigo">
                    <DropdownItem
                      data-testid="dorpdown-item-book-information-action-delete"
                      textValue="Excluir"
                      key="trash"
                      startContent={<IconContent icon={FaTrashCan} color="danger" />}
                    >
                      <Text weight="semi-bold" text="Excluir" color="error" />
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    [choiseBookToSeeInfo]
  )

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            aria-label="Input de busca por título do livro"
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%] text-white',
              inputWrapper: 'border-1'
            }}
            placeholder="Busque por título..."
            size="sm"
            startContent={<Icon icon={FaSearch} color="gray" />}
            value={filterValue}
            variant="bordered"
            color="secondary"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown aria-label="Menu de ações da tabela referente aos filtros de Estado e Colunas">
              <DropdownTrigger
                aria-label="Ação de manipulação dos estados da tabela"
                className="hidden sm:flex"
              >
                <Button
                  endContent={<Icon icon={FaChevronDown} color="gray" />}
                  size="sm"
                  variant="flat"
                  color="secondary"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalizeName(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger
                aria-label="Ação de manipulação das colunas da tabela"
                className="hidden sm:flex"
              >
                <Button
                  endContent={<Icon icon={FaChevronDown} color="gray" />}
                  size="sm"
                  variant="flat"
                  color="secondary"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalizeName(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onClick={handleToggleCreateBook}
              className="bg-foreground text-background"
              endContent={<Icon icon={FaPlus} color="black" />}
              size="sm"
            >
              Novo Livro
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Text as="small" color="gray" size="xs" text={`Total de ${books?.length} livros`} />
          <label className="flex items-center text-default-400 text-small">
            Colunas por página
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    books?.length,
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    handleToggleCreateBook
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <Pagination
        aria-label="Paginação dos livros pessoais do escritor"
        showControls
        classNames={{
          base: 'z-10',
          cursor: 'bg-foreground text-background',
          chevronNext: 'text-gray-400',
          prev: 'text-gray-400',
          item: 'text-white hover:text-black'
        }}
        color="default"
        isDisabled={hasSearchFilter}
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
    )
  }, [hasSearchFilter, page, pages])

  const classNames: SlotsToClasses<TableSlots> = React.useMemo(
    () => ({
      base: ['w-64', 'md:w-[560px]', 'lg:w-[825px]', 'xl:w-[920px]', '2xl:w-full'],
      wrapper: ['max-h-[382px]', 'lg:w-[820px]'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none'
      ]
    }),
    []
  )

  return (
    <>
      {choisedBook && (
        <EditModal
          book={choisedBook}
          isEditing={action.isEditing}
          toggleEditing={() => {
            toggleEditing()
            setChoisedBook(null)
          }}
        />
      )}

      <Table
        isCompact
        removeWrapper
        aria-label="Tabela com lista dos livros pessoais do escritor"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background'
          }
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="none"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'Nenhum livro encontrado'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {/* @ts-expect-error: columnKey isn't compatible with type Key */}
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
