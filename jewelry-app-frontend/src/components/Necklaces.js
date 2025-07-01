import React from 'react';
import ProductList from './ProductList';

function Necklaces({ onAddToCart }) {
  return <ProductList category="Necklaces" onAddToCart={onAddToCart} />;
}

export default Necklaces;
