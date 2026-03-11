import { useState } from 'react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Download', href: '#download' },
    { label: 'Configuration', href: '#config' },
  ],
  Legal: [
    { label: 'Príobháideacht / Privacy', href: '#' },
    { label: 'Ceadúnas / License', href: '#' },
    { label: 'GDPR Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  Community: [
    { label: 'GitHub', href: '#' },
    { label: 'Discord Server', href: '#' },
    { label: 'Reddit r/eirirlaw', href: '#' },
    { label: 'Blog / Blag', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Support: [
    { label: 'Teagmháil / Contact', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'System Status', href: '#' },
    { label: 'Release Notes', href: '#' },
  ],
}

// Irish harp SVG (simplified Unicode-based)
function HarpIcon() {
  return (
    <svg
      viewBox="0 0 40 60"
      width="24"
      height="36"
      fill="none"
      style={{ opacity: 0.7 }}
    >
      {/* Soundboard / pillar */}
      <path
        d="M8 8 Q6 30 8 54"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Neck (curved top) */}
      <path
        d="M8 8 Q24 2 30 12"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Forepillar */}
      <path
        d="M30 12 Q34 30 30 54"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Base */}
      <path
        d="M8 54 Q18 58 30 54"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Strings */}
      {[14, 17, 20, 23, 26, 29, 32, 36, 40, 44, 48].map((y, i) => {
        const x2 = 28 - i * 1.5
        return (
          <line
            key={i}
            x1="9"
            y1={y}
            x2={Math.max(x2, 12)}
            y2={y}
            stroke="#C9A84C"
            strokeWidth="0.8"
            opacity="0.8"
          />
        )
      })}
    </svg>
  )
}

export default function Footer() {
  const [emailFocused, setEmailFocused] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      style={{
        background: '#050F08',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Irish tricolor top border */}
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, #169B62 0%, #169B62 33.3%, rgba(255,255,255,0.6) 33.3%, rgba(255,255,255,0.6) 66.6%, #FF883E 66.6%, #FF883E 100%)',
        }}
      />

      {/* Celtic pattern subtle bg */}
      <div
        className="celtic-diamond-bg"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Main footer content */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.5rem 2rem',
          position: 'relative',
        }}
      >
        {/* Top Section: Brand + Newsletter */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            marginBottom: '3.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(26,48,32,0.8)',
          }}
          className="footer-top"
        >
          {/* Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '2rem',
                  filter: 'drop-shadow(0 0 10px rgba(22,155,98,0.5))',
                }}
              >
                ☘
              </span>
              <div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span style={{ color: '#169B62' }}>Eiri</span>
                  <span style={{ color: '#FF883E' }}>Claw</span>
                </div>
                <div
                  style={{
                    color: '#9DB8A4',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    fontStyle: 'italic',
                  }}
                >
                  Déanta in Éirinn
                </div>
              </div>
            </div>

            <p
              style={{
                color: '#9DB8A4',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                maxWidth: '360px',
                marginBottom: '1.5rem',
              }}
            >
              Éire's first truly local AI desktop assistant. Built with privacy,
              performance, and the Irish spirit in mind. From Dublin to Dingle,
              EiriClaw works for you.
            </p>

            {/* Irish harp + Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <HarpIcon />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { icon: '𝕏', label: 'Twitter / X', href: '#' },
                  { icon: '🐙', label: 'GitHub', href: '#' },
                  { icon: '💬', label: 'Discord', href: '#' },
                  { icon: '📘', label: 'LinkedIn', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    title={social.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(22,155,98,0.08)',
                      border: '1px solid rgba(22,155,98,0.2)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9DB8A4',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(22,155,98,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(22,155,98,0.4)'
                      e.currentTarget.style.color = '#169B62'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(22,155,98,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(22,155,98,0.2)'
                      e.currentTarget.style.color = '#9DB8A4'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '1.05rem',
                marginBottom: '0.5rem',
              }}
            >
              Stay in the loop — <span style={{ color: '#169B62' }}>Fan ar an eolas</span>
            </h3>
            <p style={{ color: '#9DB8A4', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Get release notes, Irish tech news, and EiriClaw updates.
              No spam — ever. Unsubscribe anytime.
            </p>

            {subscribed ? (
              <div
                style={{
                  background: 'rgba(22,155,98,0.12)',
                  border: '1px solid rgba(22,155,98,0.3)',
                  borderRadius: '0.625rem',
                  padding: '1rem',
                  color: '#169B62',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>☘</span>
                <span>Go raibh maith agat! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="your@email.ie"
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    background: 'rgba(12,28,16,0.8)',
                    border: `1px solid ${emailFocused ? 'rgba(22,155,98,0.5)' : 'rgba(26,48,32,0.8)'}`,
                    borderRadius: '0.5rem',
                    padding: '0.625rem 1rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#169B62',
                    color: 'white',
                    border: 'none',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1ab870'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#169B62'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Liostáil ☘
                </button>
              </form>
            )}

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {['GDPR', 'DPC Registered', 'No Spam'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    color: '#9DB8A4',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ color: '#169B62' }}>✓</span> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        color: '#9DB8A4',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        transition: 'color 0.2s',
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#169B62')}
                      onMouseLeave={(e) => (e.target.style.color = '#9DB8A4')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(26,48,32,0.8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div
            style={{
              color: '#9DB8A4',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span>© 2026 EiriClaw</span>
            <span style={{ color: 'rgba(26,48,32,1)' }}>·</span>
            <span style={{ color: '#169B62' }}>Éire</span>
            <span style={{ color: 'rgba(26,48,32,1)' }}>·</span>
            <span>
              Déanta le{' '}
              <span style={{ color: '#FF883E' }}>❤</span>
              {' '}in Éirinn
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy / Príobháideacht', href: '#' },
              { label: 'License / Ceadúnas', href: '#' },
              { label: 'Contact / Teagmháil', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: '#9DB8A4',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#169B62')}
                onMouseLeave={(e) => (e.target.style.color = '#9DB8A4')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: 'rgba(26,48,32,0.6)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            fontStyle: 'italic',
          }}
        >
          Is fearr Gaeilge bhriste ná Béarla cliste ☘
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
