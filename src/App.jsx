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
  const toggleThemeWithCircle = useCallback((e) => {
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

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Set origin coordinates for circular clip-path animation
    document.documentElement.style.setProperty('--ripple-x', `${x}px`);
    document.documentElement.style.setProperty('--ripple-y', `${y}px`);

    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  }, [theme]);

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
        theme={theme}
        onToggleTheme={toggleThemeWithCircle}
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
