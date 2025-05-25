import React from "react";

const MainContent2 = () => {
    return (
        <div>
            <div className="container-simpletext row" style={{ marginTop: '30px',marginLeft:'10px' }}>
                {/* Repeat for all the text sections */}
                <p>Welcome to Pack it Perfect Custom Boxes, where your packaging needs meet unmatched quality and creativity. Discover why choosing us is the perfect step towards achieving your business goals effectively and affordably.</p>
            </div>
            <div className="image-container row" id="imageconttainer2">
                <Image src="images/backgroungImages/images.jpeg" alt="boxes" className="background-image" id="backgroundimage" />
                <div id="hero-content" className="overlay-content col-md-12">
                    <h1 style={{ color: 'white' }}>Quality Custom Boxes, Affordable Prices</h1>
                    <p>From your order to your front door, our team manages it all to make things simpler for you</p>
                    <div className="button-container" id="herobuttonconatainer">
                        <a href="#" id="heroButton" className="button">Contact Us Today</a>
                        <a href="#" id="heroButton" className="button">Get Free Quote</a>
                    </div>
                </div>
            </div>
            <div className="feedback-section row">
                <div className="feedback-text col-md-4">Give us a <span>Feedback</span></div>
                <button className="review-button col-md-3">Write a Review</button>
            </div>
        </div>
    );
}

export default MainContent2;
