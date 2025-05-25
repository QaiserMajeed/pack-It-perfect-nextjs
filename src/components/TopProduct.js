import React from 'react';
import { Link } from 'react-router-dom';
const TopProducts = ({ products }) => {
  return (
    <div className="container-fluid" id="top-products">
      <div className="container">
        <br /><br />
        <h1 style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'last baseline', marginBottom: '40px' }}>
          Top <span style={{ color: '#000', marginLeft: '10px' }}>Products</span>
        </h1>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
               <Link to={`/product/${product.title}`}>
               <button className='btn-productscard'>
                   
              <div className="card product-card">
                <Image src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </div>
              </button>
                          </Link>
               
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

