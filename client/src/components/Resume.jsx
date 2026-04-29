// RESUME PAGE
import React, { useState } from 'react';
import { FaDownload, FaCode, FaDatabase, FaTools, FaBriefcase, FaGraduationCap, FaLaptopCode, FaSchool, FaAward, FaUserGraduate, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const skills = {
    'Frontend': {
      icon: <FaCode />,
      items: ['React.js', 'HTML5/CSS3', 'JavaScript (ES6+)', 'Responsive Design', 'Tailwind CSS']
    },
    'Backend': {
      icon: <FaLaptopCode />,
      items: ['Node.js', 'Express.js', 'Python', 'REST APIs']
    },
    'Database': {
      icon: <FaDatabase />,
      items: ['MongoDB', 'MySQL', 'Firebase']
    },
    'Tools & Others': {
      icon: <FaTools />,
      items: ['Git/GitHub', 'VS Code', 'Netlify', 'Figma', 'WordPress']
    }
  };

  const experiences = [
    {
      title: 'Remote Web Developer Intern',
      company: 'Codveda Technologies',
      period: 'August 2025 - September 2025',
      location: 'Remote',
      description: 'Remote web development internship focusing on modern web technologies.',
      achievements: [
        'Worked on real-world web development projects remotely',
        'Collaborated with development team on full-stack applications',
        'Implemented responsive designs and modern UI components'
      ]
    },
    {
      title: 'Computing Teacher',
      company: 'Trillium International School',
      period: '2025 - Present',
      location: 'Addis Ababa, Ethiopia',
      description: 'Teaching computer science and ICT to international students.',
      achievements: [
        'Developed engaging ICT curriculum for international students',
        'Implemented project-based learning approaches',
        'Enhanced student digital literacy and programming skills'
      ]
    },
    {
      title: 'ICT Teacher',
      company: 'Montessorian Private School',
      period: '2023 - 2024',
      location: 'Addis Ababa, Ethiopia',
      description: 'Teaching ICT and computer science fundamentals.',
      achievements: [
        'Taught computer science fundamentals to diverse student groups',
        'Created interactive coding exercises for beginners',
        'Organized school-wide technology awareness programs'
      ]
    },
    {
      title: 'WordPress Developer Intern',
      company: 'KNS Trading plc',
      period: '2022 - 2023',
      location: 'Addis Ababa, Ethiopia',
      description: 'Internship developing websites using WordPress CMS.',
      achievements: [
        'Developed and maintained company websites using WordPress',
        'Customized themes and plugins',
        'Implemented responsive designs'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Addis Ababa University',
      period: '2020 - 2023',
      location: 'Addis Ababa, Ethiopia',
      description: 'One of the most prestigious universities in Ethiopia and Africa.'
    },
    {
      degree: 'Preparatory School Diploma',
      school: 'Fasiledes Preparatory School',
      period: '2018 - 2019',
      location: 'Gondar, Ethiopia',
      description: 'Completed preparatory education in Gondar.'
    },
    {
      degree: 'High School Diploma',
      school: 'Fasiledes High School',
      period: '2016 - 2017',
      location: 'Gondar, Ethiopia',
      description: 'Completed high school education.'
    },
    {
      degree: 'Primary School Certificate (Grade 6 - 8)',
      school: 'Felegabiyot Primary School',
      period: '2013 - 2015',
      location: 'Gondar, Ethiopia',
      description: 'Completed primary school education from Grade 6 to 8.'
    },
    {
      degree: 'Primary School Certificate (Grade 1 - 6)',
      school: 'Abera Giyorgis Primary School',
      period: '2008 - 2012',
      location: 'Gondar, Ethiopia',
      description: 'Completed primary school education from Grade 1 to 6.'
    }
  ];

  const certifications = [
    'Full Stack Web Dev - Future Interns (2026)',
    'Full Stack Web Dev - Codveda Technologies (2025)',
    'Programming Fundamentals',
    'AI And Data Science Training',
    'Responsive Web Design',
    'Digital Literacy',
    'Work Readiness Training',
    'MERN Stack Dev',
    'WordPress Dev',
    'Tutor Volunteer',
    'Software Dev 101',
  ];

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const today = new Date();
    const dateStr = today.toLocaleDateString();
    
    // Build the HTML content for the PDF
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Solomon Ashagre - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            padding: 40px;
            color: #333;
            line-height: 1.5;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 20px;
          }
          .header h1 {
            font-size: 28px;
            margin-bottom: 5px;
            color: #1a202c;
          }
          .header h2 {
            font-size: 18px;
            color: #667eea;
            margin-bottom: 15px;
          }
          .contact {
            font-size: 11px;
            color: #666;
            margin: 3px 0;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 16px;
            color: #667eea;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 5px;
            margin-bottom: 12px;
          }
          .item {
            margin-bottom: 15px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
          }
          .item-title {
            font-size: 14px;
            font-weight: bold;
            color: #1a202c;
          }
          .item-date {
            font-size: 11px;
            color: #667eea;
          }
          .item-subtitle {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
          }
          .item-description {
            font-size: 11px;
            color: #555;
            margin-bottom: 5px;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          .skill-tag {
            background: #f0f0f0;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            color: #667eea;
          }
          .skill-category {
            margin-bottom: 12px;
          }
          .skill-category strong {
            font-size: 12px;
            min-width: 80px;
            display: inline-block;
          }
          ul {
            margin: 5px 0 0 20px;
          }
          li {
            font-size: 11px;
            margin: 2px 0;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
          }
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SOLOMON ASHAGRE</h1>
          <h2>Full Stack Developer</h2>
          <div class="contact">📍 Addis Ababa, Ethiopia | 📧 solash5156@gmail.com | 📞 +251 901436358</div>
          <div class="contact">🔗 github.com/Sol-Ethio-Coder | linkedin.com/in/Sol-Ethio-Coder</div>
        </div>
        
        <div class="section">
          <div class="section-title">🎓 EDUCATION</div>
          ${education.map(edu => `
            <div class="item">
              <div class="item-header">
                <span class="item-title">${edu.degree}</span>
                <span class="item-date">${edu.period}</span>
              </div>
              <div class="item-subtitle">${edu.school}</div>
              <div class="item-description">${edu.description}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="section-title">💼 WORK EXPERIENCE</div>
          ${experiences.map(exp => `
            <div class="item">
              <div class="item-header">
                <span class="item-title">${exp.title}</span>
                <span class="item-date">${exp.period}</span>
              </div>
              <div class="item-subtitle">${exp.company}</div>
              <div class="item-description">${exp.description}</div>
              <ul>
                ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="section-title">🛠️ TECHNICAL SKILLS</div>
          ${Object.entries(skills).map(([category, { items }]) => `
            <div class="skill-category">
              <strong>${category}:</strong> ${items.join(', ')}
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="section-title">📜 CERTIFICATIONS</div>
          <ul>
            ${certifications.map(cert => `<li>${cert}</li>`).join('')}
          </ul>
        </div>
        
        <div class="section">
          <div class="section-title">🚀 PROJECTS</div>
          <ul>
            <li><strong>Solomon Ashagre Portfolio</strong> - Personal portfolio website</li>
            <li><strong>STCA Academy</strong> - Educational platform for coding and tutoring</li>
            <li><strong>Sol Blog Website</strong> - Tech blog platform</li>
            <li><strong>Tea Cup Project</strong> - Creative web design project</li>
          </ul>
        </div>
        
        <div class="footer">
          Resume generated on ${dateStr}
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Reset generating state immediately after window opens
    setTimeout(() => {
      setIsGenerating(false);
    }, 500);
    
    // Wait for content to load then print
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      }, 100);
    };
  };

  return (
    <section className="resume">
      <div className="container">
        <div className="resume-header">
          <h2 className="section-title">Professional <span className="title-gradient">Resume</span></h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            My professional background and qualifications
          </p>
          <button className="download-btn" onClick={handleDownloadPDF} disabled={isGenerating}>
            <FaDownload /> {isGenerating ? 'Opening PDF...' : 'Download Resume (PDF)'}
          </button>
        </div>

        <div className="resume-grid">
          {/* Education Section */}
          <div className="resume-card">
            <h3 className="card-title">
              <FaGraduationCap /> Education
            </h3>
            <div className="timeline">
              {education.map((edu, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{edu.degree}</h4>
                      <span className="timeline-date">
                        <FaCalendarAlt /> {edu.period}
                      </span>
                    </div>
                    <p className="timeline-company">{edu.school}</p>
                    <p className="timeline-location">
                      <FaMapMarkerAlt /> {edu.location}
                    </p>
                    <p className="timeline-description">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="resume-card">
            <h3 className="card-title">
              <FaBriefcase /> Work Experience
            </h3>
            <div className="timeline">
              {experiences.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="timeline-item"
                  onMouseEnter={() => setHoveredExp(idx)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{exp.title}</h4>
                      <span className="timeline-date">
                        <FaCalendarAlt /> {exp.period}
                      </span>
                    </div>
                    <p className="timeline-company">{exp.company}</p>
                    <p className="timeline-location">
                      <FaMapMarkerAlt /> {exp.location}
                    </p>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="achievements-list">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="resume-card skills-card">
            <h3 className="card-title">Technical Skills</h3>
            <div className="skills-container">
              {Object.entries(skills).map(([category, { icon, items }]) => (
                <div key={category} className="skill-category">
                  <div className="skill-header">
                    {icon}
                    <h4>{category}</h4>
                  </div>
                  <div className="skills-list">
                    {items.map((skill, idx) => (
                      <div 
                        key={idx} 
                        className="skill-item"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ 
                              width: hoveredSkill === skill ? '100%' : `${Math.floor(Math.random() * 30 + 70)}%`,
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="resume-card">
            <h3 className="card-title">
              <FaAward /> Certifications
            </h3>
            <div className="certifications-list">
              {certifications.map((cert, idx) => (
                <div key={idx} className="certification-item">
                  <div className="cert-icon">🏆</div>
                  <div className="cert-content">
                    <span className="cert-name">{cert}</span>
                    <div className="cert-glow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;