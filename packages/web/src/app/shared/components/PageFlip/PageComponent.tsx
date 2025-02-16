import { CSSProperties, forwardRef, HTMLAttributes, PropsWithChildren } from 'react'
import { Title } from '../Title'

interface IPageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  chapterContent: string
  chapterTitle: string
  chapterCounter: number
  renderTitle: boolean
}

const defaultStyles: CSSProperties = {
  fontSize: 8,
  textAlign: 'justify'
}

export const PageComponent = forwardRef<HTMLDivElement, IPageProps>(
  ({ chapterContent, chapterCounter, chapterTitle, renderTitle, style, ...props }, ref) => {
    return (
      <div
        {...props}
        className="bg-[#F5DEB3] p-6 rounded-sm shadow-lg border border-[#D2B48C] 
             text-[#5B4636] font-serif relative before:content-[''] 
             before:absolute before:top-0 before:left-0 before:w-full 
             before:h-full before:opacity-10 overflow-hidden flex flex-col h-full"
        ref={ref}
      >
        {renderTitle && (
          <Title
            as="h4"
            title={chapterTitle}
            align="center"
            color="black"
            weight="normal"
            size="md"
          />
        )}

        <div
          className="flex-grow h-full flex flex-col justify-between"
          style={{ ...defaultStyles, ...style }}
        >
          <div
            className="flex flex-col h-full"
            dangerouslySetInnerHTML={{ __html: chapterContent }}
          />
          <p className="text-right text-sm w-full">{chapterCounter}</p>
        </div>
      </div>
    )
  }
)

PageComponent.displayName = 'PageComponent'
