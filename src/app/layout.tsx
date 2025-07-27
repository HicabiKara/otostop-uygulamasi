
import type { Metadata } from 'next'
import StoreProvider from "@/providers/StoreProvider"
import SessionProvider from '@/providers/SessionProvider'
import { ScrollToTop } from '@/providers/ScrollToTop'
export const metadata: Metadata = {
  title: 'Yol Arkadaşı',
  description: 'Açıklama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
        <StoreProvider>
          <ScrollToTop/>         
          {children} 
        </StoreProvider>
      </SessionProvider>
      </body>
    </html>
  )
}