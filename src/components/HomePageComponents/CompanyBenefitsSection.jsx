'use client';
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faGlobeAmericas,
  faCreditCard,
  faBoxes,
  faStore,
  faPumpSoap,
  faPizzaSlice,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";

const SectionContainer = styled.div`
  padding: 4rem 0;
  background-color: #f5f5f5;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff3b30;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SectionDescription = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BenefitIcon = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    font-size: 3rem;
    color: #ff3b30;
  }
`;

const BenefitTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const BenefitText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ClientShowcase = styled.div`
  margin-top: 4rem;
`;

const ClientShowcaseTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const ClientsImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ClientImage = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  svg {
    font-size: 3.5rem;
    color: #333;
    margin-bottom: 1rem;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    margin: 0;
    text-align: center;
    transition: color 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);

    svg {
      color: #ff3b30;
      transform: scale(1.1);
    }

    h5 {
      color: #333;
    }
  }
`;

const CompanyBenefitsSection = () => {
  const benefits = [
    {
      icon: faHeadset,
      title: "Live 24/7 Support",
      text: "Our team is available anytime to answer your questions and provide assistance.",
    },
    {
      icon: faGlobeAmericas,
      title: "Worldwide Shipping",
      text: "We deliver our custom packaging boxes to clients all over the world.",
    },
    {
      icon: faCreditCard,
      title: "Flexible Payment",
      text: "Multiple payment options available for your convenience.",
    },
    {
      icon: faBoxes,
      title: "Low Minimum Orders",
      text: "Start with as few as 100 units for most of our custom packaging solutions.",
    },
  ];

  const clients = [
    {
      icon: faStore,
      name: "Retail Stores",
    },
    {
      icon: faPumpSoap,
      name: "Cosmetics Brands",
    },
    {
      icon: faPizzaSlice,
      name: "Food Industry",
    },
    {
      icon: faTshirt,
      name: "Apparel Brands",
    },
  ];

  return (
    <SectionContainer>
      <div className="container">
        <SectionHeader>
          <SectionTitle>
            REASONS WHY Pack It Perfect PACKAGING HAS
          </SectionTitle>
          <SectionSubtitle>1,000'S OF SATISFIED CLIENTS!</SectionSubtitle>
          <SectionDescription>
            Find out why OneStepCustomBoxes is the best option for companies.
            USPs like, We are the only packaging maker of choice, from budging
            businesses to well-known brands.
          </SectionDescription>
        </SectionHeader>

        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIcon>
                <FontAwesomeIcon icon={benefit.icon} />
              </BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitText>{benefit.text}</BenefitText>
            </BenefitCard>
          ))}
        </BenefitsGrid>

        <ClientShowcase>
          <ClientShowcaseTitle>
            Some of our client's success stories
          </ClientShowcaseTitle>
          <ClientsImagesGrid>
            {clients.map((client, index) => (
              <ClientImage key={index}>
                <FontAwesomeIcon icon={client.icon} />
                <h5>{client.name}</h5>
              </ClientImage>
            ))}
          </ClientsImagesGrid>
        </ClientShowcase>
      </div>
    </SectionContainer>
  );
};

export default CompanyBenefitsSection;

