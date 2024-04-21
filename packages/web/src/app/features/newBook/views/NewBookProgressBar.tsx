import { Text } from '@shared/components'
import { TNewBookFormState, TProgressInfo } from '@shared/types'
import { progressInfo } from '../NewBookUtils'
import * as tv from '../NewBookTV'

interface INewBookProgressBarProps {
  stage: TNewBookFormState['state']
}

export function NewBookProgressBar({ stage }: INewBookProgressBarProps) {
  const progressPointer = (progress: TProgressInfo) => {
    const isCurrent = progress.type === stage

    return (
      <div
        key={progress.id}
        data-testid="new-book-progress-pointer"
        className={tv.newBookProgressBarContentWrapperTV()}
      >
        <div
          data-testid={`pointer-${progress.type}`}
          className={tv.newBookProgressBarMarkerTV({ isCurrent })}
        />
        <Text text={progress.label} />
      </div>
    )
  }

  return (
    <div className={tv.newBookProgressBarWrapperTV()}>
      <div className={tv.progressBarWhiteBarTV({ stage: stage })} />
      {progressInfo.map((progress) => progressPointer(progress))}
    </div>
  )
}
