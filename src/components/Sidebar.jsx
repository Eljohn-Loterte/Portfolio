import { useState, useEffect } from 'react';
import { profile, githubData as fallbackData } from '../data/portfolioData';

const navItems = [
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'stack',
    label: 'Stack',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 17 22 12"/>
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
  },
  {
    id: 'affiliations',
    label: 'Affiliations',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
];

function getLevelClass(level, count) {
  if (!count || count === 0 || level === 'NONE') return 'level-0';
  if (level === 'FIRST_QUARTILE' || count <= 2) return 'level-1';
  if (level === 'SECOND_QUARTILE' || count <= 4) return 'level-2';
  if (level === 'THIRD_QUARTILE' || count <= 6) return 'level-3';
  return 'level-4';
}

function getFormattedMonthYear() {
  const now = new Date();
  return `${now.toLocaleString('en-US', { month: 'long' })} ${now.getFullYear()}`;
}

export default function Sidebar({ activeSection, isOpen, onClose, theme, onToggleTheme, onSelectSection, onGoHome }) {
  const [ghStats, setGhStats] = useState({
    monthContributions: 0,
    monthDays: [],
    monthYearTitle: getFormattedMonthYear(),
  });

  // Fetch real-time GitHub activity for current month
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveGithubStats() {
      try {
        const res = await fetch('https://github-contributions-api.deno.dev/Eljohn-Loterte.json');
        if (res.ok) {
          const data = await res.json();
          if (data && data.contributions && Array.isArray(data.contributions)) {
            const flatList = data.contributions.flat();

            // Determine current month & year
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const monthYearTitle = `${now.toLocaleString('en-US', { month: 'long' })} ${year}`;

            // Filter days for current calendar month
            const currentMonthDays = flatList.filter((d) => {
              if (!d.date) return false;
              const dt = new Date(d.date);
              return dt.getFullYear() === year && dt.getMonth() === month;
            });

            // Calculate month total contributions
            const monthTotal = currentMonthDays.reduce((acc, d) => acc + (d.contributionCount || 0), 0);

            if (isMounted) {
              setGhStats({
                monthContributions: monthTotal,
                monthDays: currentMonthDays.length > 0 ? currentMonthDays : flatList.slice(-30),
                monthYearTitle,
              });
            }
          }
        }
      } catch (err) {
        console.warn('Live GitHub fetch fallback used:', err);
      }
    }

    fetchLiveGithubStats();
    return () => { isMounted = false; };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (onSelectSection) onSelectSection(id);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (onClose) onClose();
  };

  const handleNameClick = (e) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else if (onSelectSection) {
      onSelectSection('about');
    }
    if (onClose) onClose();
  };

  // Fallback grid days if live array is empty
  const displayDays = ghStats.monthDays.length > 0
    ? ghStats.monthDays
    : Array.from({ length: 30 }).map((_, i) => ({
        contributionCount: [0, 1, 3, 2, 4, 1, 0, 2, 4, 3, 1, 4, 2, 0, 3, 4, 1, 2, 3, 4, 2, 1, 4, 3, 2, 0, 4, 3, 2, 1][i],
        contributionLevel: 'FIRST_QUARTILE',
        date: '',
      }));

  return (
    <>
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Name — Clickable button back to home */}
        <button
          className="sidebar-name-btn"
          onClick={handleNameClick}
          title="Return to Home"
        >
          {profile.name}
        </button>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Theme toggle */}
        <button className="sidebar-theme-btn" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'dark' ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <span>Light mode</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span>Dark mode</span>
            </>
          ) }
        </button>

        {/* Real Live GitHub Contribution Mini Widget (Current Month) */}
        <div
          className="sidebar-github-widget"
          onClick={(e) => handleNavClick(e, 'github')}
          title="View Live GitHub Activity for Eljohn-Loterte"
        >
          <div className="sidebar-github-header">
            <span className="sidebar-github-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Github Activity | {ghStats.monthYearTitle}
            </span>
          </div>

          <div className="sidebar-github-count">
            {ghStats.monthContributions.toLocaleString()} <span className="count-label">contributions</span>
          </div>

          {/* Current Month Activity Grid */}
          <div className="sidebar-github-grid">
            {displayDays.map((day, i) => {
              const levelClass = getLevelClass(day.contributionLevel, day.contributionCount);
              const titleText = day.date
                ? `${day.contributionCount || 0} contributions on ${day.date}`
                : `${day.contributionCount || 0} contributions`;
              return (
                <div
                  key={i}
                  className={`mini-grid-cell ${levelClass}`}
                  title={titleText}
                />
              );
            })}
          </div>
        </div>

        {/* Fixed reach me at footer */}
        <div className="sidebar-footer">
          <div className="footer-reach">reach me at</div>
          <a href={`mailto:${profile.email}`} className="footer-email">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{profile.email}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
