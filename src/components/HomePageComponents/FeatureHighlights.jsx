'use client';
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// You need to import the specific icons you want to use
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSterlingSign,
  faTruck,
  faBox,
  faShippingFast,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useCountryContent } from "../../hooks/useCountryContent";
import { useLocalization } from "../../hooks/useLocalization";

// Add the icons to the library
library.add(faSterlingSign, faTruck, faBox, faShippingFast, faPencilRuler);

const FeaturesContainer = styled.div`
  padding: 2rem 0;
  background-color: #f8f8f8;
`;

const FeaturesDescription = styled.p`
  text-align: center;
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000; /* Blue color to match your logo */

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
`;

const FeatureHighlights = React.memo(function FeatureHighlights() {
  const { t } = useTranslation();
  const { getCountryName } = useCountryContent();

 const features = [
   {
     icon: faSterlingSign,
     title: t("features.noDieCharges"),
     description: "Save on setup costs",
   },
   {
     icon: faTruck,
     title: t("features.fastDelivery"),
     description: "Fast turnaround time",
   },
   {
     icon: faBox,
     title: t("features.lowMinimum"),
     description: "Low minimum order quantity",
   },
   {
     icon: faShippingFast,
     title: t("features.freeShipping"),
     description: "No hidden delivery costs",
   },
   {
     icon: faPencilRuler,
     title: t("features.freeDesign"),
     description: "Professional design support",
   },
 ];
  return (
    <FeaturesContainer>
      <div className="container">
        <FeaturesDescription>
          Pack It Perfect is the go-to option for projects because of its
          excellent customer service and reasonably priced, customizable
          packaging solutions.
        </FeaturesDescription>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconContainer>
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </IconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </FeaturesContainer>
  );
});

export default FeatureHighlights;
