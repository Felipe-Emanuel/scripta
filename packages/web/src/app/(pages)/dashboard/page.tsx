import { Dashboard } from '@features/dashboard'

export default function DashboardPage() {
  return (
    <Dashboard.root>
      <Dashboard.profile />
      <Dashboard.wordsGoals />
    </Dashboard.root>
  )
}
