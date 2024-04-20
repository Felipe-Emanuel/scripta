export const isLink = (str: string) => {
  if (!str) return ''

  return str.startsWith('http://') || str.startsWith('https://')
}

export const isBase64 = (str: string) => {
  const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  return regex.test(str)
}

export const isPasswordStrong = (password: string) => {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)
}

export const generateStrongPass = (passSize = 12) => {
  const charactersAllowed =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

  let password = ''
  for (let i = 0; i < passSize; i++) {
    const randomIndex = Math.floor(Math.random() * charactersAllowed.length)
    password += charactersAllowed.charAt(randomIndex)
  }

  return password
}
