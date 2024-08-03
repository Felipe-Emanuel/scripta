/**
 *
 * @template T - The type of the object that will be checked.
 * @param obj - Object with parameters to be checked.
 * @returns - Boolean value after check the obj param.
 */

export const isAllAttributeFilled = <T>(obj: T) => {
  return Object.values(obj).every((value) => value !== '' && value !== null && value !== undefined)
}

export const progressGoal = (words: number, goal: number) => {
  if (goal === 0) {
    return 0
  }

  return (words / goal) * 100
}
