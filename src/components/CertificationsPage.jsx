import { useState, useMemo, useRef } from 'react';
import { certifications } from '../data/portfolioData';

export default function CertificationsPage({ onBack }) {
  const types = ['Professional', 'Completion'];
  const categories = ['Data Science', 'Front-End Dev', 'Data Analytics'];

  const [selectedType, setSelectedType] = useState('Professional');
  const [selectedCategory, setSelectedCategory] = useState('Data Science');
  const [activeCert, setActiveCert] = useState(null);
  const wrapperRef = useRef(null);

  // Filter certs by active Type and Category
  const filteredCerts = useMemo(() => {
    return certifications.filter(
      (c) =>
        (c.type || 'Professional') === selectedType &&
        (c.category || 'Data Science') === selectedCategory
    );
  }, [selectedType, selectedCategory]);

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
    <div className="projects-page-container">
      {/* Back button link */}
      <div className="projects-page-nav">
        <button className="section-link-btn" onClick={onBack}>
          ← BACK TO HOME
        </button>
      </div>

      {/* Main Page Title */}
      <div className="projects-page-header">
        <h1 className="projects-page-title">certifications</h1>
        <p className="projects-page-subtitle">
          Professional certifications and completion certificates earned across data science, analytics, machine learning, and front-end engineering.
        </p>
      </div>

      {/* Tier 1 Tab Bar: Type Filter (Professional / Completion) */}
      <div className="projects-tabs-bar cert-type-tabs">
        <div className="projects-tabs-row">
          {types.map((type) => {
            const count = certifications.filter(
              (c) => (c.type || 'Professional') === type
            ).length;
            return (
              <button
                key={type}
                className={`projects-tab-item ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                <span className="tab-label">{type}</span>
                <span className="tab-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier 2 Tab Bar: Category Filter (Data Science / Front-End Dev / Data Analytics) */}
      <div className="projects-tabs-bar cert-category-tabs" style={{ marginTop: '12px' }}>
        <div className="projects-tabs-row">
          {categories.map((cat) => {
            const count = certifications.filter(
              (c) =>
                (c.type || 'Professional') === selectedType &&
                (c.category || 'Data Science') === cat
            ).length;
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

      {/* Dedicated Certifications Page List Items */}
      <div className="projects-page-list" style={{ marginTop: '24px' }}>
        {filteredCerts.map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="page-project-card"
            onMouseEnter={(e) => handleMouseEnter(cert, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Line 1: YEAR */}
            <div className="page-project-year">{cert.date}</div>

            {/* Line 2: <Category/> Certificate Name ... ↗ */}
            <div className="page-project-header">
              <span className="page-project-category">&lt;{cert.category || selectedCategory}/&gt;</span>
              <h3 className="page-project-title">{cert.name}</h3>
              <span className="page-project-arrow">↗</span>
            </div>

            {/* Line 3: Issuer / Provider */}
            <div className="page-project-stack" style={{ marginTop: '4px' }}>
              <span className="project-stack-pill">{cert.issuer}</span>
            </div>
          </a>
        ))}

        {filteredCerts.length === 0 && (
          <div className="projects-empty-state">
            No {selectedType.toLowerCase()} certificates found in "{selectedCategory}".
          </div>
        )}
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
    </div>
  );
}
