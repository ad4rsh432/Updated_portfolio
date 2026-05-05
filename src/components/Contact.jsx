import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/adarshskumar432@gmail.com';

const contactCards = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'adarshskumar432@gmail.com',
    href: 'mailto:adarshskumar432@gmail.com',
    color: '#7c3aed',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'Connect for opportunities',
    href: 'https://linkedin.com/in/adarsh-s-kumar-925607330',
    color: '#06b6d4',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'github.com/ad4rsh432',
    href: 'https://github.com/ad4rsh432',
    color: '#f59e0b',
  },
];

export default function Contact() {
  const [headRef, headInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [leftRef, leftInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [rightRef, rightInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [focused, setFocused] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(contactEndpoint, {
        ...form,
        _subject: `Portfolio message from ${form.name}`,
        _template: 'table',
        _captcha: 'false',
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form failed:', error);
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '14px 16px',
    background: 'var(--input-bg)',
    border: `1px solid ${focused === name ? 'rgba(124,58,237,0.6)' : 'var(--input-border)'}`,
    borderRadius: 12,
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(124,58,237,0.15)' : 'none',
  });

  return (
    <section id="contact" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} className="decorative-blur" />

      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div className="section-tag">Contact</div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
          }}>
            Let's build something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              useful together
            </span>
          </h2>
          <p style={{ color: '#64748b', marginTop: 12, maxWidth: 440, margin: '12px auto 0' }}>
            Open to internships, junior roles, and freelance collaborations. Let's talk!
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: 40, alignItems: 'start',
        }} className="contact-grid">

          {/* Left - Contact cards */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 40 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, willChange: 'transform' }}
          >
            {contactCards.map(card => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: 20,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 16, textDecoration: 'none',
                  backdropFilter: 'blur(20px)',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${card.color}44`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: card.color, flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{card.label}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 2 }}>{card.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                padding: 20,
                background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(6,182,212,0.08))',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 16,
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#22c55e', flexShrink: 0,
                boxShadow: '0 0 10px #22c55e',
                animation: 'pulse 2s infinite',
              }} className="mobile-static-animation" />
              <div>
                <div style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.9rem' }}>Available for work</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Open to internship & junior roles</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            ref={rightRef}
            initial={{ opacity: 0, y: 40 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20, padding: 32,
              backdropFilter: 'blur(20px)',
              willChange: 'transform',
            }}
          >
            <h3 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: 24,
            }}>
              Send a Message
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                  Your Name
                </label>
                <input
                  type="text" name="name" id="contact-name"
                  value={form.name} onChange={handleChange}
                  placeholder="" required
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email" name="email" id="contact-email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required
                  style={inputStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  name="message" id="contact-message"
                  value={form.message} onChange={handleChange}
                  rows={5} placeholder="Tell me about your project or opportunity..."
                  required
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 0 40px rgba(124,58,237,0.5)' } : {}}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', padding: '14px',
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                    : 'linear-gradient(135deg, #7c3aed, #9333ea)',
                  color: 'white', border: 'none', borderRadius: 12,
                  fontWeight: 700, fontSize: '0.95rem', cursor: status === 'loading' ? 'wait' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                }}
              >
                {status === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                  />
                )}
                {status === 'success' && <FiCheckCircle />}
                {status === 'error' && <FiAlertCircle />}
                {!status && <FiSend />}
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed. Try email directly.' : 'Send Message'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.7;transform:scale(1.4);} }
      `}</style>
    </section>
  );
}
