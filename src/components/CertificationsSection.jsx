import { useState, useRef } from 'react';
import { certifications } from '../data/portfolioData';

export default function CertificationsSection({ onOpenAllCertifications }) {
  const [activeCert, setActiveCert] = useState(null);
  const wrapperRef = useRef(null);

  const visibleCerts = certifications.slice(0, 4);

  const handleMouseMove = (e) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY - 101}px, 0)`;
    }
  };

  const handleMouseEnter = (cert, e) => {
    setActiveCert(cert);
    requestAnimationFrame(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY - 101}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    setActiveCert(null);
  };

  return (
    <section className="section" id="certifications">
      <div className="section-header">
        <div className="section-label">03 — certifications</div>
        <button
          className="section-link-btn"
          onClick={onOpenAllCertifications}
        >
          ALL CERTIFICATIONS →
        </button>
      </div>

      {/* Projects-style List for Certifications */}
      <div className="projects-exp-timeline">
        {visibleCerts.map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-exp-item"
            onMouseEnter={(e) => handleMouseEnter(cert, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Column 1: Date/Year */}
            <div className="project-exp-date">{cert.date}</div>

            {/* Column 2: Certificate Title & Issuer below Title */}
            <div className="project-exp-center">
              <h3 className="project-exp-title">{cert.name}</h3>
              <div className="project-exp-stack">
                <span className="project-stack-pill">{cert.issuer}</span>
              </div>
            </div>

            {/* Column 3: Diagonal Arrow Clickable Link */}
            <div className="project-exp-arrow">↗</div>
          </a>
        ))}
      </div>

      {/* Hardware-Accelerated Viewport-Fixed Hover Popup */}
      {activeCert && (
        <div
          ref={wrapperRef}
          className="project-cursor-image-wrapper"
        >
          <div key={activeCert.name} className="project-lizard-eye-box">
            <img
              src={activeCert.image}
              alt={activeCert.name}
              className="project-lizard-eye-img"
            />
          </div>
        </div>
      )}
    </section>
  );
}
