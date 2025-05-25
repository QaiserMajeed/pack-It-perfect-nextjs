import React from "react";
import styled from "styled-components";
import { FaPhone } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCountryContent } from "../hooks/useCountryContent";
// Styled components with responsive design
const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  @media (max-width: 768px) {
    padding: 10px 0;
    justify-content: center;
  }
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

const PhoneIconCircle = styled.div`
  background-color: #f5f5f5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  @media (max-width: 992px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const StyledPhoneIcon = styled(FaPhone)`
  font-size: 18px;
  color: #333;

  @media (max-width: 992px) {
    font-size: 16px;
  }
`;

const PhoneText = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhoneTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000;

  @media (max-width: 992px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const PhoneSubtitle = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 2px;

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

// Component
const TelephoneContact = () => {
  const phoneNumber = "+44 07459 682266";
  const { t } = useTranslation();
  const { getPhoneNumber } = useCountryContent();
  return (
    <ContactSection
      style={{ "margin-left": "auto" }}
      className="align-self-end"
    >
      <PhoneContainer>
        <PhoneIconCircle>
          <StyledPhoneIcon />
        </PhoneIconCircle>
        <PhoneText>
          <PhoneTitle>{t("header.phone")}</PhoneTitle>
          <PhoneSubtitle>{t("header.phoneSubtext")}</PhoneSubtitle>
        </PhoneText>
      </PhoneContainer>
    </ContactSection>
  );
};

export default TelephoneContact;

