

import React, { useState, useEffect } from 'react';
import './ProductList.css';

function ProductList({ category, onAddToCart, searchTerm, wishlist, toggleWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;

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
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm]);

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading {category}...</p>;
  if (error) return <p>Error loading {category}: {error.message}</p>;

  return (
    <div className="product-list-container">
      <h2>{category}</h2>
      <div className="product-grid">
        {currentItems.map((product) => (
          <div key={product._id} className="product-item">
            <button
              className={`wishlist-button ${wishlist.find(p => p._id === product._id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              ❤️
            </button>

            <h3>{product.name}</h3>
            <div className="product-images">
              {product.images?.map((imageUrl, index) => (
                <img
                  key={index}
                  src={`/${imageUrl}`}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="product-image"
                />
              ))}
            </div>
            <p className="product-price">Price: ${product.price}</p>
            <div className="product-actions">
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
              <button onClick={() => setSelectedProduct(product)} className="view-details-button">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length > itemsPerPage && (
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'active' : ''}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Material:</strong> {selectedProduct.material || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
            {selectedProduct.images?.map((img, i) => (
              <img
                key={i}
                src={`/${img}`}
                alt={selectedProduct.name}
                className="product-image"
              />
            ))}
            <button className="add-to-cart-button" onClick={() => {
              handleAddToCart(selectedProduct);
              setSelectedProduct(null);
            }}>
              Add to Cart
            </button>
            <button onClick={() => setSelectedProduct(null)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;

