import { BiTrashAlt } from 'react-icons/bi'

import { useEffect, useState } from 'react'
import { Button, Image } from '@nextui-org/react'

import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { useDragAndPasteImage } from '@shared/hooks/useDragAndPasteImage'
import { Icon, Text } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import * as tv from './NewBookFormsTV'

export function NewBookMediaForm() {
  const { updateDraft, draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { image, isDragActive, clearimage, getRootProps } = useDragAndPasteImage()
  const [useImage, setUseImage] = useState(false)

  const currentImage = draft?.heroPathUrl || image

  useEffect(() => {
    if (draft || image) {
      updateDraft({
        ...draft,
        heroPathUrl: String(currentImage)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage])

  const clearing = () => {
    clearimage()
    updateDraft({
      ...draft,
      heroPathUrl: ''
    })

    return setUseImage(true)
  }

  return (
    <div className={tv.newBookMediaFormTV()}>
      <div
        {...getRootProps()}
        className={tv.newBookMediaFormDragAndPasteTV({ currentImage: !!currentImage })}
      >
        <Text
          text={isDragActive ? 'Solte sua capa aqui' : 'Arraste sua capa aqui'}
          align="center"
        />
        <Text text="Recomendado: 400x300 ou superior" size="xs" align="center" color="gray" />
      </div>
      <div className={tv.newBookMediaFormContentWrapperTV()}>
        {currentImage ? (
          <div className={tv.newBookMediaFormHeroWrapperTV()}>
            <Button
              data-testid="new-book-media-form-trash-hero"
              isIconOnly
              color="danger"
              variant="solid"
              size="sm"
              className={tv.newBookMediaFormTrashImageTV()}
              onClick={clearing}
            >
              <Icon icon={BiTrashAlt} color="white" />
            </Button>
            <Image
              removeWrapper
              alt="Imagem de capa do novo livro"
              height={400}
              width={300}
              src={String(useImage ? image : currentImage)}
              className={tv.newBookMediaFormHeroTV()}
            />
          </div>
        ) : (
          <div className={tv.newBookMediaFormHeroFallbackTV()}>
            <Text text="Sua capa aparecerá aqui..." />
          </div>
        )}
      </div>
    </div>
  )
}
