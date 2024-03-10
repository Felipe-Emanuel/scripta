import { getGoalByFilter } from '@features/referralTracking/services'
import { useQueryData } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import {
  TGetGoalRequest,
  TGoalFiltersOptions,
  TGoalResponse,
  TReferralTrackingHeaderOptions,
} from '@shared/types'
import { useCallback, useState } from 'react'
import { MdCalendarMonth } from 'react-icons/md'
import { IoTodayOutline } from 'react-icons/io5'
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthDayRange,
  getSaturdayDate,
  getSundayDate,
  getWeekNumber,
} from '@shared/utils/dates'
import { progressGoal } from '@shared/utils/validation'
import { months } from '@shared/utils/constants/months'

let id = 0

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000

export const useReferralTrackingController = () => {
  const { sessionCustomer } = useUser()

  const [filterOption, setFilterOption] = useState<TGoalFiltersOptions>({
    filterMethod: 'semana',
    startGoalFilter: getSundayDate(),
    endGoalFilter: getSaturdayDate(),
  })

  const weekSlug = () => {
    const date = new Date()
    const monthIndex = date.getMonth() + 1
    const month = months[monthIndex]
    const lastDateOfMonth = getLastDayOfMonth(date)
    const differenceInDays = Math.floor(
      (lastDateOfMonth.getTime() - date.getTime()) / DAY_IN_MILLIS,
    )

    if (differenceInDays < 7) {
      return `Última semana de ${month}`
    }

    const numberOfWeek = getWeekNumber(date)
    return `${numberOfWeek}ª semana de ${month}`
  }

  const monthSlug = () => {
    const date = new Date()
    const year = date.getFullYear()
    const monthIndex = date.getMonth() + 1
    const month = months[monthIndex]

    const { firstDay, lastDay } = getMonthDayRange(monthIndex, year)

    console.log(firstDay)
    console.log(lastDay)

    return `de ${firstDay} à ${lastDay} de ${month}`
  }

  const options: TReferralTrackingHeaderOptions[] = [
    {
      id: id++,
      label: 'semana',
      slug: weekSlug(),
      icon: IoTodayOutline,
      options: {
        filterMethod: 'semana',
        startGoalFilter: getSundayDate(),
        endGoalFilter: getSaturdayDate(),
      },
    },
    {
      id: id++,
      label: 'mês',
      slug: monthSlug(),
      icon: MdCalendarMonth,
      options: {
        filterMethod: 'mês',
        startGoalFilter: getFirstDayOfMonth(new Date()).toISOString(),
        endGoalFilter: getLastDayOfMonth(new Date()).toISOString(),
      },
    },
  ]

  const getGoals = useCallback(async (): Promise<
    TGoalResponse[] | undefined
  > => {
    if (sessionCustomer) {
      const { endGoalFilter, startGoalFilter } = filterOption

      const body: TGetGoalRequest = {
        email: sessionCustomer?.email,
        endGoalFilter,
        startGoalFilter,
      }

      const goals = await getGoalByFilter(body)

      return goals
    }
  }, [filterOption, sessionCustomer])

  const { data: goals } = useQueryData(
    getGoals,
    'goalsByFilter',
    '12-hours',
    !!filterOption.endGoalFilter,
  )

  const choiseFilters = async (options: TGoalFiltersOptions) => {
    setFilterOption(options)
    await getGoals()
  }

  const goalsComplete =
    (goals && goals?.filter((goal) => goal.goalComplete === true)) ?? []

  const wordsWritten = goals?.reduce((acc, goal) => acc + goal.words, 0) ?? 0
  const goalsDeclared = goals?.reduce((acc, goal) => acc + goal.goal, 0) ?? 0

  const formattedWords = progressGoal(wordsWritten, goalsDeclared).toFixed(2)
  const formattedGoalsComplete =
    (goals && progressGoal(goalsComplete.length, goals?.length).toFixed(2)) ?? 0

  const series = [+formattedGoalsComplete, +formattedWords]

  const currentFilterMethod = filterOption.filterMethod

  return {
    choiseFilters,
    options,
    wordsWritten,
    goalsComplete,
    series,
    currentFilterMethod,
  }
}
