import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-scroll';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-light)' : 'none',
        padding: '0 24px',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <nav style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 68,
      }}>
        {/* Logo */}
        <motion.a href="#home" whileHover={{ scale: 1.05 }} style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.35rem',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', flexShrink: 0,
        }}>
          Adarsh<span style={{ color: '#7c3aed' }}>.</span>
        </motion.a>

        {/* Desktop Nav */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none',
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link}>
                <Link
                  to={link.toLowerCase()} spy smooth duration={600} offset={-80}
                  onSetActive={() => setActiveSection(link.toLowerCase())}
                  style={{
                    display: 'inline-block', padding: '7px 14px',
                    borderRadius: 8, fontSize: '0.88rem', fontWeight: 500,
                    color: isActive ? '#7c3aed' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(124,58,237,0.28)' : '1px solid transparent',
                    transition: 'all 0.25s ease', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(124,58,237,0.06)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; } }}
                >
                  {link}
                </Link>
              </li>
            );
          })}

          {/* Contact button */}
          <li>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 18px',
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                color: 'white', borderRadius: 10,
                fontSize: '0.88rem', fontWeight: 600,
                display: 'inline-block',
              }}
            >
              Contact
            </motion.a>
          </li>
        </ul>

        {/* Mobile menu control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-controls">
          {/* Hamburger */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation"
            style={{
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 9, border: '1px solid var(--border-light)',
              background: 'var(--input-bg)', color: 'var(--text-primary)',
              fontSize: '1.15rem', cursor: 'pointer',
            }}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              background: 'var(--nav-bg)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border-light)',
              transform: 'translateZ(0)',
            }}
          >
            <ul style={{ listStyle: 'none', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={link.toLowerCase()} spy smooth duration={600} offset={-80}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '11px 14px', borderRadius: 10,
                      color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.target.style.color = '#7c3aed'; e.target.style.background = 'rgba(124,58,237,0.08)'; }}
                    onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: 8 }}>
                <a href="#contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '11px 14px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                    color: 'white', fontWeight: 600, fontSize: '0.9rem',
                    textAlign: 'center',
                  }}
                >
                  Contact Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-controls { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
