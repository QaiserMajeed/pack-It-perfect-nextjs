import React, { useState } from "react";
import styled from "styled-components";
import { Metadata } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLeaf,
  faRecycle,
  faShippingFast,
  faPaintBrush,
  faBoxOpen,
  faFilter,
  faGlassCheers,
  faMugHot,
  faSort,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"; // import OptimizedImage from "./OptimizeImage"; // Using your existing optimized image component
import { useCurrency } from "../hooks/useCurrency";
// Styled Components
const PageContainer = styled.div`
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

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const HeroDescription = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  font-size: 1rem;

  svg {
    color: #4caf50;
    margin-right: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const HeroButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: white;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#000" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#f0f0f0")};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
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

const ProductImageContainer = styled.div`
  height: 250px;
  background-color: #f9f9f9;
  position: relative;
`;

const ProductLabelContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductLabel = styled.span`
  display: inline-block;
  background-color: ${(props) => {
    switch (props.type) {
      case "eco":
        return "#4caf50";
      case "new":
        return "#2196f3";
      case "sale":
        return "#f44336";
      default:
        return "#333";
    }
  }};
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;

  .old-price {
    text-decoration: line-through;
    color: #999;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .sale-price {
    color: #f44336;
  }
`;

const ProductCapacity = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ProductButton = styled.a`
  display: block;
  width: 100%;
  background-color: #000;
  color: white;
  text-align: center;
  padding: 0.8rem 0;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background-color: #000;
    margin: 1rem auto 0;
  }
`;

const CustomizationSection = styled.div`
  margin-bottom: 4rem;
`;

const CustomizationGrid = styled.div`
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

const CustomizationCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
`;

const CustomizationIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

  svg {
    font-size: 2rem;
    color: #000;
  }
`;

const CustomizationTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CustomizationDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const DesignSection = styled.div`
  margin-bottom: 4rem;
  background-color: #f0e6d2;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
`;

const DesignContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const DesignTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const DesignDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const DesignButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const FAQSection = styled.div`
  margin-bottom: 4rem;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FAQQuestion = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;



const JarsCupsPage = () => {
  // Use custom hook for currency conversion
  const { formatPrice } = useCurrency();
  // Function to convert price to selected currency
  // Use placeholder images if actual images are not available
  // In a production environment, replace these with your actual image paths
  const placeholderImage = (name) => {
    // This function simulates image paths for development
    // Replace with actual paths when implementing
    return `/images/products/JarsCups/${name}.png`;
  };
  const getImagePath = (pinterestUrl) => {
    // If a Pinterest URL is provided, use it, otherwise use a placeholder
    return pinterestUrl || `/api/placeholder/400/320`;
  };
  // State for product filters
  const [filters, setFilters] = useState({
    type: "all",
    material: "all",
    feature: "all",
  });

  // Sample products data
  // Products array with descriptive image file names in the JarsCups folder
  const products = [
    {
      id: 1,
      title: "Glass Mason Jar with Lid",
      description:
        "Versatile glass jar perfect for food storage, preserves, or decorative uses.",
      type: "jar",
      material: "glass",
      features: ["eco"],
      capacity: "500ml",
      price: "0.45",
      salePrice: null,
      image: "/images/products/JarsCups/glass-mason-jar.jpg",
    },
    {
      id: 2,
      title: "Kraft Paper Coffee Cup",
      description:
        "Eco-friendly kraft paper cup with heat-resistant design for hot beverages.",
      type: "cup",
      material: "paper",
      features: ["eco", "new"],
      capacity: "350ml",
      price: "0.28",
      salePrice: "0.22",
      image: "/images/products/JarsCups/kraft-paper-coffee-cup.jpg",
    },
    {
      id: 3,
      title: "Clear Plastic Smoothie Cup",
      description:
        "Crystal clear cup with dome lid, perfect for cold drinks and smoothies.",
      type: "cup",
      material: "plastic",
      features: [],
      capacity: "500ml",
      price: "0.38",
      salePrice: null,
      image: "/images/products/JarsCups/clear-plastic-smoothie-cup.jpg",
    },
    {
      id: 4,
      title: "Jam Jar with Screw Lid",
      description:
        "Traditional jam jar with secure screw-top lid, ideal for preserves and honey.",
      type: "jar",
      material: "glass",
      features: ["eco"],
      capacity: "300ml",
      price: "0.52",
      salePrice: null,
      image: "/images/products/JarsCups/jam-jar-screw-lid.jpg",
    },
    {
      id: 5,
      title: "Eco Bamboo Coffee Cup",
      description: "Sustainable bamboo fiber cup with silicone lid and sleeve.",
      type: "cup",
      material: "bamboo",
      features: ["eco", "new"],
      capacity: "400ml",
      price: "0.85",
      salePrice: null,
      image: "/images/products/JarsCups/eco-bamboo-coffee-cup.jpg",
    },
    {
      id: 6,
      title: "Sauce Dipping Cup",
      description:
        "Small plastic cup with lid for sauces, dressings and condiments.",
      type: "cup",
      material: "plastic",
      features: [],
      capacity: "50ml",
      price: "0.12",
      salePrice: "0.10",
      image: "/images/products/JarsCups/sauce-dipping-cup.jpg",
    },
    {
      id: 7,
      title: "Cosmetic Cream Jar",
      description:
        "Elegant glass jar with aluminum lid for cosmetics and skincare products.",
      type: "jar",
      material: "glass",
      features: ["new"],
      capacity: "100ml",
      price: "0.65",
      salePrice: null,
      image: "/images/products/JarsCups/cosmetic-cream-jar.jpg",
    },
    {
      id: 8,
      title: "Double Wall Paper Cup",
      description: "Insulated double-wall paper cup perfect for hot beverages.",
      type: "cup",
      material: "paper",
      features: ["eco"],
      capacity: "250ml",
      price: "0.32",
      salePrice: null,
      image: "/images/products/JarsCups/double-wall-paper-cup.jpg",
    },
    {
      id: 9,
      title: "Plastic Storage Jar",
      description:
        "Lightweight plastic jar with secure lid for dry goods storage.",
      type: "jar",
      material: "plastic",
      features: [],
      capacity: "750ml",
      price: "0.42",
      salePrice: "0.35",
      image: "/images/products/JarsCups/plastic-storage-jar.jpg",
    },
    {
      id: 10,
      title: "Reusable Glass Smoothie Bottle",
      description:
        "Stylish glass bottle with bamboo lid, perfect for smoothies and juices.",
      type: "bottle",
      material: "glass",
      features: ["eco", "new"],
      capacity: "600ml",
      price: "1.10",
      salePrice: "0.99",
      image: "/images/products/JarsCups/glass-smoothie-bottle.jpg",
    },
    {
      id: 11,
      title: "Mini Honey Jar",
      description:
        "Tiny glass jar ideal for honey, spices, or wedding favours.",
      type: "jar",
      material: "glass",
      features: ["eco"],
      capacity: "50ml",
      price: "0.30",
      salePrice: null,
      image: "/images/products/JarsCups/mini-honey-jar.jpg",
    },
    {
      id: 12,
      title: "Compostable Coffee Cup",
      description:
        "Fully compostable paper cup with plant-based lining for sustainable coffee service.",
      type: "cup",
      material: "paper",
      features: ["eco"],
      capacity: "300ml",
      price: "0.36",
      salePrice: null,
      image: "/images/products/JarsCups/compostable-coffee-cup.jpg",
    },
    {
      id: 13,
      title: "Plastic Protein Shaker Bottle",
      description:
        "Leak-proof protein shaker with measurement markings and mixing ball.",
      type: "bottle",
      material: "plastic",
      features: [],
      capacity: "700ml",
      price: "1.50",
      salePrice: "1.25",
      image: "/images/products/JarsCups/protein-shaker-bottle.jpg",
    },
    {
      id: 14,
      title: "Recycled PET Smoothie Cup",
      description:
        "Eco-conscious smoothie cup made from recycled plastic, with dome lid.",
      type: "cup",
      material: "rPET",
      features: ["eco"],
      capacity: "500ml",
      price: "0.40",
      salePrice: null,
      image: "/images/products/JarsCups/recycled-pet-smoothie-cup.jpg",
    },
    {
      id: 15,
      title: "Wide Mouth Storage Jar",
      description:
        "Durable wide mouth glass jar for pantry essentials like grains and pasta.",
      type: "jar",
      material: "glass",
      features: [],
      capacity: "1000ml",
      price: "0.95",
      salePrice: null,
      image: "/images/products/JarsCups/wide-mouth-storage-jar.jpg",
    },
    {
      id: 16,
      title: "Frosted Glass Jar with Cork Lid",
      description:
        "Elegant frosted glass jar with cork lid for dry herbs and decor.",
      type: "jar",
      material: "glass",
      features: ["eco", "new"],
      capacity: "250ml",
      price: "0.60",
      salePrice: null,
      image: "/images/products/JarsCups/frosted-glass-jar-cork.jpg",
    },
    {
      id: 17,
      title: "Disposable Plastic Party Cup",
      description: "Classic red plastic party cup for events and celebrations.",
      type: "cup",
      material: "plastic",
      features: [],
      capacity: "500ml",
      price: "0.20",
      salePrice: "0.15",
      image: "/images/products/JarsCups/plastic-party-cup.jpg",
    },
    {
      id: 18,
      title: "Recyclable Cold Drink Cup",
      description: "Eco-friendly recyclable cup for iced drinks and sodas.",
      type: "cup",
      material: "paper",
      features: ["eco"],
      capacity: "450ml",
      price: "0.30",
      salePrice: null,
      image: "/images/products/JarsCups/recyclable-cold-cup.jpg",
    },
    {
      id: 19,
      title: "Amber Glass Apothecary Jar",
      description: "Vintage-style amber jar great for herbs, oils, or storage.",
      type: "jar",
      material: "glass",
      features: [],
      capacity: "200ml",
      price: "0.58",
      salePrice: null,
      image: "/images/products/JarsCups/amber-apothecary-jar.jpg",
    },
    {
      id: 20,
      title: "Child-Safe Sippy Cup",
      description:
        "Leak-proof plastic sippy cup designed for toddlers and kids.",
      type: "cup",
      material: "plastic",
      features: ["new"],
      capacity: "300ml",
      price: "0.75",
      salePrice: "0.68",
      image: "/images/products/JarsCups/child-sippy-cup.jpg",
    },
    {
      id: 21,
      title: "Ceramic Coffee Mug",
      description: "Classic ceramic mug with smooth matte finish.",
      type: "cup",
      material: "ceramic",
      features: [],
      capacity: "350ml",
      price: "1.20",
      salePrice: null,
      image: "/images/products/JarsCups/ceramic-coffee-mug.jpg",
    },
    {
      id: 22,
      title: "Glass Jar with Bamboo Lid",
      description: "Modern pantry jar with airtight bamboo lid.",
      type: "jar",
      material: "glass",
      features: ["eco"],
      capacity: "800ml",
      price: "0.89",
      salePrice: "0.80",
      image: "/images/products/JarsCups/glass-jar-bamboo-lid.jpg",
    },
    {
      id: 23,
      title: "Hexagon Honey Jar",
      description: "Stylish hexagonal glass jar perfect for honey or gifting.",
      type: "jar",
      material: "glass",
      features: [],
      capacity: "120ml",
      price: "0.48",
      salePrice: null,
      image: "/images/products/JarsCups/hexagon-honey-jar.jpg",
    },
    {
      id: 24,
      title: "Insulated Stainless Steel Travel Mug",
      description:
        "Durable travel mug that keeps drinks hot or cold for hours.",
      type: "cup",
      material: "metal",
      features: ["eco", "new"],
      capacity: "500ml",
      price: "2.50",
      salePrice: "2.10",
      image: "/images/products/JarsCups/stainless-steel-travel-mug.jpg",
    },
    {
      id: 25,
      title: "Tiny Glass Sample Jar",
      description: "Small glass jar ideal for samples, spices or skincare.",
      type: "jar",
      material: "glass",
      features: [],
      capacity: "30ml",
      price: "0.25",
      salePrice: null,
      image: "/images/products/JarsCups/tiny-sample-jar.jpg",
    },
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (filters.type !== "all" && product.type !== filters.type) return false;
    if (filters.material !== "all" && product.material !== filters.material)
      return false;
    if (
      filters.feature !== "all" &&
      !product.features.includes(filters.feature)
    )
      return false;
    return true;
  });

  // Update filter
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "all" : value,
    }));
  };

  // SEO configuration
  const seoConfig = {
    title: "Custom Jars and Cups | Food and Beverage Packaging",
    description:
      "Shop our range of customizable jars and cups for food, beverages, and cosmetics. Sustainable options available with premium custom printing.",
    keywords:
      "custom jars, custom cups, glass jars, paper cups, food packaging, beverage packaging, eco-friendly cups",
    canonicalUrl: "/jars-cups",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Custom Jars and Cups",
      description:
        "Shop our range of customizable jars and cups for food, beverages, and cosmetics. Sustainable options available with premium custom printing.",
      url: "https://packageitperfect.com/jars-cups",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0.10",
        highPrice: "0.85",
        priceCurrency: "GBP",
        offerCount: "9",
      },
    },
  };

  return (
    <PageContainer>
      <SEO {...seoConfig} />

      <PageTitle>Custom Jars & Cups</PageTitle>
      <PageSubtitle>
        Premium packaging for food, beverages, and more
      </PageSubtitle>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Elevate Your Products with Custom Jars & Cups</HeroTitle>
          <HeroDescription>
            <p>
              At Pack it Perfect, we offer a comprehensive range of food-grade
              jars and cups that can be fully customized to match your brand and
              product needs. From glass jars for preserves to eco-friendly
              coffee cups, we have the perfect solution for your packaging
              requirements.
            </p>
            <p>
              Our jars and cups are designed with both functionality and
              aesthetics in mind, ensuring your products stay fresh while making
              a strong impression on your customers.
            </p>
          </HeroDescription>

          <FeaturesList>
            <FeatureItem>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Food-grade materials for safe product storage</span>
            </FeatureItem>
            <FeatureItem>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Custom printing with your branding and designs</span>
            </FeatureItem>
            <FeatureItem>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Eco-friendly and sustainable options available</span>
            </FeatureItem>
            <FeatureItem>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Low minimum order quantities starting from 100 units</span>
            </FeatureItem>
          </FeaturesList>

          <HeroButton href="/get-a-quote">Get a Custom Quote</HeroButton>
        </HeroContent>

        <HeroImageContainer>
          <OptimizedImage
            src={placeholderImage("jars-cups-hero")}
            alt="Custom jars and cups collection"
            layout="fill"
            objectFit="cover"
          />
        </HeroImageContainer>
      </HeroSection>

      {/* Filter Section */}
      <FilterSection>
        <FilterTitle>
          <FontAwesomeIcon icon={faFilter} />
          Filter Products
        </FilterTitle>

        <FilterGrid>
          <FilterButton
            active={filters.type === "jar"}
            onClick={() => handleFilterChange("type", "jar")}
          >
            <FontAwesomeIcon
              icon={faWineBottle}
              style={{ marginRight: "0.5rem" }}
            />
            Jars
          </FilterButton>

          <FilterButton
            active={filters.type === "cup"}
            onClick={() => handleFilterChange("type", "cup")}
          >
            <FontAwesomeIcon
              icon={faMugHot}
              style={{ marginRight: "0.5rem" }}
            />
            Cups
          </FilterButton>

          <FilterButton
            active={filters.material === "glass"}
            onClick={() => handleFilterChange("material", "glass")}
          >
            <FontAwesomeIcon
              icon={faGlassCheers}
              style={{ marginRight: "0.5rem" }}
            />
            Glass
          </FilterButton>

          <FilterButton
            active={filters.material === "paper"}
            onClick={() => handleFilterChange("material", "paper")}
          >
            <FontAwesomeIcon
              icon={faRecycle}
              style={{ marginRight: "0.5rem" }}
            />
            Paper
          </FilterButton>

          <FilterButton
            active={filters.material === "plastic"}
            onClick={() => handleFilterChange("material", "plastic")}
          >
            Plastic
          </FilterButton>

          <FilterButton
            active={filters.material === "bamboo"}
            onClick={() => handleFilterChange("material", "bamboo")}
          >
            <FontAwesomeIcon icon={faLeaf} style={{ marginRight: "0.5rem" }} />
            Bamboo
          </FilterButton>

          <FilterButton
            active={filters.feature === "eco"}
            onClick={() => handleFilterChange("feature", "eco")}
          >
            Eco-Friendly
          </FilterButton>

          <FilterButton
            active={filters.feature === "new"}
            onClick={() => handleFilterChange("feature", "new")}
          >
            New Arrivals
          </FilterButton>
        </FilterGrid>
      </FilterSection>

      {/* Products Grid */}
      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImageContainer>
              <OptimizedImage
                src={product.image}
                alt={product.title}
                height="100%"
                objectFit="contain"
              />

              <ProductLabelContainer>
                {product.features.includes("eco") && (
                  <ProductLabel type="eco">Eco-Friendly</ProductLabel>
                )}
                {product.features.includes("new") && (
                  <ProductLabel type="new">New</ProductLabel>
                )}
                {product.salePrice && (
                  <ProductLabel type="sale">Sale</ProductLabel>
                )}
              </ProductLabelContainer>
            </ProductImageContainer>

            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>

              <ProductMeta>
                <ProductPrice>
                  {product.salePrice ? (
                    <>
                      <span className="old-price">{formatPrice(product.price)}</span>
                      <span className="sale-price">{formatPrice( product.salePrice)}</span>
                    </>
                  ) : (
                    <span>{formatPrice( product.price)}</span>
                  )}
                </ProductPrice>

                <ProductCapacity>{product.capacity}</ProductCapacity>
              </ProductMeta>

              <ProductButton href="/get-a-quote">Get Quote</ProductButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>

      <SectionDivider />

      {/* Customization Options */}
      <CustomizationSection>
        <SectionTitle>Customization Options</SectionTitle>

        <CustomizationGrid>
          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faPaintBrush} />
            </CustomizationIcon>
            <CustomizationTitle>Custom Printing</CustomizationTitle>
            <CustomizationDescription>
              Add your logo, branding, and designs with our high-quality
              printing options. Available in CMYK, PMS color matching, and
              specialty inks.
            </CustomizationDescription>
          </CustomizationCard>

          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faShippingFast} />
            </CustomizationIcon>
            <CustomizationTitle>Size Options</CustomizationTitle>
            <CustomizationDescription>
              Choose from our standard sizes or request custom dimensions to
              perfectly suit your product. Multiple capacity options available.
            </CustomizationDescription>
          </CustomizationCard>

          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faBoxOpen} />
            </CustomizationIcon>
            <CustomizationTitle>Lid Variations</CustomizationTitle>
            <CustomizationDescription>
              Select from various lid styles including screw caps, press-on
              lids, drink-through lids, and sealed options for different
              applications.
            </CustomizationDescription>
          </CustomizationCard>

          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faSort} />
            </CustomizationIcon>
            <CustomizationTitle>Material Selection</CustomizationTitle>
            <CustomizationDescription>
              Choose from glass, various grades of plastic, paper, and
              eco-friendly alternatives to match your product requirements and
              brand values.
            </CustomizationDescription>
          </CustomizationCard>

          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faLeaf} />
            </CustomizationIcon>
            <CustomizationTitle>Eco-Friendly Options</CustomizationTitle>
            <CustomizationDescription>
              Sustainable alternatives including recyclable, biodegradable, and
              compostable materials to reduce environmental impact.
            </CustomizationDescription>
          </CustomizationCard>

          <CustomizationCard>
            <CustomizationIcon>
              <FontAwesomeIcon icon={faRecycle} />
            </CustomizationIcon>
            <CustomizationTitle>Special Finishes</CustomizationTitle>
            <CustomizationDescription>
              Enhance your packaging with special finishes like matte, gloss,
              soft-touch, metallics, and more to create a premium look and feel.
            </CustomizationDescription>
          </CustomizationCard>
        </CustomizationGrid>
      </CustomizationSection>

      {/* Design Service CTA */}
      <DesignSection>
        <DesignContent>
          <DesignTitle>Need Help with Your Design?</DesignTitle>
          <DesignDescription>
            Our in-house design team can help create the perfect custom jar or
            cup design for your brand. From concept to production, we'll guide
            you through every step of the process to ensure your packaging
            stands out.
          </DesignDescription>
          <DesignButton href="/contact">Contact Our Design Team</DesignButton>
        </DesignContent>
      </DesignSection>

      {/* FAQ Section */}
      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>

        <FAQContainer>
          <FAQItem>
            <FAQQuestion>What is the minimum order quantity?</FAQQuestion>
            <FAQAnswer>
              Our minimum order quantity is 100 units for most jar and cup
              products. For specialty items or products with complex
              customization, minimum orders may be higher. Please contact us for
              specific requirements.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Are your jars and cups food-safe?</FAQQuestion>
            <FAQAnswer>
              Yes, all our jars and cups are made from food-grade materials that
              comply with UK and EU food safety regulations. We can provide
              certification documentation upon request.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>What type of printing do you offer?</FAQQuestion>
            <FAQAnswer>
              We offer various printing methods including offset printing,
              digital printing, screen printing, and heat transfer. The best
              method depends on your design, material, and quantity.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>How long does production take?</FAQQuestion>
            <FAQAnswer>
              Standard production time for custom jars and cups is 7-10 working
              days after artwork approval. Rush orders can be accommodated when
              possible, subject to additional fees.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>
              Can I get samples before placing a bulk order?
            </FAQQuestion>
            <FAQAnswer>
              Yes, we offer sample packs of our standard jars and cups. For
              custom printed products, we can provide pre-production samples for
              approval before the full production run.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Do you offer eco-friendly options?</FAQQuestion>
            <FAQAnswer>
              Yes, we offer a range of eco-friendly options including recyclable
              glass jars, biodegradable paper cups, compostable PLA cups, and
              cups made from sustainable bamboo fiber. These options are clearly
              marked with our eco-friendly label.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>
              Can your jars and cups withstand hot and cold temperatures?
            </FAQQuestion>
            <FAQAnswer>
              Our temperature tolerances vary by material. Glass jars can
              typically withstand temperatures from -20Â°C to 120Â°C. Our
              insulated paper cups are designed for hot beverages up to 85Â°C,
              while our plastic cold cups are ideal for cold drinks down to
              -10Â°C. We'll recommend the best option based on your specific
              needs.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>What payment options do you offer?</FAQQuestion>
            <FAQAnswer>
              We accept all major credit and debit cards, bank transfers, and
              PayPal. For larger orders, we also offer flexible payment plans.
              Visit our <a href="/payment-plans">Payment Plans</a> page to learn
              more about our installment options.
            </FAQAnswer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>
    </PageContainer>
  );
};
export default JarsCupsPage;

