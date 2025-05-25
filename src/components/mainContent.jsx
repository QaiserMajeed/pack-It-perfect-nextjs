import React from "react";
import styled from "styled-components";

// Styled Components
const MainContentWrapper = styled.div`
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.div`
  padding: 4rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BrandSpan = styled.span`
  color: #000;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const QuoteButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #000;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 90, 0.9);
    color: white;
    text-decoration: none;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlidesTrack = styled.div`
  display: flex;
  width: 400%;
  animation: slideShow 10s linear infinite;

  @keyframes slideShow {
    0%,
    23% {
      transform: translateX(0);
    }
    25%,
    48% {
      transform: translateX(-25%);
    }
    50%,
    73% {
      transform: translateX(-50%);
    }
    75%,
    98% {
      transform: translateX(-75%);
    }
    100% {
      transform: translateX(-75%);
    }
  }
`;

const Slide = styled.div`
  width: 25%;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const RatingSection = styled.div`
  text-align: center;
  margin: 3rem 0;
`;

const RatingHeading = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #ffd700;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #333;
  font-weight: 500;
`;

const ProductsSlider = styled.div`
  margin: 4rem 0;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 300%;
  animation: slideShows 15s linear infinite;

  @keyframes slideShows {
    0%,
    17% {
      transform: translateX(0);
    }
    19%,
    36% {
      transform: translateX(-17%);
    }
    38%,
    55% {
      transform: translateX(-34%);
    }
    57%,
    74% {
      transform: translateX(-51%);
    }
    76%,
    93% {
      transform: translateX(-68%);
    }
    95%,
    100% {
      transform: translateX(-68%);
    }
  }
`;

const ProductSlide = styled.div`
  width: 17%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ProductCard = styled.div`
  position: relative;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }
`;

const ProductButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    background-color: rgba(0, 0, 90, 0.9);
  }
`;

const MainContent = () => {
  return (
    <MainContentWrapper>
      {/* Hero Section */}
      <HeroSection className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <HeroTitle>
              Your One-Stop Destination For Custom <BrandSpan>Boxes</BrandSpan>{" "}
              and <BrandSpan>Packaging</BrandSpan> Needs.
            </HeroTitle>
            <HeroDescription>
              In The Dynamic UK Beauty Market, We Stand Out With Our Extensive
              Collection Of Bespoke Cosmetics And Packaging.
            </HeroDescription>
            <QuoteButton href="#" className="btn-lg">
              Get Instant Quote
            </QuoteButton>
          </div>
          <div className="col-md-6">
            <SliderContainer id="slider">
              <SlidesTrack className="slides">
                <Slide id="slide1" className="slide">
                  <Image src="/images/slide1.webp"
                    alt="Custom Boxes"
                    className="img-fluid"
                  />
                </Slide>
                <Slide id="slide2" className="slide">
                  <Image src="/images/slide2.webp"
                    alt="Custom Boxes"
                    className="img-fluid"
                  />
                </Slide>
                <Slide id="slide3" className="slide">
                  <Image src="/images/slide3.webp"
                    alt="Custom Boxes"
                    className="img-fluid"
                  />
                </Slide>
                <Slide id="slide4" className="slide">
                  <Image src="/images/slide1.webp"
                    alt="Custom Boxes"
                    className="img-fluid"
                  />
                </Slide>
              </SlidesTrack>
            </SliderContainer>
          </div>
        </div>
      </HeroSection>

      {/* Rating Section */}
      <div className="container">
        <RatingSection>
          <RatingHeading>
            See what our clients are saying! With 4.5 Social Media Platforms
            Rating!
          </RatingHeading>
          <StarRating>
            <span>â˜…</span>
            <span>â˜…</span>
            <span>â˜…</span>
            <span>â˜…</span>
            <span style={{ opacity: 0.5 }}>â˜…</span>
          </StarRating>

          <SectionTitle>
            YOUR FINAL RESORT FOR OUTSTANDING PACKAGING SOLUTIONS
          </SectionTitle>
          <SectionDescription>
            Packitperfect is the go-to option for projects because of their
            excellent customer service and reasonably priced, customizable
            packaging solutions.
          </SectionDescription>
        </RatingSection>

        {/* Features Grid */}
        <FeaturesGrid>
          <FeatureItem>
            <IconCircle>ðŸ’µ</IconCircle>
            <FeatureText>
              No Die &<br />
              Plate Charges
            </FeatureText>
          </FeatureItem>
          <FeatureItem>
            <IconCircle>â±</IconCircle>
            <FeatureText>
              Fastest Turnaround
              <br />7 to 8 working days
            </FeatureText>
          </FeatureItem>
          <FeatureItem>
            <IconCircle>ðŸšš</IconCircle>
            <FeatureText>
              Free Shipping
              <br />
              all across UK
            </FeatureText>
          </FeatureItem>
          <FeatureItem>
            <IconCircle>ðŸ”Œ</IconCircle>
            <FeatureText>
              Starting from
              <br />
              100 boxes
            </FeatureText>
          </FeatureItem>
          <FeatureItem>
            <IconCircle>ðŸ“¦</IconCircle>
            <FeatureText>
              Customize Size
              <br />& Style
            </FeatureText>
          </FeatureItem>
          <FeatureItem>
            <IconCircle>ðŸ’»</IconCircle>
            <FeatureText>
              Free Designing
              <br />
              Assistance
            </FeatureText>
          </FeatureItem>
        </FeaturesGrid>

        {/* Products Slider */}
        <ProductsSlider className="products-sliders2">
          <SliderWrapper className="slider-container">
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/cerealBoxesSlimSize.webp"
                  alt="Cereals Boxes Slim Size"
                />
                <ProductButton className="product-button">
                  Cereals Boxes Slim Size
                </ProductButton>
              </ProductCard>
            </ProductSlide>
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/book mockups.webp"
                  alt="Book Mockups"
                />
                <ProductButton className="product-button">
                  Book Mockups
                </ProductButton>
              </ProductCard>
            </ProductSlide>
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/paperboxespackaging.webp"
                  alt="Paper Boxes Packaging"
                />
                <ProductButton className="product-button">
                  Paper Boxes Packaging
                </ProductButton>
              </ProductCard>
            </ProductSlide>
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/pillowboxes.webp"
                  alt="Pillow Boxes"
                />
                <ProductButton className="product-button">
                  Pillow Boxes
                </ProductButton>
              </ProductCard>
            </ProductSlide>
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/cakeboxes.webp"
                  alt="Cakes Boxes"
                />
                <ProductButton className="product-button">
                  Cakes Boxes
                </ProductButton>
              </ProductCard>
            </ProductSlide>
            <ProductSlide className="slide3">
              <ProductCard className="products1">
                <Image src="/images/product-slides2-homepage/Cuuterguider.webp"
                  alt="Cutter Guider"
                />
                <ProductButton className="product-button">
                  Cutter Guider
                </ProductButton>
              </ProductCard>
            </ProductSlide>
          </SliderWrapper>
        </ProductsSlider>
      </div>
    </MainContentWrapper>
  );
};

export default MainContent;

