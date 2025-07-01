import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount, wishlistCount, onSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">JewelryApp</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/earrings">Earrings</Link></li>
        <li><Link to="/necklaces">Necklaces</Link></li>
        <li><Link to="/bangles">Bangles</Link></li>
        <li><Link to="/wishlist">❤️ Wishlist ({wishlistCount})</Link></li>
      </ul>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search jewelry..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="navbar-icons">
        <Link to="/profile" className="navbar-link">👤 Profile</Link>
        <Link to="/cart" className="navbar-link">🛒 Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;
