import { z } from 'zod'
import { throwGoalsMessages } from '~/src/entities/Goals/utils'

export const goalProgressServiceSchema = z.object({
  userEmail: z
    .string({
      required_error: throwGoalsMessages.missingEmail
    })
    .email(throwGoalsMessages.missingEmail)
})

export const getLastGoalSchema = z.object({
  userEmail: z.string({
    required_error: throwGoalsMessages.missingEmail
  })
})

export const updateGoalServiceSchema = z.object({
  goalId: z
    .string({
      required_error: throwGoalsMessages.goalNotFound
    })
    .uuid(),
  goal: z.number({
    required_error: throwGoalsMessages.invalidGoal
  }),
  userEmail: z.string({
    required_error: throwGoalsMessages.missingEmail
  })
})
