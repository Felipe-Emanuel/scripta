import { Button } from "@heroui/react"
import { Icon, Text } from '@shared/components'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { floatingMenuContentButtons } from './componentUtils'
import * as tv from './TextEditorComponentsTV'

export function FloatingMenuContent({ editor }: IToolbarEditor) {
  return floatingMenuContentButtons.map(({ level, icon, label, description, action }) => (
    <span key={level || 'list'}>
      <Button
        onClick={() => action(editor)}
        variant="light"
        color="secondary"
        size="lg"
        data-active={
          level !== null ? editor.isActive('heading', { level }) : editor.isActive('bulletList')
        }
        className={tv.floatingMenuContentButtonsTV()}
        radius="none"
      >
        <div className={tv.floatingMenuContentButtonsIconTV()}>
          <Icon icon={icon} color="black" size="lg" />
        </div>
        <div className={tv.floatingMenuContentButtonsContentTV()}>
          <Text as="b" weight="bold" color="white" text={label} />
          <Text as="small" weight="light" color="gray" text={description} />
        </div>
      </Button>
    </span>
  ))
}
