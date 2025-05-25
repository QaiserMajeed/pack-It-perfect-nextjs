import React from 'react';

const ImageGridComponent = () => {
  const features = [
    {
      img: "images/ensuring/EnsuringQuality.png",
      title: "Ensuring Quality",
      description: "Superior quality and long-term reliability are our promises. Innovative Packaging Solution"
    },
    {
      img: "images/ensuring/CustomPacakging.png",
      title: "Custom Packaging",
      description: "We guarantee top-notch quality and durability"
    },
    {
      img: "images/ensuring/AffordablePricing.png",
      title: "Affordable Pricing",
      description: "Quality doesn't mean expensive"
    },
    {
      img: "images/ensuring/EcoFriendly.png",
      title: "Eco Friendly Materials",
      description: "Sustainable choices for a greener footprint."
    },
    {
      img: "images/ensuring/EfficientOrdering.png",
      title: "Efficient Ordering",
      description: "Easy, Quick, and Hassle-free."
    },
    {
      img: "images/ensuring/ReliableDeliverey.png",
      title: "Reliable Delivery",
      description: "We guarantee top-notch quality and durability"
    }
  ];

  return (
    <div className="bg-dark text-white">
      <div className="position-relative">
        <Image src="images/backgroungImages/cardboardparcels.jpg" 
          alt="Background Image" 
          className="w-100 object-fit-cover"
          style={{ 
            opacity: 0.5, 
            filter: 'brightness(40%)', 
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover'
          }}
        />
        <div className="container py-5 position-relative">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {features.map((feature, index) => (
              <div key={index} className="col">
                <div className="text-center">
                  <Image src={feature.img} 
                    className="mx-auto mb-3" 
                    alt={feature.title} 
                    style={{maxWidth: '80px'}} 
                  />
                  <h3 className="h5 fw-bold">{feature.title}</h3>
                  <p className="small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridComponent;
