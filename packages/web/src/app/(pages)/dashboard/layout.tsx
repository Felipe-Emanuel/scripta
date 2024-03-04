import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memorize | Painel',
  description: 'Aprimore-se com o seu dashboard',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
