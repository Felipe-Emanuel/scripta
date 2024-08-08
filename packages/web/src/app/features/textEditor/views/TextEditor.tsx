'use client'

import { Color } from '@tiptap/extension-color'
import { Document } from '@tiptap/extension-document'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'

import { AiOutlineFullscreen } from 'react-icons/ai'
import { FaBook } from 'react-icons/fa'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Button, Chip, ScrollShadow } from '@nextui-org/react'
import { EditorState } from '@tiptap/pm/state'
import { FirstLineIndent } from '../Identations'
import { useState } from 'react'

import { ToolbarEditor } from '../components/ToolbarEditor'
import { ToolbarEditorHeader } from '../components/ToolbarEditorHeader'
import { FloatingMenuContent } from '../components/FloatingMenuContent'

import { Icon, Text } from '@shared/components'

function countWords(text: string): number {
  const words = text.trim().split(/\s+/)
  const filteredWords = words.filter((word) => word.length > 0)
  return filteredWords.length
}

export function TextEditor() {
  const [fullscreen, setFullscreen] = useState(false)
  const [chapterContent, setChapterContent] = useState({
    content: `
        <p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
        <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn't look as professional as Comic Sans.</span></p>
        <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
        <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
        <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
        <p><span style="font-family: var(--title-font-family)">Then there are CSS variables, the new hotness.</span></p>
      `,
    wordsCounter: 0
  })

  const editor = useEditor({
    extensions: [
      Document,
      StarterKit,
      Underline,
      FirstLineIndent,
      Color,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'justify'
      }),
      Highlight.configure({
        multicolor: true
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Qual o título?'
          }

          return "Comece com '/' para abrir o menu."
        }
      })
    ],
    onUpdate({ editor }) {
      return setChapterContent({
        content: editor.getHTML(),
        wordsCounter: countWords(editor.getText())
      })
    },
    immediatelyRender: false,
    content: chapterContent.content,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'outline-none leading-none text-gray-400'
      }
    }
  })

  const shouldShowFloatindMenu = (state: EditorState) => {
    const { $from } = state.selection
    const currentLineText = $from.nodeBefore?.textContent
    return currentLineText === '/'
  }

  const toggleFullscreen = () => setFullscreen((prev) => !prev)

  const wordsCounterText = chapterContent.wordsCounter > 1 ? 'Palavras' : 'Palavra'

  return (
    <div
      data-fullscreen={fullscreen}
      className="flex flex-col py-2 pt-12 w-[80%] h-[75vh] duration-300 data-[fullscreen=true]:z-50 data-[fullscreen=true]:inset-0 data-[fullscreen=true]:fixed data-[fullscreen=true]:w-screen data-[fullscreen=true]:h-screen bg-black/75 data-[fullscreen=true]:backdrop-blur-3xl relative rounded-lg overflow-x-hidden"
    >
      {editor && <ToolbarEditorHeader editor={editor} />}
      <ScrollShadow className="flex flex-col items-center justify-center size-full p-4 pt-10 rounded-sm ">
        <EditorContent className="prose prose-invert size-full" editor={editor} />
        {editor && (
          <FloatingMenu
            className="bg-black/85 h-28 overflow-y-auto backdrop-blur-2xl border-1 border-white/72 p-2 shadow-[0_2px_10px] shadow-black"
            editor={editor}
            shouldShow={({ state }) => shouldShowFloatindMenu(state)}
          >
            <div>
              <FloatingMenuContent editor={editor} />
            </div>
          </FloatingMenu>
        )}
        {editor && (
          <BubbleMenu editor={editor}>
            <ToolbarEditor editor={editor} />
          </BubbleMenu>
        )}
      </ScrollShadow>
      <div className="flex items-center content-between w-full">
        <Button aria-label="full-screen" isIconOnly onClick={toggleFullscreen} className="group">
          <Icon
            icon={AiOutlineFullscreen}
            color="white"
            size="lg"
            className="group-hover:text-gray-400"
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
    </div>
  )
}
