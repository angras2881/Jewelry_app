import React from 'react';
import './Cart.css';

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);  //  This defines the Cart functional component. It accepts a single prop (short for "properties") called items. This items prop is expected to be an array of objects, where each object represents an item 
  // in the cart and likely has properties like name and price. is a JavaScript array method that iterates over the items array.


  //This section defines what the Cart component will render (display on the screen). It uses JSX (JavaScript XML),
  //  which is a syntax extension that allows you to write HTML-like structures within your JavaScript code.
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
