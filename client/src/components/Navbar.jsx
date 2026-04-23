// NAVBAR PAGE
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaLaptopCode } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Projects', path: '/projects', icon: '💼' },
    { name: 'Resume', path: '/resume', icon: '📄' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle body scroll when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          <FaLaptopCode className="logo-icon" />
          <span className="logo-text">Sol<span className="logo-highlight">.Ethio</span><span className="logo-highlight">.Coder</span></span>
        </Link>
        
        <div className="nav-controls">
          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;