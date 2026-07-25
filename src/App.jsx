import { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import StackSection from './components/StackSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import AffiliationsSection from './components/AffiliationsSection';
import GithubSection from './components/GithubSection';

const sectionIds = ['about', 'projects', 'stack', 'experience', 'certifications', 'affiliations', 'github'];

export default function App() {
  const [activeSection, setActiveSection] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isNavClickingRef = useRef(false);
  const navClickTimeoutRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Handle manual navigation click from sidebar
  const handleNavClick = useCallback((id) => {
    setActiveSection(id);
    isNavClickingRef.current = true;

    if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickingRef.current = false;
    }, 1000);
  }, []);

  // ScrollSpy (Only updates when user scrolls manually)
  useEffect(() => {
    const handleScroll = () => {
      if (isNavClickingRef.current) return;

      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestSection = sectionIds[0];
      let minDistance = Infinity;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const sectionCenter = el.offsetTop + el.offsetHeight / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = sectionIds[i];
          }
        }
      }
      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="app-layout">
      <button className="mobile-menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <Sidebar
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectSection={handleNavClick}
      />

      <main className="main-content">
        <LandingSection />
        <ProjectsSection />
        <StackSection />
        <ExperienceSection />
        <CertificationsSection />
        <AffiliationsSection />
        <GithubSection />
      </main>
    </div>
  );
}
