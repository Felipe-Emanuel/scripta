import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import { Extensions } from '@tiptap/react'

import { FirstLineIndent, TransformDashToDialog } from './identations'

export const extensions: Extensions = [
  StarterKit,
  TransformDashToDialog,
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

      return 'Comece com / para abrir o menu.'
    }
  })
]
