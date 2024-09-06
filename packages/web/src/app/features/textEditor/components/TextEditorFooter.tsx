import { Button, Chip } from '@nextui-org/react'

import { AiOutlineFullscreen } from 'react-icons/ai'
import { FaBook } from 'react-icons/fa'

import { Icon, Text } from '@shared/components'
import { TTEditorMenu } from '@shared/types'
import * as tv from './TextEditorComponentsTV'

export interface ITextEditorFooter {
  chapterContent: TTEditorMenu
  wordsCounterText: string
  toggleFullscreen: () => void
}

export function TextEditorFooter({
  chapterContent,
  wordsCounterText,
  toggleFullscreen
}: ITextEditorFooter) {
  return (
    <div className={tv.textEditorFooterTV()}>
      <Button aria-label="full-screen" isIconOnly onClick={toggleFullscreen} className="group">
        <Icon
          icon={AiOutlineFullscreen}
          color="white"
          size="lg"
          className={tv.textEditorFooterFullScreenIconTV()}
        />
      </Button>

      <Chip startContent={<Icon icon={FaBook} size="md" />} variant="faded" color="secondary">
        <Text
          size="sm"
          as="small"
          color="black"
          text={`${wordsCounterText} ${chapterContent.wordsCounter}`}
        />
      </Chip>
    </div>
  )
}
