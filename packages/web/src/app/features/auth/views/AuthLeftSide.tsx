'use client'

import Image from 'next/image'
import AuthHero from '@assets/images/auth-hero.png'
import { Motion, Text } from '@shared/components'
import { TArrayComponents } from '@shared/types'
import * as tv from '@features/auth/AuthTV'

export function AuthLeftSide() {
  const components: TArrayComponents[] = [
    {
      id: 0,
      component: <Text text="Inspirado no futuro" size="lg" weight="light" />
    },
    {
      id: 1,
      component: <Text text="O Dashboard do escritor" size="lg" weight="bold" />
    }
  ]

  return (
    <div className={tv.authLeftSideRootTV()}>
      <Image src={AuthHero} fill alt="future hero image" className="absolute z-10" />
      <Image
        src={AuthHero}
        fill
        alt="future hero image animada"
        className={tv.animatedHeroTV()}
        fetchPriority="high"
      />
      <div className={tv.animatedHeroTextWrapperTV()}>
        <Motion components={components} />
      </div>
    </div>
  )
}
