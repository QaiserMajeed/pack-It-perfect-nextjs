// src/components/CaseStudies.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Metadata } from "next"
import Image from "next/image"; // import OptimizedImage from "./OptimizeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faTimes,
  faArrowRight,
  faIndustry,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

// Styled Components
const CaseStudiesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
`;

const FiltersContainer = styled.div`
  margin-bottom: 2.5rem;
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const FilterToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;

  &:hover {
    color: #333;
  }
`;

const FilterContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #555;
  font-weight: 600;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#000" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#f0f0f0")};
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 25px;
  font-size: 0.85rem;
`;

const RemoveFilter = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.85rem;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const ClearAllFilters = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  margin-left: auto;

  &:hover {
    color: #333;
  }
`;

const CaseStudiesGrid = styled.div`
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

const CaseStudyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: #000;
  }
`;

const CardButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;

  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s;
  }

  &:hover {
    color: #333;

    svg {
      transform: translateX(3px);
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const NoResultsText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const NoResultsButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  color: #000;
  border: 2px solid #000;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  margin: 3rem auto 0;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: white;
  }

  &:disabled {
    background-color: #eee;
    border-color: #ddd;
    color: #999;
    cursor: not-allowed;
  }
`;

const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`;

const FeaturedTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const FeaturedCase = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background-color: #f0e6d2;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const FeaturedImage = styled.div`
  height: 100%;
  min-height: 400px;
  position: relative;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const FeaturedContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FeaturedTag = styled.span`
  display: inline-block;
  background-color: #000;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 25px;
  margin-bottom: 1.5rem;
`;

const FeaturedCardTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FeaturedCardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeaturedCardButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #000;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
  align-self: flex-start;

  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s;
  }

  &:hover {
    background-color: #333;

    svg {
      transform: translateX(3px);
    }
  }
`;

// Case Studies Component
const CaseStudies = () => {
  // Sample case studies data - In a real app, this would come from a CMS or API
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
      featured: true,
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
    },
    {
      id: 3,
      slug: "honest-burger",
      title: "Sustainable Fast Food Packaging for Honest Burger",
      client: "Honest Burger",
      industry: "Food & Beverage",
      location: "Multiple UK Locations",
      date: "April 2023",
      duration: "2 months",
      mainImage: "/images/case-studies/honest-burger-main.webp",
      shortDescription:
        "Developing an eco-friendly packaging suite for a popular UK burger chain that aligned with their commitment to sustainability without compromising on functionality.",
    },
    {
      id: 4,
      slug: "bloom-wild",
      title: "Innovative Flower Delivery Boxes for Bloom & Wild",
      client: "Bloom & Wild",
      industry: "Floral & Gifts",
      location: "London, UK",
      date: "March 2023",
      duration: "3 months",
      mainImage: "/images/case-studies/bloom-wild-main.webp",
      shortDescription:
        "Creating innovative letterbox-friendly packaging that protects delicate flowers during delivery while offering a memorable unboxing experience.",
    },
    {
      id: 5,
      slug: "charlotte-tilbury",
      title: "Premium Cosmetics Packaging for Charlotte Tilbury",
      client: "Charlotte Tilbury",
      industry: "Beauty & Cosmetics",
      location: "London, UK",
      date: "February 2023",
      duration: "5 months",
      mainImage: "/images/case-studies/charlotte-tilbury-main.webp",
      shortDescription:
        "Designing luxurious yet sustainable packaging solutions for Charlotte Tilbury's premium cosmetics line that captured the brand's glamorous identity.",
    },
    {
      id: 6,
      slug: "brewdog",
      title: "Craft Beer Gift Set Packaging for BrewDog",
      client: "BrewDog",
      industry: "Food & Beverage",
      location: "Aberdeen, UK",
      date: "November 2022",
      duration: "2 months",
      mainImage: "/images/case-studies/brewdog-main.webp",
      shortDescription:
        "Creating distinctive, gift-worthy packaging solutions for BrewDog's special edition craft beer selections that reflected their bold brand personality.",
    },
    {
      id: 7,
      slug: "the-body-shop",
      title: "Sustainable Gift Boxes for The Body Shop",
      client: "The Body Shop",
      industry: "Beauty & Cosmetics",
      location: "Multiple UK Locations",
      date: "October 2022",
      duration: "3 months",
      mainImage: "/images/case-studies/body-shop-main.webp",
      shortDescription:
        "Redesigning holiday gift packaging with 100% recycled and recyclable materials that aligned with The Body Shop's ethical values.",
    },
    {
      id: 8,
      slug: "fortnum-mason",
      title: "Heritage Hamper Packaging for Fortnum & Mason",
      client: "Fortnum & Mason",
      industry: "Luxury Retail",
      location: "London, UK",
      date: "September 2022",
      duration: "4 months",
      mainImage: "/images/case-studies/fortnum-mason-main.webp",
      shortDescription:
        "Reimagining Fortnum & Mason's iconic hamper packaging with a focus on sustainability while preserving their 300-year heritage and luxury appeal.",
    },
    {
      id: 9,
      slug: "pret-a-manger",
      title: "Eco-Conscious Food Packaging for Pret A Manger",
      client: "Pret A Manger",
      industry: "Food & Beverage",
      location: "Multiple UK Locations",
      date: "August 2022",
      duration: "6 months",
      mainImage: "/images/case-studies/pret-main.webp",
      shortDescription:
        "Developing a comprehensive line of compostable and recyclable packaging for Pret's food and beverage offerings that reduced plastic waste by 60%.",
    },
  ];

  // State for filters and pagination
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    location: [],
    year: [],
  });
  const [filteredCaseStudies, setFilteredCaseStudies] =
    useState(caseStudiesData);
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract unique values for filter options
  const industries = [...new Set(caseStudiesData.map((cs) => cs.industry))];
  const locations = [...new Set(caseStudiesData.map((cs) => cs.location))];
  const years = [
    ...new Set(caseStudiesData.map((cs) => new Date(cs.date).getFullYear())),
  ].sort((a, b) => b - a);

  // Apply filters when they change
  useEffect(() => {
    let results = caseStudiesData;

    // Apply industry filter
    if (activeFilters.industry.length > 0) {
      results = results.filter((cs) =>
        activeFilters.industry.includes(cs.industry)
      );
    }

    // Apply location filter
    if (activeFilters.location.length > 0) {
      results = results.filter((cs) =>
        activeFilters.location.includes(cs.location)
      );
    }

    // Apply year filter
    if (activeFilters.year.length > 0) {
      results = results.filter((cs) =>
        activeFilters.year.includes(new Date(cs.date).getFullYear())
      );
    }

    setFilteredCaseStudies(results);
  }, [activeFilters]);

  // Toggle filter value
  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => {
      // If value is already in the filter, remove it
      if (prev[type].includes(value)) {
        return {
          ...prev,
          [type]: prev[type].filter((item) => item !== value),
        };
      }
      // Otherwise add it
      return {
        ...prev,
        [type]: [...prev[type], value],
      };
    });
  };

  // Remove a specific filter
  const removeFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      industry: [],
      location: [],
      year: [],
    });
  };

  // Load more case studies
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredCaseStudies.length));
  };

  // Check if there are any active filters
  const hasActiveFilters = Object.values(activeFilters).some(
    (filters) => filters.length > 0
  );

  // Get featured case study
  const featuredCaseStudy = caseStudiesData.find((cs) => cs.featured);

  // SEO configuration
  const seoConfig = {
    title: "Case Studies | Our Custom Packaging Success Stories",
    description:
      "Explore our custom packaging case studies to see how we've helped brands like Harrods, Royal Ascot, and more elevate their packaging with bespoke, sustainable solutions.",
    keywords:
      "custom packaging case studies, packaging success stories, luxury packaging examples, sustainable packaging projects",
    canonicalUrl: "/case-studies",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Custom Packaging Case Studies",
      description:
        "Explore our custom packaging case studies to see how we've helped brands across various industries elevate their packaging with bespoke solutions.",
      url: "https://packageitperfect.com/case-studies",
    },
  };

  return (
    <CaseStudiesContainer>
      <SEO {...seoConfig} />

      <PageTitle>Case Studies</PageTitle>
      <PageSubtitle>
        Discover how we've helped brands across industries elevate their
        packaging
      </PageSubtitle>

      {/* Featured Case Study */}
      {featuredCaseStudy && (
        <FeaturedSection>
          <FeaturedTitle>Featured Project</FeaturedTitle>
          <FeaturedCase>
            <FeaturedImage>
              <OptimizedImage
                src={featuredCaseStudy.mainImage}
                alt={featuredCaseStudy.title}
                aspectRatio="1/1"
                height="100%"
                width="100%"
                objectFit="cover"
              />
            </FeaturedImage>
            <FeaturedContent>
              <FeaturedTag>Featured</FeaturedTag>
              <FeaturedCardTitle>{featuredCaseStudy.title}</FeaturedCardTitle>
              <FeaturedCardDescription>
                {featuredCaseStudy.shortDescription}
              </FeaturedCardDescription>
              <CardMeta>
                <MetaItem>
                  <FontAwesomeIcon icon={faIndustry} />
                  <span>{featuredCaseStudy.industry}</span>
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{featuredCaseStudy.location}</span>
                </MetaItem>
              </CardMeta>
              <FeaturedCardButton to={`/case-study/${featuredCaseStudy.slug}`}>
                View Case Study <FontAwesomeIcon icon={faArrowRight} />
              </FeaturedCardButton>
            </FeaturedContent>
          </FeaturedCase>
        </FeaturedSection>
      )}

      {/* Filters */}
      <FiltersContainer>
        <FilterHeader>
          <FilterTitle>
            <FontAwesomeIcon icon={faFilter} />
            Filter Case Studies
          </FilterTitle>
          <FilterToggle onClick={() => setFiltersOpen(!filtersOpen)}>
            {filtersOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faFilter} />
            )}
          </FilterToggle>
        </FilterHeader>

        <FilterContent isOpen={filtersOpen}>
          <FilterGroup>
            <FilterLabel>Industry</FilterLabel>
            <FilterOptions>
              {industries.map((industry) => (
                <FilterButton
                  key={`industry-${industry}`}
                  active={activeFilters.industry.includes(industry)}
                  onClick={() => toggleFilter("industry", industry)}
                >
                  {industry}
                </FilterButton>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Location</FilterLabel>
            <FilterOptions>
              {locations.map((location) => (
                <FilterButton
                  key={`location-${location}`}
                  active={activeFilters.location.includes(location)}
                  onClick={() => toggleFilter("location", location)}
                >
                  {location}
                </FilterButton>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Year</FilterLabel>
            <FilterOptions>
              {years.map((year) => (
                <FilterButton
                  key={`year-${year}`}
                  active={activeFilters.year.includes(year)}
                  onClick={() => toggleFilter("year", year)}
                >
                  {year}
                </FilterButton>
              ))}
            </FilterOptions>
          </FilterGroup>

          {/* Active Filters */}
          {hasActiveFilters && (
            <ActiveFiltersContainer>
              {activeFilters.industry.map((industry) => (
                <ActiveFilter key={`active-industry-${industry}`}>
                  Industry: {industry}
                  <RemoveFilter
                    onClick={() => removeFilter("industry", industry)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </RemoveFilter>
                </ActiveFilter>
              ))}

              {activeFilters.location.map((location) => (
                <ActiveFilter key={`active-location-${location}`}>
                  Location: {location}
                  <RemoveFilter
                    onClick={() => removeFilter("location", location)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </RemoveFilter>
                </ActiveFilter>
              ))}

              {activeFilters.year.map((year) => (
                <ActiveFilter key={`active-year-${year}`}>
                  Year: {year}
                  <RemoveFilter onClick={() => removeFilter("year", year)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </RemoveFilter>
                </ActiveFilter>
              ))}

              <ClearAllFilters onClick={clearAllFilters}>
                Clear All Filters
              </ClearAllFilters>
            </ActiveFiltersContainer>
          )}
        </FilterContent>
      </FiltersContainer>

      {/* Case Studies Grid */}
      {filteredCaseStudies.length > 0 ? (
        <>
          <CaseStudiesGrid>
            {filteredCaseStudies.slice(0, visibleCount).map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id}>
                <CardImageContainer>
                  <OptimizedImage
                    src={caseStudy.mainImage}
                    alt={caseStudy.title}
                    layout="fill"
                    objectFit="cover"
                    hoverEffect="zoom"
                  />
                </CardImageContainer>
                <CardContent>
                  <Link
                    to={`/case-study/${caseStudy.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardTitle>{caseStudy.title}</CardTitle>
                  </Link>
                  <CardDescription>
                    {caseStudy.shortDescription}
                  </CardDescription>
                  <CardMeta>
                    <MetaItem>
                      <FontAwesomeIcon icon={faIndustry} />
                      <span>{caseStudy.industry}</span>
                    </MetaItem>
                    <MetaItem>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>{caseStudy.date}</span>
                    </MetaItem>
                  </CardMeta>
                  <CardButton to={`/case-study/${caseStudy.slug}`}>
                    Read Case Study <FontAwesomeIcon icon={faArrowRight} />
                  </CardButton>
                </CardContent>
              </CaseStudyCard>
            ))}
          </CaseStudiesGrid>

          {/* Load More Button */}
          {visibleCount < filteredCaseStudies.length && (
            <LoadMoreButton onClick={handleLoadMore}>
              Load More Case Studies
            </LoadMoreButton>
          )}
        </>
      ) : (
        <NoResults>
          <NoResultsTitle>No Case Studies Found</NoResultsTitle>
          <NoResultsText>
            No case studies match your current filters. Try adjusting your
            filter criteria or browse all our case studies.
          </NoResultsText>
          <NoResultsButton onClick={clearAllFilters}>
            Clear All Filters
          </NoResultsButton>
        </NoResults>
      )}
    </CaseStudiesContainer>
  );
};

export default CaseStudies;

