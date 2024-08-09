import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Editor, Extension } from '@tiptap/react'

export const FirstLineIndent = Extension.create({
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          firstLineIndent: {
            default: '2rem',
            renderHTML: (attributes) => {
              return {
                style: `text-indent: ${attributes.firstLineIndent};`
              }
            },
            parseHTML: (element) => ({
              firstLineIndent: element.style.textIndent
            })
          },
          lineHeight: {
            default: '1.5',
            renderHTML: (attributes) => {
              return {
                style: `line-height: ${attributes.lineHeight}`
              }
            },
            parseHTML: (element) => ({
              lineHeight: element.style.lineHeight
            })
          },
          fontSize: {
            default: '16px',
            renderHTML: (attributes) => {
              return {
                style: `font-size: ${attributes.fontSize}`
              }
            },
            parseHTML: (element) => ({
              fontSize: element.style.fontSize
            })
          },
          fontWeight: {
            default: '400',
            renderHTML: (attributes) => {
              return {
                style: `font-weight: ${attributes.fontWeight}`
              }
            },
            parseHTML: (element) => ({
              fontWeight: element.style.fontWeight
            })
          }
        }
      }
    ]
  }
})

export const TransformDashToDialog = Extension.create({
  name: 'transformDashToDialog',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('transformDashToDialog'),

        props: {
          handleTextInput(view, from, to, text) {
            const { state, dispatch } = view
            const { $from } = state.selection
            const { doc } = state
            const beforeText = doc.textBetween($from.pos - 2, $from.pos, undefined, '\ufffc')

            if (text === '-' && beforeText.endsWith('-')) {
              const tr = state.tr
              tr.delete($from.pos - 1, $from.pos)
              tr.insertText('—', $from.pos - 1)
              dispatch(tr)
              return true
            }

            return false
          }
        }
      })
    ]
  }
})

export const removeLeadingSlash = (editor: Editor) => {
  const { state, dispatch } = editor.view
  const { doc } = state

  const tr = state.tr
  
  doc.descendants((node, pos) => {
      const text = node.textContent
      if (text.startsWith('/')) {
        tr.delete(pos, pos + 1)
      }
  })

  dispatch(tr)
}
