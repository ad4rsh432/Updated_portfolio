import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timeline = [
  {
    period: '2022 – 2025',
    title: 'Bachelor of Computer Applications',
    org: 'University',
    type: 'Education',
    color: '#7c3aed',
    icon: '🎓',
    bullets: [
      'Software engineering & algorithms',
      'Database systems & SQL',
      'Web technologies & development',
      'Data structures & OOP',
    ],
  },
  {
    period: '2025 – 2026',
    title: 'Python Full Stack Development',
    org: 'Professional Course · Brototype',
    type: 'Course',
    color: '#06b6d4',
    icon: '🐍',
    bullets: [
      'Python, Django & REST API development',
      'Frontend with HTML, CSS & JavaScript',
      'Database design with MySQL & PostgreSQL',
      'Built real-world full-stack projects',
    ],
  },
  {
    period: '2024 – 2026',
    title: 'Independent Projects',
    org: 'Self-Directed',
    type: 'Projects',
    color: '#f59e0b',
    icon: '🚀',
    bullets: [
      'TutorFinder full-stack platform',
      'FreshMart multi-vendor marketplace',
      'Cinemax movie booking system',
      'Open source contributions',
    ],
  },
];

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        marginBottom: 48,
        position: 'relative',
      }}
      className="timeline-item-wrapper"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
        style={{
          width: '45%',
          background: 'var(--bg-card)',
          border: `1px solid ${item.color}22`,
          borderRadius: 20, padding: 28,
          backdropFilter: 'blur(20px)',
          position: 'relative',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        className="timeline-card"
      >
        {/* Top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${item.color}, ${item.color}44)`,
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${item.color}18`,
            border: `1px solid ${item.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', flexShrink: 0,
          }}>
            {item.icon}
          </div>
          <div>
            <div style={{
              fontSize: '0.72rem', fontWeight: 600,
              color: item.color, textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: 2,
            }}>
              {item.type} · {item.period}
            </div>
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '1.05rem', color: '#f1f5f9', lineHeight: 1.3,
            }}>
              {item.title}
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>
              {item.org}
            </div>
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.07 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: item.color, flexShrink: 0,
                boxShadow: `0 0 5px ${item.color}`,
              }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.87rem' }}>{bullet}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring' }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          background: item.color,
          boxShadow: `0 0 20px ${item.color}, 0 0 40px ${item.color}66`,
          zIndex: 1,
        }}
        className="center-dot"
      />
    </div>
  );
}

export default function Experience() {
  const [headRef, headInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="experience" style={{
      padding: '120px 0', position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(13,17,23,0.4) 50%, transparent)',
    }}>
      <div style={{
        position: 'absolute', top: '40%', right: '-80px',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} className="decorative-blur" />

      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-tag">Experience</div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
          }}>
            Education &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              professional exposure
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)',
            transform: 'translateX(-50%)',
          }} className="center-line" />

          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-item-wrapper { justify-content: flex-start !important; }
          .timeline-card { width: 100% !important; }
          .center-line { display: none !important; }
          .center-dot { display: none !important; }
        }
      `}</style>
    </section>
  );
}
