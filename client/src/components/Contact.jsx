// CONTACT COMPONENT
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
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

  // DIRECT BACKEND URL - NO VARIABLES
  const BACKEND_URL = 'https://portfolio-backend-143v.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      console.log('Sending to:', `${BACKEND_URL}/api/contact`);
      console.log('Data:', formData);
      
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      
      console.log('Response:', response.data);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
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
      link: 'mailto:solash5156@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+251 901436358',
      link: 'tel:+251901436358'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
      link: null
    }
  ];

  return (
    <section className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
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
                  <div key={idx} className="info-item">
                    <div className="info-icon">{info.icon}</div>
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
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>Sending...</>
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