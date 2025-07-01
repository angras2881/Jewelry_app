import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount, onSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">JewelryApp</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/earrings">Earrings</Link></li>
        <li><Link to="/necklaces">Necklaces</Link></li>
        <li><Link to="/bangles">Bangles</Link></li>
      </ul>

      <div className="navbar-right">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search jewelry..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <Link to="/cart" className="navbar-cart">🛒 Cart ({cartCount})</Link>
        <Link to="/profile" className="navbar-profile">👤 Profile</Link>
        <Link to="/login" className="navbar-login">🔐 Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
