export interface BlogPost {
  id: number
  slug: string
  title: string
  category: string
  date: string
  modifiedDate?: string
  excerpt: string
  image: string
  altText: string
  author?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "sustainable-packaging-trends-2025",
    title: "Top Sustainable Packaging Trends for 2025",
    category: "Trends",
    date: "2025-03-05",
    excerpt: "Discover the latest sustainable packaging innovations that are revolutionizing the industry and helping businesses reduce their environmental impact.",
    image: "/images/blog/sustainable-packaging.png",
    altText: "Eco-friendly packaging materials made from recycled paper",
    author: "Pack it Perfect Team",
  },
  {
    id: 2,
    slug: "custom-packaging-brand-identity",
    title: "How Custom Packaging Strengthens Brand Identity",
    category: "Branding",
    date: "2025-02-28",
    excerpt: "Learn how thoughtfully designed custom packaging can enhance your brand recognition and create memorable unboxing experiences for your customers.",
    image: "/images/blog/custom-packaging-brand-identity.png",
    altText: "Custom branded packaging box with logo design",
    author: "Pack it Perfect Team",
  },
  // Add more blog posts as needed
]
