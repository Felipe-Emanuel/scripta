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
    <div
      data-active={isActive}
      className="flex items-center gap-2 bg-transparent rounded-sm size-full data-[active=true]:bg-primary group"
    >
      <ToolbarTogleItem data-active={isActive} icon={icon} ariaLabel={ariaLabel} value={value} />
      <Text
        as="b"
        weight="bold"
        color="black"
        text={text}
        className="group-data-[active=true]:text-white"
      />
    </div>
  )
}
