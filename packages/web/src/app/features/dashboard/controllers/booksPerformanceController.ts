import { getUniqueItems } from '@features/booksPerformance/BooksPerformanceUtils'
import { useQueryData } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TBookPerformanceProperty, TBookResponse, TTab } from '@shared/types'
import { useCallback, useState } from 'react'
import { IoIosCloudDone } from 'react-icons/io'
import { BsRocketTakeoffFill } from 'react-icons/bs'
import { PiUsersFourFill } from 'react-icons/pi'
import { RiEmojiStickerFill } from 'react-icons/ri'
import { capitalizeName } from '@shared/utils/transformers'
import { getAllBooks } from '@features/dashboard/services/bookPerformanceServices'

let id = 0

export const useBooksPerformanceController = () => {
  const { sessionCustomer } = useUser()
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedProperty, setSelectedProperty] =
    useState<TBookPerformanceProperty>('Gender')

  const getBooks = useCallback(async () => {
    if (sessionCustomer) {
      const allBooks = await getAllBooks(sessionCustomer.email)

      return allBooks
    }
  }, [sessionCustomer])

  const { data } = useQueryData(
    getBooks,
    'allBooks',
    '12-hours',
    !!sessionCustomer,
  )

  const themesByGenre = () => {
    const filteredBooks = data?.filter(
      (book) => book.Gender.toLowerCase() === selectedGenre,
    )

    return filteredBooks?.length ? getUniqueItems(filteredBooks, 'Theme') : []
  }

  const uniqueGenres = data?.length ? getUniqueItems(data, 'Gender') : []
  const uniqueThemes = themesByGenre()

  const countOccurrences = (
    data: TBookResponse[] | undefined,
    property: TBookPerformanceProperty,
  ): Record<string, number> => {
    const genderCounts: Record<string, number> = {}
    if (data)
      for (const book of data) {
        const genre = book[property]
        genderCounts[genre as string] = (genderCounts[genre as string] ?? 0) + 1
      }

    return genderCounts
  }

  const filtaredByGenreOrTheme = data?.filter((book) =>
    selectedTheme
      ? book.Gender.toLowerCase() === selectedGenre &&
        book.Theme.toLowerCase() === selectedTheme
      : book.Gender.toLowerCase() === selectedGenre,
  )

  const filtaredData = selectedGenre ? filtaredByGenreOrTheme : data

  const genreCounts = countOccurrences(filtaredData, selectedProperty)

  const categoriesGenre = Object.keys(genreCounts)
  const valuesGenre = Object.values(genreCounts)
  const catgories = Object.values(categoriesGenre)

  const generateSeries = (data: string[]) =>
    data?.map((category, i) => ({
      name: capitalizeName(category),
      data: [valuesGenre][i],
    }))

  const series = generateSeries(categoriesGenre)

  const allConcluedBooks = filtaredData?.filter(
    (book) => book.conclued === true,
  )
  const allAccesses = filtaredData?.reduce((acc, book) => acc + book.hits, 0)
  const allCharacters = filtaredData?.map((book) => book.characters)
  const characterLength = allCharacters?.filter((character) => character.length)
  const allReactions = filtaredData?.filter((book) => book.reaction)

  console.log('series', series)

  const handleTabFilter = (value: TBookPerformanceProperty) => {
    setSelectedProperty(value)
    console.log(value)
  }

  const handleGenre = (key: string, value: TBookPerformanceProperty) => {
    setSelectedProperty(value)
    setSelectedGenre(key)
  }

  const handleTheme = (key: string, value: TBookPerformanceProperty) => {
    setSelectedProperty(value)
    setSelectedTheme(key)
  }

  const tabs: TTab[] = [
    {
      id: id++,
      icon: IoIosCloudDone,
      label: 'Concluídos',
      amount: allConcluedBooks?.length ?? 0,
      value: 'conclued',
    },
    {
      id: id++,
      icon: BsRocketTakeoffFill,
      label: 'Acessos',
      amount: allAccesses ?? 0,
      value: 'hits',
    },
    {
      id: id++,
      icon: PiUsersFourFill,
      label: 'Personagens',
      amount: characterLength?.length ?? 0,
      value: 'Gender',
    },
    {
      id: id++,
      icon: RiEmojiStickerFill,
      label: 'Reações',
      amount: allReactions?.length ?? 0,
      value: 'Gender',
    },
  ]

  return {
    tabs,
    series,
    catgories,
    uniqueGenres,
    uniqueThemes,
    selectedGenre,
    selectedTheme,
    setSelectedGenre,
    setSelectedTheme,
    handleTabFilter,
    handleGenre,
    handleTheme,
  }
}
