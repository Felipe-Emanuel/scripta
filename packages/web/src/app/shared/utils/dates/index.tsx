import { format as formatter, getDay, addDays, startOfWeek } from 'date-fns'

export const formateDate = (date: string | Date, format?: string) => {
  const defaultFormat = 'dd/MM/yyyy'

  const parsedDate = new Date(date)

  const formattedDate = formatter(parsedDate, format ?? defaultFormat)

  return formattedDate
}

export const getSundayDate = () => {
  const today = new Date()
  const dayOfWeek = getDay(today)

  const sundayDate = new Date(today.setDate(today.getDate() - dayOfWeek))

  return sundayDate.toISOString()
}

export const getSaturdayDate = () => {
  const today = new Date()
  const dayOfWeek = getDay(today)

  const saturdayDate = addDays(today, 6 - dayOfWeek)

  return saturdayDate.toISOString()
}

export const getFirstDayOfMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()

  return new Date(year, month, 1)
}

export const getLastDayOfMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()

  const nextMonthDate = new Date(year, month + 1, 0)

  return new Date(nextMonthDate.setDate(nextMonthDate.getDate() - 1))
}

export const getWeekNumber = (date: Date) => {
  const DAY_IN_MILLIS = 24 * 60 * 60 * 1000
  const startOfWeekDate = startOfWeek(date)
  const dayOfWeek = startOfWeekDate.getDay()

  const differenceInDays = Math.floor(
    (date.getTime() - startOfWeekDate.getTime()) / DAY_IN_MILLIS - dayOfWeek,
  )

  const weekNumber = Math.floor(differenceInDays / 7) + 1

  return weekNumber
}

export const getMonthDayRange = (month: number, year: number) => {
  const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value)

  const firstDay = addLeadingZero(new Date(year, month - 1, 1).getDate())
  const lastDay = addLeadingZero(new Date(year, month, 0).getDate())

  return {
    firstDay,
    lastDay,
  }
}
