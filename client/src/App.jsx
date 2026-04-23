// APP PAGE
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Project from './components/Project';
import Resume from './components/Resume';
import Contact from './components/Contact';
import './App.css';

// ScrollToTop component to handle page scrolling on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  // Handle body scroll when mobile menu is open
  useEffect(() => {
    const handleBodyScroll = () => {
      const menu = document.querySelector('.nav-menu');
      if (menu?.classList.contains('active')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    };

    // Initial check
    handleBodyScroll();

    // Listen for menu changes
    const observer = new MutationObserver(handleBodyScroll);
    const menu = document.querySelector('.nav-menu');
    if (menu) {
      observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
    }

    // Cleanup
    return () => {
      observer.disconnect();
      document.body.classList.remove('menu-open');
    };
  }, []);

  // Handle scroll position for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash === '#projects') {
        e.preventDefault();
        const element = document.querySelector('#projects');
        if (element) {
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Project />
            </>
          } />
          <Route path="/projects" element={<Project />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-brand">
                <h3 className="footer-logo-highlight">Sol<span className="footer-logo-highlight">.Ethio</span><span className="footer-logo-highlight">.Coder</span></h3>
                <p className="footer-tagline">Building exceptional digital experiences</p>
              </div>
              <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/resume">Resume</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <div className="footer-social">
                <a href="https://github.com/Sol-Ethio-Coder" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.338.725-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.3-.54-1.52.105-3.165 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.645.24 2.865.12 3.165.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/Sol-Ethio-Coder" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/Sol-Ethio-Coder" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="https://t.me/Sol_Ethio_Coder" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.218-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.053-.334-.376-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.953l11.566-4.458c.532-.19.996.128.804.903z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Solomon Ashagre. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;