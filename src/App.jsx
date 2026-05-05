import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Adarsh | Full Stack Developer Portfolio</title>
          <meta name="description" content="Portfolio of Adarsh, a full stack developer building reliable web products with Django and JavaScript. Open to internship and junior roles." />
          <meta name="keywords" content="Adarsh, Full Stack Developer, Django, Python, React, Portfolio, Web Developer" />
          <meta name="author" content="Adarsh S Kumar" />
          <meta property="og:title" content="Adarsh | Full Stack Developer" />
          <meta property="og:description" content="Building reliable web products from idea to production." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </Helmet>

        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', transition: 'background 0.35s ease' }}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}
