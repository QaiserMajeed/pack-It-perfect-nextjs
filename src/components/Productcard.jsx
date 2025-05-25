import React from "react";
import styled from "styled-components";
import { Metadata } from "next"
import Link from "next/link"; import { useRouter } from "next/router"; import { usePathname } from "next/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useCurrency } from "../hooks/useCurrency";

// Styled Components - Updated to match screenshot design
const Container = styled.div`
  background-color: white;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2rem;
`;

const RegularSpan = styled.span`
  color: #000;
`;

const BrandSpan = styled.span`
  color: #000;
`;

const CategoryDescription = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCardWrapper = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Card = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImgContainer = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.bgColor || "#F5E7C1"};
    z-index: 0;
    border-radius: 8px;
  }
`;

const CardBody = styled.div`
  padding: 1rem 0.5rem;
  text-align: center;
`;

const CategoryTag = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CardTitle = styled.h5`
  text-align: center;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #000;
`;

const Price = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const RegularPrice = styled.span`
  color: #d32f2f;
  font-weight: 500;
`;

const OriginalPrice = styled.span`
  color: #888;
  text-decoration: line-through;
  margin-left: 0.5rem;
`;

const ViewDetailsLink = styled.span`
  display: inline-block;
  color: #888;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #000;
  }
`;

const BrandInfo = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-top: auto;
`;

const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 3rem 0;
  grid-column: 1 / -1;
`;

const AlertInfo = styled.div`
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

// Array of background colors to cycle through for different products
const backgroundColors = [
  "#F5E7C1", // Light yellow
  "#D3E0EA", // Light blue
  "#F8D7DA", // Light pink
  "#D4EDDA", // Light green
  "#E2E3E5", // Light gray
  "#FFE5D9", // Light peach
  "#D6D2E2", // Light purple
  "#F0E6E4", // Light beige
];

const ProductCard = ({ categories }) => {
  const router = useRouter(); const { categoryName } = router.query;

  const filteredCategories = categories.filter(
    (category) => category.category === categoryName
  );

  // Find the category description
  const categoryDescription =
    filteredCategories.length > 0
      ? filteredCategories[0].description || filteredCategories[0].decription
      : "";
  const category =
    filteredCategories.length > 0
      ? filteredCategories[0].name || filteredCategories[0].name
      : "";

  // Function to get a background color based on index
  const getBackgroundColor = (index) => {
    return backgroundColors[index % backgroundColors.length];
  };
  const pathname = usePathname();
  // Generate structured data for product category
  const generateCategorySchema = () => {
    if (!category) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${category} Packaging Solutions`,
      description: categoryDescription,
      itemListElement:
        filteredCategories[0]?.subProducts?.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.title,
            description:
              product.description ||
              `Custom ${product.title.toLowerCase()} packaging solutions`,
            image: product.image,
            url: `https://packageitperfect.com/category/${categoryName}/product/${product.title}`,
          },
        })) || [],
    };
  };
 return (
   <Container>
     <SEO
       title={`${category} Packaging Solutions`}
       description={
         categoryDescription ||
         `Explore our custom ${category.toLowerCase()} packaging solutions with eco-friendly materials and premium design options.`
       }
       canonicalUrl={pathname}
       ogImage={
         filteredCategories[0]?.subProducts?.[0]?.image ||
         "/images/logo.svg"
       }
       schema={generateCategorySchema()}
     />
     <div className="container">
       <div className="row mb-4">
         <div className="col-12">
           <PageTitle>
             <BrandSpan>{category}</BrandSpan>
           </PageTitle>

           {categoryDescription && (
             <CategoryDescription>
               <p>{categoryDescription}</p>
             </CategoryDescription>
           )}
         </div>
       </div>

       {filteredCategories.map((category, categoryIndex) => (
         <div key={categoryIndex}>
           {category.subProducts && category.subProducts.length > 0 ? (
             <ProductGrid>
               {category.subProducts.map((product, productIndex) => (
                 <ProductCardWrapper
                   key={productIndex}
                   to={`/category/${categoryName}/product/${product.title}`}
                 >
                   <Card>
                     <CardImgContainer
                       bgColor={getBackgroundColor(productIndex)}
                     >
                       <LazyLoadImage
                         src={product.image}
                         alt={product.title}
                         effect="blur"
                         width="100%"
                         height="100%"
                         style={{ objectFit: "contain", padding: "20px" }}
                       />
                     </CardImgContainer>
                     <CardBody>
                       <CategoryTag>Beauty & Cosmetics</CategoryTag>
                       <CardTitle>{product.title}</CardTitle>
                       <Price>
                         {/* <RegularPrice>{}</RegularPrice>
                         <OriginalPrice>Â£0.23</OriginalPrice> */}
                       </Price>
                       <ViewDetailsLink>View More</ViewDetailsLink>
                       <BrandInfo>Brand & Company</BrandInfo>
                     </CardBody>
                   </Card>
                 </ProductCardWrapper>
               ))}
             </ProductGrid>
           ) : (
             <EmptyStateWrapper>
               <AlertInfo>
                 <p className="mb-0">
                   No products available in this category at the moment.
                 </p>
                 <p className="mt-2">
                   Please check back later or explore our other categories.
                 </p>
               </AlertInfo>
             </EmptyStateWrapper>
           )}
         </div>
       ))}
     </div>
   </Container>
 );
};

export default ProductCard;

