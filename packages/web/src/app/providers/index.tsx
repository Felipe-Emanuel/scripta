'use client'

import { AppThemeProvider } from '@shared/contexts/ThemeContext'
import { queryClient } from '@shared/services/reactQuery'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { HeroUIProvider } from "@heroui/react"
import { SidebarProvider } from '@shared/contexts/SidebarContext'
import { BookProvider } from '@shared/contexts/BookContext'

type TProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: TProvidersProps) {
  const composeProviders =
    (
      ...providers: {
        ({ children }: TProvidersProps): JSX.Element
      }[]
    ) =>
    (props: { children: ReactNode }) =>
      providers.reduceRight(
        (children, Provider) => <Provider {...props}>{children}</Provider>,
        props.children
      )

  const AllProviders = composeProviders(AppThemeProvider, SidebarProvider, BookProvider)

  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AllProviders>{children}</AllProviders>
      </QueryClientProvider>
    </HeroUIProvider>
  )
}
