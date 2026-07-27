import { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectsPage from './components/ProjectsPage';
import StackSection from './components/StackSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import CertificationsPage from './components/CertificationsPage';
import AffiliationsSection from './components/AffiliationsSection';
import GithubSection from './components/GithubSection';

const sectionIds = ['about', 'projects', 'stack', 'experience', 'certifications', 'affiliations', 'github'];

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'projects' | 'certifications'
  const [activeSection, setActiveSection] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isNavClickingRef = useRef(false);
  const navClickTimeoutRef = useRef(null);

  // Theme Mode: 'light' | 'dark' | 'system'
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme-mode') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const effectiveTheme = themeMode === 'system' ? getSystemTheme() : themeMode;

    document.documentElement.setAttribute('data-theme', effectiveTheme);
    localStorage.setItem('portfolio-theme-mode', themeMode);

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newSystemTheme);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  // Handle manual navigation click from sidebar
  const handleNavClick = useCallback((id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
    setActiveSection(id);
    isNavClickingRef.current = true;

    if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickingRef.current = false;
    }, 1000);
  }, [currentView]);

  // ScrollSpy (Only updates when user scrolls manually on home view)
  useEffect(() => {
    if (currentView !== 'home') return;

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
  }, [currentView]);

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Smooth circular view transition originating from toggle button
  const handleThemeChange = useCallback((newMode, e) => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (e && e.clientX) {
      x = e.clientX;
      y = e.clientY;
    }

    // Set origin coordinates for circular clip-path animation
    document.documentElement.style.setProperty('--ripple-x', `${x}px`);
    document.documentElement.style.setProperty('--ripple-y', `${y}px`);

    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => {
        setThemeMode(newMode);
      });
    } else {
      setThemeMode(newMode);
    }
  }, []);

  const openAllProjects = useCallback(() => {
    setCurrentView('projects');
    setActiveSection('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openAllCertifications = useCallback(() => {
    setCurrentView('certifications');
    setActiveSection('certifications');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backToHome = useCallback(() => {
    setCurrentView('home');
    setActiveSection('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        themeMode={themeMode}
        onToggleTheme={handleThemeChange}
        onSelectSection={handleNavClick}
        onGoHome={backToHome}
      />

      <main className="main-content">
        {currentView === 'projects' ? (
          <ProjectsPage onBack={backToHome} />
        ) : currentView === 'certifications' ? (
          <CertificationsPage onBack={backToHome} />
        ) : (
          <>
            <LandingSection />
            <ProjectsSection onOpenAllProjects={openAllProjects} />
            <StackSection />
            <ExperienceSection />
            <CertificationsSection onOpenAllCertifications={openAllCertifications} />
            <AffiliationsSection />
            <GithubSection />
          </>
        )}
      </main>
    </div>
  );
}
