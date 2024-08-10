'use client'

import { EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'

import { ScrollShadow } from '@nextui-org/react'

import { ToolbarEditor } from '../components/ToolbarEditor'
import { ToolbarEditorHeader } from '../components/ToolbarEditorHeader'
import { FloatingMenuContent } from '../components/FloatingMenuContent'

import { useEditorController } from '../controller'
import * as tv from '../TextEditorTV'
import { TextEditorFooter } from '../components/TextEditorFooter'

export function TextEditor() {
  const {
    editor,
    fullscreen,
    wordsCounterText,
    chapterContent,
    menuState,
    shouldShowFloatindMenu,
    toggleFullscreen,
    setMenuState,
    togleMenu,
    menuIcon
  } = useEditorController()

  return (
    <div data-fullscreen={fullscreen} className={tv.textEditorTV()}>
      {editor && (
        <ToolbarEditorHeader
          editor={editor}
          menuIcon={menuIcon}
          menuState={menuState}
          setMenuState={setMenuState}
          togleMenu={togleMenu}
        />
      )}
      <ScrollShadow className={tv.textEditorScrollShadowTV()}>
        <EditorContent className={tv.textEditorEditorContentV()} editor={editor} />
        {editor && (
          <FloatingMenu
            tippyOptions={{ duration: 1000 }}
            className={tv.textEditorFloatingMenuTV()}
            editor={editor}
            shouldShow={() => shouldShowFloatindMenu(editor?.state)}
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

      <TextEditorFooter
        chapterContent={chapterContent}
        toggleFullscreen={toggleFullscreen}
        wordsCounterText={wordsCounterText}
      />
    </div>
  )
}
