import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painel do Escritor | Autenticação'
}

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
