import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { Link } from 'react-scroll';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(124,58,237,0.15)',
      padding: '48px 0 32px',
      background: 'rgba(5,8,22,0.8)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 24, marginBottom: 32,
        }}>
          {/* Logo */}
          <div>
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.5rem',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', marginBottom: 6,
            }}>
              Adarsh.
            </div>
            <p style={{ color: '#475569', fontSize: '0.85rem', maxWidth: 260 }}>
              Full Stack Developer · Building practical web products with clean architecture.
            </p>
          </div>

          {/* Quick nav */}
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {navLinks.map(link => (
                <li key={link}>
                  <Link
                    to={link.toLowerCase()}
                    smooth duration={600} offset={-80}
                    style={{
                      padding: '6px 12px',
                      color: '#475569', fontSize: '0.85rem',
                      borderRadius: 6, cursor: 'pointer',
                      transition: 'color 0.2s',
                      display: 'block',
                    }}
                    onMouseEnter={e => e.target.style.color = '#94a3b8'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { icon: <FiGithub />, href: 'https://github.com/ad4rsh432', label: 'GitHub' },
              { icon: <FiLinkedin />, href: 'https://linkedin.com/in/adarsh-s-kumar-925607330', label: 'LinkedIn' },
              { icon: <FiMail />, href: 'mailto:adarshskumar432@gmail.com', label: 'Email' },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                style={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  color: '#64748b', fontSize: '1rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#7c3aed';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <p style={{ color: '#334155', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Adarsh. Designed and developed with intent.
          </p>
          <p style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#334155', fontSize: '0.82rem',
          }}>
            Built with <FiHeart style={{ color: '#7c3aed' }} /> React + Python (Django)
          </p>
        </div>
      </div>
    </footer>
  );
}
