import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) + delta, 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img
                  src={`/${item.images?.[0]}`}
                  alt={item.name}
                  className="cart-item-image"
                />
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-quantity">
                  <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                </div>
                <span className="item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                <button className="remove-button" onClick={() => handleRemove(item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
