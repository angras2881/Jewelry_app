import React from 'react';
import ProductList from './ProductList';

function Earrings({ onAddToCart }) {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Earrings Collection</h1>
      <ProductList category="Earrings" onAddToCart={onAddToCart} />
    </div>
  );
}

export default Earrings;
