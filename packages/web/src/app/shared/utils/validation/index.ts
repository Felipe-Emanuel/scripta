export const isPasswordStrong = (password: string) => {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
    password,
  )
}

export const progressGoal = (words: number, goal: number) => {
  if (goal === 0) {
    return 0
  }
  return (words / goal) * 100
}
