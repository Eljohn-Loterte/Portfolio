import { useState, useRef } from 'react';
import { projects } from '../data/portfolioData';

export default function ProjectsSection({ onOpenAllProjects }) {
  const [activeProject, setActiveProject] = useState(null);
  const wrapperRef = useRef(null);

  const visibleProjects = projects.slice(0, 4);

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
    <section className="section" id="projects">
      <div className="section-header">
        <div className="section-label">01 — projects</div>
        <button
          className="section-link-btn"
          onClick={onOpenAllProjects}
        >
          ALL PROJECTS →
        </button>
      </div>

      {/* Experience-style Projects Table/Timeline (Top 4) */}
      <div className="projects-exp-timeline">
        {visibleProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.live !== '#' ? project.live : project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-exp-item"
            onMouseEnter={(e) => handleMouseEnter(project, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Column 1: Date/Year */}
            <div className="project-exp-date">{project.date}</div>

            {/* Column 2: Title & Tabbed Tech Stack below Title */}
            <div className="project-exp-center">
              <h3 className="project-exp-title">{project.title}</h3>
              <div className="project-exp-stack">
                {project.tech.map((t) => (
                  <span key={t} className="project-stack-pill">{t}</span>
                ))}
              </div>
            </div>

            {/* Column 3: Diagonal Arrow Clickable Link */}
            <div className="project-exp-arrow">↗</div>
          </a>
        ))}
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
    </section>
  );
}
