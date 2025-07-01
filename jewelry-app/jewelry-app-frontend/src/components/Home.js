import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to JewelryApp</h1>
        <p>Explore our handcrafted Indian jewelry collection</p>
        <div className="home-buttons">
          <Link to="/earrings" className="home-button">Shop Earrings</Link>
          <Link to="/necklaces" className="home-button">Shop Necklaces</Link>
          <Link to="/bangles" className="home-button">Shop Bangles</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
