export const isPasswordStrong = (password: string) => {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)
}

export const progressGoal = (words: number, goal: number) => {
  if (goal === 0) {
    return 0
  }
  return (words / goal) * 100
}

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm'
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }

  return num.toString() || 0
}
