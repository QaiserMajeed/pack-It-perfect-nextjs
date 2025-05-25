import type { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noindex?: boolean
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}: SEOConfig): Metadata {
  const baseUrl = 'https://packageitperfect.com'
  const fullUrl = canonicalUrl ? ${baseUrl} : baseUrl
  const imageUrl = ogImage.startsWith('http') ? ogImage : ${baseUrl}
  
  const allKeywords = [...keywords, 'custom packaging UK', 'bespoke packaging', 'eco-friendly packaging', 'Pack it Perfect']

  const metadata: Metadata = {
    title,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'Pack it Perfect' }],
    alternates: { canonical: fullUrl },
    openGraph: {
      type: ogType,
      locale: 'en_GB',
      url: fullUrl,
      siteName: 'Pack it Perfect',
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }

  if (ogType === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = { ...metadata.openGraph, type: 'article', publishedTime, modifiedTime }
  }

  if (noindex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}

export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pack it Perfect',
  url: 'https://packageitperfect.com',
  logo: 'https://packageitperfect.com/images/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44 07459 682266',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '128 City Road',
    addressLocality: 'London',
    postalCode: 'EC1V 2NX',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61574096784137',
    'https://www.instagram.com/pack.itperfect',
    'https://twitter.com/packageitperfect',
    'https://www.linkedin.com/company/packageitperfect',
  ],
}
