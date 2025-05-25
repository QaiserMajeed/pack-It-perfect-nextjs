'use client';
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const StickyCTAContainer = styled.div`
  position: fixed;
  bottom: ${(props) => (props.visible ? "0" : "-80px")};
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  z-index: 1000;
  transition: bottom 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CTAContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CTAText = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const CTATitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const CTADescription = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
    color: white;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  border: 1px solid #000;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

/**
 * Sticky CTA component that appears after scrolling
 *
 * @param {Object} props Component props
 * @param {number} props.scrollThreshold Scroll position when CTA should appear (default: 300px)
 * @param {boolean} props.allowClose Whether user can dismiss the CTA (default: true)
 * @param {string} props.primaryButtonText Text for main action button
 * @param {string} props.primaryButtonLink URL for main action button
 * @param {string} props.secondaryButtonText Text for secondary action button
 * @param {string} props.secondaryButtonLink URL for secondary action button
 * @param {string} props.title Main CTA heading text
 * @param {string} props.description CTA description text
 */
const StickyCTA = ({
  scrollThreshold = 300,
  allowClose = true,
  primaryButtonText = "Get a Quote",
  primaryButtonLink = "/get-a-quote",
  secondaryButtonText = "Contact Us",
  secondaryButtonLink = "/contact",
  title = "Ready to order custom packaging?",
  description = "Free design assistance & no die charges. Starting from just 100 units.",
}) => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  // Check if the user has previously closed the CTA
  useEffect(() => {
    const ctaClosed = localStorage.getItem("stickyCTAClosed");
    if (ctaClosed) {
      setClosed(true);
    }
  }, []);

  // Handle scroll events to show/hide the CTA
  useEffect(() => {
    const handleScroll = () => {
      if (!closed && window.scrollY > scrollThreshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, closed]);

  const handleClose = () => {
    setClosed(true);
    localStorage.setItem("stickyCTAClosed", "true");

    // Reset the closed state after 24 hours
    setTimeout(() => {
      localStorage.removeItem("stickyCTAClosed");
    }, 86400000); // 24 hours in milliseconds
  };

  if (closed) return null;

  return (
    <StickyCTAContainer visible={visible}>
      {allowClose && (
        <CloseButton onClick={handleClose} aria-label="Close">
          &times;
        </CloseButton>
      )}
      <CTAContent>
        <CTAText>
          <CTATitle>{title}</CTATitle>
          <CTADescription>{description}</CTADescription>
        </CTAText>
        <CTAButtonGroup>
          <PrimaryButton to={primaryButtonLink}>
            {primaryButtonText}
          </PrimaryButton>
          <SecondaryButton to={secondaryButtonLink}>
            {secondaryButtonText}
          </SecondaryButton>
        </CTAButtonGroup>
      </CTAContent>
    </StickyCTAContainer>
  );
};

export default StickyCTA;

