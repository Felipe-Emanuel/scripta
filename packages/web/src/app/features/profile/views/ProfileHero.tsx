import Image from 'next/image'
import Hero from '@assets/svg/profile-hero.svg'
import { Parallax } from '@shared/components/Parallax'
import { profileHeroTV } from '@features/profile/ProfileTV'

export function ProfileHero() {
  return (
    <Parallax className={profileHeroTV({ local: 'root' })}>
      <Image
        src={Hero}
        width={1132}
        height={755}
        priority
        alt="Água viva no mar profundo"
        className={profileHeroTV({ local: 'image' })}
      />
    </Parallax>
  )
}
