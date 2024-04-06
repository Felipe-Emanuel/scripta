import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painel do Escritor',
  description: 'Aprimore-se com o seu dashboard',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
