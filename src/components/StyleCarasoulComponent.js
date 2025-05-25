import React, { useState, useEffect, useRef } from 'react';


  

const StyleCarouselComponent = ({slides}) => {
  const [counter, setCounter] = useState(0);
  const slidesToShow = 3;
  const totalSlides = slides.length;
  const carouselSlideRef = useRef(null);

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
    if (counter < totalSlides - slidesToShow ) {
      setCounter(counter + 1);
    }
  };

  const handlePrev = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleStyleClick = (index) => {
    // Implement your custom logic based on the style clicked
    console.log(`Style ${index + 1} clicked`);
  };

  const isNextDisabled = counter >= 26;
  const isPrevDisabled = counter <= 0;

  return (
    <div className="container mt-5 mb-0">
      <div className="row">
        <div className="col-md-6">
          <h1 className="fw-bold">
            Choose Your <span className=" ms-2" style={{color:'rgb(0,0,90)',fontWeight:'bolder'}}> Style</span>
          </h1>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="btn rounded-circle me-2"
            style={{ width: '50px', height: '50px' , backgroundColor: '#000', color: 'white', fontWeight:'bolder'}}
          >
            &#8249;
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="btn rounded-circle"
            style={{ width: '50px', height: '50px', marginLeft:'20px' ,backgroundColor: '#000', color: 'white' , fontWeight:'bolder'}}
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className="carousel-container-style mt-3">
        <div className="carousel-style overflow-hidden">
          <div className="carousel-slide-style d-flex" ref={carouselSlideRef}>
            {slides.map((slide, index) => (
              <button
                key={index}
                className="style-button border-0 bg-transparent"
                onClick={() => handleStyleClick(index)}
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <Image src={slide.imgSrc} alt={slide.title} className="img-fluid" style={{ width: '300px', height: '300px' }} />
                <p className="mt-2">{slide.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleCarouselComponent;
