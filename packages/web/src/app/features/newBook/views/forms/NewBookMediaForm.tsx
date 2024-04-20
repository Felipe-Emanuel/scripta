import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Button, Image } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { useDragAndPasteImage } from '@shared/hooks/useDragAndPasteImage'
import { useEffect, useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'

export function NewBookMediaForm() {
  const { updateDraft, draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { image, isDragActive, clearimage, getRootProps } = useDragAndPasteImage()
  const [useImage, setUseImage] = useState(false)

  const currentImage = draft?.heroPathUrl || image

  useEffect(() => {
    updateDraft({
      ...draft,
      heroPathUrl: String(currentImage)
    })

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
    <div className="size-full flex gap-2 items-center justify-evenly flex-shrink-0">
      <div
        {...getRootProps()}
        className={`h-[13.5rem] w-44 rounded-xl flex flex-col gap-2 items-center justify-center border-dotted border-2 border-white/50 duration-500 ${currentImage ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        <Text text={isDragActive ? 'Solte sua capa aqui' : 'Arraste sua capa aqui'} />
        <Text text="Recomendado: 400x300 ou superior" size="xs" align="center" color="gray" />
      </div>
      <div className="h-[13.5rem] w-44">
        {currentImage ? (
          <div className="relative size-full rounded-xl">
            <Button
              isIconOnly
              color="danger"
              variant="solid"
              size="sm"
              className="absolute top-2 right-2 z-20"
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
              className="bg-cover object-cover size-full rounded-xl"
            />
          </div>
        ) : (
          <div className="size-full flex items-center justify-center">
            <Text text="Sua capa aparecerá aqui..." />
          </div>
        )}
      </div>
    </div>
  )
}
