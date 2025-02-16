'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@heroui/react"
import { Icon, Text, Title } from '@shared/components'
import { BiDownArrow, BiFilter } from 'react-icons/bi'
import { useChaptersController } from '../controller'
import { useMemo, useRef, useState } from 'react'

interface IChaptersHeaderProps {
  bookId: string
}

export function ChaptersHeader({ bookId }: IChaptersHeaderProps) {
  const { chapters, currentBook } = useChaptersController(bookId)

  const [chapterTitle, setChapterTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const filtaredChapters = useMemo(() => {
    const lowerCaseSearch = chapterTitle?.toLocaleLowerCase()

    return (
      chapters?.filter((chapter) => {
        const lowerCaseTitle = chapter.chapterTitle.toLocaleLowerCase()

        return lowerCaseTitle?.includes(lowerCaseSearch)
      }) || chapters
    )
  }, [chapterTitle, chapters])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Title as="h5" title={currentBook?.title} />

        <div className="flex items-end space-x-4">
          <div className="flex items-end">
            <Input
              ref={inputRef}
              color="primary"
              variant="underlined"
              label="Capítulo"
              placeholder="Buscar por título..."
              size="lg"
              className="w-96 text-gray-400"
              value={chapterTitle}
              onValueChange={(title) => {
                setChapterTitle(title)
                !isOpen && setIsOpen(true)
              }}
              autoFocus
            />
            <Popover
              onFocusCapture={() => inputRef?.current?.focus()}
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
              placement="bottom"
              offset={15}
            >
              <PopoverTrigger>
                <Button isIconOnly>
                  <Icon color="white" icon={BiDownArrow} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-zinc-700">
                <ul>
                  {filtaredChapters?.length ? (
                    <>
                      {filtaredChapters?.map((chapter) => (
                        <li
                          key={chapter.id}
                          onClick={() => {
                            setChapterTitle(chapter.chapterTitle)
                            setIsOpen(false)
                          }}
                          className="cursor-pointer transition-all hover:bg-zinc-600 w-full rounded-lg p-2 flex items-center space-x-2"
                        >
                          <Text text={chapter.chapterTitle} />
                          <Text text={chapter.wordsCounter} />
                        </li>
                      ))}
                    </>
                  ) : (
                    <Text text="Nenhum capítulo encontrado." size="xs" />
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          <Tooltip offset={7} content="Filtrar">
            <div>
              <Button variant="flat" color="primary" isIconOnly>
                <Icon icon={BiFilter} size="lg" color="white" />
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
