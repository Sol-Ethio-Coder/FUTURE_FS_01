// Project Component
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Project.css';

const Project = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Solomon Ashagre Portfolio',
      description: 'Personal portfolio website showcasing my skills, experience, and services as a web developer.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: '/src/Images/portfolio1.png',
      github: 'https://github.com/Sol-Ethio-Coder/My-Portfolio',
      live: 'https://solomon-ashagre-portfolio.netlify.app',
      category: 'frontend',
      featured: true
    },
    {
      id: 2,
      title: 'Tea Cup Project',
      description: 'A creative web project inspired by Solomon Ashagre - showcasing elegant tea cup design and presentation.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: '/src/Images/tea-cup.png',
      github: 'https://github.com/Sol-Ethio-Coder/Tea_Cup_Project',
      live: 'https://sol-tea-cup-project.netlify.app',
      category: 'frontend',
      featured: true
    },
    {
      id: 3,
      title: 'STCA (Sol Tutoring and Coding Academy)',
      description: 'Educational platform for Sol Tutoring and Coding Academy offering coding courses, tutoring services, and academic support.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify', 'Responsive Design'],
      image: '/src/Images/stca-old.png',
      github: 'https://github.com/Sol-Ethio-Coder/STCA-Academy',
      live: 'https://stca.netlify.app',
      category: 'frontend',
      featured: true
    },
    {
      id: 4,
      title: 'Sol Blog Website',
      description: 'A personal blog platform sharing insights about web development, frameworks, and coding journeys.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      image: '/src/Images/blog.png',
      github: 'https://github.com/Sol-Ethio-Coder/Personal_Blog',
      live: 'https://sol-blog-website.netlify.app',
      category: 'frontend',
      featured: true
    },
    {
      id: 5,
      title: 'STCA Academy',
      description: 'Educational platform for Sol Tutoring and Coding Academy (STCA), showcasing courses and learning opportunities.',
      technologies: ['React', 'CSS3', 'Responsive Design', 'Netlify'],
      image: '/src/Images/stca.png',
      github: 'https://github.com/Sol-Ethio-Coder/Sol-Tutoring-And-Coding-Academy',
      live: 'https://stca-academy.netlify.app',
      category: 'fullstack',
      featured: true
    },
    {
      id: 6,
      title: 'Future Interns Portfolio',
      description: 'Full-stack portfolio website with contact form and MongoDB integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
      image: '/src/Images/future_intern.png',
      github: 'https://github.com/Sol-Ethio-Coder/FUTURE_FS_01',
      live: '#',
      category: 'fullstack',
      featured: false
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
          <h2 className="section-title">My Projects</h2>
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
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="overlay-link">
                      View Project
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
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