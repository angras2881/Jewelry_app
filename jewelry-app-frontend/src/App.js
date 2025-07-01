import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fuse from 'fuse.js';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ConfirmationPage from './components/ConfirmationPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import ContactUs from './components/ContactUs';

import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jewelry');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    fetchAll();
  }, []);

  const fuse = new Fuse(products, {
    keys: ['name', 'category'],
    threshold: 0.4,
  });

  const globalResults =
    searchTerm.trim() === ''
      ? products
      : fuse.search(searchTerm).map((result) => result.item);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <div className="App">
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlist.length}
        onSearch={setSearchTerm}
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/earrings"
            element={
              <ProductList
                category="Earrings"
                products={globalResults}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/necklaces"
            element={
              <ProductList
                category="Necklaces"
                products={globalResults}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/bangles"
            element={
              <ProductList
                category="Bangles"
                products={globalResults}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage items={cartItems} onClearCart={handleClearCart} />}
          />

          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/profile" element={<ProfilePage user={loggedInUser} />} />
          <Route path="/login" element={<LoginPage onLogin={setLoggedInUser} />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
