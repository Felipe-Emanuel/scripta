import { useLocalParams } from '@hooks/useLocalParams'

export const useToggleController = () => {
  const { currentParams, updateParams } = useLocalParams()

  const isEditing = currentParams?.isEditing === 'true'

  const toggleIsEditing = () => {
    const shouldNavigate = false

    updateParams(
      {
        isEditing: isEditing ? 'false' : 'true'
      },
      shouldNavigate
    )
  }

  return {
    isEditing,
    toggleIsEditing
  }
}
