import { Metadata } from 'next'
import JarsCupsPage from '../../components/JarsCupsPage'

export const metadata: Metadata = {
  title: 'Custom Jars and Cups | Food and Beverage Packaging',
  description: 'Shop our range of customizable jars and cups for food, beverages, and cosmetics.',
}

export default function JarsCups() {
  return <JarsCupsPage />
}
