import React, { useState } from "react";
import { FaCheckCircle, FaFileUpload } from "react-icons/fa";

const CustomBoxesForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    sizeType: "",
    width: "",
    height: "",
    length: "",
    materialType: "White Uncoated",
    materialThickness: "250gsm",
    coating: "None",
    quantity: "",
    designs: "1",
    printingSides: "Outside Only",
    designFile: null,
    additionalNotes: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      designFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Show success message or redirect
    alert(
      "Your quote request has been submitted! We will contact you shortly."
    );
  };

  return (
    <div className="container-quote row">
      <h1 className="text-center mb-4">
        <b>Get a Free Quote</b>
      </h1>
      <div className="form-container">
        <form className="form-section col-md-8" onSubmit={handleSubmit}>
          <h3>
            <b>Personal Information:</b>
          </h3>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>

          <h3>
            <b>Size:</b>
          </h3>
          <div className="form-group">
            <label htmlFor="sizeType" style={{ marginTop: "20px" }}>
              Size Suggestions:
            </label>
            <select
              id="sizeType"
              value={formData.sizeType}
              onChange={handleInputChange}
            >
              <option value="">Select a size option</option>
              <option value="standard">Standard Size</option>
              <option value="custom">Custom Size</option>
              <option value="small">Small Box (under 6 inches)</option>
              <option value="medium">Medium Box (6-12 inches)</option>
              <option value="large">Large Box (over 12 inches)</option>
            </select>
          </div>

          <div className="row mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="width">Width (cm)</label>
              <input
                type="number"
                id="width"
                value={formData.width}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                value={formData.height}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="length">Length (cm)</label>
              <input
                type="number"
                id="length"
                value={formData.length}
                onChange={handleInputChange}
                min="1"
              />
            </div>
          </div>

          <h3>
            <b>Material:</b>
          </h3>
          <div className="material-grid">
            <div className="form-group">
              <label htmlFor="materialType">Material Type:</label>
              <select
                id="materialType"
                value={formData.materialType}
                onChange={handleInputChange}
              >
                <option value="White Uncoated">
                  White Uncoated Recyclable Eco Friendly Card
                </option>
                <option value="Brilliant White">
                  Brilliant White Uncoated Recyclable Eco Friendly Card
                </option>
                <option value="Brown Recycled">White and Brown Recycled</option>
                <option value="SBS">SBS</option>
                <option value="1 Side Coated">1 Side Coated Paperboard</option>
                <option value="2 Side Coated">2 Side Coated Paperboard</option>
                <option value="Brown Card">Brown Card</option>
                <option value="Corrugated Brown E-flute">
                  Corrugated Brown fluting (E-flute) = 2mm
                </option>
                <option value="Corrugated Brown B-flute">
                  Corrugated Brown fluting (B-flute) = 3mm
                </option>
                <option value="Corrugated White E-flute">
                  Corrugated White fluting (E-flute) = 5mm
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="materialThickness">Material Thickness:</label>
              <select
                id="materialThickness"
                value={formData.materialThickness}
                onChange={handleInputChange}
              >
                <option value="250gsm">250gsm</option>
                <option value="300gsm">300gsm</option>
                <option value="350gsm">350gsm</option>
                <option value="400gsm">400gsm</option>
                <option value="450gsm">450gsm</option>
                <option value="500gsm">500gsm</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="coating">Coating/Finish:</label>
              <select
                id="coating"
                value={formData.coating}
                onChange={handleInputChange}
              >
                <option value="None">None</option>
                <option value="Matte">Matte Lamination</option>
                <option value="Gloss">Gloss Lamination</option>
                <option value="Spot UV">Spot UV</option>
                <option value="Embossing">Embossing</option>
                <option value="Foil Stamping">Foil Stamping</option>
              </select>
            </div>
          </div>

          <h3>
            <b>Quantity</b>
          </h3>
          <div className="form-group">
            <label htmlFor="quantity" style={{ marginTop: "20px" }}>
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              min="100"
            />
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="designs">Number of Designs:</label>
              <select
                id="designs"
                value={formData.designs}
                onChange={handleInputChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="printingSides">Printing Sides:</label>
              <select
                id="printingSides"
                value={formData.printingSides}
                onChange={handleInputChange}
              >
                <option value="Outside Only">Outside Only</option>
                <option value="Inside Only">Inside Only</option>
                <option value="Both Sides">Both Sides</option>
              </select>
            </div>
          </div>

          <h3>
            <b>Attach Designs</b>
          </h3>
          <div className="form-group">
            <input
              type="file"
              id="designUpload"
              name="designUpload"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.ai"
            />
            <button
              type="button"
              id="uploadButton"
              style={{ backgroundColor: "#000", color: "white" }}
              onClick={() => document.getElementById("designUpload").click()}
            >
              <FaFileUpload /> Upload
            </button>
          </div>

          <h3>
            <b>Additional Notes</b>
          </h3>
          <div className="form-group b4-form-textarea">
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Any additional information..."
              value={formData.additionalNotes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: "#000",
              color: "white",
              marginTop: "20px",
            }}
          >
            Submit
          </button>
        </form>

        <div className="guarantee-section col-md-4">
          <Image src="images/paymentGuarrente/paymentGuarrantue.webp"
            alt="Shop with Confidence"
            className="guarantee-image"
          />
          <div className="guarantee-grid">
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Budget-Friendly</h4>
              <p>
                Premium quality Boxes, Stickers & Tags at affordable prices.
              </p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Endless Choices</h4>
              <p>Diverse finishes, adhesives, and materials await!</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Versatile Designs</h4>
              <p>Customize your design with multiple artwork options.</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Lightning-Fast Delivery</h4>
              <p>98% of orders ready within 24 hours!</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Order Flexibility</h4>
              <p>
                Get boxes, stickers, and tags in the quantities you need, no
                minimums!
              </p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Lightning-Fast Delivery</h4>
              <p>98% of orders ready within 24 hours!</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Free PDF Proofs</h4>
              <p>Approve your design file before printing!</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Seamless Online Ordering</h4>
              <p>Order with just a few clicks.</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Try Before You Buy</h4>
              <p>Free sample packs to feel the quality.</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Transparent Pricing</h4>
              <p>No surprisesâ€”what you see is what you get!</p>
            </div>
            <div className="guarantee-item">
              <FaCheckCircle />
              <h4>Rapid Dispatch</h4>
              <p>Orders printed and shipped within days!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBoxesForm;

