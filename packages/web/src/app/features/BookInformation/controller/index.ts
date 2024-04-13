import { useState } from 'react'

export const useBookInformationController = () => {
  const [isCharactersCardHovered, setIsCharactersCardHovered] = useState(false)
  const [action, setAction] = useState({
    isDeleting: false
  })

  const toggleDeleting = () =>
    setAction({
      isDeleting: !action.isDeleting
    })

  return {
    isCharactersCardHovered,
    action,
    setIsCharactersCardHovered,
    toggleDeleting
  }
}
