import { useState } from 'react'

export const useGraphicsController = (
  getMonthExpenses: () => void,
  getYearExpenses: () => void,
) => {
  const [activeId, setActiveId] = useState(0)

  const actions = [
    {
      id: 0,
      label: 'Mês',
      action: (id: number) => {
        getMonthExpenses()
        setActiveId(id)
      },
    },
    {
      id: 1,
      label: 'Ano',
      action: (id: number) => {
        getYearExpenses()
        setActiveId(id)
      },
    },
  ]

  const sortedActions =
    activeId !== null
      ? [
          actions[activeId],
          ...actions.slice(0, activeId),
          ...actions.slice(activeId + 1),
        ]
      : actions

  return {
    sortedActions,
    activeId,
  }
}
