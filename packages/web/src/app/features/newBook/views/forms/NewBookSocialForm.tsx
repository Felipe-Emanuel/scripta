import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Input } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { newBookSocialFormTV } from './NewBookFormsTV'

export function NewBookSocialForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  return (
    <div className={newBookSocialFormTV()}>
      <Input.root>
        <Input.label text="Link de acesso" htmlFor="publishedUrl" />
        <Input.field
          defaultValue={draft?.publishedUrl ?? ''}
          name="publishedUrl"
          placeholder="https://..."
        />
        <Input.error field="publishedUrl" />
      </Input.root>
    </div>
  )
}
