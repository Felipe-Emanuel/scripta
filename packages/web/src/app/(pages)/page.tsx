import { ChangeTheme } from '@features/changeTheme'
import { Text } from '@shared/components'

export default function ClientContent() {
  return (
    <>
      <Text text="página de novos construção" />
      <ChangeTheme.root>
        <ChangeTheme.icon />
      </ChangeTheme.root>
    </>
  )
}
