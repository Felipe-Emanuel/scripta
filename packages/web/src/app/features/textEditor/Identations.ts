import { Extension } from '@tiptap/react'

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
              firstLineIndent: element.style.textIndent,
            })
          },
          lineHeight: {
            default: '1.5',
            renderHTML: attributes => {
              return {
                style: `line-height: ${attributes.lineHeight}`,
              }
            },
            parseHTML: element => ({
              lineHeight: element.style.lineHeight,
            }),
          },
          fontSize: {
            default: '16px',
            renderHTML: attributes => {
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
            parseHTML: element => ({
              fontSize: element.style.fontSize,
            }),
          },
        }
      }
    ]
  }
})
