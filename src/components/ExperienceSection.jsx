import { experience } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <div className="section-label">02 — experience</div>
        <span className="section-link">FULL HISTORY →</span>
      </div>

      <div className="timeline">
        {experience.map((exp, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-date">{exp.date}</div>
            <div className="timeline-role">{exp.role}</div>
            <div className="timeline-company-right">{exp.company}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
