import * as tv from './TextEditorComponentsTV'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { IToolbarTogleItem, ToolbarTogleItem } from './ToolbarTogleItem'
import { Text } from '~/src/app/shared/components'

interface IToolbarDropdownItem extends IToolbarEditor, IToolbarTogleItem {
  text: string
  isActive: boolean
}

export function ToolbarDropdownItemContent({
  ariaLabel,
  value,
  text,
  icon,
  isActive
}: IToolbarDropdownItem) {
  return (
    <div data-active={isActive} className={tv.toolbarDropdownItemContentTV()}>
      <ToolbarTogleItem data-active={isActive} icon={icon} ariaLabel={ariaLabel} value={value} />
      <Text
        as="b"
        weight="bold"
        color="black"
        text={text}
        className={tv.toolbarDropdownItemContentTextTV()}
      />
    </div>
  )
}
