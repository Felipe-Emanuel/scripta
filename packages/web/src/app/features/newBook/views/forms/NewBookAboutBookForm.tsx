import { generateRandomStringForExemple } from '@features/newBook/NewBookUtils'
import { TCreateBookSchemaWithImage, useNewBookController } from '@features/newBook/controller'
import { titlesExemples } from '@shared/utils/constants/titlesExemples'
import { genres, themes } from '@shared/utils/constants/genresAndThemes'
import { Input } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import * as tv from './NewBookFormsTV'
import { useMemo } from 'react'

export function NewBookAboutBookForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { errors, isActive, conclued, setValue } = useNewBookController()

  const toggle = (field: 'conclued' | 'isActive', value: boolean) => setValue(field, value)

  const memoredTitlesExemples = useMemo(() => generateRandomStringForExemple(titlesExemples), [])
  const memoredGenres = useMemo(() => generateRandomStringForExemple(genres), [])
  const memoredThemes = useMemo(() => generateRandomStringForExemple(themes), [])

  return (
    <div className={tv.newBookAboutBookFormTV()}>
      <div className={tv.newBookAboutBookSideTV()}>
        <Input.root>
          <Input.label text="Título" htmlFor="title" />
          <Input.field
            defaultValue={draft?.title}
            name="title"
            placeholder={`ex: ${memoredTitlesExemples}`}
          />
          <Input.error field="title" />
        </Input.root>

        <Input.root>
          <Input.textarea
            isInvalid={!!errors?.description}
            name="description"
            variant="bordered"
            maxLength={1000}
            max={1000}
            maxRows={5}
            minRows={5}
            placeholder="Descreva sua obra..."
            className="text-white"
            defaultValue={draft?.description}
            errorMessage={errors?.description?.message}
          />
          <Input.error field="description" />
        </Input.root>
      </div>
      <div className={tv.newBookAboutBookSideTV()}>
        <div className={tv.newBookAboutBookGenreAndThemeTV()}>
          <Input.root>
            <Input.label text="Gênero" htmlFor="gender" />
            <Input.field
              defaultValue={draft?.gender}
              name="gender"
              placeholder={`ex: ${memoredGenres}`}
            />
            <Input.error field="gender" />
          </Input.root>

          <Input.root>
            <Input.label text="Tema" htmlFor="theme" />
            <Input.field
              defaultValue={draft?.theme}
              name="theme"
              placeholder={`ex: ${memoredThemes}`}
            />
            <Input.error field="theme" />
          </Input.root>
        </div>

        <div className={tv.newBookAboutBookSwitchSideTV()}>
          <div className={tv.newBookAboutBookSwitchTV()}>
            <Input.label align="start" text="Público?" />
            <Input.switch
              data-testid="new-book-about-book-form-is-active"
              defaultSelected={draft?.isActive ?? isActive}
              name="isActive"
              onChange={() => {
                toggle('isActive', !isActive)
              }}
            />
          </div>

          <div className={tv.newBookAboutBookSwitchTV()}>
            <Input.label align="start" text="Concluído?" />
            <Input.switch
              data-testid="new-book-about-book-form-conclued"
              defaultSelected={draft?.conclued ?? conclued}
              name="conclued"
              onChange={() => {
                toggle('conclued', !conclued)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
