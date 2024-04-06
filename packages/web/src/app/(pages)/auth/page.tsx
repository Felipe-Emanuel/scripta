import { Auth } from '@features/auth'

export default function AuthPage() {
  return (
    <Auth.root>
      <Auth.leftSide />
      <Auth.rightSide>
        <Auth.form />
      </Auth.rightSide>
    </Auth.root>
  )
}
