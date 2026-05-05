import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowLeft, FiGithub, FiCheckCircle } from 'react-icons/fi';

const caseStudies = {
  tutorfinder: {
    title: 'TutorFinder Platform',
    subtitle: 'Student-Tutor Matching Platform',
    date: 'March 2025',
    tech: 'Python / Django / JavaScript',
    color: '#7c3aed',
    emoji: '📚',
    overview:
      'TutorFinder was built as a dual-user ecosystem where students and tutors operate through role-specific dashboards. The platform supports 20+ academic subjects and simplifies the full tutoring journey — from discovering nearby tutors to completing and reviewing sessions.',
    features: [
      'Dual-user dashboards for Students and Tutors with tailored workflows for profiles, requests, and session operations.',
      'Geolocation-based tutor discovery to find nearby tutors within configurable radius ranges such as 20 km.',
      'Request-response connection architecture where students send invitations and tutors approve mentor-student relationships.',
      'Complete session lifecycle management from Pending to Approved to Completed, including virtual meeting link sharing.',
      'Dynamic rating and feedback system with automatic tutor average rating calculation in real time.',
      'Weekly availability tracking with tutor-defined time slots to prevent invalid bookings.',
      'Custom Django user model and role-based permissions for secure student vs tutor access control.',
      'Complex data modeling using one-to-one and many-to-many relationships for subjects, connections, and scheduling.',
    ],
    outcomes: [
      { icon: '📍', text: 'Built a proximity-based matching engine that improves local tutor discovery and connection speed.' },
      { icon: '📅', text: 'Engineered a structured scheduling workflow with status tracking and meeting-link integration.' },
      { icon: '⭐', text: 'Implemented a dynamic rating model that continuously reflects tutor performance from student feedback.' },
    ],
    stack: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'SQLite', 'PostgreSQL', 'Custom User Model'],
    images: [
      { src: '/tutor-landing.jpg', alt: 'TutorFinder landing page' },
      { src: '/tutor-search.jpg', alt: 'TutorFinder tutor search & matching interface' },
      { src: '/tutor-session.jpg', alt: 'TutorFinder session and dashboard workflow' },
    ],
    github: 'https://github.com/ad4rsh432',
  },
  freshmart: {
    title: 'FreshMart Grocery Platform',
    subtitle: 'Multi-Vendor Grocery Marketplace',
    date: 'December 2025',
    tech: 'Python / Django / Vanilla CSS',
    color: '#06b6d4',
    emoji: '🛒',
    overview:
      'FreshMart connects local sellers with buyers through a modern grocery marketplace focused on Vegetables, Fruits, Dairy, and Bakery categories. The system uses custom role-based access control and a responsive, animated interface for smooth day-to-day shopping workflows.',
    features: [
      'Buyer dashboard for product discovery, real-time cart management, order history, and review/rating submissions.',
      'Seller dashboard to manage inventory, monitor sales performance, and update product listings with image support.',
      'Admin dashboard for centralized user management, platform statistics, and system-wide monitoring.',
      'Complete shopping architecture with checkout workflow and order status tracking such as Pending, Shipped, and Delivered.',
      'Integrated feedback module with ratings and reviews to strengthen product quality and marketplace trust.',
      'Responsive UI with glassmorphism styling, micro-animations, and mobile-friendly layouts.',
    ],
    outcomes: [
      { icon: '🏗️', text: 'Built a scalable multi-vendor architecture designed to handle thousands of products and growing seller participation.' },
      { icon: '🏪', text: 'Streamlined grocery operations for buyers and sellers through dedicated role-specific workflows.' },
      { icon: '📱', text: 'Improved user engagement with a clean, intuitive, and mobile-friendly purchase journey.' },
    ],
    stack: ['Python', 'Django', 'SQLite', 'PostgreSQL', 'JavaScript', 'HTML5', 'CSS3 (Vanilla)', 'Custom User Model', 'RBAC'],
    images: [
      { src: '/freshmart-dashboard.jpg', alt: 'FreshMart buyer products dashboard' },
      { src: '/freshmart-landing.jpg', alt: 'FreshMart landing page' },
      { src: '/freshmart-seller.jpg', alt: 'FreshMart seller dashboard' },
    ],
    github: 'https://github.com/ad4rsh432',
  },
  cinemax: {
    title: 'Cinemax Booking App',
    subtitle: 'Movie Ticket Booking System',
    date: 'January 2025',
    tech: 'Python / Django / JavaScript',
    color: '#f59e0b',
    emoji: '🎬',
    overview:
      'Cinemax replicates a real-world movie ticket booking experience with a BookMyShow-inspired interactive seat map, dynamic showtime scheduling, and a complete booking lifecycle from seat selection to confirmation and booking history.',
    features: [
      'Interactive seat selection map replicating the BookMyShow layout with Recliner, Premium, and Standard sections.',
      'Multiple showtime scheduling (10:30 AM, 1:00 PM, 3:30 PM, 6:00 PM, 9:15 PM) per movie per theatre.',
      'Multi-theatre support with distinct venues displayed per movie for a realistic booking flow.',
      'Complete booking lifecycle: seat selection → ticket count → confirmation → booking history.',
      'User authentication with dedicated "My Bookings" section for booking management.',
      'Admin panel for movie management, showtime control, and booking oversight.',
    ],
    outcomes: [
      { icon: '🎭', text: 'Replicated a real-world booking UX with an accurate seat layout and smooth selection flow.' },
      { icon: '🗓️', text: 'Implemented a flexible showtime system supporting multiple theatres and daily schedules.' },
      { icon: '🔐', text: 'Built secure auth-gated booking with full booking history accessible to each user.' },
    ],
    stack: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'SQLite', 'Bootstrap'],
    images: [],
    github: 'https://github.com/ad4rsh432',
  },
};

function SectionHeading({ children, color }) {
  return (
    <h3 style={{
      fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.05rem',
      color: 'var(--text-primary)', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ width: 3, height: 18, borderRadius: 2, background: color, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </h3>
  );
}

export default function CaseStudy({ projectId, onClose }) {
  const study = caseStudies[projectId];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!study) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', cursor: 'pointer',
        }}
      />

      {/* Full-screen centered modal wrapper */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2001,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        padding: '20px 16px',
      }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 30 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          pointerEvents: 'all',
          background: 'var(--bg-secondary)',
          border: `1px solid ${study.color}33`,
          borderRadius: 24,
          overflowY: 'auto',
          boxShadow: `0 30px 100px rgba(0,0,0,0.5), 0 0 0 1px ${study.color}22`,
        }}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'var(--bg-secondary)',
          borderBottom: `1px solid ${study.color}22`,
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(20px)',
        }}>
          <button onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500,
            background: 'var(--input-bg)', border: '1px solid var(--border-light)',
            borderRadius: 10, padding: '8px 16px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = `${study.color}55`; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)'; }}
          >
            <FiArrowLeft /> Back to Projects
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: study.color,
              background: `${study.color}15`, border: `1px solid ${study.color}33`,
              borderRadius: 100, padding: '5px 14px',
            }}>
              Case Study
            </span>
            <button onClick={onClose} style={{
              width: 34, height: 34, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--input-bg)', border: '1px solid var(--border-light)',
              color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem',
            }}>
              <FiX />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 36px 40px' }} className="cs-body">

          {/* ── Hero banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{
              borderRadius: 18, marginBottom: 36,
              background: `linear-gradient(135deg, ${study.color}18, ${study.color}08)`,
              border: `1px solid ${study.color}22`,
              padding: '32px 36px', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${study.color}09 1px,transparent 1px),linear-gradient(90deg,${study.color}09 1px,transparent 1px)`,
              backgroundSize: '32px 32px',
            }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>{study.emoji}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  fontSize: '0.72rem', fontWeight: 700, color: study.color,
                  textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6,
                }}>
                  {study.subtitle}
                </div>
                <h1 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                  color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12,
                }}>
                  {study.title}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  {[study.tech, study.date].map(label => (
                    <span key={label} style={{
                      fontSize: '0.83rem', color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: study.color, display: 'inline-block', flexShrink: 0 }} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Overview ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ marginBottom: 36 }}>
            <SectionHeading color={study.color}>Project Overview</SectionHeading>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.97rem' }}>{study.overview}</p>
          </motion.div>

          {/* ── Gallery ── */}
          {study.images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={{ marginBottom: 36 }}>
              <SectionHeading color={study.color}>Gallery</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {study.images.map((img, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${study.color}22` }}
                    style={{
                      borderRadius: 14, overflow: 'hidden',
                      border: `1px solid ${study.color}22`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <img src={img.src} alt={img.alt}
                      style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 220 }}
                      loading="lazy" />
                    <div style={{
                      padding: '7px 12px',
                      background: `${study.color}0d`,
                      borderTop: `1px solid ${study.color}18`,
                      fontSize: '0.76rem', color: 'var(--text-muted)',
                    }}>
                      {img.alt}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── What I Built ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ marginBottom: 36 }}>
            <SectionHeading color={study.color}>What I Built</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 10 }}>
              {study.features.map((feat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    background: `${study.color}08`,
                    border: `1px solid ${study.color}1a`,
                    borderRadius: 12, padding: '12px 16px',
                  }}
                >
                  <FiCheckCircle style={{ color: study.color, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{feat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Tech Stack + Key Outcomes ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36 }}
            className="cs-two-col">

            <div style={{
              background: 'var(--bg-card)', border: `1px solid ${study.color}22`,
              borderRadius: 16, padding: '22px 24px',
            }}>
              <SectionHeading color={study.color}>Tech Stack</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {study.stack.map(s => (
                  <motion.span key={s} whileHover={{ scale: 1.08 }} style={{
                    padding: '5px 13px',
                    background: `${study.color}14`, border: `1px solid ${study.color}33`,
                    borderRadius: 100, fontSize: '0.78rem',
                    color: study.color, fontWeight: 600,
                  }}>{s}</motion.span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)', border: `1px solid ${study.color}22`,
              borderRadius: 16, padding: '22px 24px',
            }}>
              <SectionHeading color={study.color}>Key Outcomes</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {study.outcomes.map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{o.icon}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.6 }}>{o.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.a href={study.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${study.color}44` }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 26px',
                background: `linear-gradient(135deg, ${study.color}, ${study.color}bb)`,
                color: 'white', borderRadius: 12, fontWeight: 700, fontSize: '0.9rem',
                boxShadow: `0 0 20px ${study.color}33`,
              }}
            >
              <FiGithub /> View on GitHub
            </motion.a>
            <motion.button onClick={onClose} whileHover={{ scale: 1.04 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 26px',
                background: 'var(--input-bg)', border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)', borderRadius: 12,
                fontWeight: 600, fontSize: '0.9rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              }}
            >
              <FiArrowLeft /> Back to Portfolio
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cs-body { padding: 20px 18px 32px !important; }
          .cs-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}
