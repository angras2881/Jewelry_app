import React from 'react';
import './WishlistPage.css';

function WishlistPage({ wishlist, toggleWishlist, onAddToCart }) {
  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <div key={index} className="wishlist-item">
              <img src={`/${item.images[0]}`} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <div className="wishlist-actions">
                <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                <button onClick={() => toggleWishlist(item)}>Remove ❤️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
