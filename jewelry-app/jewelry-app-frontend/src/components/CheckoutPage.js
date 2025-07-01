import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage({ items, onClearCart }) {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    onClearCart(); // empty cart
    navigate('/confirmation'); // go to confirmation screen
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p>You have {items.length} item(s) in your cart.</p>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;
