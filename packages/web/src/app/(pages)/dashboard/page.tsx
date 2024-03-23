import { Dashboard } from '@features/dashboard'

export default function DashboardPage() {
  return (
    <Dashboard.root>
      <div
        className="flex flex-wrap min-[1075px]:flex-nowrap items-center justify-center gap-4 w-full"
        id="words-row"
      >
        <Dashboard.profile />
        <Dashboard.wordsGoals />
        <Dashboard.referralTracking />
      </div>
      <div id="performance-row">
        <Dashboard.booksPerformance />
      </div>
    </Dashboard.root>
  )
}
