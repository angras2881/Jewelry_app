import React from 'react';
import './Cart.css';

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-box">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
      )}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Cart;
