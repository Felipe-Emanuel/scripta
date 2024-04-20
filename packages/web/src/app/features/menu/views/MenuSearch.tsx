'use client'

import { Autocomplete, AutocompleteItem, Button, Tooltip } from '@nextui-org/react'
import { useEffect } from 'react'

import { IoMdCloseCircle } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'

import { Icon, Text } from '@shared/components'
import { TMenuSearchDefaultItem } from '@shared/types'
import { useMenuController } from '../controller'
import * as tv from '../MenuTV'

interface IMenuSearchProps {
  defaultItems: TMenuSearchDefaultItem[]
}

export function MenuSearch({ defaultItems }: IMenuSearchProps) {
  const { goTo, ref, currentHelper, updateRef, clearing, setCurrentHelper } = useMenuController()

  const { x, y } = goTo

  useEffect(() => {
    const existentHelper = defaultItems.find((item) => item.ref === ref)

    if (existentHelper) setCurrentHelper(existentHelper)
  }, [defaultItems, ref, setCurrentHelper])

  return (
    <>
      <Autocomplete
        aria-label="Busca por ajuda"
        placeholder="Busque por ajuda..."
        className={tv.autocompleteTV()}
        startContent={<Icon icon={IoSearch} color="gray" size="lg" />}
        radius="full"
        variant="underlined"
        defaultItems={defaultItems}
        selectedKey={currentHelper?.ref}
        onSelectionChange={(key) => updateRef(key?.toString())}
        onClear={clearing}
      >
        {(item) => (
          <AutocompleteItem
            textValue={item.value}
            data-testid={`item-${item.value}`}
            key={item.ref}
          >
            <div className={tv.autocompleteItemWrapperTV()}>
              <div className={tv.autocompleteItemIconTV()}>
                <Icon icon={item?.icon} size="lg" color="white" />
              </div>
              <Text text={item?.label} color="gray" size="md" />
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div
        id="help-to-element"
        data-testid="help-to-element"
        className={tv.helperWrapperTV({ currentHelper: !!currentHelper })}
        style={{
          top: y,
          left: x
        }}
      >
        <Tooltip showArrow content="Dispensar">
          <Button isIconOnly onClick={clearing} className={tv.closeIconTV()}>
            <Icon icon={IoMdCloseCircle} />
          </Button>
        </Tooltip>
        {currentHelper?.icon && (
          <div className={tv.currentHelperHeaderWrapperTV()}>
            <div className={tv.currentHelperIconWrapperTV()}>
              <Icon icon={currentHelper?.icon} size="lg" color="white" />
            </div>
            <Text text={currentHelper?.label} color="gray" size="md" />
          </div>
        )}
        <Text text={currentHelper?.tip} color="white" size="sm" />
      </div>
    </>
  )
}
