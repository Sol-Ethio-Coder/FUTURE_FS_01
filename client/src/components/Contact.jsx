import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTimesCircle, FaFacebook, FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Backend URL
  const API_URL = 'https://solomon-ashagre-backend.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'solash5156@gmail.com',
      link: 'mailto:solash5156@gmail.com',
      color: '#ea4335'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+251 901436358',
      link: 'tel:+251901436358',
      color: '#34a853'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
      link: null,
      color: '#4285f4'
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com/Sol-Ethio-Coder', color: '#333' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com/in/Sol-Ethio-Coder', color: '#0077b5' },
    { icon: <FaTelegram />, name: 'Telegram', url: 'https://t.me/Sol_Ethio_Coder', color: '#0088cc' }
  ];

  return (
    <section className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's <span className="title-gradient">Connect</span></h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Have a project in mind? Let's work together! I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Let's Talk</h3>
              <p>I'd love to hear from you! Whether you have a project in mind, a question, or just want to say hello.</p>
              
              <div className="info-items">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="info-item" style={{ '--hover-color': info.color }}>
                    <div className="info-icon" style={{ background: info.color }}>
                      {info.icon}
                    </div>
                    <div className="info-details">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h4>Connect with me</h4>
                <div className="social-links">
                  {socialLinks.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': social.color }}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="availability">
                <div className="status-dot"></div>
                <span>Available for freelance work</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Send me a message</h3>
              <p>I'll get back to you within 24-48 hours</p>
            </div>

            {status.message && (
              <div className={`alert alert-${status.type}`}>
                {status.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                <span>{status.message}</span>
              </div>
            )}
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span className="focus-border"></span>
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span className="focus-border"></span>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span className="focus-border"></span>
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
              <span className="focus-border"></span>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;