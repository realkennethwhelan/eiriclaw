import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: 'Features', ga: 'Gnéithe' },
    { href: '#integrations', label: 'Integrations', ga: 'Comhtháthuithe' },
    { href: '#use-cases', label: 'Use Cases', ga: 'Cásanna Úsáide' },
    { href: '#download', label: 'Download', ga: 'Íoslódáil' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(5, 15, 8, 0.95)'
          : 'rgba(5, 15, 8, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(22, 155, 98, 0.2)'
          : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <svg
            width="22" height="24" viewBox="0 0 22 24"
            fill="#DC5028" fillRule="evenodd"
            style={{ filter: 'drop-shadow(0 0 8px rgba(220,80,40,0.6))' }}
          >
            <path d="M11 24 C7 24 4 21 4 17 C4 14.5 5 13 7 12 C4 11 2 9 2 6 C2 3 4.5 1 7 1 C8.5 1 10 2 10.5 4 C10.5 2 11 1 11 1 C11 1 11.5 2 11.5 4 C12 2 13.5 1 15 1 C17.5 1 20 3 20 6 C20 9 18 11 15 12 C17 13 18 14.5 18 17 C18 21 15 24 11 24 Z M11 4.5 L8.5 11 L11 12 L13.5 11 Z" />
          </svg>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#169B62' }}>Eiri</span>
            <span style={{ color: '#FF883E' }}>Claw</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '0.25rem' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: '#9DB8A4',
                textDecoration: 'none',
                padding: '0.5rem 0.875rem',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFFFFF'
                e.target.style.background = 'rgba(22, 155, 98, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#9DB8A4'
                e.target.style.background = 'transparent'
              }}
            >
              {lang === 'GA' ? link.ga : link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {['EN', 'GA'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? 'rgba(22,155,98,0.2)' : 'transparent',
                  color: lang === l ? '#169B62' : '#9DB8A4',
                  border: `1px solid ${lang === l ? 'rgba(22,155,98,0.4)' : 'transparent'}`,
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#download"
            className="hidden sm:block"
            style={{
              background: '#FF883E',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1.125rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ff9a5a'
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 6px 20px rgba(255,136,62,0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#FF883E'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            {lang === 'GA' ? 'Íoslódáil Anois' : 'Download Now'}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(22,155,98,0.3)',
              color: '#9DB8A4',
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '1.1rem',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(5, 15, 8, 0.98)',
            borderTop: '1px solid rgba(22, 155, 98, 0.2)',
            padding: '1rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                color: '#9DB8A4',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(26, 48, 32, 0.5)',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#169B62')}
              onMouseLeave={(e) => (e.target.style.color = '#9DB8A4')}
            >
              {lang === 'GA' ? link.ga : link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              background: '#FF883E',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginTop: '1rem',
              fontWeight: 700,
            }}
          >
            {lang === 'GA' ? 'Íoslódáil Anois' : 'Download Now'}
          </a>
        </div>
      )}
    </nav>
  )
}
