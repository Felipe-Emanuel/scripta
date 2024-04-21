import { generateRandomStringForExemple } from '@features/newBook/NewBookUtils'
import { titlesExemples } from '@shared/utils/constants/titlesExemples'
import { Input } from '@shared/components'
import { genres, themes } from '@shared/utils/constants/genresAndThemes'
import { TCreateBookSchemaWithImage, useNewBookController } from '@features/newBook/controller'
import { useDraft } from '@shared/hooks/useDraft'
import { formatNumber } from '@shared/utils/validation'

export function NewBookAboutBookForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { errors, isActive, conclued, setValue } = useNewBookController()

  const toggle = (field: 'conclued' | 'isActive', value: boolean) => setValue(field, value)

  return (
    <div className="size-full flex max-[499px]:flex-wrap gap-6 flex-shrink-0">
      <div id="left-side" className="flex flex-col gap-6 w-full">
        <Input.root>
          <Input.label text="Título" htmlFor="title" />
          <Input.field
            defaultValue={draft?.title}
            name="title"
            placeholder={`ex: ${generateRandomStringForExemple(titlesExemples)}`}
          />
          <Input.error field="title" />
        </Input.root>

        <Input.root>
          <Input.textarea
            isInvalid={!!errors.description}
            name="description"
            variant="bordered"
            maxLength={1000}
            max={1000}
            maxRows={6}
            minRows={6}
            placeholder="Descreva sua obra..."
            className="text-white"
            defaultValue={draft?.description}
            errorMessage={errors.description?.message}
          />
          <Input.error field="description" />
        </Input.root>
      </div>
      <div id="right-side" className="flex flex-col gap-6 w-full">
        <div className="flex items-center gap-6">
          <Input.root>
            <Input.label text="Gênero" htmlFor="gender" />
            <Input.field
              defaultValue={draft?.gender}
              name="gender"
              placeholder={`ex: ${generateRandomStringForExemple(genres)}`}
            />
            <Input.error field="gender" />
          </Input.root>

          <Input.root>
            <Input.label text="Tema" htmlFor="theme" />
            <Input.field
              defaultValue={draft?.theme}
              name="theme"
              placeholder={`ex: ${generateRandomStringForExemple(themes)}`}
            />
            <Input.error field="theme" />
          </Input.root>
        </div>

        <Input.root>
          <Input.label text="Total de palavras" htmlFor="totalWords" />
          <Input.field
            type="number"
            defaultValue={draft?.totalWords > 0 ? formatNumber(draft?.totalWords) : ''}
            name="totalWords"
            placeholder={`ex: ${formatNumber(35240)}`}
          />
          <Input.error field="totalWords" />
        </Input.root>

        <div className="w-full flex items-center justify-between">
          <div className="w-full flex flex-col gap-2">
            <Input.label align="start" text="Público?" />
            <Input.switch
              defaultSelected={draft?.isActive ?? isActive}
              name="isActive"
              onChange={() => {
                toggle('isActive', !isActive)
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Input.label align="start" text="Concluído?" />
            <Input.switch
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
