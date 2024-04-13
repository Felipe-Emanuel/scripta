import { Dashboard } from '@features/dashboard'
import { performanceRowTV, wordsRowTV } from './DashboardTV'

export default function DashboardPage() {
  return (
    <Dashboard.root>
      <div className={wordsRowTV()} id="words-row">
        <Dashboard.profile />
        <Dashboard.wordsGoals />
        <Dashboard.referralTracking />
      </div>
      <div id="performance-row" className={performanceRowTV()}>
        <Dashboard.readers />
        <Dashboard.booksPerformance />
      </div>
    </Dashboard.root>
  )
}
