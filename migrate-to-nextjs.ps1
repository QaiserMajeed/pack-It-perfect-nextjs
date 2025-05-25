# Quick Fix Migration Script - Run this instead
# Complete Migration Script from React to Next.js (FIXED VERSION)
# This script migrates all components, hooks, services, and other files

Write-Host "Starting Complete React to Next.js Migration..." -ForegroundColor Green

# Define source and destination paths
$SourceDir = "pack-it-perfect"
$DestDir = "pack-it-perfect-nextjs"

# Check if directories exist
if (-not (Test-Path $SourceDir)) {
    Write-Host "Error: Source directory '$SourceDir' not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $DestDir)) {
    Write-Host "Error: Destination directory '$DestDir' not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Migrating from $SourceDir to $DestDir..." -ForegroundColor Yellow

# Step 1: Copy and migrate components
Write-Host "Step 1: Migrating Components..." -ForegroundColor Yellow

# Create components directory structure
$ComponentDirs = @(
    "src\components",
    "src\components\HomePageComponents",
    "src\hooks",
    "src\services",
    "src\utils",
    "src\data",
    "src\styles"
)

foreach ($dir in $ComponentDirs) {
    $targetDir = Join-Path $DestDir $dir
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# Step 2: Copy components with React Router to Next.js Link conversion
Write-Host "Step 2: Converting Components..." -ForegroundColor Yellow

$ComponentFiles = @(
    "src\components\BlogList.jsx",
    "src\components\BlogDetail.jsx",
    "src\components\CaseStudies.jsx",
    "src\components\CaseStudy.jsx",
    "src\components\ContactPage.jsx",
    "src\components\CustomBoxform.jsx",
    "src\components\FAQPage.jsx",
    "src\components\GoogleTagManager.jsx",
    "src\components\ImageOverlay.jsx",
    "src\components\JarsCupsPage.jsx",
    "src\components\LocaleSelector.jsx",
    "src\components\OptimizeImage.jsx",
    "src\components\PaymentsPlans.jsx",
    "src\components\Productcard.jsx",
    "src\components\Products.js",
    "src\components\ProductDetails.js",
    "src\components\QuoteForm.jsx",
    "src\components\ScrollToTop.jsx",
    "src\components\StickyCTA.jsx",
    "src\components\StickyCTAProvider.jsx",
    "src\components\StyleCarasoulComponent.js",
    "src\components\Telephone.jsx",
    "src\components\Textcontainer.js",
    "src\components\TopProduct.js",
    "src\components\TopProductDetails.js",
    "src\components\carasoulContainer.jsx",
    "src\components\footer.jsx",
    "src\components\header.jsx",
    "src\components\mainContent.jsx",
    "src\components\maincontent2.jsx"
)

foreach ($file in $ComponentFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir $file
    
    if (Test-Path $sourcePath) {
        # Read the file content
        $content = Get-Content $sourcePath -Raw
        
        # Convert React Router imports to Next.js
        $content = $content -replace 'import \{ Link \} from "react-router-dom"', 'import Link from "next/link"'
        $content = $content -replace 'import \{ Link, useNavigate, useLocation \} from "react-router-dom"', 'import Link from "next/link"; import { useRouter } from "next/router"; import { usePathname } from "next/navigation"'
        $content = $content -replace 'import \{ useParams, Link, useLocation \} from "react-router-dom"', 'import Link from "next/link"; import { useRouter } from "next/router"; import { usePathname } from "next/navigation"'
        $content = $content -replace 'import \{ useParams, useNavigate \} from "react-router-dom"', 'import { useRouter } from "next/router"'
        $content = $content -replace 'import \{ BrowserRouter as Router, Route, Routes \} from "react-router-dom"', '// Next.js handles routing automatically'
        
        # Convert useNavigate to Next.js router
        $content = $content -replace 'const navigate = useNavigate\(\)', 'const router = useRouter()'
        $content = $content -replace 'navigate\(([^)]+)\)', 'router.push($1)'
        
        # Convert useLocation to Next.js
        $content = $content -replace 'const location = useLocation\(\)', 'const pathname = usePathname()'
        $content = $content -replace 'location\.pathname', 'pathname'
        
        # Convert useParams to Next.js
        $content = $content -replace 'const \{ ([^}]+) \} = useParams\(\)', 'const router = useRouter(); const { $1 } = router.query'
        
        # Remove React Helmet imports and usage
        $content = $content -replace 'import \{ Helmet \} from "react-helmet-async"', '// Helmet replaced with Next.js Head or metadata'
        $content = $content -replace 'import SEO from [^;]+;', 'import { Metadata } from "next"'
        
        # Convert styled-components Link to Next.js Link where needed
        $content = $content -replace 'const ([A-Za-z]+) = styled\(Link\)', 'const $1 = styled.a'
        
        # Update image imports for Next.js
        $content = $content -replace '<img\s+src=', '<Image src='
        $content = $content -replace 'import OptimizedImage', 'import Image from "next/image"; // import OptimizedImage'
        
        # Save the converted content
        Set-Content -Path $destPath -Value $content -Encoding UTF8
        Write-Host "Converted: $file" -ForegroundColor Green
    } else {
        Write-Host "File not found: $file" -ForegroundColor Yellow
    }
}

# Step 3: Copy HomePage Components
Write-Host "Step 3: Converting HomePage Components..." -ForegroundColor Yellow

$HomePageComponents = @(
    "src\components\HomePageComponents\BestSellingProducts.jsx",
    "src\components\HomePageComponents\CompanyBenefitsSection.jsx",
    "src\components\HomePageComponents\FeatureHighlights.jsx",
    "src\components\HomePageComponents\HeroSection.jsx",
    "src\components\HomePageComponents\IndustryCategoriesSection.jsx",
    "src\components\HomePageComponents\TestimonialsSection.jsx"
)

foreach ($file in $HomePageComponents) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir $file
    
    if (Test-Path $sourcePath) {
        $content = Get-Content $sourcePath -Raw
        
        # Apply same conversions as above
        $content = $content -replace 'import \{ Link \} from "react-router-dom"', 'import Link from "next/link"'
        $content = $content -replace 'const ([A-Za-z]+) = styled\(Link\)', 'const $1 = styled.a'
        
        Set-Content -Path $destPath -Value $content -Encoding UTF8
        Write-Host "Converted: $file" -ForegroundColor Green
    }
}

# Step 4: Copy and convert hooks
Write-Host "Step 4: Migrating Hooks..." -ForegroundColor Yellow

$HookFiles = @(
    "src\hooks\useCountryContent.js",
    "src\hooks\useCurrency.js",
    "src\hooks\useLocalization.js"
)

foreach ($file in $HookFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir $file
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copied: $file" -ForegroundColor Green
    }
}

# Step 5: Copy services
Write-Host "Step 5: Migrating Services..." -ForegroundColor Yellow

$ServiceFiles = @(
    "src\services\locationDetector.js"
)

foreach ($file in $ServiceFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir $file
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copied: $file" -ForegroundColor Green
    }
}

# Step 6: Copy i18n configuration
Write-Host "Step 6: Migrating i18n Configuration..." -ForegroundColor Yellow

# Create i18n directory structure
New-Item -ItemType Directory -Path "$DestDir\src\i18n\locales" -Force | Out-Null

$I18nFiles = @(
    "src\i18n\config.js",
    "src\i18n\locales\en-AU.json",
    "src\i18n\locales\en-CA.json",
    "src\i18n\locales\en-NZ.json",
    "src\i18n\locales\en-UK.json",
    "src\i18n\locales\en-US.json"
)

foreach ($file in $I18nFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir $file
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copied: $file" -ForegroundColor Green
    }
}

# Step 7: Copy styles and assets
Write-Host "Step 7: Migrating Styles..." -ForegroundColor Yellow

$StyleFiles = @(
    "src\App.css",
    "src\components\Header.css"
)

foreach ($file in $StyleFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestDir "src\styles\$(Split-Path $file -Leaf)"
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copied: $file to styles/" -ForegroundColor Green
    }
}

# Step 8: Create Next.js specific files
Write-Host "Step 8: Creating Next.js specific files..." -ForegroundColor Yellow

# Create app directory structure for App Router
$AppDirs = @(
    "src\app\blog",
    "src\app\category\[categoryName]",
    "src\app\category\[categoryName]\product\[product]",
    "src\app\case-study\[slug]",
    "src\app\case-studies",
    "src\app\contact",
    "src\app\faq",
    "src\app\get-a-quote",
    "src\app\jars-cups",
    "src\app\payment-plans",
    "src\app\product\[product]"
)

foreach ($dir in $AppDirs) {
    $targetDir = Join-Path $DestDir $dir
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Host "Created app directory: $dir" -ForegroundColor Green
    }
}

# Create root layout.tsx
$rootLayoutContent = @"
import './globals.css'
import { Inter } from 'next/font/google'
import { generateMetadata } from '../utils/metadata'
import StickyCTAProvider from '../components/StickyCTAProvider'
import GoogleTagManager from '../components/GoogleTagManager'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang=`"en`">
      <body className={inter.className}>
        <GoogleTagManager />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTAProvider />
        <ScrollToTop />
      </body>
    </html>
  )
}
"@

Set-Content -Path "$DestDir\src\app\layout.tsx" -Value $rootLayoutContent -Encoding UTF8

# Create homepage (page.tsx)
$homePageContent = @"
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
"@

Set-Content -Path "$DestDir\src\app\page.tsx" -Value $homePageContent -Encoding UTF8

# Create dynamic category page
$categoryPageContent = @"
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductCard from '../../../components/Productcard'
import Products from '../../../components/Products'
import { generateMetadata } from '../../../utils/metadata'

type Props = {
  params: { categoryName: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.categoryName
  const readableCategoryName = categoryName.replace(/-/g, ' ')
  
  return generateMetadata({
    title: readableCategoryName + ' Packaging Solutions',
    description: 'Explore our custom ' + readableCategoryName.toLowerCase() + ' packaging options. Eco-friendly materials, premium quality, and fast delivery.',
    canonicalUrl: '/category/' + categoryName,
  })
}

export default function CategoryPage({ params }: Props) {
  return <ProductCard categories={Products} />
}
"@

Set-Content -Path "$DestDir\src\app\category\[categoryName]\page.tsx" -Value $categoryPageContent -Encoding UTF8

# Create other essential pages
Write-Host "Creating other page components..." -ForegroundColor Yellow

# Blog page
$blogPageContent = @"
import { Metadata } from 'next'
import BlogList from '../../components/BlogList'

export const metadata: Metadata = {
  title: 'Packaging Insights & Tips | Pack it Perfect Blog',
  description: 'Discover the latest trends, tips, and best practices in custom packaging.',
}

export default function BlogPage() {
  return <BlogList />
}
"@
Set-Content -Path "$DestDir\src\app\blog\page.tsx" -Value $blogPageContent -Encoding UTF8

# Contact page  
$contactPageContent = @"
import { Metadata } from 'next'
import ContactPage from '../../components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Our Custom Packaging Specialists',
  description: 'Get in touch with Pack it Perfect for all your custom packaging needs.',
}

export default function Contact() {
  return <ContactPage />
}
"@
Set-Content -Path "$DestDir\src\app\contact\page.tsx" -Value $contactPageContent -Encoding UTF8

# FAQ page
$faqPageContent = @"
import { Metadata } from 'next'
import FAQPage from '../../components/FAQPage'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Custom Packaging',
  description: 'Find answers to common questions about our custom packaging services.',
}

export default function FAQ() {
  return <FAQPage />
}
"@
Set-Content -Path "$DestDir\src\app\faq\page.tsx" -Value $faqPageContent -Encoding UTF8

# Quote page
$quotePageContent = @"
import { Metadata } from 'next'
import QuoteForm from '../../components/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Custom Packaging Solutions',
  description: 'Request a free quote for your custom packaging needs.',
}

export default function GetQuote() {
  return <QuoteForm />
}
"@
Set-Content -Path "$DestDir\src\app\get-a-quote\page.tsx" -Value $quotePageContent -Encoding UTF8

# Jars Cups page
$jarsCupsPageContent = @"
import { Metadata } from 'next'
import JarsCupsPage from '../../components/JarsCupsPage'

export const metadata: Metadata = {
  title: 'Custom Jars and Cups | Food and Beverage Packaging',
  description: 'Shop our range of customizable jars and cups for food, beverages, and cosmetics.',
}

export default function JarsCups() {
  return <JarsCupsPage />
}
"@
Set-Content -Path "$DestDir\src\app\jars-cups\page.tsx" -Value $jarsCupsPageContent -Encoding UTF8

# Payment Plans page
$paymentPageContent = @"
import { Metadata } from 'next'
import PaymentPlansPage from '../../components/PaymentsPlans'

export const metadata: Metadata = {
  title: 'Flexible Payment Plans | Pay in Installments',
  description: 'Discover our flexible payment plans that allow you to pay for your custom packaging in installments.',
}

export default function PaymentPlans() {
  return <PaymentPlansPage />
}
"@
Set-Content -Path "$DestDir\src\app\payment-plans\page.tsx" -Value $paymentPageContent -Encoding UTF8

# Step 9: Create global CSS file
Write-Host "Step 9: Creating global CSS..." -ForegroundColor Yellow

$globalCssContent = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import your existing styles */
@import url('./App.css');
@import url('./Header.css');

/* Global styles */
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

/* Ensure smooth scrolling */
html {
  scroll-behavior: smooth;
}
"@

Set-Content -Path "$DestDir\src\app\globals.css" -Value $globalCssContent -Encoding UTF8

# Step 10: Create middleware.ts for redirects
Write-Host "Step 10: Creating middleware..." -ForegroundColor Yellow

$middlewareContent = @"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old React routes to new Next.js routes
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
"@

Set-Content -Path "$DestDir\middleware.ts" -Value $middlewareContent -Encoding UTF8

# Step 11: Copy public assets (if they exist)
Write-Host "Step 11: Copying public assets..." -ForegroundColor Yellow

$publicSourceDir = "$SourceDir\public"
$publicDestDir = "$DestDir\public"

if (Test-Path $publicSourceDir) {
    # Copy all public assets
    Copy-Item "$publicSourceDir\*" $publicDestDir -Recurse -Force
    Write-Host "Copied public assets" -ForegroundColor Green
} else {
    Write-Host "No public directory found in source" -ForegroundColor Yellow
}

Write-Host "`n=== MIGRATION COMPLETED SUCCESSFULLY ===" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Review converted components in src/components/" -ForegroundColor White
Write-Host "2. Update any remaining React Router usage to Next.js navigation" -ForegroundColor White
Write-Host "3. Replace any remaining <img> tags with Next.js <Image> component" -ForegroundColor White
Write-Host "4. Update SEO components to use Next.js metadata API" -ForegroundColor White
Write-Host "5. Test all routes and functionality" -ForegroundColor White
Write-Host "6. Run 'npm run dev' to start the development server" -ForegroundColor White

Write-Host "`nKey Changes Made:" -ForegroundColor Cyan
Write-Host "✓ Converted React Router to Next.js navigation" -ForegroundColor Green
Write-Host "✓ Migrated all components to src/components/" -ForegroundColor Green
Write-Host "✓ Created Next.js App Router structure" -ForegroundColor Green
Write-Host "✓ Set up metadata API for SEO" -ForegroundColor Green
Write-Host "✓ Copied all hooks, services, and i18n configuration" -ForegroundColor Green
Write-Host "✓ Created global CSS and layout files" -ForegroundColor Green

Write-Host "`nManual Tasks Required:" -ForegroundColor Yellow
Write-Host "- Remove React Helmet usage from components" -ForegroundColor White
Write-Host "- Update styled-components Link usage" -ForegroundColor White
Write-Host "- Test and fix any TypeScript errors" -ForegroundColor White
Write-Host "- Update image imports to use Next.js Image component" -ForegroundColor White

Read-Host "`nPress Enter to continue..."