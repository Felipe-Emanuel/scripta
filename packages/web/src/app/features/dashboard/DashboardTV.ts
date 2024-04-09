import { tv } from 'tailwind-variants'

export const dashboardRootTV = tv({
  base: 'flex flex-col gap-4 max-w-[1500px] m-auto pl-20'
})

export const dashboardSkeletonRootTV = tv({
  base: 'flex flex-wrap min-[1075px]:flex-nowrap items-center justify-center gap-4 w-full overflow-hidden'
})

export const dashboardSkeletonProfileTV = tv({
  base: 'rounded-xl w-full flex-1 md:min-w-56 max-w-[590px] h-44 min-[500px]:h-[320px] relative'
})

export const dashboardSkeletonWordGoalsTV = tv({
  base: 'rounded-xl w-full min-[500px]:w-52 max-w-[450px] sm:w-60 items-center h-[320px] justify-center'
})

export const dashboardSkeletonReferralTrackingTV = tv({
  base: 'rounded-xl w-full md:max-w-[850px] h-[320px] xl:max-w-[650px]'
})

export const dashboardSkeletonPerformanceRowTV = tv({
  base: 'flex max-[911px]:flex-col-reverse flex-wrap min-[911px]:flex-nowrap gap-4 w-full md:max-w-[850px] min-[1075px]:max-w-full m-auto'
})

export const dashboardSkeletonMapTV = tv({
  base: 'rounded-xl h-[450px] w-full'
})

export const dashboardSkeletonBooksPerformanceTV = tv({
  base: 'rounded-xl w-full md:max-w-[850px] h-[450px] xl:max-w-[650px]'
})
