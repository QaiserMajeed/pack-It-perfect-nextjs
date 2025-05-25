"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faChevronLeft,
  faChevronRight,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
// If you're getting an error with this import, make sure you've installed the package:
// npm install @fortawesome/free-regular-svg-icons
// Alternatively, you can use only solid icons for now:
import {
  faStar as faStarRegular,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faUserTie,
  faUserGraduate,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

const SectionContainer = styled.div`
  padding: 4rem 0;
  background-color: #fff;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionDescription = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialsContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const TestimonialsTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.translateValue}px);
  width: 100%;
`;

const TestimonialCard = styled.div`
  flex: 0 0 calc(100% / ${(props) => props.slidesPerView});
  min-width: 0;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 0 0 calc(100% / ${(props) => Math.min(2, props.slidesPerView)});
  }

  @media (max-width: 576px) {
    flex: 0 0 100%;
  }
`;

const TestimonialInner = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const QuoteIcon = styled.div`
  color: #ddd;
  font-size: 2rem;
  margin-bottom: 1rem;

  svg {
    transform: rotate(180deg);
  }
`;

const TestimonialText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const TestimonialRating = styled.div`
  margin-bottom: 1rem;
  display: flex;

  svg {
    color: #ffd700;
    margin-right: 0.2rem;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;

  svg {
    font-size: 1.6rem;
    color: #555;
  }
`;

const AuthorInfo = styled.div`
  flex-grow: 1;
`;

const AuthorName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem;
`;

const AuthorTitle = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#000" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.active ? "#000" : "#e0e0e0")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ViewAllLink = styled.div`
  text-align: center;
  margin-top: 2rem;

  a {
    color: #333;
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: #000;
      text-decoration: underline;
    }

    &::after {
      content: "â†’";
      margin-left: 0.5rem;
    }
  }
`;

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [translateValue, setTranslateValue] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "Customer service, designs, excellent product quality, and short turnaround time.",
      rating: 5,
      author: "Sarah P.",
      title: "CEO of Glow Cosmetics",
      avatar: faUser,
    },
    {
      id: 2,
      text: "Our order managers will get you the best looking designed products.",
      rating: 5,
      author: "James C.",
      title: "Manager at Fresh Foods",
      avatar: faUserTie,
    },
    {
      id: 3,
      text: "The product perfectly captured our brand's key packaging characteristics.",
      rating: 5,
      author: "Emily R.",
      title: "Owner of Pure Skincare",
      avatar: faUserGraduate,
    },
    {
      id: 4,
      text: "Outstanding service in custom packaging printed exactly to our specifications.",
      rating: 5,
      author: "Robert T.",
      title: "Head of Marketing at NutraLife",
      avatar: faUserDoctor,
    },
  ];

  // Note: If you're getting errors with Font Awesome packages, make sure these are installed:
  // npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons

  // Update slides per view based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update translate value when current slide or slides per view changes
  useEffect(() => {
    if (containerWidth > 0) {
      const slideWidth = containerWidth / slidesPerView;
      setTranslateValue(-currentSlide * slideWidth);
    }
  }, [currentSlide, slidesPerView, containerWidth]);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < testimonials.length - slidesPerView) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? faStarSolid : faStarRegular}
        />
      );
    }
    return stars;
  };

  return (
    <SectionContainer>
      <div className="container">
        <SectionHeader>
          <SectionTitle>See what our customers say</SectionTitle>
          <SectionDescription>
            Our service support at any point of your packaging journey to
            guarantee best packaging success.
          </SectionDescription>
        </SectionHeader>

        <TestimonialsContainer ref={containerRef}>
          <TestimonialsWrapper>
            <TestimonialsTrack translateValue={translateValue}>
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  slidesPerView={slidesPerView}
                >
                  <TestimonialInner>
                    <QuoteIcon>
                      <FontAwesomeIcon icon={faQuoteRight} />
                    </QuoteIcon>
                    <TestimonialText>"{testimonial.text}"</TestimonialText>
                    <TestimonialRating>
                      {renderStars(testimonial.rating)}
                    </TestimonialRating>
                    <TestimonialAuthor>
                      <AuthorAvatar>
                        <FontAwesomeIcon icon={testimonial.avatar} />
                      </AuthorAvatar>
                      <AuthorInfo>
                        <AuthorName>{testimonial.author}</AuthorName>
                        <AuthorTitle>{testimonial.title}</AuthorTitle>
                      </AuthorInfo>
                    </TestimonialAuthor>
                  </TestimonialInner>
                </TestimonialCard>
              ))}
            </TestimonialsTrack>
          </TestimonialsWrapper>

          <NavigationButtons>
            <NavButton onClick={handlePrev} disabled={currentSlide === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </NavButton>
            <NavButton
              onClick={handleNext}
              disabled={currentSlide >= testimonials.length - slidesPerView}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </NavButton>
          </NavigationButtons>
        </TestimonialsContainer>
      </div>
    </SectionContainer>
  );
};

export default TestimonialsSection;
