import { Metadata } from 'next'
import BlogList from '../../components/BlogList'

export const metadata: Metadata = {
  title: 'Packaging Insights & Tips | Pack it Perfect Blog',
  description: 'Discover the latest trends, tips, and best practices in custom packaging.',
}

export default function BlogPage() {
  return <BlogList />
}
