import { useState } from 'react';
import { projects } from '../data/portfolioData';

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (project, e) => {
    setActiveProject(project);
    setMousePos({ x: e.clientX, y: e.clientY });
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
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'SHOW LESS ←' : 'ALL PROJECTS →'}
        </button>
      </div>

      {/* Experience-style Projects Table/Timeline (Top 4 by default) */}
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

      {/* Cursor-Following Flat Rectangle Lizard-Eye Image Preview */}
      {activeProject && (
        <div
          className="project-cursor-image-wrapper"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y - 90}px`,
          }}
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
