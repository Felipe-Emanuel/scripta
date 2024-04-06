import { Skeleton } from '@nextui-org/react'

export function DashboardSkeleton() {
  return (
    <>
      <div
        className="flex flex-wrap min-[1075px]:flex-nowrap items-center justify-center gap-4 w-full overflow-hidden"
        id="words-row"
      >
        <Skeleton className="rounded-xl w-full flex-1 md:min-w-56 max-w-[590px] h-44 min-[500px]:h-[320px] relative" />
        <Skeleton className="rounded-xl w-full min-[500px]:w-52 max-w-[450px] sm:w-60 items-center h-[320px] justify-center" />
        <Skeleton className="rounded-xl w-full md:max-w-[850px] h-[320px] xl:max-w-[650px]" />
      </div>
      <div
        id="performance-row"
        className="flex max-[911px]:flex-col-reverse flex-wrap min-[911px]:flex-nowrap gap-4 w-full md:max-w-[850px] min-[1075px]:max-w-full m-auto"
      >
        <Skeleton className="rounded-xl h-[450px] w-full" />
        <Skeleton className="rounded-xl w-full md:max-w-[850px] h-[450px] xl:max-w-[650px]" />
      </div>
    </>
  )
}
