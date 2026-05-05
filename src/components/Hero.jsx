import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-scroll';

/* ── Particle canvas (desktop only — skipped on touch devices) ── */
const ParticleField = ({ isMobile }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;           // skip entirely on mobile
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.35, dy: (Math.random() - 0.5) * 0.35,
        op: Math.random() * 0.45 + 0.08,
      });
    }

    let lastTime = 0;
    const draw = (ts) => {
      // Throttle to ~40fps on desktop — smooth enough, saves battery
      if (ts - lastTime < 25) { animId = requestAnimationFrame(draw); return; }
      lastTime = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.op})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      // Only connect when particle count is reasonable
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', opacity: 0.7,
    }} />
  );
};

/* ── Shared fade-up variants (reused across all child elements) ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 900;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="home" style={{
      minHeight: isMobile ? 'auto' : '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: isMobile ? 92 : 80,
      paddingBottom: isMobile ? 56 : 0,
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', zIndex: 0 }}>
        <ParticleField isMobile={isMobile} />
        {/* Orbs — CSS only, zero JS cost */}
        <div style={{
          position: 'absolute', top: '12%', left: '3%', width: 520, height: 520,
          background: 'radial-gradient(circle, var(--orb-a) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none',
        }} className="decorative-blur" />
        <div style={{
          position: 'absolute', bottom: '8%', right: '3%', width: 420, height: 420,
          background: 'radial-gradient(circle, var(--orb-b) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none',
        }} className="decorative-blur" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: isMobile ? 36 : 64,
          alignItems: 'center',
          textAlign: isMobile ? 'center' : 'left',
        }}>

          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 144,
                height: 144,
                margin: '0 auto -10px',
                borderRadius: '50%',
                padding: 3,
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4, #f59e0b)',
                boxShadow: '0 14px 40px rgba(124,58,237,0.24)',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
                border: '4px solid var(--bg-primary)',
              }}>
                <img
                  src="/adarshpfp.jpg"
                  alt="Adarsh S Kumar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* ── Left content ── */}
          <div>
            {/* Availability badge */}
            <motion.div {...fadeUp(0.1)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.28)',
              borderRadius: 100,
              padding: isMobile ? '6px 12px' : '6px 16px',
              marginBottom: isMobile ? 18 : 22,
              maxWidth: isMobile ? '100%' : 'none',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 8px #22c55e', flexShrink: 0,
                animation: 'pulse 2.5s ease-in-out infinite',
              }} className="mobile-static-animation" />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Open to Internship &amp; Junior Full Stack Roles
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fadeUp(0.18)} style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: isMobile ? 'clamp(2rem, 12vw, 2.85rem)' : 'clamp(2rem, 5vw, 3.7rem)',
              fontWeight: 800, lineHeight: 1.1,
              color: 'var(--text-primary)', marginBottom: isMobile ? 14 : 18,
            }}>
              Building{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>reliable</span>
              <br />web products.
            </motion.h1>

            {/* Description */}
            <motion.p {...fadeUp(0.25)} style={{
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              maxWidth: 520, marginBottom: isMobile ? 14 : 18,
              marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0,
            }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Adarsh</strong>, a full stack developer focused on
              practical Django &amp; JavaScript solutions with clean architecture and thoughtful UX.
            </motion.p>

            {/* Typing */}
            <motion.p {...fadeUp(0.3)} style={{ marginBottom: isMobile ? 24 : 30, fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Focused on{' '}
              {isMobile ? (
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  fontWeight: 700,
                }}>
                  Django Development
                </span>
              ) : (
                <TypeAnimation
                  sequence={['Backend APIs', 2000, 'Django Development', 2000, 'Full Stack Solutions', 2000, 'Database Design', 2000]}
                  wrapper="span" repeat={Infinity}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    fontWeight: 700,
                  }}
                />
              )}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.36)} style={{
              display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 28 : 36,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
              <Link to="projects" smooth duration={600} offset={-80} style={{ width: isMobile ? '100%' : 'auto' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: isMobile ? '100%' : 'auto',
                    padding: '13px 26px',
                    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                    color: 'white', border: 'none', borderRadius: 12,
                    fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
                    // GPU compositing
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                  }}
                >
                  View My Work <FiArrowRight />
                </motion.button>
              </Link>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: isMobile ? '100%' : 'auto',
                  padding: '13px 26px',
                  border: '1px solid rgba(124,58,237,0.3)',
                  background: 'rgba(124,58,237,0.05)',
                  color: 'var(--text-primary)', borderRadius: 12,
                  fontWeight: 600, fontSize: '0.95rem',
                  transform: 'translateZ(0)', willChange: 'transform',
                }}
              >
                <FiMail /> Contact Me
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fadeUp(0.42)} style={{
              display: 'flex', gap: 12,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
              {[
                { icon: <FiGithub />, href: 'https://github.com/ad4rsh432', label: 'GitHub' },
                { icon: <FiLinkedin />, href: 'https://linkedin.com/in/adarsh-s-kumar-925607330', label: 'LinkedIn' },
                { icon: <FiMail />, href: 'mailto:adarshskumar432@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.92 }}
                  style={{
                    width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10, border: '1px solid var(--border-light)',
                    background: 'var(--input-bg)', color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    transform: 'translateZ(0)', willChange: 'transform',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7c3aed'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'var(--input-bg)'; }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile (desktop only) ── */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
                transform: 'translateZ(0)',
              }}
            >
              {/* Rotating ring — CSS animation (zero JS overhead) */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: -12, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f59e0b, #7c3aed)',
                  padding: 3, zIndex: 0,
                  animation: 'spin 14s linear infinite',
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)' }} />
                </div>

                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 255, height: 255, borderRadius: '50%', overflow: 'hidden',
                  border: '3px solid rgba(124,58,237,0.4)',
                  boxShadow: '0 0 40px rgba(124,58,237,0.28)',
                }}>
                  <img src="/adarshpfp.jpg" alt="Adarsh S Kumar"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 18%',
                    }} />
                </div>

                {/* Floating badge — CSS animation */}
                <div style={{
                  position: 'absolute', bottom: -16, right: -20, zIndex: 2,
                  background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                  borderRadius: 12, padding: '8px 14px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.8rem', fontWeight: 600, color: 'white',
                  boxShadow: '0 8px 28px rgba(124,58,237,0.4)',
                  animation: 'floatBadge 3s ease-in-out infinite',
                }}>
                  💻 Full Stack Builder
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {[{ num: '3+', label: 'Projects' }, { num: '1', label: 'Course' }, { num: '10+', label: 'Technologies' }].map(({ num, label }) => (
                  <motion.div key={label} whileHover={{ scale: 1.06, y: -4 }}
                    style={{
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: 12, padding: '12px 17px', textAlign: 'center',
                      transform: 'translateZ(0)', willChange: 'transform',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.35rem',
                      background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{num}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll cue — CSS animation only */}
      {!isMobile && (
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0.6,
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>SCROLL</span>
        <div style={{
          width: 22, height: 36, borderRadius: 11,
          border: '2px solid rgba(124,58,237,0.4)',
          display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            animation: 'scrollDot 1.6s ease-in-out infinite',
          }} className="mobile-static-animation" />
        </div>
      </div>
      )}

      <style>{`
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:.6;transform:scale(1.4);}
        }
        @keyframes spin {
          from{transform:rotate(0deg);}
          to{transform:rotate(360deg);}
        }
        @keyframes floatBadge {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-8px);}
        }
        @keyframes scrollDot {
          0%,100%{transform:translateY(0);opacity:1;}
          50%{transform:translateY(7px);opacity:.4;}
        }
      `}</style>
    </section>
  );
}
