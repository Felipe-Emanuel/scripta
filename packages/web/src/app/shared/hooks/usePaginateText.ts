import { useState, useEffect } from 'react'

export const usePaginateText = (text: string, containerHeight: number, containerWidth: number) => {
  const [pages, setPages] = useState<string[]>([])

  useEffect(() => {
    if (!text || containerHeight === 0) {
      setPages([''])
      return
    }

    const words = text.split(/\s+/)
    let currentPage: string[] = []
    const tempPages: string[] = []

    const testElement = document.createElement('div')
    testElement.style.position = 'absolute'
    testElement.style.visibility = 'hidden'
    testElement.style.width = `${containerWidth}px`
    testElement.style.fontSize = '16px'
    testElement.style.lineHeight = '1.5'
    testElement.style.whiteSpace = 'normal'
    testElement.style.wordWrap = 'break-word'
    document.body.appendChild(testElement)

    for (const word of words) {
      currentPage.push(word)
      testElement.innerHTML = currentPage.join(' ')

      if (testElement.clientHeight > containerHeight) {
        currentPage.pop()
        tempPages.push(currentPage.join(' '))
        currentPage = [word]
      }
    }

    if (currentPage.length) tempPages.push(currentPage.join(' '))

    document.body.removeChild(testElement)

    setPages(tempPages.length > 0 ? tempPages : [''])
  }, [text, containerHeight, containerWidth])

  return pages
}
