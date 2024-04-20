import { TNewBookFormState } from './TNewBookFormState'

export type TProgressInfo = {
  id: number
  label: string
  type: TNewBookFormState['state']
}
