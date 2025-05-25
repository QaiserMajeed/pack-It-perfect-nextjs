import { Metadata } from 'next'
import HeroSection from '../components/HomePageComponents/HeroSection'
import FeatureHighlights from '../components/HomePageComponents/FeatureHighlights'
import IndustryCategoriesSection from '../components/HomePageComponents/IndustryCategoriesSection'
import BestSellingProducts from '../components/HomePageComponents/BestSellingProducts'
import CompanyBenefitsSection from '../components/HomePageComponents/CompanyBenefitsSection'
import TestimonialsSection from '../components/HomePageComponents/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Custom Packaging Solutions | UK Premier Packaging Provider',
  description: 'Pack it Perfect offers premium custom packaging solutions with eco-friendly materials, free design assistance, and fast UK delivery. Get a quote today!',
  keywords: 'custom packaging, packaging boxes UK, eco-friendly packaging, custom boxes',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureHighlights />
      <IndustryCategoriesSection />
      <BestSellingProducts />
      <CompanyBenefitsSection />
      <TestimonialsSection />
    </>
  )
}
