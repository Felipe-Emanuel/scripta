import { Dashboard } from '@features/dashboard'

export default function Loading() {
  return (
    <Dashboard.root>
      <Dashboard.skeleton />
    </Dashboard.root>
  )
}
