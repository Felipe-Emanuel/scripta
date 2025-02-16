import { getUniqueItems } from '@features/booksPerformance/BooksPerformanceUtils'
import { useQueryData } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { useCallback, useMemo, useState } from 'react'
import { BsRocketTakeoffFill } from 'react-icons/bs'
import { TBookPerformanceProperty, TBookResponse, TTab } from '@shared/types'
import { ImBooks } from 'react-icons/im'
import { getAllBooks } from '../../Highlight/services'

let id = 0

export const useBooksPerformanceController = () => {
  const { sessionCustomer } = useUser()
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<TBookPerformanceProperty>('Gender')

  const getBooks = useCallback(async () => {
    if (sessionCustomer) {
      const allBooks = await getAllBooks(sessionCustomer.email)

      return allBooks
    }
  }, [sessionCustomer])

  const { data } = useQueryData({
    cacheName: 'allBooks',
    cacheTime: '12-hours',
    getDataFn: getBooks,
    enabled: !!sessionCustomer
  })

  const themesByGenre = () => {
    const filteredBooks = data?.filter((book) => book.Gender.toLowerCase() === selectedGenre)

    return filteredBooks?.length ? getUniqueItems(filteredBooks, 'Theme') : []
  }

  const uniqueGenres = data?.length ? getUniqueItems(data, 'Gender') : []
  const uniqueThemes = themesByGenre()

  const countOccurrences = (
    data: TBookResponse[] | undefined,
    property: TBookPerformanceProperty
  ): Record<string, number> => {
    const genderCounts: Record<string, number> = {}
    if (data)
      for (const book of data) {
        const genre = book[property]
        genderCounts[genre] = (genderCounts[genre] ?? 0) + 1
      }

    return genderCounts
  }

  const filtaredByGenreOrTheme = useMemo(
    () =>
      data?.filter((book) =>
        selectedTheme
          ? book.Gender.toLowerCase() === selectedGenre &&
            book.Theme.toLowerCase() === selectedTheme
          : book.Gender.toLowerCase() === selectedGenre
      ),
    [data, selectedGenre, selectedTheme]
  )

  const allFilteredData = selectedGenre ? filtaredByGenreOrTheme : data

  const genreCounts = useMemo(
    () => countOccurrences(allFilteredData, selectedProperty),
    [allFilteredData, selectedProperty]
  )
  const allBooks = useMemo(() => Object.keys(genreCounts), [genreCounts])

  const catgories = useMemo(
    () =>
      selectedProperty === 'Gender' && !selectedGenre.length
        ? allBooks
        : allFilteredData?.map((book) => book.title) || [],
    [allBooks, allFilteredData, selectedGenre.length, selectedProperty]
  )

  const uniqueGenders: { [key: string]: boolean } = {}
  const filteredDataByGenre: TBookResponse[] | undefined = allFilteredData?.filter((item) => {
    if (!uniqueGenders[item.Gender]) {
      uniqueGenders[item.Gender] = true
      return true
    }
    return false
  })

  const booksByGenreOrTheme = useMemo(() => {
    return filtaredByGenreOrTheme?.map((book) => ({
      name: 'Palavras escritas',
      data: [book.totalWords]
    }))
  }, [filtaredByGenreOrTheme])

  const generateAllBooksSeries = useMemo(() => {
    return filteredDataByGenre?.map((book) => ({
      name: 'Livros neste gênero',
      data: [genreCounts[book.Gender]]
    }))
  }, [filteredDataByGenre, genreCounts])

  const generateHitsSeries = useMemo(() => {
    return allFilteredData?.map((book) => ({
      name: 'Acessos',
      data: [book.hits]
    }))
  }, [allFilteredData])

  const allAccesses = allFilteredData?.reduce((acc, book) => acc + book.hits, 0)

  const handleTabFilter = (value: TBookPerformanceProperty) => setSelectedProperty(value)

  const handleGenre = (key: string) => setSelectedGenre(key)

  const handleTheme = (key: string) => setSelectedTheme(key)

  const seriesOptions = useMemo(
    () => ({
      Gender: selectedGenre.length ? booksByGenreOrTheme : generateAllBooksSeries,
      hits: generateHitsSeries
    }),
    [booksByGenreOrTheme, generateAllBooksSeries, generateHitsSeries, selectedGenre.length]
  )

  const filtaredHits = seriesOptions[selectedProperty]?.filter((serie) => serie.data?.[0] !== 0)
  const series = selectedProperty === 'hits' ? filtaredHits : seriesOptions[selectedProperty] || []

  const tabs: TTab[] = [
    {
      id: id++,
      icon: ImBooks,
      label: selectedGenre.length ? 'Livros' : 'Gêneros',
      amount: selectedGenre.length
        ? booksByGenreOrTheme?.length || 0
        : generateAllBooksSeries?.length || 0,
      value: 'Gender'
    },
    {
      id: id++,
      icon: BsRocketTakeoffFill,
      label: 'Acessos',
      amount: allAccesses ?? 0,
      value: 'hits'
    }
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
    handleTheme
  }
}
