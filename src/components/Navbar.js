import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null); // mobile-only accordion
  const timeoutRef = useRef(null);

  // Flip nested submenu to left if it would overflow the viewport on the right
  const handleSubmenuEnter = (e) => {
    const li = e.currentTarget;
    const submenu = li.querySelector('.submenu');
    if (!submenu) return;
    // Reset any previous flip
    li.classList.remove('open-left');
    // Temporarily reveal submenu to measure accurately
    const prevDisplay = submenu.style.display;
    const prevVisibility = submenu.style.visibility;
    submenu.style.display = 'block';
    submenu.style.visibility = 'hidden';
    const submenuRect = submenu.getBoundingClientRect();
    const willOverflowRight = submenuRect.right > window.innerWidth;
    // Restore previous inline styles; CSS hover will control visibility
    submenu.style.display = prevDisplay;
    submenu.style.visibility = prevVisibility;
    if (willOverflowRight) {
      li.classList.add('open-left');
    }
  };

  const handleSubmenuLeave = (e) => {
    e.currentTarget.classList.remove('open-left');
  };

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

  // For mobile: toggle nested submenu accordions
  const toggleSubmenu = (key, e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setExpandedSubmenu((prev) => (prev === key ? null : key));
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
        <li className={`dropdown${dropdownOpen ? ' open' : ''}`}
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
          <span
            className="dropdown-title"
            onClick={() => {
              if (window.innerWidth <= 768) {
                setDropdownOpen((o) => !o);
              }
            }}
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  setDropdownOpen((o) => !o);
                }
              }
            }}
          >
            Investor Relation <span className="caret" aria-hidden="true"></span>
          </span>
          <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setDropdownOpen(false);
                  setIsMenuOpen(false);
                }
              }}
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
            <li className={`has-submenu${expandedSubmenu === 'coc' ? ' expanded' : ''}`} onMouseEnter={handleSubmenuEnter} onMouseLeave={handleSubmenuLeave}>
              <Link to="/investor/code-of-conduct" onClick={(e) => toggleSubmenu('coc', e)} className="submenu-link">
                Code Of Conduct
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              <ul className="submenu">
                <li><Link to="/investor/code-of-conduct/sebi-lodr" onClick={() => setIsMenuOpen(false)}>Regulation 7 (5) SEBI (LODR) Regulations,2015</Link></li>
                <li><Link to="/investor/code-of-conduct/insider-trading" onClick={() => setIsMenuOpen(false)}>Insider trading code</Link></li>
              </ul>
            </li>
            <li className={`has-submenu${expandedSubmenu === 'statutory' ? ' expanded' : ''}`} onMouseEnter={handleSubmenuEnter} onMouseLeave={handleSubmenuLeave}>
              <Link to="/investor/statutory-document" onClick={(e) => toggleSubmenu('statutory', e)} className="submenu-link">
                Statutory Document
                <span className="submenu-arrow">&#8250;</span>
              </Link>
              <ul className="submenu">
                <li><Link to="/investor/statutory-document/annual-reports" onClick={() => setIsMenuOpen(false)}>Annual Reports</Link></li>
                <li><Link to="/investor/statutory-document/offer-documents" onClick={() => setIsMenuOpen(false)}>Offer Documents</Link></li>
              </ul>
            </li>
            <li className={`has-submenu${expandedSubmenu === 'shareholders' ? ' expanded' : ''}`} onMouseEnter={handleSubmenuEnter} onMouseLeave={handleSubmenuLeave}>
              <Link to="/investor/shareholders-help-desk" onClick={(e) => toggleSubmenu('shareholders', e)} className="submenu-link">
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
            <li><Link to="/policies" onClick={() => setIsMenuOpen(false)}>Policies</Link></li>
            <li><Link to="/investor/corporate-governance" onClick={() => setIsMenuOpen(false)}>Corporate Governance</Link></li>
          </ul>
        </li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar; 