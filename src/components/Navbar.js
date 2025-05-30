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
              <Link to="/investor/code-of-conduct" onClick={handleDropdownClick} className="submenu-link">
                Code Of Conduct
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              <ul className="submenu">
                <li><Link to="/investor/code-of-conduct/sebi-lodr" onClick={() => setIsMenuOpen(false)}>Regulation 7 (5) SEBI (LODR) Regulations,2015</Link></li>
                <li><Link to="/investor/code-of-conduct/insider-trading" onClick={() => setIsMenuOpen(false)}>Insider trading code</Link></li>
              </ul>
            </li>
            <li className="has-submenu">
              <Link to="/investor/statutory-document" onClick={handleDropdownClick} className="submenu-link">
                Statutory Document
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              <ul className="submenu">
                <li><Link to="/investor/statutory-document/annual-reports" onClick={() => setIsMenuOpen(false)}>Annual Reports</Link></li>
                <li><Link to="/investor/statutory-document/offer-documents" onClick={() => setIsMenuOpen(false)}>Offer Documents</Link></li>
              </ul>
            </li>
            <li className="has-submenu">
              <Link to="/investor/shareholders-help-desk" onClick={handleDropdownClick} className="submenu-link">
                Shareholder's Help Desk
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              <ul className="submenu">
                <li><Link to="/investor/shareholders-help-desk/postal-ballot" onClick={() => setIsMenuOpen(false)}>Postal Ballot</Link></li>
                <li><Link to="/investor/shareholders-help-desk/agm-egm-notice" onClick={() => setIsMenuOpen(false)}>AGM / EGM Notice</Link></li>
                <li><Link to="/investor/shareholders-help-desk/book-closure" onClick={() => setIsMenuOpen(false)}>Book Closure Notice</Link></li>
                <li><Link to="/investor/shareholders-help-desk/nomination-form" onClick={() => setIsMenuOpen(false)}>Nomination Form</Link></li>
                <li><Link to="/investor/shareholders-help-desk/scrutinizers-reports" onClick={() => setIsMenuOpen(false)}>Scrutinizer's Reports</Link></li>
                <li><Link to="/investor/shareholders-help-desk/unclaimed-dividend" onClick={() => setIsMenuOpen(false)}>Unclaimed Dividend</Link></li>
                <li><Link to="/investor/shareholders-help-desk/dividend-history" onClick={() => setIsMenuOpen(false)}>Dividend History</Link></li>
                <li><Link to="/investor/shareholders-help-desk/investor-presentations" onClick={() => setIsMenuOpen(false)}>Investor Presentations</Link></li>
                <li><Link to="/investor/shareholders-help-desk/familiarization-programme" onClick={() => setIsMenuOpen(false)}>Familiarization Programme For Ujaas</Link></li>
                <li><Link to="/investor/shareholders-help-desk/investor-relations" onClick={() => setIsMenuOpen(false)}>Investor Relations</Link></li>
                <li><Link to="/investor/shareholders-help-desk/independent-director" onClick={() => setIsMenuOpen(false)}>Terms and Conditions for the Appointment of Independent Director</Link></li>
                <li><Link to="/investor/shareholders-help-desk/annual-return" onClick={() => setIsMenuOpen(false)}>Annual Return</Link></li>
              </ul>
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