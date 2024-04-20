import { TBookScreenState, TNewBookFormState } from '@shared/types'
import { useReducer, useState } from 'react'
import { initialState, reducer } from '../BooksUtils'

export const useBooksController = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [bookScreenState, setBookScreenState] = useState<TBookScreenState>('SHOW_BOOKS')
  const [newBookFormState, setNewBookFormState] = useState<TNewBookFormState>({
    leaving: false,
    state: 'ABOUT_BOOK'
  })
  const [[form, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([form + newDirection, newDirection])
  }

  const generateFormTitle = () => {
    switch (state.stage) {
      case 'ABOUT_BOOK':
        return 'Sobre o livro'
      case 'MEDIA':
        return 'Mídia'
      case 'SOCIAL':
        return 'Social'
      case 'OVERVIEW':
        return 'Visão geral'
      default:
        'Sobre o livro'
    }
  }

  const next = () => {
    switch (state.stage) {
      case 'ABOUT_BOOK':
        return 'MEDIA'
      case 'MEDIA':
        return 'SOCIAL'
      case 'SOCIAL':
        return 'OVERVIEW'
      case 'OVERVIEW':
        return 'OVERVIEW'
      default:
        return 'MEDIA'
    }
  }

  const back = () => {
    switch (state.stage) {
      case 'OVERVIEW':
        return 'SOCIAL'
      case 'SOCIAL':
        return 'MEDIA'
      case 'MEDIA':
        return 'ABOUT_BOOK'
      case 'ABOUT_BOOK':
        return 'ABOUT_BOOK'
      default:
        return 'SOCIAL'
    }
  }

  const changeNewBookForm = () =>
    setNewBookFormState({
      leaving: !newBookFormState.leaving,
      state: state.stage!
    })

  const handleNextFormState = () => {
    dispatch({ type: next() })
    changeNewBookForm()
    paginate(1)
  }

  const handleBackFormState = () => {
    dispatch({ type: back() })
    changeNewBookForm()
    paginate(-1)
  }

  const handleToggleCreateBook = () =>
    bookScreenState === 'SHOW_BOOKS'
      ? setBookScreenState('CREATE_BOOK')
      : setBookScreenState('SHOW_BOOKS')

  const showForm = bookScreenState === 'CREATE_BOOK'

  return {
    showForm,
    state,
    form,
    direction,
    handleToggleCreateBook,
    handleNextFormState,
    handleBackFormState,
    generateFormTitle
  }
}
