// src/components/CaseStudy.jsx
import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Metadata } from "next"
import Image from "next/image"; // import OptimizedImage from "./OptimizeImage";

// Styled Components
const CaseStudyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
`;

const BreadcrumbNav = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }

  span {
    margin: 0 0.5rem;
  }
`;

const CaseStudyHeader = styled.div`
  margin-bottom: 3.5rem;
`;

const CaseStudyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CaseStudyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: #000;
    font-size: 1.1rem;
  }
`;

const CaseStudyImageContainer = styled.div`
  margin-bottom: 2.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 2.5rem 0 1.5rem;
`;

const ContentSection = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const QuoteSection = styled.blockquote`
  background-color: #f9f9f9;
  padding: 2rem;
  border-left: 5px solid #000;
  margin: 2.5rem 0;
  font-style: italic;
  color: #333;

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  cite {
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    color: #555;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatBox = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ResultsSection = styled.div`
  background-color: #f9f9f9;
  padding: 2.5rem;
  border-radius: 8px;
  margin: 3rem 0;
`;

const ResultsTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;

    &:before {
      content: "âœ“";
      position: absolute;
      left: 0;
      color: #000;
      font-weight: bold;
    }
  }
`;

const GalleryContainer = styled.div`
  margin: 3rem 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const CTASection = styled.div`
  background-color: #000;
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  margin: 4rem 0 2rem;
`;

const CTATitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: white;
  color: #000;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const RelatedContainer = styled.div`
  margin-top: 4rem;
`;

const RelatedTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RelatedImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
`;

const RelatedContent = styled.div`
  padding: 1.5rem;
`;

const RelatedCardTitle = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const RelatedCardDesc = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

// Sample case study data - In a real app, this would come from a CMS or API
const caseStudiesData = [
  {
    id: 1,
    slug: "harrods",
    title: "Transforming Luxury Retail Packaging for Harrods",
    client: "Harrods",
    industry: "Luxury Retail",
    location: "London, UK",
    date: "January 2024",
    duration: "3 months",
    mainImage: "/images/case-studies/harrods-main.webp",
    shortDescription:
      "How we helped Harrods create a bespoke, sustainable packaging solution that enhanced their luxury brand experience while reducing environmental impact.",
    challenge: `
      <p>Harrods, one of the world's most prestigious luxury department stores, approached Pack it Perfect with a significant challenge: they needed to redesign their entire packaging line to reflect their premium brand image while addressing growing consumer demand for sustainable practices.</p>
      
      <p>Specifically, they faced the following challenges:</p>
      
      <ul>
        <li>Their existing packaging didn't fully capture the exclusivity of their brand</li>
        <li>They needed to reduce environmental impact without compromising on luxury experience</li>
        <li>The solution needed to work across diverse product categories</li>
        <li>Packaging had to be practical for staff to assemble quickly during busy periods</li>
        <li>The design needed to maintain the iconic Harrods green color scheme while feeling modern</li>
      </ul>
    `,
    approach: `
      <p>Our team took a comprehensive approach to addressing Harrods' needs:</p>
      
      <ul>
        <li>We began with an extensive audit of their existing packaging ecosystem</li>
        <li>Conducted workshops with Harrods' brand team to deeply understand their values and vision</li>
        <li>Researched innovative eco-friendly materials that still provided a premium look and feel</li>
        <li>Developed multiple prototypes with various combinations of recycled and sustainable materials</li>
        <li>Created a flexible system that could scale across different product sizes while maintaining brand consistency</li>
        <li>Implemented subtle design features that enhanced the unboxing experience</li>
      </ul>
    `,
    solution: `
      <p>After extensive development and testing, we delivered a comprehensive packaging solution:</p>
      
      <ul>
        <li>Custom boxes crafted from 100% recycled FSC-certified cardboard with a luxurious soft-touch finish</li>
        <li>Magnetic closure system that eliminated the need for adhesives while creating a premium unboxing moment</li>
        <li>Redesigned the iconic Harrods logo with a subtle embossed effect using water-based inks</li>
        <li>Implemented a modular design system with standardized sizes to improve logistics efficiency</li>
        <li>Created custom tissue paper using soy-based inks that reduced chemical usage by 40%</li>
        <li>Designed collapsible boxes that reduced storage space requirements by 60%</li>
      </ul>
    `,
    results: [
      "47% reduction in packaging carbon footprint",
      "28% increase in customer satisfaction scores related to packaging",
      "35% reduction in packaging storage space requirements",
      "18% faster packaging assembly time for retail staff",
      "Elimination of all plastic elements from the packaging system",
    ],
    testimonial: {
      quote:
        "Pack it Perfect understood our vision immediately and delivered a packaging solution that beautifully balances luxury with sustainability. Our customers have noticed the difference, and we've received overwhelmingly positive feedback about the new unboxing experience.",
      author: "Sarah Jenkins",
      position: "Head of Brand Experience, Harrods",
    },
    stats: [
      { number: "47%", label: "Carbon Footprint Reduction" },
      { number: "100%", label: "Plastic-Free Solution" },
      { number: "28%", label: "Increased Customer Satisfaction" },
    ],
    gallery: [
      "/images/case-studies/harrods-1.webp",
      "/images/case-studies/harrods-2.webp",
      "/images/case-studies/harrods-3.webp",
    ],
    relatedCaseStudies: [2],
  },
  {
    id: 2,
    slug: "royal-ascot",
    title: "Exclusive Event Packaging for Royal Ascot",
    client: "Royal Ascot",
    industry: "Luxury Events",
    location: "Berkshire, UK",
    date: "June 2023",
    duration: "4 months",
    mainImage: "/images/case-studies/royal-ascot-main.webp",
    shortDescription:
      "Creating bespoke VIP gift packaging for one of Britain's most prestigious horse racing events that balanced tradition with contemporary luxury.",
    challenge: `
      <p>Royal Ascot, Britain's most valuable horse race and a pinnacle of the British social calendar, sought to elevate their VIP guest experience through exclusive gift packaging. They faced several key challenges:</p>
      
      <ul>
        <li>The packaging needed to reflect the event's 300+ years of heritage while feeling contemporary</li>
        <li>Each box needed to securely house various luxury items of different shapes and sizes</li>
        <li>The design had to incorporate Royal Ascot's strict brand guidelines and color scheme</li>
        <li>The solution needed to be practical for transport and storage</li>
        <li>Environmental considerations were important despite the luxury positioning</li>
      </ul>
    `,
    approach: `
      <p>Our approach combined meticulous attention to detail with innovative design thinking:</p>
      
      <ul>
        <li>We immersed ourselves in Royal Ascot's rich history and brand values</li>
        <li>Conducted a detailed analysis of the gift items to ensure perfect fit and presentation</li>
        <li>Presented multiple concept designs that balanced tradition with contemporary elegance</li>
        <li>Sourced premium materials that offered sustainable options without compromising luxury</li>
        <li>Created detailed prototypes for client review and refinement</li>
        <li>Developed a production schedule that accommodated the event's strict timeline</li>
      </ul>
    `,
    solution: `
      <p>The final packaging solution exceeded expectations:</p>
      
      <ul>
        <li>Bespoke rigid board gift boxes with a distinctive Royal Ascot color scheme and gold foil accents</li>
        <li>Custom die-cut inserts that perfectly secured each gift item while creating a theatrical unboxing experience</li>
        <li>Subtle embossed patterns inspired by the venue's historical architecture</li>
        <li>Magnetic closure system with ribbon pull for an elegant opening experience</li>
        <li>All materials sourced from sustainable suppliers, with paper elements using FSC-certified stock</li>
        <li>Collapsible design for efficient shipping and storage before the event</li>
      </ul>
    `,
    results: [
      "3,000 premium VIP gift boxes produced and delivered on schedule",
      "92% of VIP guests rated the gift presentation as 'exceptional'",
      "Featured in three luxury lifestyle publications",
      "25% increase in social media mentions compared to previous year",
      "Selected for display in the Royal Ascot archives",
    ],
    testimonial: {
      quote:
        "The bespoke packaging created by Pack it Perfect perfectly captured the essence of Royal Ascot - traditional yet contemporary, and exquisitely crafted. The attention to detail was remarkable, and the packaging became a talking point among our VIP guests rather than just a container for gifts.",
      author: "Charles Montgomery",
      position: "Director of Hospitality, Royal Ascot",
    },
    stats: [
      { number: "3,000", label: "VIP Boxes Produced" },
      { number: "92%", label: "Guest Satisfaction" },
      { number: "25%", label: "Increase in Social Media Mentions" },
    ],
    gallery: [
      "/images/case-studies/royal-ascot-1.webp",
      "/images/case-studies/royal-ascot-2.webp",
      "/images/case-studies/royal-ascot-3.webp",
    ],
    relatedCaseStudies: [1],
  },
];

const CaseStudy = () => {
  const router = useRouter(); const { slug } = router.query;

  // Find the case study by slug
  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);

  // If no case study found, show a message
  if (!caseStudy) {
    return (
      <CaseStudyContainer>
        <h1>Case Study Not Found</h1>
        <p>We couldn't find the case study you're looking for.</p>
        <Link to="/">Return to Home</Link>
      </CaseStudyContainer>
    );
  }

  // Find related case studies
  const relatedCaseStudies = caseStudy.relatedCaseStudies
    ? caseStudy.relatedCaseStudies
        .map((id) => caseStudiesData.find((cs) => cs.id === id))
        .filter(Boolean)
    : [];

  // Generate structured data for case study
  const generateCaseStudySchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: caseStudy.title,
      image: `https://packageitperfect.com${caseStudy.mainImage}`,
      datePublished: new Date(caseStudy.date).toISOString(),
      author: {
        "@type": "Organization",
        name: "Pack it Perfect",
      },
      publisher: {
        "@type": "Organization",
        name: "Pack it Perfect",
        logo: {
          "@type": "ImageObject",
          url: "https://packageitperfect.com/images/logo.svg",
        },
      },
      description: caseStudy.shortDescription,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://packageitperfect.com/case-study/${caseStudy.slug}`,
      },
    };
  };

  return (
    <CaseStudyContainer>
      <SEO
        title={`${caseStudy.title} | Pack it Perfect Case Study`}
        description={caseStudy.shortDescription}
        canonicalUrl={`/case-study/${caseStudy.slug}`}
        ogImage={caseStudy.mainImage}
        ogType="article"
        schema={generateCaseStudySchema()}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Case Studies", url: "/case-studies" },
          { name: caseStudy.title, url: `/case-study/${caseStudy.slug}` },
        ]}
      />

      <BreadcrumbNav>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/case-studies">Case Studies</Link>
        <span>/</span>
        <span>{caseStudy.title}</span>
      </BreadcrumbNav>

      <CaseStudyHeader>
        <CaseStudyTitle>{caseStudy.title}</CaseStudyTitle>

        <CaseStudyMeta>
          <MetaItem>
            <i className="fas fa-building"></i>
            <span>Client: {caseStudy.client}</span>
          </MetaItem>
          <MetaItem>
            <i className="fas fa-industry"></i>
            <span>Industry: {caseStudy.industry}</span>
          </MetaItem>
          <MetaItem>
            <i className="fas fa-map-marker-alt"></i>
            <span>Location: {caseStudy.location}</span>
          </MetaItem>
          <MetaItem>
            <i className="fas fa-calendar-alt"></i>
            <span>Date: {caseStudy.date}</span>
          </MetaItem>
          <MetaItem>
            <i className="fas fa-clock"></i>
            <span>Duration: {caseStudy.duration}</span>
          </MetaItem>
        </CaseStudyMeta>
      </CaseStudyHeader>

      <CaseStudyImageContainer>
        <OptimizedImage
          src={caseStudy.mainImage}
          alt={`${caseStudy.client} packaging solution by Pack it Perfect`}
          aspectRatio="16/9"
          height="500px"
        />
      </CaseStudyImageContainer>

      <ContentSection>
        <p>{caseStudy.shortDescription}</p>
      </ContentSection>

      <SectionTitle>The Challenge</SectionTitle>
      <ContentSection
        dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
      />

      <SectionTitle>Our Approach</SectionTitle>
      <ContentSection
        dangerouslySetInnerHTML={{ __html: caseStudy.approach }}
      />

      <SectionTitle>The Solution</SectionTitle>
      <ContentSection
        dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
      />

      <StatsContainer>
        {caseStudy.stats.map((stat, index) => (
          <StatBox key={index}>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatBox>
        ))}
      </StatsContainer>

      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <GalleryContainer>
          <SectionTitle>Project Gallery</SectionTitle>
          <GalleryGrid>
            {caseStudy.gallery.map((image, index) => (
              <GalleryImage key={index}>
                <OptimizedImage
                  src={image}
                  alt={`${caseStudy.client} packaging - image ${index + 1}`}
                  aspectRatio="1/1"
                  height="250px"
                  objectFit="cover"
                />
              </GalleryImage>
            ))}
          </GalleryGrid>
        </GalleryContainer>
      )}

      <ResultsSection>
        <ResultsTitle>Key Results</ResultsTitle>
        <ResultsList>
          {caseStudy.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ResultsList>
      </ResultsSection>

      {caseStudy.testimonial && (
        <QuoteSection>
          <p>"{caseStudy.testimonial.quote}"</p>
          <cite>
            {caseStudy.testimonial.author}, {caseStudy.testimonial.position}
          </cite>
        </QuoteSection>
      )}

      <CTASection>
        <CTATitle>Ready to transform your packaging?</CTATitle>
        <CTADescription>
          Let's discuss how we can create a custom packaging solution that
          elevates your brand and delights your customers.
        </CTADescription>
        <CTAButton to="/get-a-quote">Get a Free Quote</CTAButton>
      </CTASection>

      {relatedCaseStudies.length > 0 && (
        <RelatedContainer>
          <RelatedTitle>Related Case Studies</RelatedTitle>
          <RelatedGrid>
            {relatedCaseStudies.map((related) => (
              <RelatedCard key={related.id} to={`/case-study/${related.slug}`}>
                <RelatedImageContainer>
                  <OptimizedImage
                    src={related.mainImage}
                    alt={related.title}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                  />
                </RelatedImageContainer>
                <RelatedContent>
                  <RelatedCardTitle>{related.title}</RelatedCardTitle>
                  <RelatedCardDesc>
                    {related.shortDescription.substring(0, 120)}...
                  </RelatedCardDesc>
                </RelatedContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedContainer>
      )}
    </CaseStudyContainer>
  );
};

export default CaseStudy;

