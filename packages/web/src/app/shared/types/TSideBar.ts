import { ElementType } from 'react'

export type TSidebarItem = {
  id: number
  icon: ElementType
  label: string
  href: string
}

type TSidebarSection = {
  id: number
  name: string
  items?: TSidebarItem[]
}

export type TSideBar = {
  section: TSidebarSection
}
