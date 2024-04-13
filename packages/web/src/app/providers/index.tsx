'use client'

import { AppThemeProvider } from '@shared/contexts/ThemeContext'
import { queryClient } from '@shared/services/reactQuery'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { NextUIProvider } from '@nextui-org/react'
import { SidebarProvider } from '@shared/contexts/SidebarContext'
import { BookInformationProvider } from '@shared/contexts/BookInformationContext'

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

  const AllProviders = composeProviders(AppThemeProvider, SidebarProvider, BookInformationProvider)

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AllProviders>{children}</AllProviders>
      </QueryClientProvider>
    </NextUIProvider>
  )
}
