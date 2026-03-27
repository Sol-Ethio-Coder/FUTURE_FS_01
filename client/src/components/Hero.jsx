// Hero Component
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import { FaGithub, FaLinkedin, FaArrowDown, FaTelegram, FaTiktok, FaInstagram } from 'react-icons/fa';
import meImg from '../Images/me.jpg';  // Import your profile image
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="greeting">Hello, I'm</div>
          <h1>Solomon Ashagre</h1>
          <div className="typing-wrapper">
            <span className="typed-text">Full Stack Developer</span>
          </div>
          <p>
          I'm a passionate Full Stack Developer from Addis Ababa, Ethiopia with 3+ years of experience.
          Currently teaching Computing at Trillium International School and expanding my skills through 
          remote internships at Codveda Technologies and Future Interns program.
          </p>
          <div className="social-links">
            <a href="https://www.github.com/Sol-Ethio-Coder" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/Sol-Ethio-Coder/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://t.me/Sol_Ethio_Coder" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTelegram />
            </a>
            <a href="https://www.tiktok.com/@sol_ethio_coder" aria-label="Tiktok" target='_blank'>
              <FaTiktok />
            </a>
             <a href="https://www.instagram.com/Sol_Ethio_Coder/" aria-label="Instagram" target='_blank'>
              <FaInstagram />
            </a>
          </div>

          <div className="hero-buttons">
            <Link to="/resume" className="btn-primary">View Resume</Link>
            <Link to="/contact" className="btn-secondary">Contact Me</Link>
          </div>
          
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <div className="profile-image">
              <img 
                src={meImg} // Use Imported image
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
      <a href="#projects" className="scroll-down">
        <FaArrowDown />
      </a>
    </section>
  );
};

export default Hero;