import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// All use y-only translation — runs on GPU compositor, no layout recalc
const fadeSlide = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = fadeSlide;

function AnimatedCard({ num, label, icon, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ scale: 1.04, y: -6 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '28px 24px',
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
        cursor: 'default',
        willChange: 'transform',
        transform: 'translateZ(0)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2rem',
        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', marginBottom: 6,
      }}>{num}</div>
      <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

export default function About() {
  const [headRef, headInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [leftRef, leftInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [rightRef, rightInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '50%', right: '-100px',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', transform: 'translateY(-50%)',
      }} className="decorative-blur" />

      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div className="section-tag">About Me</div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700, lineHeight: 1.2, color: '#f1f5f9',
          }}>
            Pragmatic developer with strong{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              backend fundamentals
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'stretch',
        }} className="about-grid">

          {/* Left - Text */}
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            variants={fadeSlide}
            style={{ willChange: 'transform, opacity', height: '100%' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20, padding: 32,
              backdropFilter: 'blur(20px)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))',
                border: '1px solid rgba(124,58,237,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: 20,
              }}>
                👨‍💻
              </div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.3rem',
                marginBottom: 16, color: '#f1f5f9',
              }}>
                Who I Am
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
                I'm a <strong style={{ color: '#f1f5f9' }}>BCA graduate</strong> who enjoys solving practical product problems through code.
                My core stack includes <strong style={{ color: '#7c3aed' }}>Django, Python, JavaScript, SQL</strong>, and modern frontend fundamentals.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24, flexGrow: 1 }}>
                I care deeply about maintainability, readable code, stable feature delivery, and creating interfaces that help users finish tasks quickly and efficiently.
              </p>

              {/* Traits */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Problem Solver', 'Clean Code', 'Team Player', 'Fast Learner', 'Detail-Oriented'].map(trait => (
                  <span key={trait} style={{
                    padding: '6px 14px',
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    borderRadius: 100, fontSize: '0.8rem',
                    color: '#a78bfa', fontWeight: 500,
                  }}>{trait}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Metrics */}
          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            variants={fadeSlide}
            style={{ willChange: 'transform, opacity', height: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              height: '100%',
            }}>
              <AnimatedCard num="10+" label="Technologies Used" icon="⚡" delay={0} />
              <AnimatedCard num="3+" label="Projects Built" icon="🚀" delay={0.1} />
              <AnimatedCard num="2025" label="BCA Graduate" icon="🎓" delay={0.2} />
              <AnimatedCard num="1" label="Course Completed" icon="🐍" delay={0.3} />
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
