import React from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { feedbackTypes } from '@features/feedback/FeedbackUtils'
import { useUser } from '@shared/hooks/useUser'
import { TCreateFeedbackRequest, TRootComponent } from '@shared/types'
import { extractBase64 } from '@shared/utils/transformers'

import { isBase64 } from '@memorize/server/src/shared/utils/stringValidations'

type THandleSelectionEventChange = {
  target: {
    value: string
  }
}

type TCreateContext = {
  isFeedbackOnFocus: boolean
  isOpen: boolean
  type: Set<string>
  firstValue: string
  feedback: string
  isDisabled: boolean
  isDragActive: boolean
  changeImageAlert: boolean
  createFeedbackRequest: TCreateFeedbackRequest
  image: string | ArrayBuffer | null
  setFeedback: (value: React.SetStateAction<string>) => void
  handleSelectionChange: (e: THandleSelectionEventChange) => void
  toggleFeedbackFocused: () => void
  clearimage: () => void
  toggleSidebar: () => void
  closeFeedbackFocused: () => void
  clearAll: () => void
  setChangeImageAlert: React.Dispatch<React.SetStateAction<boolean>>
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SidebarContext = React.createContext({} as TCreateContext)

export const SidebarProvider = ({ children }: TRootComponent) => {
  const { sessionCustomer } = useUser()
  const [isFeedbackOnFocus, setIsFeedbackOnFocus] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [changeImageAlert, setChangeImageAlert] = React.useState(false)
  const [type, setType] = React.useState<Set<string>>(new Set([]))
  const [feedback, setFeedback] = React.useState('')
  const [image, setImage] = React.useState<string | ArrayBuffer | null>('')

  const firstValue = React.useMemo(() => Array.from(type.values())[0], [type])
  const feedbackType = feedbackTypes.find((f) => f.label === firstValue)
  const screenshot = extractBase64(String(image))

  const toggleSidebar = () => !isFeedbackOnFocus && setIsOpen((prev) => !prev)

  const toggleFeedbackFocused = () => {
    setIsFeedbackOnFocus((prev) => !prev)
  }

  const closeFeedbackFocused = () => {
    setIsFeedbackOnFocus(false)
    setIsOpen(false)
  }

  const handleSelectionChange = (e: THandleSelectionEventChange) => {
    const newValue = e.target.value.split(',').pop()
    setType(newValue ? new Set([newValue]) : new Set([]))
  }

  const isDisabled = !feedback || !firstValue

  React.useEffect(() => {
    const initialFeedback = feedbackTypes.find((feedback) => feedback.label === firstValue)
    setFeedback(initialFeedback?.initialFeedback ?? '')
  }, [firstValue])

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (image) {
        return setChangeImageAlert(true)
      }

      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setImage(reader.result)
        }
        reader.readAsDataURL(file)
      }
    },
    [image]
  )

  const getImageFromClipboard = React.useCallback(() => {
    if (image) {
      return null
    }

    navigator.clipboard
      .read()
      .then(async (clipboardItems) => {
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            if (type === 'image/png') {
              const blob = await clipboardItem.getType(type)
              const reader = new FileReader()
              reader.onload = () => {
                if (reader) {
                  const result = reader.result as string
                  const base64Data = result.split(',')[1]
                  if (isBase64(base64Data)) {
                    setImage(result)
                  }
                }
              }
              reader.readAsDataURL(blob)
            }
          }
        }
      })
      .catch((error) => {
        toast(
          'Você pode permitir a leitura de dados no seu navegador para facilitar a captura de imagem',
          {
            type: 'info'
          }
        )
        throw new Error(`Erro ao acessar o clipboard: ${error}`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    isFeedbackOnFocus && getImageFromClipboard()
  }, [getImageFromClipboard, isFeedbackOnFocus])

  const onDrop = (acceptedFiles: Blob[]) => {
    if (image) {
      return setChangeImageAlert(true)
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

  const clearAll = () => {
    clearimage()
    setType(new Set([]))
    setFeedback('')
  }

  const createFeedbackRequest: TCreateFeedbackRequest = {
    feedback: {
      feedback,
      screenshot: String(screenshot) ?? '',
      type: feedbackType?.value ?? '',
      userEmail: sessionCustomer?.email ?? ''
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        isFeedbackOnFocus,
        isOpen,
        type,
        firstValue,
        feedback,
        isDisabled,
        isDragActive,
        createFeedbackRequest,
        image,
        changeImageAlert,
        toggleFeedbackFocused,
        setChangeImageAlert,
        toggleSidebar,
        closeFeedbackFocused,
        handleSelectionChange,
        setFeedback,
        getRootProps,
        clearimage,
        onPaste,
        handleFileChange,
        clearAll
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
