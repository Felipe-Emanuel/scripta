import type { Metadata } from 'next'
import { Providers } from 'src/app/providers'
import '@global/globals.css'
import { Main } from '@shared/components/Main'
import { Toast } from '@shared/components'

export const metadata: Metadata = {
  title: 'Memorize | Novos',
  description: 'Memorize personagens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Main overflow="hidden">
            {children}
            <Toast />
          </Main>
        </Providers>
      </body>
    </html>
  )
}
