import React, { useState, useEffect, useRef } from 'react';

const industrySlides = [
  { title: 'Beauty', imgSrc: 'images/ChooseIndustry/Beauty.webp' },
  { title: 'Beverage', imgSrc: 'images/ChooseIndustry/Beverage.webp' },
  { title: 'Cannabis', imgSrc: 'images/ChooseIndustry/Cannabis.webp' },
  { title: 'Clothing', imgSrc: 'images/ChooseIndustry/Clothing.webp' },
  { title: 'Custom', imgSrc: 'images/ChooseIndustry/Custom.webp' },
  { title: 'E-Commerce', imgSrc: 'images/ChooseIndustry/E-Commerce.webp' },
  { title: 'Electronics', imgSrc: 'images/ChooseIndustry/Electronics.webp' },
  { title: 'FastFood', imgSrc: 'images/ChooseIndustry/FastFood.webp' },
  { title: 'Gifts', imgSrc: 'images/ChooseIndustry/Gifts.webp' },
  { title: 'Healthcare', imgSrc: 'images/ChooseIndustry/Healthcare.webp' },
  { title: 'Jewelry', imgSrc: 'images/ChooseIndustry/JeweleryPackaging.webp' },
  { title: 'Medical Devices', imgSrc: 'images/ChooseIndustry/MedicalDevices.webp' },
  { title: 'Shoes', imgSrc: 'images/ChooseIndustry/ShoesPacakging.webp' },
  { title: 'SuperMarkets', imgSrc: 'images/ChooseIndustry/SuperMarkets.webp' },
  { title: 'Supplements', imgSrc: 'images/ChooseIndustry/Supplements.webp' },
];

const CarouselComponent = () => {
  const [counter, setCounter] = useState(0);
  const slidesToShow = 5;
  const totalSlides = industrySlides.length;
  const carouselSlideRef = useRef(null);

  const stopSlideIndex = industrySlides.findIndex(slide => slide.title === 'Supplements');

  useEffect(() => {
    updateCarousel();
  }, [counter]);

  const updateCarousel = () => {
    const slideWidth = 100 / slidesToShow;
    if (carouselSlideRef.current) {
      carouselSlideRef.current.style.transform = `translateX(${-slideWidth * counter}%)`;
    }
  };

  const handleNext = () => {
    if (counter < totalSlides - slidesToShow && counter < stopSlideIndex) {
      setCounter(counter + 1);
    }
  };

  const handlePrev = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleSlideClick = (slideNumber) => {
    // Implement your custom logic based on the slide number
    console.log(`Slide ${slideNumber} clicked`);
  };

  const isNextDisabled = counter >= 7.1;
  const isPrevDisabled = counter <= 0;

  return (
    <div className="container mt-5 mb-0">
      <div className="row">
        <div className="col-md-6">
          <h1 className="fw-bold" style={{fontWeight:'bold'}}>
            Choose Your <span className="ms-2" style={{color: '#000'}}>Industry</span>
          </h1>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <button
            id="prevBtn"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="btn rounded-circle me-2"
            style={{ width: '50px', height: '50px',marginRight:'20px', backgroundColor: '#000', color: 'white' }}
          >
            &#8249;
          </button>
          <button
            id="nextBtn"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="btn rounded-circle"
            style={{ width: '50px', height: '50px',backgroundColor: '#000', color: 'white'}}
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className="carousel-container mt-3">
        <div className="carousel overflow-hidden">
          <div className="carousel-slide d-flex" ref={carouselSlideRef}>
            {industrySlides.map((slide, index) => (
              <button
                key={index}
                className="icon-button border-0 bg-transparent"
                onClick={() => handleSlideClick(index + 1)}
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="icon-box text-center">
                  <div className="icon-circle rounded-circle overflow-hidden" style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                    <Image src={slide.imgSrc} alt={`Slide ${index + 1}`} className="img-fluid" />
                  </div>
                  <p className="mt-2">{slide.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
