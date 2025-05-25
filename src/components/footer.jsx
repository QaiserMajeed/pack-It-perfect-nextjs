'use client';
// src/components/footer.jsx - Updated with i18n support
import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCountryContent } from "../hooks/useCountryContent";
import { useCurrency } from "../hooks/useCurrency";
import TelephoneContact from "./Telephone";
import LocaleSelector from "./LocaleSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Products from "./Products";

// Styled Components - Keep existing styles
const FooterContainer = styled.footer`
  background-color: #000000;
  color: white;
  padding: 60px 0 20px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 95%;
`;

const TopFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  min-width: 150px;
`;

const NewsletterColumn = styled(FooterColumn)`
  grid-column: 1;
  grid-row: 1;

  @media (max-width: 992px) {
    grid-column: span 2;
  }

  @media (max-width: 576px) {
    grid-column: 1;
  }
`;

const FooterHeading = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const FooterList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
  }

  a {
    color: #f0f0f0;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
    display: block;
    padding: 2px 0;

    &:hover {
      color: #ffffff;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 15px;

  a {
    display: block;
  }

  img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
  }
`;

const FooterText = styled.p`
  color: #f0f0f0;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 15px;
  max-width: 400px;
`;

const EmailInput = styled.input`
  flex-grow: 1;
  padding: 12px 16px;
  border: none;
  background-color: #f0f0f0;
  font-size: 14px;
  border-radius: 0;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const SubscribeButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 0 20px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;
  margin: 20px 0;
`;

const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  color: #999;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  img {
    height: 30px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #999;
    font-size: 12px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ContactInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #f0f0f0;

  p {
    margin: 5px 0;
  }

  a {
    color: #f0f0f0;
    text-decoration: none;
    transition: color 0.2s;
    display: block;
    margin-bottom: 5px;

    &:hover {
      color: white;
    }
  }
`;

const FormMessage = styled.div`
  margin-top: 10px;
  padding: 8px;
  font-size: 12px;
  border-radius: 0;

  &.success {
    background-color: #4caf50;
    color: white;
  }

  &.error {
    background-color: #f44336;
    color: white;
  }
`;

const LocaleSelectorWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  @media (min-width: 992px) {
    display: none; // Hide on desktop as it's in header
  }
`;



const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const {
    getCountryName,
    getPhoneNumber,
    getCompanyAddress,
  } = useCountryContent();
  const { formatPrice, getCurrencySymbol } = useCurrency();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ success: false, error: false, message: "" });

    try {
      const response = await fetch("https://formspree.io/f/xdkewqqb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          formType: "newsletter",
          country: getCountryName(),
          locale: t("common.country"),
        }),
      });

      if (response.ok) {
        setFormStatus({
          success: true,
          error: false,
          message: t(
            "footer.subscribeSuccess",
            "Thank you for subscribing to our newsletter!"
          ),
        });
        setEmail("");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      setFormStatus({
        success: false,
        error: true,
        message: t(
          "footer.subscribeError",
          "There was an error submitting the form. Please try again."
        ),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <TopFooter>
          <NewsletterColumn>
            <LogoContainer>
              <Link to="/">
                <Image src="/images/logo.svg" alt="Pack it Perfect Logo" />
              </Link>
            </LogoContainer>
            <FooterText>{t("footer.description")}</FooterText>
            <NewsletterForm onSubmit={handleSubscribe}>
              <EmailInput
                type="email"
                placeholder={t("footer.newsletter")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <SubscribeButton type="submit" disabled={submitting}>
                {submitting ? "..." : "|"}
              </SubscribeButton>
            </NewsletterForm>
            {formStatus.success && (
              <FormMessage className="success">
                {formStatus.message}
              </FormMessage>
            )}
            {formStatus.error && (
              <FormMessage className="error">{formStatus.message}</FormMessage>
            )}

            <ContactInfo>
              <a href="mailto:sales@packageitperfect.com">
                sales@packageitperfect.com
              </a>
              <a href={`tel:${getPhoneNumber()}`}>{getPhoneNumber()}</a>
              <address>{getCompanyAddress()}</address>
            </ContactInfo>
            

            <FooterHeading style={{ marginTop: "20px" }}>
              {t("footer.stayConnected", "Stay Connected")}
            </FooterHeading>
            <SocialIcons>
              <a
                href="https://www.facebook.com/profile.php?id=61574096784137"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Pack it Perfect on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com/pack.itperfect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Pack it Perfect on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/company/package-it-perfect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Pack it Perfect on LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://twitter.com/packageitperfect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Pack it Perfect on Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </SocialIcons>

            {/* Mobile Locale Selector */}
            <LocaleSelectorWrapper>
              <LocaleSelector />
            </LocaleSelectorWrapper>
          </NewsletterColumn>

          <FooterColumn>
            <FooterHeading>
              {t("footer.categories", "Categories")}
            </FooterHeading>
            <FooterList>
              <li>
                <Link to="/category/packaging-by-style">
                  {t("footer.byStyle", "By Style")}
                </Link>
              </li>
              <li>
                <Link to="/category/packaging-by-style">
                  {t("footer.byMaterial", "By Material")}
                </Link>
              </li>
            </FooterList>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>
              {t("footer.popularProducts", "Popular Products")}
            </FooterHeading>
            <FooterList>
              <li>
                <Link to="/category/Gifts-and-Souvenirs-Boxes">
                  {t("footer.giftBoxes", "Gift Boxes")}
                </Link>
              </li>
              <li>
                <Link to="/category/jewelry-packaging">
                  {t("footer.jewelryPackaging", "Jewelry Packaging")}
                </Link>
              </li>
              <li>
                <Link to="/category/Clothing-and-Apparel-Boxes">
                  {t("footer.clothingBoxes", "Clothing Boxes")}
                </Link>
              </li>
              <li>
                <Link to="/category/Fast-Food-Packaging">
                  {t("footer.foodPackaging", "Food Packaging")}
                </Link>
              </li>
              <li>
                <Link to="/category/Medical-Devices-Boxes">
                  {t("footer.medicalPackaging", "Medical Packaging")}
                </Link>
              </li>
              <li>
                <Link to="/category/Custom-Made-Boxes">
                  {t("footer.customBoxes", "Custom Made Boxes")}
                </Link>
              </li>
              <li>
                <Link to="/category/Beauty-and-Cosmetics-Packaging">
                  {t("footer.cosmeticsPackaging", "Cosmetics Packaging")}
                </Link>
              </li>
              <li>
                <Link to="/category/Beverage-Custom-Boxes">
                  {t("footer.beveragePackaging", "Beverage Packaging")}
                </Link>
              </li>
            </FooterList>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>
              {t("footer.customerSupport", "Customer Support")}
            </FooterHeading>
            <FooterList>
              <li>
                <Link to="/faq">
                  {t("footer.faq", "Frequently Asked Questions")}
                </Link>
              </li>
              <li>
                <Link to="/get-a-quote">
                  {t("footer.requestQuote", "Request a Quote")}
                </Link>
              </li>
              <li>
                <Link to="/contact">{t("footer.contactUs", "Contact Us")}</Link>
              </li>
              <li>
                <Link to="/blog">{t("footer.blog", "Packaging Blog")}</Link>
              </li>
            </FooterList>
            <FooterHeading style={{ marginTop: "20px" }}>
              {t("footer.successStories", "Success Stories")}
            </FooterHeading>
            <FooterList>
              <li>
                <Link to="/case-study/harrods">Harrods</Link>
              </li>
              <li>
                <Link to="/case-study/royal-ascot">Royal Ascot</Link>
              </li>
            </FooterList>
          </FooterColumn>
        </TopFooter>

        <Divider />

        <BottomFooter>
          <Copyright>{t("footer.copyright")}</Copyright>
          <PaymentIcons>
            <Image src="/images/paymentimages/bacs.webp"
              alt="BACS Payment Accepted"
            />
            <Image src="/images/paymentimages/paypal.png" alt="PayPal Accepted" />
            <Image src="/images/paymentimages/strip.png"
              alt="Stripe Payments Accepted"
            />
            <Image src="/images/paymentimages/wise1.png"
              alt="Wise Transfers Accepted"
            />
          </PaymentIcons>
        </BottomFooter>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

