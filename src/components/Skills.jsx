import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: '#7c3aed',
    skills: [
      { name: 'HTML / CSS', level: 90 },
      { name: 'JavaScript', level: 70 },
      { name: 'React.js', level: 60 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#06b6d4',
    skills: [
      { name: 'Python / Django', level: 86 },
      { name: 'REST API Development', level: 60 },
      { name: 'Flask', level: 60 },
    ],
  },
  {
    title: 'Database, Languages and Tools',
    icon: '🗄️',
    color: '#f59e0b',
    skills: [
      { name: 'MySQL / PostgreSQL', level: 90 },
      { name: 'SQLite', level: 85 },
      { name: 'MongoDB', level: 85 },
    ],
    chips: ['C', 'C++', 'Java', 'Git', 'GitHub', 'VS Code', 'Postman'],
  },
];

function SkillBar({ name, level, color, delay }) {
  // Lower threshold so bars trigger earlier on mobile scroll
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.8rem', color: color, fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{
        height: 6, borderRadius: 3,
        background: 'var(--input-border, rgba(255,255,255,0.06))',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%', borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 8px ${color}55`,
            position: 'relative',
            transformOrigin: 'left',
            willChange: 'transform',
          }}
        >
          <div style={{
            position: 'absolute', right: 0, top: '50%',
            transform: 'translateY(-50%)',
            width: 10, height: 10, borderRadius: '50%',
            background: color, boxShadow: `0 0 6px ${color}`,
          }} />
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ category, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${category.color}22`,
        borderRadius: 20, padding: 28,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Card accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${category.color}, ${category.color}44)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${category.color}18`,
          border: `1px solid ${category.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
        }}>
          {category.icon}
        </div>
        <h3 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '1.1rem', color: 'var(--text-primary)',
        }}>
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      {category.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          color={category.color}
          delay={i * 0.15}
        />
      ))}

      {/* Chips */}
      {category.chips && (
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {category.chips.map(chip => (
            <motion.span
              key={chip}
              whileHover={{ scale: 1.1 }}
              style={{
                padding: '4px 12px',
                background: `${category.color}14`,
                border: `1px solid ${category.color}33`,
                borderRadius: 100, fontSize: '0.78rem',
                color: category.color, fontWeight: 600,
              }}
            >{chip}</motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const [headRef, headInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="skills" style={{
      padding: '120px 0', position: 'relative',
      background: 'linear-gradient(180deg, rgba(13,17,23,0.5) 0%, transparent 100%)',
    }}>
      {/* Decorative bg */}
      <div style={{
        position: 'absolute', top: '30%', left: '-100px',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} className="decorative-blur" />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div className="section-tag">Skills</div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
          }}>
            Technical capabilities across{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              the full stack
            </span>
          </h2>
          <p style={{ color: '#64748b', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            From database design to polished frontends — I build across the entire web stack.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }} className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 600px) and (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
