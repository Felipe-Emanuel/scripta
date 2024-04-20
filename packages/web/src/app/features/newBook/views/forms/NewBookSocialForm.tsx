import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Input } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'

export function NewBookSocialForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  return (
    <div className="size-full flex gap-6 flex-shrink-0">
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
