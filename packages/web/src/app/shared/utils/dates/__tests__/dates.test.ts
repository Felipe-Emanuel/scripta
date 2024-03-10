import { formateDate, getWeekNumber } from '@shared/utils/dates'

const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value)

describe('formateDate', () => {
  const day = new Date().getDate()
  const month = new Date().getUTCMonth() + 1

  const formattedDay = addLeadingZero(day)
  const formattedMonth = addLeadingZero(month)
  const year = new Date().getUTCFullYear()

  it('should able to format a date as default', () => {
    const sut = formateDate(new Date())

    const receive = `${formattedDay}/${formattedMonth}/${year}`

    expect(sut).toEqual(receive)
  })

  it('should able to format a date as yyyy/MM/dd', () => {
    const sut = formateDate(new Date(), 'yyyy/MM/dd')

    const receive = `${year}/${formattedMonth}/${formattedDay}`

    expect(sut).toEqual(receive)
  })
})

describe('getWeekNumber', () => {
  it('should return weeks number correctly', () => {
    const today = new Date('2024-03-05T00:55:15.917Z')

    const sut = getWeekNumber(today)
    expect(sut).toBe(1)
  })
})
