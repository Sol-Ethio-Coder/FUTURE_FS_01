// HERO PAGE
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import meImg from '../Images/me.jpg';
import './Hero.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Full Stack Developer',
    'STCA Founder And Educator',
    'MERN Stack Developer',
    'AI/Machine Learning Enthusiast',
    'Computing Teacher',
    'Tutor Expert',
    'Football Player'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[textIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setTypedText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (charIndex < currentRole.length) {
        const timer = setTimeout(() => {
          setTypedText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [charIndex, isDeleting, textIndex, roles]);

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="greeting">
            <span className="wave-emoji">👋</span> Hello, I'm
          </div>
          
          <h1 className="hero-title">
            Solomon<span className="title-highlight"> Ashagre</span>
          </h1>
          
          <div className="typing-wrapper">
            <span className="typed-prefix">I'm a </span>
            <span className="typed-text">{typedText}</span>
            <span className="typed-cursor">|</span>
          </div>
          
          <p className="hero-description">
            I'm a passionate Full Stack Developer from Addis Ababa, Ethiopia.
            I build exceptional digital experiences with React, Node.js, and modern web technologies.<br/>
            Let's bring your ideas to life!
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <Link to="/resume" className="btn-primary">
              <FaDownload className="btn-icon" /> View Resume
            </Link>
            <Link to="/contact" className="btn-secondary">
              Let's Talk <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <div className="profile-card">
              <div className="profile-image">
                <img 
                  src={meImg} 
                  alt="Solomon Ashagre"
                />
              </div>
              <div className="profile-badge">
                <div className="badge-dot"></div>
                Available for work
              </div>
              <div className="floating-card card-1">
                <FaDownload /> 3+ Years
              </div>
              <div className="floating-card card-2">
                🚀 10+ Projects
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#projects" className="scroll-down">
        <span>Scroll Down</span>
        <FaArrowDown />
      </a>
    </section>
  );
};

export default Hero;