export const isLink = (str: string) =>
  str.startsWith('http://') || str.startsWith('https://')

export const isBase64 = (str: string) => {
  const regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  return regex.test(str)
}
