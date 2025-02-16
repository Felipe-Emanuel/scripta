import { Tabs, Tab, Chip, Tooltip } from "@heroui/react"
import { Icon, Text } from '@shared/components'
import { TCurrentTab } from '@shared/types'
import { useMemo } from 'react'
import { FaBook } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa6'
import * as tv from './ReaderComponentsTV'

export interface IFilterTabsProps {
  currentTab: TCurrentTab
  totalReaders: number
  totalReadersByBook: number
  handleFilterByAll: VoidFunction
}

export function FilterTabs({
  currentTab,
  totalReaders,
  totalReadersByBook,
  handleFilterByAll
}: IFilterTabsProps) {
  const rab = useMemo(() => {
    const tabs = [
      {
        key: 'Todos',
        label: 'Todos',
        icon: FaUsers,
        total: totalReaders,
        onClick: handleFilterByAll,
        tooltip: 'Leitores'
      },
      {
        key: 'Livro',
        label: 'Livro',
        icon: FaBook,
        total: totalReadersByBook,
        onClick: () => {},
        tooltip: totalReadersByBook > 1 ? 'Livros' : 'Livro'
      }
    ]

    return tabs.map((tab) => {
      const disabled = currentTab === tab.key || tab.key === 'Livro'

      return (
        <Tab
          className={tv.tabTV({ disabled })}
          key={tab.key}
          disabled={disabled}
          title={
            <div onClick={() => tab.onClick()} className={tv.tabContentWrapperTV()}>
              <Icon icon={tab.icon} color="white" />
              <Text as="span" text={tab.label} />
              <Tooltip content={tab.tooltip} showArrow>
                <Chip size="sm" variant="faded" className={tv.tabContentChipTV()}>
                  {tab.total}
                </Chip>
              </Tooltip>
            </div>
          }
        />
      )
    })
  }, [currentTab, totalReaders, totalReadersByBook, handleFilterByAll])

  return (
    <div className={tv.tabWrapperTV()}>
      <Tabs
        radius="full"
        selectedKey={currentTab}
        aria-label="Options"
        color="primary"
        variant="bordered"
      >
        {rab}
      </Tabs>
    </div>
  )
}
