import { TGoalFiltersOptions } from '@shared/types'
import { ElementType } from 'react'

export type TReferralTrackingHeaderOptions = {
  id: number
  label: TGoalFiltersOptions['filterMethod']
  slug: string
  icon: ElementType
  options: TGoalFiltersOptions
}
