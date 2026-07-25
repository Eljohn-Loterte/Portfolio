import { affiliations } from '../data/portfolioData';

export default function AffiliationsSection() {
  return (
    <section className="section" id="affiliations">
      <div className="section-header">
        <div className="section-label">04 — affiliations</div>
        <span className="section-link">ALL AFFILIATIONS →</span>
      </div>

      <div className="affiliations-grid">
        {affiliations.map((aff, i) => (
          <div className="affiliation-card" key={i}>
            <div className="affiliation-icon">{aff.icon}</div>
            <div>
              <div className="affiliation-name">{aff.name}</div>
              <div className="affiliation-role">{aff.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
