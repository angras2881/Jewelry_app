import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage({ items, onClearCart }) {
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePlaceOrder = () => {
    onClearCart(); // Clear the cart after order
    navigate('/confirmation'); // Redirect to confirmation page
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="checkout-list">
            {items.map((item, index) => (
              <li key={index} className="checkout-item">
                <img
                  src={`/${item.images?.[0]}`}
                  alt={item.name}
                  className="checkout-image"
                />
                <div className="checkout-info">
                  <p><strong>{item.name}</strong></p>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

            <button className="place-order-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
