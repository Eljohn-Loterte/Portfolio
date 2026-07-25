import { useState, useMemo, useRef } from 'react';
import { projects } from '../data/portfolioData';

export default function ProjectsPage({ onBack }) {
  // Extract unique categories dynamically (WITHOUT 'All')
  const categories = useMemo(() => {
    const cats = [];
    projects.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(() => categories[0] || 'Data Science');
  const [activeProject, setActiveProject] = useState(null);
  const wrapperRef = useRef(null);

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleMouseMove = (e) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY - 101}px, 0)`;
    }
  };

  const handleMouseEnter = (project, e) => {
    setActiveProject(project);
    requestAnimationFrame(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY - 101}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <div className="projects-page-container">
      {/* Back button link */}
      <div className="projects-page-nav">
        <button className="section-link-btn" onClick={onBack}>
          ← BACK TO HOME
        </button>
      </div>

      {/* Main Page Title matching reference image */}
      <div className="projects-page-header">
        <h1 className="projects-page-title">projects</h1>
        <p className="projects-page-subtitle">
          Products and platforms I've designed and shipped — spanning data science, analytics, machine learning, and web apps.
        </p>
      </div>

      {/* Table-style Category Filter Tabs (No 'All' tab) */}
      <div className="projects-tabs-bar">
        <div className="projects-tabs-row">
          {categories.map((cat) => {
            const count = projects.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                className={`projects-tab-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="tab-label">{cat}</span>
                <span className="tab-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dedicated Projects Page List Items */}
      <div className="projects-page-list">
        {filteredProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.live !== '#' ? project.live : project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="page-project-card"
            onMouseEnter={(e) => handleMouseEnter(project, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Line 1: YEAR */}
            <div className="page-project-year">{project.date}</div>

            {/* Line 2: <Project Category/> Project Title ... ↗ */}
            <div className="page-project-header">
              <span className="page-project-category">&lt;{project.category}/&gt;</span>
              <h3 className="page-project-title">{project.title}</h3>
              <span className="page-project-arrow">↗</span>
            </div>

            {/* Line 3: Project Description */}
            <p className="page-project-desc">{project.desc}</p>

            {/* Line 4: Stack */}
            <div className="page-project-stack">
              {project.tech.map((t) => (
                <span key={t} className="project-stack-pill">{t}</span>
              ))}
            </div>
          </a>
        ))}

        {filteredProjects.length === 0 && (
          <div className="projects-empty-state">
            No projects found in "{selectedCategory}".
          </div>
        )}
      </div>

      {/* Hardware-Accelerated Viewport-Fixed Hover Popup (2x Size, Vertically Centered at Cursor Height) */}
      {activeProject && (
        <div
          ref={wrapperRef}
          className="project-cursor-image-wrapper"
        >
          <div key={activeProject.title} className="project-lizard-eye-box">
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="project-lizard-eye-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
