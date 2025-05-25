import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faGlobeAmericas,
  faCreditCard,
  faBoxes,
  faPrint,
  faBan,
  faRuler,
  faCode,
  faBox,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "./../components/ScrollToTop";

// Styled Components
const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FormTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
  font-weight: 600;
  color: #333;
`;

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f8f8f8;

  &:focus {
    outline: none;
    border-color: #ccc;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f8f8f8;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ccc;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f8f8f8;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 10px auto;

  &:focus {
    outline: none;
    border-color: #ccc;
  }
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #a03a39;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FeatureCard = styled.div`
  background-color: #333;
  color: white;
  padding: 25px;
  border-radius: 8px;
  height: 100%;
`;

const FeatureIcon = styled.div`
  font-size: 24px;
  color: #000;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const FeatureText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #ccc;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormStatusContainer = styled.div`
  margin-bottom: 20px;
`;

const CtaSection = styled.div`
  background-color: #f5f5f5;
  padding: 60px 20px;
  text-align: center;
  margin-top: 60px;
`;

const CtaTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CtaSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CtaButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #444;
  }

  svg {
    margin-left: 10px;
  }
`;

const QuoteRequestForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    size: "",
    materialType: "",
    materialThickness: "",
    coating: "None",
    foiling: "None",
    color: "",
    quantity: "",
    printingSides: "Single Side",
    additionalMessage: "",
  });

  // State for form submission status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      // Replace this URL with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xdkewqqb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        <ScrollToTop/> // Scroll to top after successful submission
        // Show success message
        setFormStatus({
          submitting: false,
          success: true,
          error: false,
          message:
            "Thank you! Your quote request has been submitted successfully. We'll get back to you soon.",
        });
        // Reset form on successful submission
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          size: "",
          materialType: "",
          materialThickness: "",
          coating: "None",
          foiling: "None",
          color: "",
          quantity: "",
          printingSides: "Single Side",
          additionalMessage: "",
        });
      } else {
        setFormStatus({
          submitting: false,
          success: false,
          error: true,
          message: "Oops! Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "Oops! Something went wrong. Please try again later.",
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <FormContainer>
        <FormTitle>Get a Free Quote</FormTitle>

        <FormLayout>
          <FormSection>
            {formStatus.success || formStatus.error ? (
              <FormStatusContainer>
                {formStatus.success && (
                  <SuccessMessage>{formStatus.message}</SuccessMessage>
                )}
                {formStatus.error && (
                  <ErrorMessage>{formStatus.message}</ErrorMessage>
                )}
              </FormStatusContainer>
            ) : null}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="size">Size</Label>
                <Select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  
                >
                  <option value="">I need suggestion</option>
                  <option value="small">Small (under 15cm)</option>
                  <option value="medium">Medium (15-30cm)</option>
                  <option value="large">Large (over 30cm)</option>
                  <option value="custom">Custom Size</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="materialType">Material Type</Label>
                <Select
                  id="materialType"
                  name="materialType"
                  value={formData.materialType}
                  onChange={handleChange}
                  
                >
                  <option value="">Not Sure! I need advice</option>
                  <option value="cardboard">Cardboard</option>
                  <option value="corrugated">Corrugated</option>
                  <option value="kraft">Kraft</option>
                  <option value="rigid">Rigid</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="materialThickness">Material Thickness</Label>
                <Select
                  id="materialThickness"
                  name="materialThickness"
                  value={formData.materialThickness}
                  onChange={handleChange}
                  
                >
                  <option value="">Not Sure! I need advice</option>
                  <option value="300gsm">300 GSM</option>
                  <option value="350gsm">350 GSM</option>
                  <option value="400gsm">400 GSM</option>
                  <option value="450gsm">450 GSM</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="coating">Coating</Label>
                <Select
                  id="coating"
                  name="coating"
                  value={formData.coating}
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="Matte">Matte</option>
                  <option value="Gloss">Gloss</option>
                  <option value="Soft Touch">Soft Touch</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="foiling">Foiling</Label>
                <Select
                  id="foiling"
                  name="foiling"
                  value={formData.foiling}
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Rose Gold">Rose Gold</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="color">Color</Label>
                <Input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Pantone or CMYK values"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="printingSides">Printing Sides</Label>
                <Select
                  id="printingSides"
                  name="printingSides"
                  value={formData.printingSides}
                  onChange={handleChange}
                >
                  <option value="Single Side">Single Side</option>
                  <option value="Double Side">Double Side</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="additionalMessage">
                  Additional Message (Optional)
                </Label>
                <TextArea
                  id="additionalMessage"
                  name="additionalMessage"
                  value={formData.additionalMessage}
                  onChange={handleChange}
                  placeholder="Tell us more about your project..."
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={formStatus.submitting}>
                {formStatus.submitting ? "Submitting..." : "Submit"}
              </SubmitButton>
            </form>
          </FormSection>

          <FormSection>
            <FeaturesGrid>
              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faBan} />
                </FeatureIcon>
                <FeatureTitle>NO Die & plate charges</FeatureTitle>
                <FeatureText>Get free setup costs on every order!</FeatureText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faPrint} />
                </FeatureIcon>
                <FeatureTitle>High quality offset printing</FeatureTitle>
                <FeatureText>
                  High-quality, modern printing customized to fit your brand.
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faRuler} />
                </FeatureIcon>
                <FeatureTitle>Custom size & style</FeatureTitle>
                <FeatureText>
                  Customized precisely to meet your unique specifications,
                  ensuring a flawless fit every time.
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faCode} />
                </FeatureIcon>
                <FeatureTitle>Free Design Assistance</FeatureTitle>
                <FeatureText>
                  Complimentary design assistance to bring your vision to life!
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faBox} />
                </FeatureIcon>
                <FeatureTitle>Low minimum order quantity</FeatureTitle>
                <FeatureText>
                  Customizable order quantities from 100 up to 500,000 boxes to
                  fit your needs.
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faTruck} />
                </FeatureIcon>
                <FeatureTitle>Fast & Free Delivery</FeatureTitle>
                <FeatureText>
                  Receive your custom boxes within 5-10 days across the UK on
                  orders over Â£300.
                </FeatureText>
              </FeatureCard>
            </FeaturesGrid>
          </FormSection>
        </FormLayout>
      </FormContainer>

      <CtaSection>
        <CtaTitle>Bring your ideas to life in minutes!</CtaTitle>
        <CtaSubtitle>
          Delivering groundbreaking excellence in packaging
        </CtaSubtitle>
        <CtaButton>
          Get Started Today
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
              fill="white"
            />
          </svg>
        </CtaButton>
      </CtaSection>
    </>
  );
};

export default QuoteRequestForm;

