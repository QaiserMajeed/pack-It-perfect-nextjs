"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const GoogleTagManager = dynamic(() => import('../components/GoogleTagManager'), {
  ssr: false
})

const Header = dynamic(() => import('../components/header'), {
  ssr: false
})

const Footer = dynamic(() => import('../components/footer'), {
  ssr: false
})

const StickyCTAProvider = dynamic(() => import('../components/StickyCTAProvider'), {
  ssr: false
})

const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), {
  ssr: false
})

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleTagManager />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      
      <main>{children}</main>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <StickyCTAProvider />
      </Suspense>
      
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </>
  )
}