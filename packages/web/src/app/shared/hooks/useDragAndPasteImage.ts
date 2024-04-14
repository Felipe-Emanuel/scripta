import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const useDragAndPasteImage = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>('')
  const [changeImageAlert, setChangeImageAlert] = useState(false)

  const onDrop = (acceptedFiles: Blob[]) => {
    if (image) {
      setImage('')
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(acceptedFiles[0])
  }

  const { getRootProps, isDragActive } = useDropzone({ onDrop })

  const onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    if (image) {
      return setChangeImageAlert(true)
    }

    const items = (event.clipboardData || window.Clipboard).items

    for (const index in items) {
      const item = items[index]

      if (item.kind === 'string') {
        return
      }

      if (item.kind === 'file') {
        const blob = item.getAsFile()
        if (blob) {
          const reader = new FileReader()

          reader.onload = (event) => {
            const imageUrl = event.target?.result as string
            setImage(imageUrl)
          }

          reader.readAsDataURL(blob)
        }
      }
    }
  }

  const clearimage = () => {
    setImage('')
    setChangeImageAlert(false)
  }

  return {
    changeImageAlert,
    isDragActive,
    image,
    getRootProps,
    setChangeImageAlert,
    onPaste,
    clearimage
  }
}
