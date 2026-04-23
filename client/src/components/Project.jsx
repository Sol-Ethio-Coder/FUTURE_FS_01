// PROJECT PAGE
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaEye } from 'react-icons/fa';
// Import all project images
import portfolioImg from '../Images/main_port.png';
import teaCupImg from '../Images/tea_cup.png';
import stcaImg from '../Images/stca.png';
import stcaOldImg from '../Images/stca_old.png';
import blogImg from '../Images/stca_business.png';
import futureInternsImg from '../Images/sol_crm.png';
import './Project.css';

const Project = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Solomon Ashagre Portfolio',
      description: 'Personal portfolio website showcasing my skills, experience, and services as a web developer. Built with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
      image: portfolioImg,
      github: 'https://github.com/Sol-Ethio-Coder/portfolio-website',
      live: 'https://solomon-ashagre-portfolio.netlify.app',
      category: 'fullstack',
      featured: true,
      color: '#667eea'
    },
    {
      id: 2,
      title: 'Tea Cup Project',
      description: 'A creative web project showcasing elegant tea cup design with pure CSS animations and 3D effects.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: teaCupImg,
      github: 'https://github.com/Sol-Ethio-Coder/tea-cup-project',
      live: 'https://sol-tea-cup-project.netlify.app',
      category: 'frontend',
      featured: true,
      color: '#48bb78'
    },
    {
      id: 3,
      title: 'STCA (Sol Tutoring and Coding Academy)',
      description: 'Educational platform offering coding courses and tutoring services for students from Grade 5-12.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: stcaImg,
      github: 'https://github.com/Sol-Ethio-Coder/stca',
      live: 'https://stca.netlify.app',
      category: 'frontend',
      featured: true,
      color: '#ed8936'
    },
    {
      id: 4,
      title: 'STCA Academy',
      description: 'Modern educational platform with responsive design for Sol Tutoring and Coding Academy.',
      technologies: ['React', 'CSS3', 'Responsive Design', 'Netlify'],
      image: stcaOldImg,
      github: 'https://github.com/Sol-Ethio-Coder/stca-academy',
      live: 'https://stca-academy.netlify.app',
      category: 'fullstack',
      featured: true,
      color: '#9f7aea'
    },
    {
      id: 5,
      title: 'Sol Tutoring Academy',
      description: 'Tech blog platform sharing insights about web development, frameworks, and coding journeys.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: blogImg,
      github: 'https://github.com/Sol-Ethio-Coder/FUTURE_FS_03',
      live: 'https://sol-tutoring-academy.netlify.app',
      category: 'frontend',
      featured: true,
      color: '#38b2ac'
    },
    {
      id: 6,
      title: 'Sol CRM Project',
      description: 'Full-stack portfolio with contact form, MongoDB integration, and email notifications.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
      image: futureInternsImg,
      github: 'https://github.com/Sol-Ethio-Coder/FUTURE_FS_02',
      live: 'https://sol-crm.netlify.app',
      category: 'fullstack',
      featured: false,
      color: '#f56565'
    }
  ];

  const categories = [
    { name: 'All Projects', value: 'all', count: projects.length },
    { name: 'Frontend', value: 'frontend', count: projects.filter(p => p.category === 'frontend').length },
    { name: 'Full Stack', value: 'fullstack', count: projects.filter(p => p.category === 'fullstack').length }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="title-gradient">Projects</span></h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Here are some of my recent works. Each project represents a unique challenge I've solved.
          </p>
        </div>
        
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.name}
              <span className="count">{cat.count}</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="project-image-wrapper">
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="project-tech-badge">{project.technologies[0]}</span>
                      <FaEye className="overlay-icon" />
                    </div>
                  </div>
                </div>
                {project.featured && (
                  <div className="featured-badge">
                    <FaStar /> Featured
                  </div>
                )}
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <div className="project-category" style={{ background: project.color }}>
                    {project.category}
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                    <FaGithub /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;