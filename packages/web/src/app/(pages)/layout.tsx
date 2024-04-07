import type { Metadata } from 'next'
import { Providers } from 'src/app/providers'
import { Main } from '@shared/components/Main'
import { Toast } from '@shared/components'
import { Sidebar } from './Sidebar'
import '@global/globals.css'

export const metadata: Metadata = {
  title: 'Painel do Escritor | Novos',
  description: 'Memorize personagens'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="m-0 p-0 scrollbar-none">
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
        <Providers>
          <Main overflow="hidden">
            <Sidebar />
            {children}
            <Toast />
          </Main>
        </Providers>
      </body>
    </html>
  )
}
