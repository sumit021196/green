import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // For mobile: toggle dropdown on click
  const handleDropdownClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setDropdownOpen((open) => !open);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Globlegreen</div>
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        <li className="dropdown"
            onMouseEnter={() => {
              clearTimeout(timeoutRef.current);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setDropdownOpen(false);
              }, 300); // 300ms delay before closing
            }}
        >
          <span className="dropdown-title">Investor Relation</span>
          <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
              onMouseEnter={() => {
                clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setDropdownOpen(false);
                }, 300);
              }}
          >
            <li><Link to="/investor" onClick={() => setIsMenuOpen(false)}>Financial Results</Link></li>
            <li><Link to="/investor/shareholding" onClick={() => setIsMenuOpen(false)}>Shareholding Pattern</Link></li>
            <li><Link to="/investor/disclosure" onClick={() => setIsMenuOpen(false)}>Stock Exchange Disclosure</Link></li>
            <li><Link to="/investor/grievance" onClick={() => setIsMenuOpen(false)}>Investor Grievance</Link></li>
            <li className="has-submenu">
              <Link to="/investor/code-of-conduct" onClick={() => setIsMenuOpen(false)} className="submenu-link">
                Code Of Conduct
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              {/* Submenu can be implemented here */}
            </li>
            <li><Link to="/investor/statutory-document" onClick={() => setIsMenuOpen(false)}>Statutory Document</Link></li>
            <li className="has-submenu">
              <Link to="/investor/shareholders-help-desk" onClick={() => setIsMenuOpen(false)} className="submenu-link">
                Shareholder's Help Desk
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              {/* Submenu can be implemented here */}
            </li>
            <li><Link to="/investor/policies" onClick={() => setIsMenuOpen(false)}>Policies</Link></li>
            <li><Link to="/investor/corporate-governance" onClick={() => setIsMenuOpen(false)}>Corporate Governance</Link></li>
          </ul>
        </li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar; 