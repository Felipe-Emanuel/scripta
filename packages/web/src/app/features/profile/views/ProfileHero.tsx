import Image from 'next/image'
import Hero from '@assets/svg/profile-hero.svg'
import { Parallax } from '@shared/components/Parallax'
import { profileHeroTV } from '@features/profile/ProfileTV'

export function ProfileHero() {
  return (
    <Parallax className={profileHeroTV()}>
      <Image
        src={Hero}
        width={700}
        height={600}
        alt="Água viva no mar profundo"
        className="pointer-events-none"
      />
    </Parallax>
  )
}
