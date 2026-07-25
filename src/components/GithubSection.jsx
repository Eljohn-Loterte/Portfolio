import { useState, useEffect } from 'react';
import { githubData as fallbackData } from '../data/portfolioData';

const LANG_COLORS = {
  'Python': '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'R': '#198CE7',
  'SQL': '#e38c00',
  'C++': '#f34b7d',
  'C#': '#178600',
  'Java': '#b07219',
};

function levelToNum(level, count) {
  if (count === 0 || level === 'NONE') return 0;
  if (level === 'FIRST_QUARTILE' || count <= 2) return 1;
  if (level === 'SECOND_QUARTILE' || count <= 4) return 2;
  if (level === 'THIRD_QUARTILE' || count <= 6) return 3;
  return 4;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function GithubSection() {
  const [ghData, setGhData] = useState({
    username: 'Eljohn-Loterte',
    totalContributions: fallbackData.totalContributions,
    currentStreak: fallbackData.currentStreak,
    longestStreak: fallbackData.longestStreak,
    contributions: fallbackData.contributions,
    topLanguages: fallbackData.topLanguages,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        // Fetch public contribution calendar
        const contribRes = await fetch('https://github-contributions-api.deno.dev/Eljohn-Loterte.json');
        let weeks = fallbackData.contributions;
        let total = fallbackData.totalContributions;
        let currentStreak = fallbackData.currentStreak;
        let longestStreak = fallbackData.longestStreak;

        if (contribRes.ok) {
          const data = await contribRes.json();
          if (data && data.contributions && Array.isArray(data.contributions)) {
            weeks = data.contributions;
            const flatList = weeks.flat();
            total = flatList.reduce((acc, d) => acc + (d.contributionCount || 0), 0);

            let tempStreak = 0;
            longestStreak = 0;
            for (let i = 0; i < flatList.length; i++) {
              const count = flatList[i].contributionCount || 0;
              if (count > 0) {
                tempStreak++;
                if (tempStreak > longestStreak) longestStreak = tempStreak;
              } else {
                tempStreak = 0;
              }
            }

            const recentList = [...flatList].reverse();
            currentStreak = 0;
            for (let i = 0; i < recentList.length; i++) {
              const count = recentList[i].contributionCount || 0;
              if (count > 0) {
                currentStreak++;
              } else if (i === 0) {
                continue;
              } else {
                break;
              }
            }
          }
        }

        // Fetch live repository languages for Eljohn-Loterte
        let topLanguages = fallbackData.topLanguages;
        const reposRes = await fetch('https://api.github.com/users/Eljohn-Loterte/repos?per_page=100');
        if (reposRes.ok) {
          const repos = await reposRes.json();
          if (Array.isArray(repos)) {
            const counts = {};
            let totalReposWithLang = 0;
            repos.forEach((r) => {
              if (r.language) {
                counts[r.language] = (counts[r.language] || 0) + 1;
                totalReposWithLang++;
              }
            });

            if (totalReposWithLang > 0) {
              const computed = Object.entries(counts).map(([name, count]) => ({
                name,
                pct: Math.round((count / totalReposWithLang) * 100),
                color: LANG_COLORS[name] || '#6b6b76',
              })).sort((a, b) => b.pct - a.pct);

              if (computed.length > 0) {
                topLanguages = computed;
              }
            }
          }
        }

        if (isMounted) {
          setGhData({
            username: 'Eljohn-Loterte',
            totalContributions: total || 35,
            currentStreak: currentStreak || 1,
            longestStreak: longestStreak || 3,
            contributions: weeks,
            topLanguages,
          });
        }
      } catch (err) {
        console.warn('Using fallback GitHub contribution data:', err);
      }
    }

    fetchGitHubData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="section" id="github">
      <div className="section-header">
        <div className="section-label">05 — github</div>
        <a
          href={`https://github.com/${ghData.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="section-link"
        >
          @{ghData.username.toUpperCase()} ↗
        </a>
      </div>

      {/* 1. Streak & Contribution Stats Row */}
      <div className="github-stats-row">
        <div className="github-stat-box">
          <div className="github-stat-num">{ghData.totalContributions.toLocaleString()}</div>
          <div className="github-stat-title">TOTAL CONTRIBUTIONS</div>
        </div>
        <div className="github-stat-box">
          <div className="github-stat-num">{ghData.currentStreak} DAYS</div>
          <div className="github-stat-title">CURRENT STREAK</div>
        </div>
        <div className="github-stat-box">
          <div className="github-stat-num">{ghData.longestStreak} DAYS</div>
          <div className="github-stat-title">HIGHEST STREAK</div>
        </div>
      </div>

      {/* 2. Standalone Stack & Language Usage Progress Bar directly below stats row */}
      <div className="github-lang-section">
        <div className="github-lang-track">
          {ghData.topLanguages.map((lang) => (
            <div
              key={lang.name}
              className="github-lang-segment"
              style={{ width: `${lang.pct}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.pct}%`}
            />
          ))}
        </div>
        <div className="github-lang-legend">
          {ghData.topLanguages.map((lang) => (
            <div key={lang.name} className="github-lang-item">
              <span className="github-lang-dot" style={{ backgroundColor: lang.color }} />
              <span className="github-lang-name">{lang.name}</span>
              <span className="github-lang-pct">{lang.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dynamic GitHub Contribution Table */}
      <div className="github-dot-container">
        <div className="github-dot-grid">
          {ghData.contributions.map((week, wi) => (
            <div className="github-dot-week" key={wi}>
              {week.map((day, di) => {
                const count = day.contributionCount || 0;
                const lvl = levelToNum(day.contributionLevel, count);
                return (
                  <div key={di} className="github-dot">
                    <div className={`github-dot-inner level-${lvl}`} />
                    <div className="github-dot-tooltip">
                      {count} contribution{count !== 1 ? 's' : ''} on {formatDate(day.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="github-summary-text">
        {ghData.totalContributions.toLocaleString()} CONTRIBUTIONS IN THE LATEST YEAR
      </div>
    </section>
  );
}
