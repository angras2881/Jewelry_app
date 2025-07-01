import React from 'react';
import ProductList from './ProductList';

function Bangles({ onAddToCart }) {
  return <ProductList category="Bangles" onAddToCart={onAddToCart} />;
}

export default Bangles;
