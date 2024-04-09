export const capitalizeName = (str: string) => {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function extrairBase64(imageString: string) {
  if (imageString.startsWith('data:image')) {
    const startIndex = imageString.indexOf(',') + 1
    const base64String = imageString.substring(startIndex)
    return base64String
  } else {
    return null
  }
}
