import { getGoalByFilter } from '@features/referralTracking/services'
import { useUser } from '@shared/hooks/useUser'
import {
  TGetGoalRequest,
  TGoalFiltersOptions,
  TGoalResponse,
  TReferralTrackingHeaderOptions
} from '@shared/types'
import { useCallback, useMemo, useState } from 'react'
import { MdCalendarMonth } from 'react-icons/md'
import { IoTodayOutline } from 'react-icons/io5'
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthDayRange,
  getSaturdayDate,
  getSundayDate,
  getWeekNumber
} from '@shared/utils/dates'
import { progressGoal } from '@shared/utils/validation'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  date,
  DAY_IN_MILLIS,
  defaultFilterOption,
  INVALID_GOAL,
  month,
  monthIndex,
  year
} from '../referralTrackingUtils'
import { queryClient } from '~/src/app/shared/services/reactQuery'

let id = 0

export const useReferralTrackingController = () => {
  const { sessionCustomer } = useUser()

  // const [formattedGoals, setFormattedGoals] = useState<TGoalResponse[]>([])
  const [filterOption, setFilterOption] = useState<TGoalFiltersOptions>(defaultFilterOption)

  const weekSlug = () => {
    const lastDateOfMonth = getLastDayOfMonth(date)
    const differenceInDays = Math.floor(
      (lastDateOfMonth.getTime() - date.getTime()) / DAY_IN_MILLIS
    )

    if (differenceInDays < 7) {
      return `Última semana de ${month}`
    }

    const numberOfWeek = getWeekNumber()
    return `${numberOfWeek}ª semana de ${month}`
  }

  const monthSlug = () => {
    const { firstDay, lastDay } = getMonthDayRange(monthIndex, year)

    return `de ${firstDay} à ${lastDay} de ${month}`
  }

  const options: TReferralTrackingHeaderOptions[] = useMemo(
    () => [
      {
        id: id++,
        label: 'semana',
        slug: weekSlug(),
        icon: IoTodayOutline,
        options: {
          filterMethod: 'semana',
          startGoalFilter: getSundayDate(),
          endGoalFilter: getSaturdayDate()
        }
      },
      {
        id: id++,
        label: 'mês',
        slug: monthSlug(),
        icon: MdCalendarMonth,
        options: {
          filterMethod: 'mês',
          startGoalFilter: getFirstDayOfMonth(new Date()).toISOString(),
          endGoalFilter: getLastDayOfMonth(new Date()).toISOString()
        }
      }
    ],
    []
  )

  const getGoals = useCallback(
    async (options: TGoalFiltersOptions): Promise<TGoalResponse[] | undefined> => {
      if (sessionCustomer) {
        const param = options.startGoalFilter ? options : filterOption
        const { endGoalFilter, startGoalFilter } = param

        const body: TGetGoalRequest = {
          email: sessionCustomer?.email,
          endGoalFilter,
          startGoalFilter
        }

        const goals = await getGoalByFilter(body)

        return goals
      }
    },
    [sessionCustomer, filterOption]
  )

  const { data: goals } = useQuery({
    queryKey: [cacheName.goalsByFilter],
    queryFn: () => getGoals(defaultFilterOption)
  })

  const { mutate } = useMutation({
    mutationKey: [cacheName.goalsByFilter],
    mutationFn: getGoals,
    onSuccess(data) {
      queryClient.setQueryData([cacheName.goalsByFilter], () => data)
    }
  })

  const handleChangeGoalFilter = async (options: TGoalFiltersOptions) => {
    setFilterOption(options)
    mutate(options)
  }

  const reducedGoalsComplete =
    (goals && goals?.filter((goal) => goal.goal !== INVALID_GOAL && goal.goalComplete === true)) ??
    []

  const goalsComplete = reducedGoalsComplete.length

  const reducedWordsWritten = goals?.reduce((acc, goal) => acc + goal.words, 0) ?? 0

  const wordsWritten = reducedWordsWritten

  const goalsDeclared = goals?.reduce((acc, goal) => acc + goal.goal, 0) ?? 0

  const formattedWords = progressGoal(wordsWritten, goalsDeclared).toFixed(1) || 0
  const formattedGoalsComplete =
    (goals && progressGoal(goalsComplete, goals?.length).toFixed(1)) || 0

  const series = useMemo(
    () => [+formattedGoalsComplete, +formattedWords],
    [formattedGoalsComplete, formattedWords]
  )

  const currentFilterMethod = filterOption.filterMethod

  return {
    handleChangeGoalFilter,
    options,
    wordsWritten,
    goalsComplete,
    series,
    currentFilterMethod,
    filterOption
  }
}
