'use client'

import { LottieOptions, useLottie } from 'lottie-react'
import AnimatedRightArrow from './animatedRightArrow.json'
import { rightArrowTV } from '@shared/animations/animatedRightArrow/RightArrowTV'

export function RightArrow() {
  const options: LottieOptions<'svg'> = {
    animationData: AnimatedRightArrow,
    autoplay: true,
  }

  const { View } = useLottie(options)

  return <span className={rightArrowTV()}>{View}</span>
}
