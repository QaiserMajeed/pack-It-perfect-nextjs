import React from "react";
import styled from "styled-components";
import { Metadata } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCalendarAlt,
  faCheckCircle,
  faPercentage,
  faShieldAlt,
  faQuestionCircle,
  faMoneyBillWave,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

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

const BannerSection = styled.div`
  background-color: #f0e6d2;
  border-radius: 8px;
  padding: 3rem 2rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const BannerDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const BannerButton = styled.a`
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

const PlansGrid = styled.div`
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

const PlanCard = styled.div`
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

const PlanHeader = styled.div`
  background-color: ${(props) => (props.featured ? "#000" : "#f8f8f8")};
  color: ${(props) => (props.featured ? "white" : "#333")};
  padding: 1.5rem;
  text-align: center;
  position: relative;
`;

const FeaturedLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff6b6b;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  transform: translateY(-50%);
  border-radius: 0 0 0 8px;
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  span {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const PlanDuration = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PlanFeatures = styled.div`
  padding: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;

  svg {
    color: #4caf50;
    margin-right: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`;

const PlanButton = styled.a`
  display: block;
  width: 100%;
  background-color: ${(props) => (props.featured ? "#000" : "transparent")};
  color: ${(props) => (props.featured ? "white" : "#000")};
  border: 1px solid ${(props) => (props.featured ? "transparent" : "#000")};
  text-align: center;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.featured ? "#333" : "#f0f0f0")};
    color: ${(props) => (props.featured ? "white" : "#000")};
  }
`;

const ProcessSection = styled.div`
  margin-bottom: 4rem;
`;

const StepsContainer = styled.div`
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

const StepCard = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  position: relative;

  &:not(:last-child)::after {
    content: "â†’";
    position: absolute;
    right: -1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #ccc;

    @media (max-width: 992px) {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
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

const CTASection = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: ${(props) => (props.primary ? "#000" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#000")};
  border: 1px solid ${(props) => (props.primary ? "transparent" : "#000")};
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#333" : "#f0f0f0")};
    color: ${(props) => (props.primary ? "white" : "#000")};
  }
`;

const PaymentPlansPage = () => {
  // SEO configuration
  const seoConfig = {
    title: "Flexible Payment Plans | Pay in Installments",
    description:
      "Discover our flexible payment plans that allow you to pay for your custom packaging in installments. Easy monthly payments with no hidden fees.",
    keywords:
      "payment plans, installment payments, flexible payments, custom packaging installments, pay monthly",
    canonicalUrl: "/payment-plans",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Flexible Payment Plans",
      description:
        "Pay for your custom packaging orders in easy monthly installments with our flexible payment plans.",
      url: "https://packageitperfect.com/payment-plans",
    },
  };

  return (
    <PageContainer>
      <SEO {...seoConfig} />

      <PageTitle>Flexible Payment Plans</PageTitle>
      <PageSubtitle>
        Make your custom packaging affordable with easy monthly installments
      </PageSubtitle>

      <BannerSection>
        <BannerTitle>Pay Over Time, Not All at Once</BannerTitle>
        <BannerDescription>
          At Pack it Perfect, we understand that cash flow is important for your
          business. That's why we offer flexible payment plans that let you
          spread the cost of your custom packaging over time, helping you manage
          your budget more effectively.
        </BannerDescription>
        <BannerButton href="/get-a-quote">Get Started Today</BannerButton>
      </BannerSection>

      <SectionTitle>Choose Your Payment Plan</SectionTitle>
      <PlansGrid>
        <PlanCard>
          <PlanHeader>
            <PlanTitle>Monthly Plan</PlanTitle>
            <PlanPrice>
              3<span> monthly payments</span>
            </PlanPrice>
            <PlanDuration>Spread over 3 months</PlanDuration>
          </PlanHeader>
          <PlanFeatures>
            <FeaturesList>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Split your payment into 3 equal installments</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>First payment due at order confirmation</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>No interest or additional fees</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Available for orders over Â£300</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Easy automated payments</span>
              </FeatureItem>
            </FeaturesList>
            <PlanButton href="/get-a-quote">Get Started</PlanButton>
          </PlanFeatures>
        </PlanCard>

        <PlanCard>
          <PlanHeader featured={true}>
            <FeaturedLabel>Most Popular</FeaturedLabel>
            <PlanTitle>Flexible Plan</PlanTitle>
            <PlanPrice>
              6<span> monthly payments</span>
            </PlanPrice>
            <PlanDuration>Spread over 6 months</PlanDuration>
          </PlanHeader>
          <PlanFeatures>
            <FeaturesList>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Split your payment into 6 equal installments</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>First payment due at order confirmation</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Small service fee (2.5% of total order)</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Available for orders over Â£500</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Flexible payment dates to match your cash flow</span>
              </FeatureItem>
            </FeaturesList>
            <PlanButton featured={true} href="/get-a-quote">
              Get Started
            </PlanButton>
          </PlanFeatures>
        </PlanCard>

        <PlanCard>
          <PlanHeader>
            <PlanTitle>Business Plan</PlanTitle>
            <PlanPrice>
              12<span> monthly payments</span>
            </PlanPrice>
            <PlanDuration>Spread over 12 months</PlanDuration>
          </PlanHeader>
          <PlanFeatures>
            <FeaturesList>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Split your payment into 12 equal installments</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>First payment due at order confirmation</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Service fee (5% of total order)</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Available for orders over Â£1,000</span>
              </FeatureItem>
              <FeatureItem>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Perfect for larger business investments</span>
              </FeatureItem>
            </FeaturesList>
            <PlanButton href="/get-a-quote">Get Started</PlanButton>
          </PlanFeatures>
        </PlanCard>
      </PlansGrid>

      <ProcessSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <StepCard>
            <StepNumber>1</StepNumber>
            <StepTitle>Request a Quote</StepTitle>
            <StepDescription>
              Fill out our quote form with your packaging requirements and
              mention you're interested in a payment plan.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepNumber>2</StepNumber>
            <StepTitle>Select a Plan</StepTitle>
            <StepDescription>
              Choose the payment plan that works best for your budget and
              business needs.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepNumber>3</StepNumber>
            <StepTitle>Set Up Payments</StepTitle>
            <StepDescription>
              Provide payment details for automatic installments according to
              your selected plan.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepNumber>4</StepNumber>
            <StepTitle>Receive Your Order</StepTitle>
            <StepDescription>
              Your packaging order is processed and delivered while you continue
              making easy monthly payments.
            </StepDescription>
          </StepCard>
        </StepsContainer>
      </ProcessSection>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          <FAQItem>
            <FAQQuestion>
              Is there an application or credit check required?
            </FAQQuestion>
            <FAQAnswer>
              No credit check is required for our 3-month payment plan. For 6
              and 12-month plans, a soft credit check may be performed, but this
              will not affect your credit score.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>
              What payment methods can I use for installments?
            </FAQQuestion>
            <FAQAnswer>
              We accept all major credit and debit cards for installment
              payments. Direct bank transfers can also be arranged for business
              customers.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Can I pay off my plan early?</FAQQuestion>
            <FAQAnswer>
              Yes, you can pay off the remaining balance at any time with no
              early payment penalties.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>What happens if I miss a payment?</FAQQuestion>
            <FAQAnswer>
              If you anticipate difficulty making a payment, please contact us
              in advance. Late payments may incur a small fee, and consistently
              missed payments could affect your eligibility for future payment
              plans.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Are there any hidden fees?</FAQQuestion>
            <FAQAnswer>
              No, all fees are transparently communicated upfront. Our 3-month
              plan has no additional fees, while our 6 and 12-month plans
              include a small service fee as specified in the plan details.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Can I use a payment plan for rush orders?</FAQQuestion>
            <FAQAnswer>
              Yes, payment plans are available for rush orders as well. The
              first installment must be processed before production begins.
            </FAQAnswer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>

      <CTASection>
        <CTATitle>Ready to Get Started?</CTATitle>
        <CTADescription>
          Make your custom packaging more affordable with our flexible payment
          plans. Request a quote today and specify that you're interested in
          installment payments.
        </CTADescription>
        <CTAButtonGroup>
          <CTAButton primary={true} href="/get-a-quote">
            Request a Quote
          </CTAButton>
          <CTAButton href="/contact">Contact Sales</CTAButton>
        </CTAButtonGroup>
      </CTASection>
    </PageContainer>
  );
};

export default PaymentPlansPage;

