import { Metadata } from 'next'
import ContactPage from '../../components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Our Custom Packaging Specialists',
  description: 'Get in touch with Pack it Perfect for all your custom packaging needs.',
}

export default function Contact() {
  return <ContactPage />
}
