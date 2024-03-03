export const isToday = (date: Date): boolean => {
  const today = new Date()
  const difference = today.getTime() - new Date(date).getTime()

  const isToday = Math.abs(difference) < 24 * 60 * 60 * 1000

  return isToday
}
