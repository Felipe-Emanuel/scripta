import { Text } from '@shared/components'
import { progressInfo } from '../NewBookUtils'
import { progressBarWhiteBarTV } from '../NewBookTV'
import { TNewBookFormState, TProgressInfo } from '@shared/types'

interface INewBookProgressBarProps {
  stage: TNewBookFormState['state']
}

export function NewBookProgressBar({ stage }: INewBookProgressBarProps) {
  const progressPointer = (progress: TProgressInfo) => {
    const isCurrent = progress.type === stage

    return (
      <div
        key={progress.id}
        className={`flex flex-col items-center justify-center relative top-3 duration-500`}
      >
        <div
          className={`${isCurrent ? 'size-6' : 'size-4'} duration-500 rounded-full bg-white ring-1 ring-primary mb-2`}
        />
        <Text text={progress.label} />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[50rem] flex items-center justify-between bg-primary h-1 mb-20 md:mb-16 rounded-full">
      <div className={progressBarWhiteBarTV({ stage: stage })} />
      {progressInfo.map((progress) => progressPointer(progress))}
    </div>
  )
}
