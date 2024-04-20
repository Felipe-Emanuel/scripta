'use client'

import { NewBook } from '@features/newBook'
import { useBooksController } from '../controller'

export function BookNewBook() {
  const {
    showForm,
    state,
    form,
    direction,
    handleToggleCreateBook,
    handleNextFormState,
    handleBackFormState,
    generateFormTitle
  } = useBooksController()

  return (
    <NewBook.root>
      <NewBook.bookPathname showForm={showForm} />
      <NewBook.trigger handleToggleCreateBook={handleToggleCreateBook} />
      <NewBook.formWrapper
        handleBackFormState={handleBackFormState}
        handleNextFormState={handleNextFormState}
        state={state}
        showForm={showForm}
      >
        <NewBook.progress stage={state.stage!} />
        <NewBook.animatedForm
          generateFormTitle={generateFormTitle}
          direction={direction}
          form={form}
        />
      </NewBook.formWrapper>
    </NewBook.root>
  )
}
