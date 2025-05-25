// src/app/layout.tsx - FIXED VERSION
import './globals.css'
import { Inter } from 'next/font/google'
import ClientWrapper from './../app/client-wrapper'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}