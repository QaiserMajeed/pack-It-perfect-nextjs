import { Metadata } from 'next'
import QuoteForm from '../../components/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Custom Packaging Solutions',
  description: 'Request a free quote for your custom packaging needs.',
}

export default function GetQuote() {
  return <QuoteForm />
}
