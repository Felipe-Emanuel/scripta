'use client'

import { KbdKey } from "@heroui/react"
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useNativeBrowser = () => {
  const [isCopied, setIsCopied] = useState(false)

  const isWindows = /Windows/.test(navigator.userAgent)
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  const browser = (() => {
    const ua = navigator.userAgent
    if (/Chrome/i.test(ua)) return 'Chrome'
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari'
    if (/Firefox/i.test(ua)) return 'Firefox'
    if (/Edge/i.test(ua)) return 'Edge'
    if (/MSIE|Trident/i.test(ua)) return 'Internet Explorer'
    return 'Unknown'
  })()

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const languages = navigator.languages || [navigator.language]
  const supportsClipboard = !!navigator.clipboard
  const supportsNotifications = 'Notification' in window
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const commandBySystem: KbdKey = isWindows ? 'ctrl' : 'command'
  const kbdKeyToPress = isWindows ? 'Control' : 'command'

  const copyToClipboard = (message: string) => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setIsCopied(true)
        toast.success('Copiado para a área de transferência!')
      })
      .catch((err) => {
        setIsCopied(false)
        toast.error('Falha ao corrigir o texto')
        throw new Error(`Falha ao copiar os erros: ${err}`)
      })
  }

  return {
    isWindows,
    isMobile,
    browser,
    prefersDarkMode,
    languages,
    supportsClipboard,
    supportsNotifications,
    screenWidth,
    screenHeight,
    commandBySystem,
    kbdKeyToPress,
    isCopied,
    setIsCopied,
    copyToClipboard
  }
}
