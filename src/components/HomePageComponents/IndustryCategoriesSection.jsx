'use client';
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSprayCan,
  faUtensils,
  faPills,
  faGift,
  faWineBottle,
  faCannabis,
  faTshirt,
  faShoppingCart,
  faLaptop,
  faShoePrints,
  faHeartbeat,
  faGem,
  faBoxes,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
  faSprayCan,
  faUtensils,
  faPills,
  faGift,
  faWineBottle,
  faCannabis,
  faTshirt,
  faShoppingCart,
  faLaptop,
  faShoePrints,
  faHeartbeat,
  faGem,
  faBoxes,
  faPrescriptionBottleMedical
);

const SectionContainer = styled.div`
  padding: 4rem 0;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const IconBackground = styled.div`
  width: 120px;
  height: 60px;
  position: relative;
  background-color: ${(props) => props.bgColor || "#FFD699"};
  border-radius: 120px 120px 0 0;
  margin-bottom: 0.5rem;
`;

const CategoryIcon = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: #333; /* Icon color */
`;

const CategoryName = styled.span`
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
`;

const Superscript = styled.sup`
  font-size: 0.6rem;
  top: -0.5em;
`;

const ViewAllLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: #333;
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: #000;
      text-decoration: underline;
    }

    &::after {
      content: "â†’";
      margin-left: 0.5rem;
    }
  }
`;

const IndustryCategoriesSection = () => {
  const categories = [
    {
      name: "Cosmetics",
      icon: faSprayCan,
      bgColor: "#FFD699",
      link: "/category/Beauty-and-Cosmetics-Packaging",
    },
    {
      name: "Food",
      icon: faUtensils,
      bgColor: "#ADE4FF",
      link: "/category/Fast-Food-Packaging",
    },
    {
      name: "Supplements",
      icon: faPills,
      bgColor: "#FFB380",
      link: "/category/Supplements-Packaging",
    },
    {
      name: "Gifts",
      icon: faGift,
      bgColor: "#FF99A6",
      link: "/category/Gifts-and-Souvenirs-Boxes",
    },
    {
      name: "Beverages",
      icon: faWineBottle,
      bgColor: "#FFEDB3",
      link: "/category/Beverage-Custom-Boxes",
    },
    {
      name: "Cannabis",
      icon: faCannabis,
      bgColor: "#B3E6CC",
      link: "/category/Cannabis-Custom-Packaging",
    },
    {
      name: "Clothing",
      icon: faTshirt,
      bgColor: "#CCE0FF",
      link: "/category/Clothing-and-Apparel-Boxes",
    },
    {
      name: "E-commerce",
      icon: faShoppingCart,
      bgColor: "#DDBDF1",
      link: "/category/E-Commerce-Packaging",
    },
    {
      name: "Electronics",
      icon: faLaptop,
      bgColor: "#99E6E6",
      link: "/category/Electronics-Boxes",
    },
    {
      name: "Shoes",
      icon: faShoePrints,
      bgColor: "#A6D388",
      link: "/category/Shoes-Packaging",
    },
    {
      name: "Healthcare",
      icon: faHeartbeat,
      bgColor: "#FFB3F0",
      link: "/category/Healthcare-Boxes",
    },
    {
      name: "Jewelry",
      icon: faGem,
      bgColor: "#E6CCFF",
      link: "/category/jewelry-packaging",
    },
    {
      name: "Custom Made",
      icon: faBoxes,
      bgColor: "#B3B3CC",
      link: "/category/Custom-Made-Boxes",
    },
    {
      name: "Medical",
      icon: faPrescriptionBottleMedical,
      bgColor: "#99CCFF",
      link: "/category/Medical-Devices-Boxes",
    },
  ];
  return (
    <SectionContainer>
      <div className="container">
        <SectionTitle>
          Popular Packaging Solutions in Your Industry!
        </SectionTitle>
        <SectionDescription>
          Our service support at any point of your packaging journey to
          guarantee best packaging success.
        </SectionDescription>

        <CategoriesGrid>
          {categories.slice(0, 10).map((category, index) => (
            <CategoryCard to={category.link} key={index}>
              <IconBackground bgColor={category.bgColor}>
                <CategoryIcon>
                  <FontAwesomeIcon icon={category.icon} size="3x" />
                </CategoryIcon>
              </IconBackground>
              <CategoryName>
                {category.name}
                <Superscript>TM</Superscript>
              </CategoryName>
            </CategoryCard>
          ))}
        </CategoriesGrid>

        <CategoriesGrid>
          {categories.slice(10).map((category, index) => (
            <CategoryCard to={category.link} key={index}>
              <IconBackground bgColor={category.bgColor}>
                <CategoryIcon>
                  <FontAwesomeIcon icon={category.icon} size="3x" />
                </CategoryIcon>
              </IconBackground>
              <CategoryName>
                {category.name}
                <Superscript>TM</Superscript>
              </CategoryName>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </div>
    </SectionContainer>
  );
};

export default IndustryCategoriesSection;

