import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LangContext'

const integrations = [
  { name: 'WhatsApp', icon: '💬', color: '#25D366', desc: 'Send commands from anywhere' },
  { name: 'Telegram', icon: '✈️', color: '#0088cc', desc: 'Bot-based desktop control' },
  { name: 'Discord', icon: '🎮', color: '#5865F2', desc: 'Community & automation' },
  { name: 'Slack', icon: '⚡', color: '#4A154B', desc: 'Team workflow automation' },
  { name: 'MS Teams', icon: '💼', color: '#6264A7', desc: 'Enterprise integration' },
  { name: 'Google', icon: '🔵', color: '#4285F4', desc: 'Workspace automation' },
  { name: 'Notion', icon: '📝', color: '#FFFFFF', desc: 'Knowledge management' },
  { name: 'Obsidian', icon: '💎', color: '#7C3AED', desc: 'Local notes & AI search' },
  { name: 'WhatsApp', icon: '💬', color: '#25D366', desc: 'Send commands from anywhere' },
  { name: 'Telegram', icon: '✈️', color: '#0088cc', desc: 'Bot-based desktop control' },
  { name: 'Discord', icon: '🎮', color: '#5865F2', desc: 'Community & automation' },
  { name: 'Slack', icon: '⚡', color: '#4A154B', desc: 'Team workflow automation' },
  { name: 'MS Teams', icon: '💼', color: '#6264A7', desc: 'Enterprise integration' },
  { name: 'Google', icon: '🔵', color: '#4285F4', desc: 'Workspace automation' },
  { name: 'Notion', icon: '📝', color: '#FFFFFF', desc: 'Knowledge management' },
  { name: 'Obsidian', icon: '💎', color: '#7C3AED', desc: 'Local notes & AI search' },
]

const flowStepsEN = [
  { label: 'Your Phone', sub: 'Send message', icon: '📱', side: 'left' },
  { label: 'EiriClaw', sub: 'AI interprets', icon: '☘', side: 'center' },
  { label: 'Your Desktop', sub: 'Action executed', icon: '🖥️', side: 'right' },
]
const flowStepsGA = [
  { label: 'Do Ghuthán', sub: 'Seol teachtaireacht', icon: '📱', side: 'left' },
  { label: 'EiriClaw', sub: 'Léirmhíníonn an AI', icon: '☘', side: 'center' },
  { label: 'Do Ríomhaire', sub: 'Gníomh Déanta', icon: '🖥️', side: 'right' },
]

function IntegrationChip({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        background: hovered ? 'rgba(22,155,98,0.12)' : 'rgba(12,28,16,0.8)',
        border: `1px solid ${hovered ? 'rgba(22,155,98,0.4)' : 'rgba(22,155,98,0.15)'}`,
        borderRadius: '0.75rem',
        padding: '0.75rem 1.25rem',
        cursor: 'default',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(22,155,98,0.1)' : 'none',
        margin: '0 0.5rem',
        minWidth: '160px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
      <div>
        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
        <div style={{ color: '#9DB8A4', fontSize: '0.72rem' }}>{item.desc}</div>
      </div>
    </div>
  )
}

export default function Integrations() {
  const { lang } = useLang()
  const ga = lang === 'GA'
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="integrations"
      ref={sectionRef}
      style={{
        background: '#050F08',
        padding: '6rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(22,155,98,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '0 1.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#169B62',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          <span>☘</span>
          <span>Comhtháthuithe / Integrations</span>
          <span>☘</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          Nasc le{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF883E, #ffaa6e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            d'aipeanna
          </span>
        </h2>
        <p style={{ color: '#9DB8A4', fontSize: '1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
          {ga
            ? 'Nasc le d\'aipeanna — Rialaigh do ríomhaire ó áit ar bith in Éirinn. Ó Aillte an Mhothair go Sráid Ghrafton.'
            : 'Connect with your apps — Control your desktop from anywhere in Ireland. From the Cliffs of Moher to Grafton Street.'
          }
        </p>
      </div>

      {/* Scrolling Logo Carousel */}
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '3rem',
        }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(to right, #050F08, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(to left, #050F08, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            animation: 'scroll-left 35s linear infinite',
            paddingBottom: '0.5rem',
          }}
        >
          {integrations.map((item, i) => (
            <IntegrationChip key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Connection Flow Diagram */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}
      >
        <div
          style={{
            background: 'rgba(12,28,16,0.8)',
            border: '1px solid rgba(22,155,98,0.2)',
            borderRadius: '1.25rem',
            padding: '2.5rem',
          }}
        >
          <div
            style={{
              fontSize: '0.78rem',
              color: '#9DB8A4',
              textAlign: 'center',
              marginBottom: '2rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {ga ? 'Conas a Oibríonn Sé' : 'How It Works'}
          </div>

          {/* Flow Steps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
              flexWrap: 'wrap',
            }}
          >
            {(ga ? flowStepsGA : flowStepsEN).map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Step */}
                <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background:
                        step.side === 'center'
                          ? 'rgba(22,155,98,0.15)'
                          : 'rgba(12,28,16,0.9)',
                      border: `2px solid ${step.side === 'center' ? '#169B62' : 'rgba(22,155,98,0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: step.side === 'center' ? '1.75rem' : '1.5rem',
                      margin: '0 auto 0.75rem',
                      animation: step.side === 'center' ? 'glow-green 3s ease-in-out infinite' : 'none',
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9rem' }}>
                    {step.label}
                  </div>
                  <div style={{ color: '#9DB8A4', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {step.sub}
                  </div>
                </div>

                {/* Arrow between steps */}
                {i < (ga ? flowStepsGA : flowStepsEN).length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0 0.5rem',
                      marginBottom: '2rem',
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(22,155,98,0.3), rgba(22,155,98,0.7))',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          right: '-4px',
                          top: '-4px',
                          width: 0,
                          height: 0,
                          borderLeft: '8px solid rgba(22,155,98,0.7)',
                          borderTop: '5px solid transparent',
                          borderBottom: '5px solid transparent',
                        }}
                      />
                    </div>
                    <div style={{ color: '#9DB8A4', fontSize: '0.65rem', marginTop: '0.5rem', whiteSpace: 'nowrap' }}>
                      {i === 0 ? (ga ? 'Criptithe' : 'Encrypted') : (ga ? 'Áitiúil' : 'Local')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Supported Apps */}
          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(26,48,32,0.8)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            {['WhatsApp', 'Telegram', 'Discord', 'Slack', 'Teams'].map((app) => (
              <span
                key={app}
                style={{
                  background: 'rgba(22,155,98,0.08)',
                  border: '1px solid rgba(22,155,98,0.2)',
                  color: '#9DB8A4',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {app}
              </span>
            ))}
            <span
              style={{
                background: 'rgba(255,136,62,0.08)',
                border: '1px solid rgba(255,136,62,0.2)',
                color: '#FF883E',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {ga ? '+ Ag teacht go luath' : '+ More coming'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
