import { Tabs, Tab } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { TBookPerformanceProperty, TTab } from '@shared/types'

interface BooksPerformanceTabsProps {
  handleTabFilter: (value: TBookPerformanceProperty) => void
  tabs: TTab[]
}

export function BooksPerformanceTabs({
  handleTabFilter,
  tabs,
}: BooksPerformanceTabsProps) {
  return (
    <Tabs
      data-testid="tablist"
      variant="light"
      color="primary"
      aria-label="filters-tabs"
      items={tabs}
      className="scrollbar-hide"
    >
      {(tab) => (
        <Tab
          key={tab.label}
          className="w-36 h-24 rounded-3xl"
          data-testid={`tab-${tab.label}`}
          title={
            <div
              onClick={() => handleTabFilter(tab.value)}
              className="flex flex-col items-start gap-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Icon icon={tab.icon} color="white" />
                </div>
                <Text text={tab.label} color="gray" weight="normal" />
              </div>
              <Text text={tab.amount} color="white" weight="light" size="md" />
            </div>
          }
        />
      )}
    </Tabs>
  )
}
