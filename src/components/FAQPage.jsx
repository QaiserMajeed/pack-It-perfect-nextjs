"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Metadata } from "next";

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
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

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuestionCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const QuestionHeader = styled.button`
  width: 100%;
  padding: 1.2rem;
  background-color: ${(props) => (props.active ? "#000" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#000" : "#f5f5f5")};
  }
`;

const QuestionIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.active ? "rotate(180deg)" : "rotate(0)")};
`;

const AnswerPanel = styled.div`
  padding: ${(props) => (props.active ? "1.2rem" : "0 1.2rem")};
  max-height: ${(props) => (props.active ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.active ? "1" : "0")};
  line-height: 1.6;
  color: #555;
`;

const SearchContainer = styled.div`
  margin-bottom: 3rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #000;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 2rem;
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

// FAQ data organized by categories
const faqData = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        id: "minimum-order",
        question: "What is the minimum order quantity?",
        answer:
          "Our minimum order quantity is 100 units for most products. This allows us to maintain efficiency in our production process while offering you high-quality custom packaging at competitive prices. For certain specialty items or complex designs, the minimum order quantity may be slightly higher. Contact our team for specific requirements related to your project.",
      },
      {
        id: "turnaround-time",
        question: "What is the typical turnaround time for orders?",
        answer:
          "Our standard turnaround time is 7-10 working days from the approval of your artwork proof. This includes production, quality control, and packaging. For rush orders, we offer expedited services that can reduce the turnaround time to 5-7 working days, subject to production capacity and complexity of your design. Please note that shipping time is additional and depends on your location.",
      },
      {
        id: "shipping-cost",
        question: "Do you offer free shipping?",
        answer:
          "Yes, we offer free shipping on all orders over Â£300 within the UK. For orders below Â£300, a standard shipping fee applies. International shipping is available at competitive rates calculated based on weight, dimensions, and destination country. Custom shipping arrangements can be made for bulk orders or recurring customers.",
      },
      {
        id: "international-shipping",
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship our custom packaging products internationally. Shipping costs and delivery times vary depending on your location. Please contact our customer service team for a shipping quote specific to your country. We handle all customs documentation to ensure smooth delivery, but please note that import duties and taxes may apply depending on your country's regulations.",
      },
      {
        id: "track-order",
        question: "How can I track my order?",
        answer:
          "Once your order has been dispatched, you will receive a confirmation email with tracking information. You can use this tracking number on our website or directly on the courier's website to monitor the progress of your delivery. Our system also provides automated updates at key stages of the shipping process.",
      },
    ],
  },
  {
    category: "Products & Customization",
    questions: [
      {
        id: "custom-sizes",
        question: "Can I order boxes in custom sizes?",
        answer:
          "Absolutely! We specialize in creating packaging solutions tailored to your exact specifications. You can order boxes in custom sizes to perfectly fit your products. Simply provide us with your required dimensions (length, width, height) during the quote process, and our team will design packaging that meets your specific needs. There are no additional charges for custom sizing.",
      },
      {
        id: "material-options",
        question: "What packaging materials do you offer?",
        answer:
          "We offer a wide range of materials to suit different product needs and brand aesthetics. Our options include standard cardboard (10pt to 28pt), corrugated board (E-flute, B-flute), kraft paper, rigid board, and eco-friendly alternatives. Each material has different properties in terms of durability, printability, and sustainability. Our packaging specialists can recommend the best material based on your product requirements and budget.",
      },
      {
        id: "printing-options",
        question: "What printing options are available?",
        answer:
          "We offer various printing options to enhance your packaging: CMYK full-color offset printing, PMS (Pantone Matching System) for precise color matching, digital printing for short runs, and specialty options like foil stamping (gold, silver, holographic), embossing/debossing, spot UV coating, and soft-touch lamination. All printing is done using high-quality inks that are safe and environmentally friendly.",
      },
      {
        id: "eco-friendly",
        question: "Do you offer eco-friendly packaging options?",
        answer:
          "Yes, we are committed to sustainability and offer several eco-friendly packaging options. These include recycled cardboard, biodegradable materials, kraft paper options, and packaging designed for recyclability. We use water-based inks and environmentally friendly coatings. Our production processes are designed to minimize waste and reduce environmental impact. We can help you create packaging that aligns with your sustainability goals.",
      },
      {
        id: "samples",
        question: "Can I get samples before placing a bulk order?",
        answer:
          "Yes, we offer sampling services to ensure you're completely satisfied with the quality and design before committing to a larger order. We provide two sampling options: generic material samples to evaluate quality and finish (available for a nominal fee), and custom pre-production samples of your specific design (charged at a higher rate). The cost of custom samples is typically credited toward your final order when you proceed with production.",
      },
    ],
  },
  {
    category: "Design & Artwork",
    questions: [
      {
        id: "design-assistance",
        question: "Do you provide design assistance?",
        answer:
          "Yes, we offer free design assistance with all our packaging orders. Our team of experienced designers can help bring your packaging vision to life, whether you need minor adjustments to your existing artwork or want to create something entirely new. We can provide suggestions on structure, materials, and finishing options to enhance your packaging design while ensuring it remains functional and cost-effective.",
      },
      {
        id: "file-requirements",
        question: "What are your artwork file requirements?",
        answer:
          "For optimal print quality, we recommend providing your artwork in vector format (AI, EPS, PDF) with text converted to outlines. Files should be in CMYK color mode with a minimum resolution of 300 DPI. Please include 3mm bleed on all sides and keep important elements at least 5mm away from trim edges. If you don't have print-ready files, our design team can help prepare your artwork to meet these specifications at no additional cost.",
      },
      {
        id: "proofing-process",
        question: "What is your proofing process?",
        answer:
          "After you submit your order and artwork, our design team creates a digital proof (2D or 3D) showing how your packaging will look when printed. You'll receive this proof via email for review and approval. You can request revisions until you're completely satisfied. For complex projects or specialty finishing, we recommend ordering a physical proof sample before proceeding with full production. Production begins only after you've approved the final proof.",
      },
      {
        id: "design-ownership",
        question: "Who owns the rights to the packaging design?",
        answer:
          "You retain all rights to your artwork and designs. If we create custom artwork for you, we transfer all rights to you upon completion of your order. We maintain strict confidentiality regarding all client designs and never reuse or share your custom packaging designs with other clients. However, with your permission, we may showcase your packaging in our portfolio or use it in marketing materials.",
      },
      {
        id: "design-templates",
        question: "Do you provide design templates?",
        answer:
          "Yes, we provide free dieline templates for all our standard packaging styles. These templates include precise dimensions, fold lines, and safe areas to ensure your artwork is correctly positioned. For custom sizes or styles, we create specialized templates based on your specifications. Our templates are available in various formats including AI, PDF, and EPS to accommodate different design software preferences.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        id: "quote-process",
        question: "How does your quote process work?",
        answer:
          "To receive a quote, simply fill out our online quote form with details about your packaging requirements, including dimensions, material preferences, quantity, and finishing options. Our team will review your request and provide a comprehensive quote within 24 hours (during business days). Each quote includes a detailed breakdown of costs and production timeline. Quotes are valid for 30 days, giving you ample time to make your decision.",
      },
      {
        id: "payment-options",
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods for your convenience, including credit/debit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and Wise transfers. For new customers, we typically require a 50% deposit to begin production, with the remaining balance due before shipping. Established customers may qualify for credit terms. All payments are processed through secure, encrypted systems to ensure your financial information remains protected.",
      },
      {
        id: "die-plate-charges",
        question: "Are there any die and plate charges?",
        answer:
          "No, we do not charge for dies and plates on standard orders. This is part of our commitment to transparent pricing and value. The quoted price includes all tooling costs needed for your packaging production. For extremely complex or oversized designs, there might be minimal tooling charges, but these will be clearly communicated in your quote before you commit to the order.",
      },
      {
        id: "volume-discounts",
        question: "Do you offer volume discounts?",
        answer:
          "Yes, we offer significant volume discounts for larger orders. Our pricing structure is designed to reward bulk purchases with lower per-unit costs. Discounts typically begin at 500 units and increase at various quantity thresholds. For recurring orders, we offer additional loyalty discounts and can arrange favorable pricing on standing orders. Please contact our sales team to discuss volume pricing specific to your needs.",
      },
      {
        id: "hidden-fees",
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in complete transparency in our pricing. The quote you receive includes all costs associated with your packaging production, including materials, printing, finishing, tooling, and quality control. We do not add unexpected charges later in the process. The only additional costs would be for changes requested after production has begun or for special shipping arrangements not included in the original quote.",
      },
    ],
  },
];

// Create FAQ schema for structured data
const createFAQSchema = (faqData) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap((category) =>
      category.questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      }))
    ),
  };
};

const FAQPage = () => {
  const [activeQuestions, setActiveQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle question accordion
  const toggleQuestion = (questionId) => {
    setActiveQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Filter questions based on search query
  const filteredFaqData =
    searchQuery.trim() === ""
      ? faqData
      : faqData
          .map((category) => ({
            ...category,
            questions: category.questions.filter(
              (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((category) => category.questions.length > 0);

  const hasResults = filteredFaqData.some(
    (category) => category.questions.length > 0
  );

  return (
    <FAQContainer>
      <SEO
        title="Frequently Asked Questions About Custom Packaging"
        description="Find answers to common questions about our custom packaging services, ordering process, design specifications, materials, shipping, and more."
        keywords="custom packaging FAQ, packaging questions, custom boxes help, packaging materials, shipping information"
        canonicalUrl="/faq"
        schema={createFAQSchema(faqData)}
      />
      {/* Added preload tags - requires specifying actual resources */}
      <link rel="preload" href="/path/to/critical.css" as="style" />
      <link rel="preload" href="/path/to/critical.js" as="script" />

      <PageTitle>Frequently Asked Questions</PageTitle>
      <PageDescription>
        Find answers to the most common questions about our custom packaging
        solutions. Can't find what you're looking for? Contact our team for
        personalized assistance.
      </PageDescription>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      {hasResults ? (
        filteredFaqData.map(
          (category, categoryIndex) =>
            category.questions.length > 0 && (
              <CategorySection key={categoryIndex}>
                <CategoryTitle>{category.category}</CategoryTitle>
                <QuestionList>
                  {category.questions.map((q, questionIndex) => (
                    <QuestionCard key={q.id}>
                      <QuestionHeader
                        active={activeQuestions[q.id]}
                        onClick={() => toggleQuestion(q.id)}
                      >
                        {q.question}
                        <QuestionIcon active={activeQuestions[q.id]}>
                          &#9660;
                        </QuestionIcon>
                      </QuestionHeader>
                      <AnswerPanel active={activeQuestions[q.id]}>
                        {q.answer}
                      </AnswerPanel>
                    </QuestionCard>
                  ))}
                </QuestionList>
              </CategorySection>
            )
        )
      ) : (
        <NoResults>
          <h3>No matching questions found</h3>
          <p>Try adjusting your search terms or browse the categories below.</p>
        </NoResults>
      )}

      <ContactSection>
        <ContactTitle>Still have questions?</ContactTitle>
        <p>
          Our packaging specialists are ready to help you find the perfect
          solution for your needs.
        </p>
        <ContactButton href="/get-a-quote">Contact Us</ContactButton>
      </ContactSection>
      <script type="application/ld+json">
        {JSON.stringify(createFAQSchema(faqData))}
      </script>
    </FAQContainer>
  );
};

export default FAQPage;
