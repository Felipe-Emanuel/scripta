'use client'

import { Tabs, Tab } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { TBookPerformanceProperty, TTab } from '@shared/types'
import { memo } from 'react'
import * as tv from '../BookPerformanceTV'

interface BooksPerformanceTabsProps {
  handleTabFilter: (value: TBookPerformanceProperty) => void
  tabs: TTab[]
}

function BooksPerformanceTabs({ handleTabFilter, tabs }: BooksPerformanceTabsProps) {
  return (
    <Tabs
      data-testid="tablist"
      variant="light"
      color="primary"
      aria-label="filters-tabs"
      items={tabs}
      className="scrollbar-thin"
    >
      {(tab) => (
        <Tab
          key={tab?.label}
          className={tv.booksPerformanceTabsWrapperTV()}
          data-testid={`tab-${tab?.label}`}
          title={
            <div
              onClick={() => handleTabFilter(tab?.value)}
              className={tv.booksPerformanceTabItemWrapperTV()}
            >
              <div className={tv.booksPerformanceTabItemContentTV()}>
                <div className={tv.booksPerformanceTabItemContentHeadTV()}>
                  <Icon icon={tab?.icon} color="white" size="responsive" />
                </div>
                <Text text={tab?.label} color="gray" weight="normal" />
              </div>
              <Text text={tab?.amount} color="white" weight="light" size="md" />
            </div>
          }
        />
      )}
    </Tabs>
  )
}

export default memo(BooksPerformanceTabs)
