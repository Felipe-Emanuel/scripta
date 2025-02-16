import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Input } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { newBookSocialFormTV } from './NewBookFormsTV'

export function NewBookSocialForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  return (
    <div className={newBookSocialFormTV()}>
      <Input.root>
        <Input.label text="Link social" htmlFor="socialLink" />
        <Input.field
          defaultValue={draft?.socialLink ?? ''}
          name="socialLink"
          placeholder="Tem um espaço especial para seu livro? Adicione o link aqui."
        />
        <Input.error field="socialLink" />
      </Input.root>
    </div>
  )
}
