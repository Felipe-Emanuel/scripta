import { DashboardBooksPerformance } from '@features/dashboard/views/DashboardBooksPerformance'
import { DashboardProfile } from '@features/dashboard/views/DashboardProfile'
import { DashboardReferralTracking } from '@features/dashboard/views/DashboardReferralTracking'
import { DashboardRoot } from '@features/dashboard/views/DashboardRoot'
import { DashboardWordGoals } from '@features/dashboard/views/DashboardWordGoals'

export const Dashboard = {
  root: DashboardRoot,
  profile: DashboardProfile,
  wordsGoals: DashboardWordGoals,
  referralTracking: DashboardReferralTracking,
  booksPerformance: DashboardBooksPerformance,
}
