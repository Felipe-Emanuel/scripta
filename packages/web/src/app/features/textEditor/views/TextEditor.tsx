'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
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
  // Remover espaços extras e dividir o texto por espaços em branco
  const words = text.trim().split(/\s+/)
  // Filtrar palavras vazias que podem ocorrer se houver múltiplos espaços consecutivos
  const filteredWords = words.filter((word) => word.length > 0)
  // Retornar a quantidade de palavras
  return filteredWords.length
}

export function TextEditor() {
  const [fullscreen, setFullscreen] = useState(false)
  const [chapterContent, setChapterContent] = useState({
    content: '',
    wordsCounter: 0
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Highlight.configure({
        multicolor: true
      }),
      Underline,
      FirstLineIndent
    ],
    onUpdate({ editor }) {
      setChapterContent({
        content: editor.getHTML(),
        wordsCounter: countWords(editor.getText())
      })
    },
    content: chapterContent.content ? chapterContent.content : '<p>Inicie com / para abrir o menu.</p>',
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
            className="bg-black/85 backdrop-blur-2xl border-1 border-white/72 p-2 shadow-[0_2px_10px] shadow-black"
            editor={editor}
            shouldShow={({ state }) => shouldShowFloatindMenu(state)}
          >
            <FloatingMenuContent editor={editor} />
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
          <Text size="sm" as="small" color="black" text={`${wordsCounterText} ${chapterContent.wordsCounter}`} />
        </Chip>
      </div>
    </div>
  )
}
