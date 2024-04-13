import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function BookInformationRoot({ children }: TRootComponent) {
  return (
    <Template
      id="book-information-root"
      size="fit"
      className="w-full max-[1023px]:max-w-[300px] lg:w-fit h-[400px] md:p-4 flex flex-col items-center lg:items-start justify-center overflow-hidden"
    >
      {children}
    </Template>
  )
}
