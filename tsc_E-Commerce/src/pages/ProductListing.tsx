import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListing: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4">Our Products</h1>
          <p className="lead text-muted">Discover our amazing collection of products</p>
        </div>
      </div>
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

