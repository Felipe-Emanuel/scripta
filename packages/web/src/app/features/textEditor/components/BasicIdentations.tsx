import * as Toolbar from '@radix-ui/react-toolbar'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { ToolbarTogleItem } from './ToolbarTogleItem'
import { basicIdentationsButtons } from './componentUtils'
import { basicIdentationsTV } from './TextEditorComponentsTV'

export function BasicIdentations({ editor }: IToolbarEditor) {
  return (
    <Toolbar.ToggleGroup
      type="multiple"
      className={basicIdentationsTV()}
      aria-label="Text formatting"
    >
      {basicIdentationsButtons.map(({ action, icon, value, ariaLabel }) => (
        <ToolbarTogleItem
          key={value}
          onClick={() => action(editor)}
          data-active={editor?.isActive(value)}
          icon={icon}
          ariaLabel={ariaLabel}
          value={value}
        />
      ))}
    </Toolbar.ToggleGroup>
  )
}
