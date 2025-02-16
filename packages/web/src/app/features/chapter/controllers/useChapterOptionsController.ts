import { useMutation } from '@tanstack/react-query'
import { deleteChapter } from '../services'
import { useState } from 'react'
import { patchConclued } from '../../newChapter/services'
import { useParams, useRouter } from 'next/navigation'
import { useLocalParams } from '~/src/app/shared/hooks/useLocalParams'
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes'
import { toast } from 'react-toastify'

export type TToggleConfirmModal = 'delete' | 'conclued'

export const useChapterOptionsController = () => {
  const { replace } = useRouter()
  const { currentParams } = useLocalParams()
  const params = useParams()

  const [confirmModal, setConfirmModal] = useState({
    delete: {
      isOpen: false
    },
    conclued: {
      isOpen: false
    }
  })

  const chapterId = params?.chapterId || currentParams?.chapterId

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const confirmOpen = Object.entries(confirmModal).find(([_, value]) => value.isOpen)
  const where = confirmOpen?.[0] as TToggleConfirmModal

  const toggleConfirmModal = (where: TToggleConfirmModal) => {
    setConfirmModal((prev) => ({
      delete: { isOpen: where === 'delete' ? !prev.delete.isOpen : false },
      conclued: { isOpen: where === 'conclued' ? !prev.conclued.isOpen : false }
    }))
  }

  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteChapter(String(chapterId)),
    onSuccess: () => {
      toggleConfirmModal('delete')
      replace(
        `${APP_ROUTES.private.books.name}/${params.bookId}/${APP_ROUTES.private.chapters.name}`
      )

      toast.info('Capítulo excluído com sucesso')
    }
  })

  const { mutate: mutateConclued, data: concluedChapterData } = useMutation({
    mutationFn: () => patchConclued(String(chapterId)),
    onSuccess: (data) => {
      toggleConfirmModal('conclued')

      toast.info(
        data?.isConclued ? 'Capítulo marcado como concluído' : 'Capítulo removido dos concluídos'
      )
    }
  })

  return {
    where,
    concluedChapterData,
    confirmOpen,
    toggleConfirmModal,
    mutateDelete,
    mutateConclued
  }
}
