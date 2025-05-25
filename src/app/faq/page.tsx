import { Metadata } from 'next'
import FAQPage from '../../components/FAQPage'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Custom Packaging',
  description: 'Find answers to common questions about our custom packaging services.',
}

export default function FAQ() {
  return <FAQPage />
}
