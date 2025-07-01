import React, { useState, useEffect } from 'react';
import './ProductList.css';

function ProductList({ category, onAddToCart, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jewelry?category=${category}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading {category}...</p>;
  if (error) return <p>Error loading {category}: {error.message}</p>;

  return (
    <div className="product-list-container">
      <h2>{category}</h2>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <div className="product-images">
                {product.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`/${img}`}
                    alt={`${product.name} - ${i + 1}`}
                    className="product-image"
                  />
                ))}
              </div>
              <p className="product-price">Price: ${product.price}</p>
              <div className="product-actions">
                <button onClick={() => onAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
