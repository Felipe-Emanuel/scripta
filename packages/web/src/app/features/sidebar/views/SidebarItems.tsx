'use client'

import { Button } from '@nextui-org/react'

import Link from 'next/link'

import { Icon, Text, Title } from '@shared/components'
import { usePathname } from 'next/navigation'
import { items } from '../SidebarUtils'
import * as tv from '../SidebarTV'

interface SidebarItemsProps {
  isOpen: boolean
}

export function SidebarItems({ isOpen }: SidebarItemsProps) {
  const pathname = usePathname()

  return (
    <>
      {items.map((item) => {
        return (
          <section key={item.section.id} className={tv.sidebarItemsRootTv()}>
            {item.section.items && item.section.items?.length && (
              <>
                <Title as="h6" title={item.section.name} size="md" weight="semi-bold" />
                {item.section.items?.map((sectionItem) => {
                  const isActive = pathname === sectionItem.href

                  return (
                    <Button
                      as={Link}
                      disabled={isActive}
                      color={isActive ? 'primary' : 'default'}
                      key={sectionItem.id}
                      fullWidth
                      className={`my-2 relative duration-500
                          ${isOpen ? '' : 'max-[1890px]:bg-transparent'}
                          ${isActive ? 'pointer-events-none' : 'pointer-events-auto'}
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
    </>
  )
}
