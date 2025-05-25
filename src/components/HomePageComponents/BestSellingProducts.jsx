'use client';
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBreadSlice,
  faHamburger,
  faBoxOpen,
  faShoePrints,
  faCakeCandles,
  faRecycle,
  faShoppingBag,
  faCandyBar,
  faSprayCan,
  faWineBottle,
  faBoxes,
} from "@fortawesome/free-solid-svg-icons";

// Fallback icons for those not available in free package
import {
  faCube,
  faStore,
  faWineGlass,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { useCurrency } from "../../hooks/useCurrency";

const SectionContainer = styled.div`
  padding: 4rem 0;
  background-color: #f8f8f8;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SellingText = styled.span`
  color: #ff3b30;
  margin-left: 0.5rem;
`;

const ViewAllButton = styled.a`
  color: #333;
  font-size: 0.9rem;
  text-decoration: none;
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
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.a`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewTag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff3b30;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
  z-index: 1;
`;

const ProductImage = styled.div`
  padding: 1rem;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #666;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.div`
  font-size: 0.95rem;
  color: #ff3b30;
  font-weight: 600;
`;

const RegularPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 0.85rem;
  margin-left: 0.5rem;
`;

const IconBackground = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${(props) => props.bgColor || "#f0f0f0"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// Function to get a background color based on product ID
const getProductColor = (id) => {
  const colors = [
    "#FFE5CC", // Cigarette Packaging
    "#FFECB3", // Bakery Product Boxes
    "#FFCCF5", // Custom Bangle Boxes
    "#E5CCFF", // Custom Cardboard Boxes
    "#CCE5FF", // Leather Shoes Boxes
    "#FFD6CC", // Carryout Boxes
    "#D6FFCC", // Recyclable Packaging
    "#CCFFE6"  // Wine Bottle Packaging
  ];
  
  return colors[(id - 1) % colors.length];
};

const BestSellingProducts = () => {
  const { formatPrice } = useCurrency();
 const products = [
   {
     id: 1,
     title: "Cigarette Packaging",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Cigarettes-Packaging-300x300.webp",
     price: "0.07",
     regularPrice: "0.23",
     link: "/custom-cigarettes-boxes",
     isNew: true,
   },
   {
     id: 2,
     title: "Bakery Product Boxes",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Bakery-Product-Boxes-300x300.webp",
     price: "0.06",
     regularPrice: "0.23",
     link: "/bakery-product-boxes",
     isNew: true,
   },
   {
     id: 3,
     title: "Custom Bangle Boxes",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Custom-Bangle-Boxes-300x300.webp",
     price: "0.09",
     regularPrice: "0.25",
     link: "/custom-bangle-boxes",
     isNew: false,
   },
   {
     id: 4,
     title: "Custom Cardboard Boxes",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Custom-Cardboard-Boxes-300x300.webp",
     price: "0.06",
     regularPrice: "0.21",
     link: "/custom-cardboard-boxes",
     isNew: false,
   },
   {
     id: 5,
     title: "Leather Shoes Boxes",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Leather-Shoes-Boxes-300x300.webp",
     price: "0.06",
     regularPrice: "0.23",
     link: "/custom-leather-shoes-boxes",
     isNew: true,
   },
   {
     id: 6,
     title: "Carryout Boxes",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Carry-Out-boxes-300x300.webp",
     price: "0.07",
     regularPrice: "0.22",
     link: "/custom-carryout-packaging-boxes",
     isNew: true,
   },
   {
     id: 7,
     title: "Recyclable Packaging",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Recyclable-Packaging-300x300.webp",
     price: "0.07",
     regularPrice: "0.23",
     link: "/recyclable-packaging",
     isNew: false,
   },
   {
     id: 8,
     title: "Wine Bottle Packaging",
     image:
       "https://onestepcustomboxes.co.uk/wp-content/uploads/2024/11/Wine-Bottle-Packaging-300x300.webp",
     price: "0.06",
     regularPrice: "0.22",
     link: "/custom-wine-bottle-boxes",
     isNew: true,
   },
 ];

  return (
    <SectionContainer>
      <div className="container">
        <SectionHeader>
          <SectionTitle>
            BEST <SellingText>SELLING!</SellingText>
          </SectionTitle>
        </SectionHeader>

        <ProductsGrid>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id}>
              {product.isNew && <NewTag>NEW</NewTag>}
              <ProductImage>
                <IconBackground bgColor={product.bgColor}>
                  <img src={product.image} alt={product.title} />
                </IconBackground>
              </ProductImage>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>
                  {formatPrice(product.price)}
                  <RegularPrice>
                    {formatPrice(product.regularPrice)}
                  </RegularPrice>
                </ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </div>
    </SectionContainer>
  );
};

export default BestSellingProducts;

