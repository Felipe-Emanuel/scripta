import { Skeleton } from '@nextui-org/react'
import * as tv from '../DashboardTV'

export function DashboardSkeleton() {
  return (
    <>
      <div className={tv.dashboardSkeletonRootTV()} id="words-row">
        <Skeleton className={tv.dashboardSkeletonProfileTV()} />
        <Skeleton className={tv.dashboardSkeletonWordGoalsTV()} />
        <Skeleton className={tv.dashboardSkeletonReferralTrackingTV()} />
      </div>
      <div id="performance-row" className={tv.dashboardSkeletonPerformanceRowTV()}>
        <Skeleton className={tv.dashboardSkeletonMapTV()} />
        <Skeleton className={tv.dashboardSkeletonBooksPerformanceTV()} />
      </div>
    </>
  )
}
