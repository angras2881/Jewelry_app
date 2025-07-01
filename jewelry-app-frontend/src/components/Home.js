import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-banner">
        <img
          src="/images/banners/banner1.jpg"
          alt="Jewelry Hero Banner"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Welcome to JewelryApp</h1>
          <p>Explore our handcrafted Indian jewelry collection</p>
          <Link to="/earrings" className="shop-button">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
