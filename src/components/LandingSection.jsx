import { profile, stats } from '../data/portfolioData';

export default function LandingSection() {
  return (
    <section className="section" id="about">
      {/* Hero layout: square avatar left, info right */}
      <div className="hero-layout fade-in-up">
        <div className="hero-avatar-container">
          <div className="hero-avatar">{profile.initials}</div>
        </div>
        <div className="hero-info">
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-bio">{profile.bio}</p>
          <p className="hero-bio">{profile.bio2}</p>
          <div className="hero-social-links">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">github ↗</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">linkedin ↗</a>
            <a href={profile.socials.kaggle} target="_blank" rel="noopener noreferrer">kaggle ↗</a>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="hero-stats fade-in-up stagger-1">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-value">
              {s.value}
              <span className="stat-star">✦</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
