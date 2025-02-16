'use client'

import HTMLFlipBook from 'react-pageflip'
import { PageComponent } from './PageComponent'
import { TChapterResponse } from '@shared/types'
import { useNativeBrowser } from '@shared/hooks/useNativeBrowser'
import { useEffect, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Text } from '../Text'
import { useSidebar } from '../../hooks/contexts/useSidebar'
import { Card, CardBody } from "@heroui/react"
import { Icon } from '../Icon'
import { feedbackAboutIconContentTV } from '@features/feedback/FeedbackTV'
import { MdFeedback } from 'react-icons/md'
import { useLocalEditor } from '../../hooks/useLocalEditor'
import { usePaginateText } from '../../hooks/usePaginateText'

interface IPageFlipProps {
  chapters: TChapterResponse[]
  minuature?: boolean
}

export function PageFlip({ chapters, minuature }: IPageFlipProps) {
  const { screenWidth, screenHeight, isMobile } = useNativeBrowser()
  const { toggleFeedbackFocused } = useSidebar()
  const { menuState } = useLocalEditor({})

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 300, height: 500 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const chapterPages = usePaginateText(
    chapters?.[0]?.chapterText || '',
    containerSize.height,
    containerSize.width
  )

  const style = minuature
    ? {
        fontSize: `${+menuState.fontSize * 0.25}px`,
        fontWeight: menuState.fontWeight,
        lineHeight: `${+menuState.lineHeight * 5}px`,
        textIndent: `${+menuState.firstLineIndent * 1}px`
      }
    : {
        fontSize: menuState.fontSize,
        fontWeight: menuState.fontWeight,
        lineHeight: menuState.lineHeight,
        textIndent: menuState.firstLineIndent
      }

  return (
    <ErrorBoundary
      resetKeys={['enter']}
      fallback={
        <Card>
          <CardBody className="flex flex-col items-center justify-center gap-2">
            <Text align="center" text="Algo errado aconteceu. Por favor, envie um feedback" />
            <button onClick={toggleFeedbackFocused} className={feedbackAboutIconContentTV()}>
              <Icon icon={MdFeedback} size="lg" className="z-10" color="primary" />
            </button>
          </CardBody>
        </Card>
      }
    >
      <HTMLFlipBook
        width={300}
        height={500}
        size="stretch"
        className={''}
        style={{}}
        startPage={0}
        minWidth={0}
        maxWidth={screenWidth}
        minHeight={0}
        maxHeight={screenHeight}
        drawShadow
        flippingTime={1000}
        usePortrait
        startZIndex={0}
        autoSize
        maxShadowOpacity={1}
        showCover={false}
        mobileScrollSupport={isMobile}
        clickEventForward
        useMouseEvents
        swipeDistance={10}
        showPageCorners
        disableFlipByClick
      >
        {chapterPages.map((pageContent, index) => (
          <PageComponent
            style={style}
            ref={containerRef}
            key={index}
            renderTitle={index === 0}
            chapterTitle={chapters[0]?.chapterTitle}
            chapterContent={pageContent}
            chapterCounter={index + 1}
          />
        ))}
      </HTMLFlipBook>
    </ErrorBoundary>
  )
}

// const areEqual = (prevProps: Readonly<IPageFlipProps>, nextProps: Readonly<IPageFlipProps>) =>
//   prevProps.chapters?.length === nextProps.chapters?.length

// export default memo(PageFlip, areEqual)
