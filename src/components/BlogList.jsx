"use client";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Metadata } from "next";
import Image from "next/image"; // import OptimizedImage from "./OptimizeImage"; // Use the new optimized image component

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const BlogMeta = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const BlogCategory = styled.span`
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 0.2rem 0.7rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.75rem;
`;

const BlogDate = styled.span`
  font-style: italic;
`;

const BlogExcerpt = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  color: #000;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1rem;

  &::after {
    content: "â†’";
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }

  ${BlogCard}:hover & {
    &::after {
      transform: translateX(5px);
    }
  }
`;

// Blog posts data - In a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    slug: "sustainable-packaging-trends-2025",
    title: "Top Sustainable Packaging Trends for 2025",
    category: "Trends",
    date: "March 5, 2025",
    excerpt:
      "Discover the latest sustainable packaging innovations that are revolutionizing the industry and helping businesses reduce their environmental impact.",
    image: "/images/blog/sustainable-packaging.png",
    altText: "Eco-friendly packaging materials made from recycled paper",
  },
  {
    id: 2,
    slug: "custom-packaging-brand-identity",
    title: "How Custom Packaging Strengthens Brand Identity",
    category: "Branding",
    date: "February 28, 2025",
    excerpt:
      "Learn how thoughtfully designed custom packaging can enhance your brand recognition and create memorable unboxing experiences for your customers.",
    image: "/images/blog/custom-packaging-brand-identity.png",
    altText: "Custom branded packaging box with logo design",
  },
  {
    id: 3,
    slug: "e-commerce-packaging-solutions",
    title: "Optimizing E-commerce Packaging for Better Customer Experience",
    category: "E-commerce",
    date: "February 15, 2025",
    excerpt:
      "Explore strategies to improve your online stores packaging to enhance customer satisfaction while reducing shipping costs and environmental impact.",
    image: "/images/blog/ecommerce-packaging.jpg",
    altText: "E-commerce packaging box being prepared for shipping",
  },
  {
    id: 4,
    slug: "luxury-packaging-design-guide",
    title: "The Ultimate Guide to Luxury Packaging Design",
    category: "Design",
    date: "February 8, 2025",
    excerpt:
      "Discover the key elements that make luxury packaging stand out and how to incorporate these principles into your premium product packaging.",
    image: "/images/blog/luxury-packaging.jpg",
    altText: "Elegant luxury packaging with gold foil detailing",
  },
  {
    id: 5,
    slug: "food-packaging-safety-regulations",
    title: "Understanding UK Food Packaging Safety Regulations",
    category: "Compliance",
    date: "January 25, 2025",
    excerpt:
      "A comprehensive overview of current food packaging regulations in the UK and how to ensure your packaging meets all safety requirements.",
    image: "/images/blog/food-packaging-safety.jpg",
    altText: "Food-safe packaging with compliance labels",
  },
  {
    id: 6,
    slug: "packaging-cost-reduction-strategies",
    title:
      "Practical Strategies to Reduce Packaging Costs Without Sacrificing Quality",
    category: "Business",
    date: "January 12, 2025",
    excerpt:
      "Learn effective methods to optimize your packaging costs while maintaining high quality and customer satisfaction.",
    image: "/images/blog/cost-effective-packaging.webp",
    altText: "Cost-effective packaging solutions for businesses",
  },
  {
    id: 7,
    slug: "packaging-roi-calculator",
    title:
      "Packaging ROI Calculator: How to Measure the Impact of Your Packaging Investment",
    category: "Business",
    date: "April 2, 2025",
    excerpt:
      "Learn how to calculate the return on investment for your packaging solutions and make data-driven decisions that boost sales while controlling costs.",
    image: "/images/blog/packaging-roi-calculator.webp",
    altText: "Business person calculating ROI on packaging investment",
  },
  {
    id: 8,
    slug: "packaging-design-psychology",
    title:
      "The Psychology of Packaging Design: How Colors, Shapes, and Materials Influence Consumer Behavior",
    category: "Design",
    date: "March 25, 2025",
    excerpt:
      "Explore how packaging design elements trigger psychological responses that influence purchasing decisions and brand perception.",
    image: "/images/blog/packaging-psychology.webp",
    altText: "Various packaging designs showing different colors and shapes",
  },
  {
    id: 9,
    slug: "small-business-packaging-guide",
    title:
      "The Complete Small Business Packaging Guide: Professional Solutions on a Limited Budget",
    category: "Business",
    date: "March 18, 2025",
    excerpt:
      "Discover how small businesses and startups can create impactful, professional packaging without breaking the bank, with practical tips and affordable solutions.",
    image: "/images/blog/small-business-packaging.webp",
    altText: "Small business owner preparing product packaging",
  },
  {
    id: 10,
    slug: "packaging-automation-solutions",
    title:
      "Packaging Automation Solutions: When, Why, and How to Streamline Your Packaging Process",
    category: "Operations",
    date: "March 10, 2025",
    excerpt:
      "Discover how packaging automation can increase efficiency, reduce costs, and improve consistency for growing businesses, with practical implementation advice.",
    image: "/images/blog/packaging-automation.webp",
    altText: "Automated packaging line in a modern facility",
  },
  {
    id: 11,
    slug: "packaging-localization-global-markets",
    title: "Packaging Localization: Adapting Your Packaging for Global Markets",
    category: "International",
    date: "March 1, 2025",
    excerpt:
      "Learn how to effectively adapt your packaging for international markets, navigate regulatory requirements, and respect cultural nuances while maintaining brand consistency.",
    image: "/images/blog/global-packaging.webp",
    altText:
      "Product packaging in multiple languages for international markets",
  },
];

const BlogList = () => {
  return (
    <BlogContainer>
      <SEO
        title="Packaging Insights & Tips | Pack it Perfect Blog"
        description="Discover the latest trends, tips, and best practices in custom packaging. Learn how to enhance your brand with innovative packaging solutions."
        keywords="packaging blog, custom packaging tips, sustainable packaging, packaging design, packaging trends"
        canonicalUrl="/blog"
        ogType="website"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      <PageTitle>Packaging Insights & Tips</PageTitle>

      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard key={post.id} to={`/blog/${post.slug}`}>
            <OptimizedImage
              src={post.image}
              alt={post.altText}
              height="220px"
              aspectRatio="16/9"
              hoverEffect="zoom"
            />
            <BlogContent>
              <BlogMeta>
                <BlogCategory>{post.category}</BlogCategory>
                <BlogDate>{post.date}</BlogDate>
              </BlogMeta>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadMore>Read More</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogList;
