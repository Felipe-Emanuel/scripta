'use client'

import { NewBook } from '@features/newBook'
import { useNewBookController } from '../controller/newBookController'

export function BookNewBook() {
  const { state, form, direction, handleNextFormState, handleBackFormState, generateFormTitle } =
    useNewBookController()

  return (
    <NewBook.root>
      <NewBook.bookPathname />
      <NewBook.trigger />
      <NewBook.formWrapper
        handleBackFormState={handleBackFormState}
        handleNextFormState={handleNextFormState}
        state={state}
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
