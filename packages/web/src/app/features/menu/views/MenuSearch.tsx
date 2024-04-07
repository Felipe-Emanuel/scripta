'use client'

import { Autocomplete, AutocompleteItem, Button, Tooltip } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { useHelpSearch } from '@shared/hooks/contexts/useHelpSearch'
import { TMenuSearchDefaultItem } from '@shared/types'
import { useCallback, useEffect, useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import { IoSearch } from 'react-icons/io5'

interface IMenuSearchProps {
  defaultItems: TMenuSearchDefaultItem[]
}

export function MenuSearch({ defaultItems }: IMenuSearchProps) {
  const { goTo, ref, updateRef, clearHelper } = useHelpSearch()

  const [currentHelper, setCurrentHelper] = useState<TMenuSearchDefaultItem | null>(null)

  const { x, y } = goTo

  const clearing = useCallback(() => {
    clearHelper()
    setCurrentHelper(null)
  }, [clearHelper])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearing()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [clearing])

  useEffect(() => {
    const existentHelper = defaultItems.find((item) => item.ref === ref)

    if (existentHelper) setCurrentHelper(existentHelper)
  }, [defaultItems, ref])

  return (
    <>
      <Autocomplete
        aria-label="Busca por ajuda"
        placeholder="Busque por algo..."
        className="text-gray-400"
        startContent={<Icon icon={IoSearch} color="gray" size="lg" />}
        radius="full"
        variant="underlined"
        defaultItems={defaultItems}
        selectedKey={currentHelper?.ref}
        onSelectionChange={(key) => updateRef(key?.toString())}
        onClear={clearHelper}
      >
        {(item) => (
          <AutocompleteItem data-testid={`item-${item.value}`} key={item.ref}>
            <div className="flex items-center gap-2">
              <div className="cursor-pointer border-0 rounded-lg size-6 flex items-center justify-center duration-500 bg-primary">
                <Icon icon={item?.icon} size="lg" color="white" />
              </div>
              <Text text={item?.label} color="gray" size="md" />
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div
        id="help-to-element"
        className={`overflow-hidden flex flex-col gap-2 fixed z-50 backdrop-blur-3xl bg-gray-400/25 ring-1 ring-gray-400/50 p-2 rounded-xl ${currentHelper ? 'w-full max-w-52 lg:max-w-72 xl:max-w-96 opacity-100 duration-1000' : 'size-0 opacity-0 duration-0 inset-0 pointer-events-none'}`}
        style={{
          top: y,
          left: x
        }}
      >
        <Tooltip showArrow content="Dispensar">
          <Button isIconOnly onClick={clearing} className="absolute right-0 top-0">
            <Icon icon={IoMdCloseCircle} />
          </Button>
        </Tooltip>
        {currentHelper?.icon && (
          <div className="flex items-center gap-2">
            <div className="cursor-pointer border-0 rounded-xl size-9 flex flex-shrink-0 items-center justify-center duration-500 bg-primary">
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
