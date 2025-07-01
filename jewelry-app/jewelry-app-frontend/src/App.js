import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ConfirmationPage from './components/ConfirmationPage';
import './App.css';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <Navbar
        cartCount={cartItems.length}
        onSearch={setSearchTerm}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/earrings"
            element={
              <ProductList
                category="Earrings"
                onAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/necklaces"
            element={
              <ProductList
                category="Necklaces"
                onAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/bangles"
            element={
              <ProductList
                category="Bangles"
                onAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage items={cartItems} />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                items={cartItems}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage onLogin={setLoggedInUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


