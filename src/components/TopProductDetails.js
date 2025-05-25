import React from "react";
import { useRouter } from "next/router";
import Products from "./Products";

const TopProductDetails = () => {
  const router = useRouter(); const { product } = router.query;
  const router = useRouter();

  // Normalize the product name for comparison
  const trimmedProduct = product.trim().toLowerCase();

  // Find the category containing this product
  const category = Products.find(
    (cat) =>
      cat.subProducts &&
      cat.subProducts.some(
        (subP) => subP.title.toLowerCase().trim() === trimmedProduct
      )
  );

  // If category not found, handle gracefully
  if (!category) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Product Not Found</h4>
          <p>Sorry, we couldn't find information about this product.</p>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#000", color: "white" }}
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Find the specific product details in the category
  const productDetails = category.subProducts.find(
    (p) => p.title.toLowerCase().trim() === trimmedProduct
  );

  // If product details not found, handle gracefully
  if (!productDetails) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Product Details Not Available</h4>
          <p>
            Sorry, we couldn't find detailed information about this product.
          </p>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#000", color: "white" }}
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 product-image-container">
          <Image src={productDetails.image} alt={productDetails.title} />
        </div>
        <div className="col-md-6 product-info">
          <div className="product-heading">
            <h2>{productDetails.title}</h2>
          </div>
          <div className="row product-rating">
            <div
              className="col-md-6 product-stars"
              style={{ borderRight: "2px solid #ddd" }}
              dangerouslySetInnerHTML={{ __html: productDetails.stars }}
            ></div>
            <div className="col-md-6 product-social-links">
              <a
                href={productDetails.socialLinks?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href={productDetails.socialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={productDetails.socialLinks?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="product-description">
            <p>
              {productDetails.description ||
                "No description available for this product."}
            </p>
          </div>
          <div className="product-category">
            <p>Category: {category.category}</p>
          </div>

          {/* Product actions section */}
          <div className="product-actions mt-4">
            <button href="#/get-quote"
              className="btn me-3"
              style={{
                backgroundColor: "#000",
                color: "white",
                padding: "10px 20px",
              }}
            >
               Quote
            </button>
            <button
              className="btn"
              style={{
                border: "1px solid #000",
                color: "#000",
                padding: "10px 20px",
              }}
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </button>
          </div>

          {/* Product features */}
          <div className="product-features mt-4">
            <h4>Features:</h4>
            <ul>
              <li>Customizable design</li>
              <li>Multiple size options</li>
              <li>Eco-friendly materials available</li>
              <li>Premium printing quality</li>
              <li>Fast production times</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="related-products mt-5">
        <h3 className="mb-4">Related Products</h3>
        <div className="row">
          {category.subProducts
            .filter((p) => p.title !== productDetails.title)
            .slice(0, 4)
            .map((relatedProduct, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div
                  className="card product-card"
                  onClick={() => router.push(`/product/${relatedProduct.title}`)}
                >
                  <Image src={relatedProduct.image}
                    className="card-img-top"
                    alt={relatedProduct.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.title}</h5>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopProductDetails;

