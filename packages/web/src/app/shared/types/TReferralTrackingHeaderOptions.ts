import { TGoalFiltersOptions } from '@shared/types'
import { ElementType } from 'react'

export type TReferralTrackingHeaderOptions = {
  id: number
  label: 'semana' | 'mês' | 'ano'
  slug: string
  icon: ElementType
  options: TGoalFiltersOptions
}
