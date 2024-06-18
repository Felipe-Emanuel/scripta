'use client'

import { Button } from '@nextui-org/react'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

import { Feedback } from '@features/feedback'
import { Icon, Text, Title } from '@shared/components'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import { getIsActivePath, items } from '../SidebarUtils'
import * as tv from '../SidebarTV'

export function SidebarItems() {
  const { isFeedbackOnFocus, isOpen } = useSidebar()

  const pathname = usePathname()
  const params = useParams()

  return (
    <div className={tv.sidebarItemsWrapperTv()}>
      <div className={tv.sidebarItemsWrapperContentTv()}>
        {items.map((item) => {
          return (
            <section key={item.section.id} className={tv.sidebarItemsRootTv()}>
              {item.section.items && item.section.items?.length && (
                <>
                  <Title as="h6" title={item.section.name} size="md" weight="bold" color="gray" />
                  {item.section.items?.map((sectionItem) => {
                    const isActive = getIsActivePath(sectionItem, pathname, params)
                    const isDisabled = isFeedbackOnFocus || isActive

                    return (
                      <Button
                        as={Link}
                        disabled={isDisabled}
                        color={isActive ? 'primary' : 'default'}
                        key={sectionItem.id}
                        fullWidth
                        className={`my-2 relative duration-500 hover:bg-primary/25
                            ${isOpen ? '' : 'max-[1890px]:bg-transparent'}
                            ${isDisabled ? 'pointer-events-none' : 'pointer-events-auto'}
                          `}
                        href={sectionItem.href}
                      >
                        <div className={tv.sidebarLinkContentTv({ isOpen })}>
                          <div className={tv.sidebarIconWrapperTv()}>
                            <Icon
                              icon={sectionItem.icon}
                              color={isActive ? 'white' : 'primary'}
                              className={tv.sidebarIconlTv({ isOpen })}
                            />
                          </div>
                          <Text
                            text={sectionItem.label}
                            as="span"
                            className={tv.sidebarLinkLabelTv({ isOpen })}
                          />
                        </div>
                      </Button>
                    )
                  })}
                </>
              )}
            </section>
          )
        })}
      </div>

      <Feedback.root>
        {isFeedbackOnFocus && <Feedback.close />}
        <Feedback.about />
        {isFeedbackOnFocus && <Feedback.screenshot />}
        {isFeedbackOnFocus && <Feedback.action />}
      </Feedback.root>
    </div>
  )
}
