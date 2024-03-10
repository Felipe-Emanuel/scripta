import { startOfWeek, format as formatter } from 'date-fns'

export const isToday = (date: Date): boolean => {
  const today = new Date()
  const difference = today.getTime() - new Date(date).getTime()

  const isToday = Math.abs(difference) < 24 * 60 * 60 * 1000

  return isToday
}

export const getWeekNumber = (date: Date) => {
  const startOfWeekDate = startOfWeek(date)

  const differenceInDays = Math.floor(
    (date.getTime() - startOfWeekDate.getTime()) / (24 * 60 * 60 * 1000),
  )

  const weekNumber = Math.floor(differenceInDays / 7) + 1

  return weekNumber
}

export const formateDate = (date: string | Date, format?: string) => {
  const defaultFormat = 'dd/MM/yyyy'

  const parsedDate = new Date(date)

  const formattedDate = formatter(parsedDate, format ?? defaultFormat)

  return formattedDate
}
