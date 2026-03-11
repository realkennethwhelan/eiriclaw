import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'

const terminalLines = [
  { prompt: '$ ', text: 'eiriclaw --start', color: '#169B62' },
  { prompt: '', text: 'Fáilte! EiriClaw v2.1.0 starting...', color: '#9DB8A4' },
  { prompt: '', text: 'Loading Irish locale... ✓', color: '#169B62' },
  { prompt: '', text: 'GDPR compliance verified... ✓', color: '#169B62' },
  { prompt: '', text: 'Local AI model initialised... ✓', color: '#169B62' },
  { prompt: '', text: 'Connected to desktop... ✓', color: '#169B62' },
  { prompt: '$ ', text: 'eiriclaw summarise report.pdf', color: '#169B62' },
  { prompt: '', text: 'Analysing 47 pages...', color: '#9DB8A4' },
  { prompt: '', text: 'Summary ready in 0.4ms ⚡', color: '#FF883E' },
  { prompt: '$ ', text: 'eiriclaw translate --to=ga', color: '#169B62' },
  { prompt: '', text: '"Hello" → "Dia duit" ☘', color: '#C9A84C' },
  { prompt: '$ ', text: '_', color: '#169B62' },
]

const shamrocks = [
  { top: '10%', left: '5%', size: '1.5rem', opacity: 0.06, delay: '0s', duration: '7s' },
  { top: '25%', left: '92%', size: '2rem', opacity: 0.05, delay: '1s', duration: '9s' },
  { top: '55%', left: '3%', size: '1rem', opacity: 0.07, delay: '2s', duration: '6s' },
  { top: '75%', left: '88%', size: '1.8rem', opacity: 0.04, delay: '0.5s', duration: '8s' },
  { top: '40%', left: '95%', size: '1.2rem', opacity: 0.06, delay: '3s', duration: '7s' },
  { top: '85%', left: '8%', size: '2.2rem', opacity: 0.05, delay: '1.5s', duration: '10s' },
  { top: '15%', left: '78%', size: '0.9rem', opacity: 0.08, delay: '2.5s', duration: '5s' },
  { top: '65%', left: '50%', size: '1.3rem', opacity: 0.03, delay: '4s', duration: '8s' },
]

export default function Hero() {
  const { lang } = useLang()
  const ga = lang === 'GA'
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1)
      }, visibleLines === 0 ? 800 : 400)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '68px',
        background: `
          radial-gradient(ellipse 80% 60% at 0% 0%, rgba(22,155,98,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 100% 100%, rgba(22,155,98,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 50%),
          #050F08
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Celtic pattern overlay */}
      <div
        className="celtic-pattern-bg"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Shamrocks */}
      {shamrocks.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            fontSize: s.size,
            opacity: s.opacity,
            animation: `float ${s.duration} ease-in-out infinite ${s.delay}`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ☘
        </div>
      ))}

      {/* Horizontal tricolor accent line */}
      <div
        style={{
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #169B62 0%, #169B62 33%, rgba(255,255,255,0.5) 33%, rgba(255,255,255,0.5) 66%, #FF883E 66%, #FF883E 100%)',
          opacity: 0.4,
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          width: '100%',
        }}
        className="hero-grid"
      >
        {/* Left Content */}
        <div style={{ animation: 'fade-in-up 0.8s ease-out forwards' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(22,155,98,0.12)',
              border: '1px solid rgba(22,155,98,0.3)',
              borderRadius: '2rem',
              padding: '0.375rem 1rem',
              marginBottom: '1.75rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>☘</span>
            <span style={{ color: '#169B62', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {ga ? 'Cúntóir AI Áitiúil na hÉireann' : "Éire's First Local AI Desktop Assistant"}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: '0.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>Eiri</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #169B62, #20c97a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Claw
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#9DB8A4',
              marginBottom: '0.75rem',
              fontWeight: 500,
            }}
          >
            {ga ? 'An Gníomhaire AI a Oibríonn go Háitiúil' : 'The AI Agent That Works Locally'}
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: '#FFFFFF',
              marginBottom: '2rem',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}
          >
            {ga
              ? <>Íoslódáil aon-cliceáil. Gan chumraíocht. Déanta d'Éirinn.{' '}<span style={{ color: '#9DB8A4' }}>100% príobháideach, áitiúil, comhlíontach le RGCS — ó Aillte an Mhothair go Sráid Ghrafton.</span></>
              : <>One-click install. Zero configuration. Built for Ireland.{' '}<span style={{ color: '#9DB8A4' }}>100% private, fully local, GDPR compliant — from the Cliffs of Moher to Grafton Street.</span></>
            }
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a
              href="#download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #169B62, #1ab870)',
                color: 'white',
                textDecoration: 'none',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.625rem',
                fontSize: '1rem',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(22,155,98,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(22,155,98,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(22,155,98,0.3)'
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm-1 4v4H8l4 4 4-4h-3V9h-2z"/>
              </svg>
              {ga ? 'Íoslódáil do Mac' : 'Download for Mac'}
            </a>
            <a
              href="#download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#169B62',
                textDecoration: 'none',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.625rem',
                fontSize: '1rem',
                fontWeight: 700,
                border: '2px solid rgba(22,155,98,0.5)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22,155,98,0.1)'
                e.currentTarget.style.borderColor = '#169B62'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(22,155,98,0.5)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 5.5C0 4.119 1.119 3 2.5 3h19C22.881 3 24 4.119 24 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-19C1.119 21 0 19.881 0 18.5v-13zm2.5-1C1.672 4.5 1 5.172 1 6v12c0 .828.672 1.5 1.5 1.5h19c.828 0 1.5-.672 1.5-1.5V6c0-.828-.672-1.5-1.5-1.5h-19z"/>
              </svg>
              {ga ? 'Íoslódáil do Windows' : 'Download for Windows'}
            </a>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '50,000+', label: ga ? 'Úsáideoirí' : 'Irish Users' },
              { value: '<1ms', label: ga ? 'Moill' : 'Latency' },
              { value: '100%', label: ga ? 'Áitiúil & Príobháideach' : 'Local & Private' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#169B62',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9DB8A4', marginTop: '0.2rem', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal Window */}
        <div
          style={{
            animation: 'float 7s ease-in-out infinite',
          }}
        >
          <div className="terminal" style={{ boxShadow: '0 0 60px rgba(22,155,98,0.15), 0 20px 60px rgba(0,0,0,0.5)' }}>
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span style={{ color: '#9DB8A4', fontSize: '0.78rem', marginLeft: '0.5rem', fontFamily: 'monospace' }}>
                eiriclaw — bash — 72x20
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#169B62' }}>● LIVE</span>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body" style={{ minHeight: '280px' }}>
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.25rem' }}>
                  {line.prompt && (
                    <span style={{ color: '#169B62', fontFamily: 'monospace' }}>{line.prompt}</span>
                  )}
                  <span
                    style={{
                      color: line.color,
                      fontFamily: 'monospace',
                      fontSize: '0.82rem',
                      paddingLeft: line.prompt ? '0' : '1.25rem',
                    }}
                  >
                    {line.text}
                    {i === visibleLines - 1 && line.text === '_' && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '1em',
                          background: '#169B62',
                          animation: 'terminal-blink 1s step-end infinite',
                          verticalAlign: 'text-bottom',
                        }}
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge below terminal */}
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {(ga
              ? ['Comhlíontach RGCS', 'Gan Sceitheadh Sonraí', 'Déanta in Éirinn']
              : ['GDPR Compliant', 'Zero Data Leakage', 'Irish Made']
            ).map((badge) => (
              <span
                key={badge}
                style={{
                  background: 'rgba(22,155,98,0.1)',
                  border: '1px solid rgba(22,155,98,0.25)',
                  color: '#169B62',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #050F08)',
          pointerEvents: 'none',
        }}
      />

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
