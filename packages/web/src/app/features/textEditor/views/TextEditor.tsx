'use client'

import { EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'

import { ScrollShadow } from '@nextui-org/react'

import { ToolbarEditor } from '../components/ToolbarEditor'
import ToolbarEditorHeader from '../components/ToolbarEditorHeader'
import { FloatingMenuContent } from '../components/FloatingMenuContent'

import { useEditorController } from '../controller'
import { TextEditorFooter } from '../components/TextEditorFooter'
import * as tv from '../TextEditorTV'

interface ITextEditor {
  bookId: string
}

export function TextEditor({ bookId }: ITextEditor) {
  const {
    editor,
    fullscreen,
    wordsCounterText,
    menuState,
    shouldShowFloatindMenu,
    toggleFullscreen,
    updateMenuState,
    togleMenu,
    menuIcon
  } = useEditorController(bookId)

  if (!editor) return null

  return (
    <div data-fullscreen={fullscreen} className={tv.textEditorTV()}>
      {editor && (
        <ToolbarEditorHeader
          editor={editor}
          menuIcon={menuIcon}
          menuState={menuState}
          updateMenuState={updateMenuState}
          togleMenu={togleMenu}
        />
      )}
      <ScrollShadow className={tv.textEditorScrollShadowTV()}>
        <EditorContent id="editor" className={tv.textEditorEditorContentV()} editor={editor} />
        {editor && (
          <FloatingMenu
            tippyOptions={{ duration: 1000 }}
            className={tv.textEditorFloatingMenuTV()}
            editor={editor}
            shouldShow={() => shouldShowFloatindMenu(editor?.state)}
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

      <TextEditorFooter
        chapterContent={menuState}
        toggleFullscreen={toggleFullscreen}
        wordsCounterText={wordsCounterText}
      />
    </div>
  )
}
