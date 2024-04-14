export const capitalizeName = (str: string) => {
  if (!str) return ''

  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const extractBase64 = (imageString: string) => {
  if (imageString.startsWith('data:image')) {
    const startIndex = imageString.indexOf(',') + 1
    const base64String = imageString.substring(startIndex)
    return base64String
  } else {
    return null
  }
}

export const extractTypeFromBase64 = (imageString: string) => {
  if (imageString.startsWith('data:image')) {
    const typeIndex = imageString.indexOf('image/') + 6
    const typeSubstring = imageString.substring(typeIndex)

    const typeEndIndex = typeSubstring.indexOf(';')
    const imageType = typeSubstring.substring(0, typeEndIndex)

    return imageType
  }

  return ''
}
