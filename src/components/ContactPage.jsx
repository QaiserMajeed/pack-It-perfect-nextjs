'use client';
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next"

const ContactContainer = styled.div`
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

const PageDescription = styled.p`
  text-align: center;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactCard = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const InfoText = styled.span`
  color: #555;
  line-height: 1.5;
`;

const MapCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  iframe {
    width: 100%;
    height: 250px;
    border: 0;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });

    try {
      // Formspree endpoint - replace this with your form ID
      const response = await fetch("https://formspree.io/f/xdkewqqb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form submission successful
        setStatus({
          submitting: false,
          success: true,
          error: false,
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        // Form submission failed
        setStatus({
          submitting: false,
          success: false,
          error: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        submitting: false,
        success: false,
        error: true,
      });
    }
  };

  return (
    <ContactContainer>
      <SEO
        title="Contact Our Custom Packaging Specialists"
        description="Get in touch with Pack it Perfect for all your custom packaging needs. Our team is ready to help with quotes, design assistance, and expert advice."
        keywords="contact us, custom packaging help, packaging quote, design assistance, packaging specialists"
        canonicalUrl="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pack it Perfect",
          description:
            "Contact our custom packaging specialists for quotes, design assistance, and expert advice",
          url: "https://packageitperfect.com/contact",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+44 07459 682266",
            contactType: "customer service",
            areaServed: "UK",
            availableLanguage: "English",
          },
        }}
      />

      <PageTitle>Contact Us</PageTitle>
      <PageDescription>
        Have questions about our custom packaging solutions? Our team of
        packaging specialists is ready to help with your inquiries, quotes, and
        design needs.
      </PageDescription>

      <ContactGrid>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send Us a Message</FormTitle>

          {status.success && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you as soon as
              possible.
            </SuccessMessage>
          )}

          {status.error && (
            <ErrorMessage>
              There was an error sending your message. Please try again or
              contact us directly.
            </ErrorMessage>
          )}

          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormGroup style={{ marginBottom: "1.5rem" }}>
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={status.submitting}>
            {status.submitting ? (
              "Sending..."
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Message
              </>
            )}
          </SubmitButton>
        </ContactForm>

        <ContactInfo>
          <ContactCard>
            <InfoTitle>Contact Information</InfoTitle>
            <InfoList>
              <InfoItem>
                <IconContainer>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </IconContainer>
                <InfoContent>
                  <InfoLabel>Our Location</InfoLabel>
                  <InfoText>
                    128 City Road, London, United Kingdom, EC1V 2NX
                  </InfoText>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconContainer>
                  <FontAwesomeIcon icon={faPhone} />
                </IconContainer>
                <InfoContent>
                  <InfoLabel>Phone Number</InfoLabel>
                  <InfoText>
                    <a
                      href="tel:+44 07459 682266"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      +44 07459 682266
                    </a>
                  </InfoText>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconContainer>
                  <FontAwesomeIcon icon={faEnvelope} />
                </IconContainer>
                <InfoContent>
                  <InfoLabel>Email Address</InfoLabel>
                  <InfoText>
                    <a
                      href="mailto:sales@packageitperfect.com"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      sales@packageitperfect.com
                    </a>
                  </InfoText>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconContainer>
                  <FontAwesomeIcon icon={faClock} />
                </IconContainer>
                <InfoContent>
                  <InfoLabel>Working Hours</InfoLabel>
                  <InfoText>Monday to Friday: 9:00 AM - 6:00 PM</InfoText>
                  <InfoText>Saturday: 10:00 AM - 2:00 PM</InfoText>
                </InfoContent>
              </InfoItem>
            </InfoList>
          </ContactCard>

          <MapCard>
            <iframe
              title="Pack it Perfect Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4952456024253!2d-0.08994492266964182!3d51.52465297181897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca650dc3ba1%3A0xfc7adba6ae7c91ce!2s128%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2s!4v1662234567890!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapCard>
        </ContactInfo>
      </ContactGrid>
    </ContactContainer>
  );
};

export default ContactPage;

