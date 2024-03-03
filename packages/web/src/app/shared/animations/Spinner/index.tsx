'use client'

import { useLottie } from 'lottie-react'
import SpinnerLoad from './SpinnerLoad.json'

export function Spinner() {
  const options = {
    animationData: SpinnerLoad,
    autoplay: true,
  }

  const { View } = useLottie(options)

  return <span>{View}</span>
}
