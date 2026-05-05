import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiArrowRight } from 'react-icons/fi';
import CaseStudy from './CaseStudy';

const projects = [
  {
    id: 'tutorfinder',
    title: 'TutorFinder Platform',
    subtitle: 'Full-Stack EdTech Application',
    description:
      'Full-stack tutoring platform with dual user dashboards, geolocation-based tutor discovery, and end-to-end session lifecycle management. Built with Django REST backend and dynamic frontend.',
    longDesc:
      'TutorFinder enables students to search for tutors by subject, location, and ratings. Tutors can manage availability, subjects taught, and session history. The admin panel provides full control over user moderation and analytics.',
    tags: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'REST API'],
    color: '#7c3aed',
    emoji: '📚',
    github: 'https://github.com/ad4rsh432',
    features: ['Dual Dashboard', 'Geolocation Search', 'Session Management', 'Rating System'],
  },
  {
    id: 'freshmart',
    title: 'FreshMart Grocery Platform',
    subtitle: 'Multi-Vendor Marketplace',
    description:
      'Modern role-based grocery marketplace with dedicated buyer, seller, and admin workflows, real-time cart handling, and comprehensive order tracking system.',
    longDesc:
      'FreshMart provides a complete e-commerce ecosystem where vendors list products, buyers shop by category, and admins oversee the entire marketplace. Features include cart management, order history, and vendor analytics.',
    tags: ['Django', 'Vanilla CSS', 'JavaScript', 'SQLite', 'Bootstrap'],
    color: '#06b6d4',
    emoji: '🛒',
    github: 'https://github.com/ad4rsh432',
    features: ['Multi-Role Auth', 'Real-time Cart', 'Order Tracking', 'Admin Dashboard'],
  },
  {
    id: 'cinemax',
    title: 'Cinemax Booking App',
    subtitle: 'Movie Ticket Booking System',
    description:
      'Feature-rich movie ticket booking system with interactive seat selection, multiple showtime scheduling, payment flow simulation, and booking management.',
    longDesc:
      'Cinemax replicates a real-world booking experience with a BookMyShow-inspired seat map, dynamic showtime management, and a complete booking lifecycle from selection to confirmation.',
    tags: ['Django', 'Python', 'CSS', 'JavaScript', 'SQLite'],
    color: '#f59e0b',
    emoji: '🎬',
    github: 'https://github.com/ad4rsh432',
    features: ['Seat Selection Map', 'Multiple Showtimes', 'Booking History', 'Admin Panel'],
  },
];

function ProjectCard({ project, index, onCaseStudy }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? project.color + '44' : 'var(--border-light)'}`,
        borderRadius: 20,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        willChange: 'transform',
        transform: hovered ? 'translateY(-8px) translateZ(0)' : 'translateZ(0)',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 20px 60px ${project.color}22` : 'none',
      }}
    >
      {/* Banner */}
      <div style={{
        height: 180,
        background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${project.color}22`,
      }}>
        {/* Animated grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(${project.color}10 1px, transparent 1px),
            linear-gradient(90deg, ${project.color}10 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s',
        }} />

        <motion.div
          animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: '5rem', position: 'relative', zIndex: 1 }}
        >
          {project.emoji}
        </motion.div>

        {/* Number badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: `${project.color}22`,
          border: `1px solid ${project.color}44`,
          borderRadius: 8, padding: '4px 10px',
          fontSize: '0.75rem', color: project.color, fontWeight: 700,
        }}>
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: '0.75rem', color: project.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {project.subtitle}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '1.25rem', color: '#f1f5f9', marginBottom: 12,
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
          {project.description}
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.features.map(f => (
            <span key={f} style={{
              padding: '3px 10px',
              background: `${project.color}14`,
              border: `1px solid ${project.color}33`,
              borderRadius: 100, fontSize: '0.75rem',
              color: project.color, fontWeight: 500,
            }}>✓ {f}</span>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100, fontSize: '0.75rem',
              color: '#64748b', fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12 }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, color: '#94a3b8',
              fontSize: '0.85rem', fontWeight: 500,
            }}
          >
            <FiGithub /> Code
          </motion.a>
          <motion.button
            onClick={() => onCaseStudy(project.id)}
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${project.color}55` }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px',
              background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
              borderRadius: 10, color: 'white',
              fontSize: '0.85rem', fontWeight: 600,
              cursor: 'pointer', border: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Case Study <FiArrowRight />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [headRef, headInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  return (
    <section id="projects" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', right: '-50px',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} className="decorative-blur" />

      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div className="section-tag">Projects</div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700, color: '#f1f5f9',
          }}>
            Selected case studies built for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              real workflows
            </span>
          </h2>
          <p style={{ color: '#64748b', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            End-to-end projects with measurable outcomes and production-ready architecture.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }} className="projects-grid">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} onCaseStudy={setActiveCaseStudy} />
          ))}
        </div>
      </div>

      {activeCaseStudy && (
        <CaseStudy projectId={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />
      )}

      <style>{`
        @media (max-width: 900px) { .projects-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 600px) and (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
