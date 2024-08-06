'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { ToolbarEditor } from '../components/ToolbarEditor'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import {ScrollShadow} from "@nextui-org/react"

export function TextEditor() {
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
      })
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'outline-none leading-none'
      }
    }
  })

  return (
    <div className="flex flex-col py-2 pt-12 w-[80%] h-[75vh] bg-black/75 relative rounded-lg">
      {editor && <ToolbarEditor className="absolute top-0 left-0" editor={editor} />}
      <ScrollShadow className="flex flex-col items-center justify-center size-full p-4">
        <EditorContent
          className="prose prose-invert size-full"
          editor={editor}
        />

        {editor && (
          <BubbleMenu editor={editor}>
            <ToolbarEditor editor={editor} />
          </BubbleMenu>
        )}
      </ScrollShadow>
    </div>
  )
}
