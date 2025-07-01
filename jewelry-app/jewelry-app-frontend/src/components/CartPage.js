import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ items }) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>

          {/* ✅ Checkout Button */}
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
