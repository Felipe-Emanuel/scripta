import { createContext, useCallback, useEffect, useState } from 'react'

interface HelpSearchContextProps {
  goTo: {
    x: number
    y: number
  }
  ref: string
  updateRef: (value: string) => void
  clearHelper: () => void
}

export const HelpSearchContext = createContext({} as HelpSearchContextProps)

export function HelpSearchProvider({ children }: { children: React.ReactNode }) {
  const [ref, setRef] = useState('')
  const [goTo, setGoTo] = useState({ x: 0, y: 0 })

  const updateRef = useCallback((value: string) => {
    setRef(value)
  }, [])

  const updateHelperStyles = useCallback(
    (addClass: boolean) => {
      const overflowSearchHelper = document.getElementById('overflow-search-helper')
      const aside = document.getElementById('aside')
      const el = document.getElementById(ref)

      if (overflowSearchHelper && aside) {
        if (addClass) {
          overflowSearchHelper.classList.add('bg-black/70', 'pointer-events-auto')
          aside.classList.add('pointer-events-none', 'z-0')
        } else {
          el?.classList.remove('z-40')
          overflowSearchHelper.classList.remove('bg-black/70', 'pointer-events-auto')
          aside.classList.remove('pointer-events-none', 'z-0')
        }
      }
    },
    [ref]
  )

  const highlightReference = useCallback(() => {
    const el = document.getElementById(ref)

    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })

      el.classList.add('z-40')

      const position = el.getBoundingClientRect()
      setGoTo({ x: position.left, y: position.bottom - position.top })

      updateHelperStyles(true)
    }
  }, [ref, updateHelperStyles])

  const clearHelper = useCallback(() => {
    updateRef('')
    updateHelperStyles(false)
  }, [updateRef, updateHelperStyles])

  useEffect(() => {
    if (ref) {
      highlightReference()
    }
  }, [ref, highlightReference])

  return (
    <HelpSearchContext.Provider value={{ goTo, ref, updateRef, clearHelper }}>
      {children}
    </HelpSearchContext.Provider>
  )
}
