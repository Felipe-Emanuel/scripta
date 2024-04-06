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
      <div
        id="performance-row"
        className="flex max-[911px]:flex-col-reverse flex-wrap min-[911px]:flex-nowrap gap-4 w-full md:max-w-[850px] min-[1075px]:max-w-full m-auto"
      >
        <Dashboard.readers />
        <Dashboard.booksPerformance />
      </div>
    </Dashboard.root>
  )
}
