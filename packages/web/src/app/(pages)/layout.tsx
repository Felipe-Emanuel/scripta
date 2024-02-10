import type { Metadata } from 'next'
import { Providers } from 'src/app/providers'
import '@global/globals.css'
import { Main } from '@shared/components/Main'

export const metadata: Metadata = {
  title: 'Memorize',
  description: 'Memorize personagens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth w-screen h-screen">
        <Providers>
          <Main overflow="hidden">{children}</Main>
        </Providers>
      </body>
    </html>
  )
}
