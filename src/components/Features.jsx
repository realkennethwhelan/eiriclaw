import { useState, useEffect, useRef } from 'react'
import { useLang } from '../LangContext'

const features = [
  {
    icon: '🔒',
    irish: 'Príobháideacht ar dtús',
    english: 'Privacy First',
    description:
      'All processing happens locally on your device. Zero data leaves Ireland — not a single byte. No cloud, no surveillance, no compromises.',
    accent: '#169B62',
  },
  {
    icon: '⚡',
    irish: 'Aon chliceáil',
    english: 'One-Click Install',
    description:
      'No API keys, no configuration files, no developer skills needed. Download, double-click, and you are ready to go. Pure plug-and-play.',
    accent: '#C9A84C',
  },
  {
    icon: '🖥️',
    irish: 'Rialú Deasc',
    english: 'Desktop Native',
    description:
      'Deep system-level integration with macOS and Windows. Control any application, automate workflows, manage files — all with natural language.',
    accent: '#169B62',
  },
  {
    icon: '📱',
    irish: 'Rialú Soghluaiste',
    english: 'Mobile Control',
    description:
      'Send commands from WhatsApp, Telegram, or Discord and watch your desktop respond instantly. Control your Mac from a GAA match in Croke Park.',
    accent: '#FF883E',
  },
  {
    icon: '☘️',
    irish: "Déanta d'Éirinn",
    english: 'Built for Ireland',
    description:
      'Full Irish (Gaeilge) language support, Irish locale settings, Met Éireann integration, and GDPR compliance baked in from day one.',
    accent: '#169B62',
  },
  {
    icon: '🚀',
    irish: 'Feidhmíocht Íseal-Moille',
    english: 'Low Latency',
    description:
      'Sub-millisecond response times thanks to local inference. No round-trips to American servers. Faster than your broadband can blink.',
    accent: '#C9A84C',
  },
]

function FeatureCard({ feature, index, ga }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(12, 28, 16, 0.8)',
        border: `1px solid ${hovered ? 'rgba(22,155,98,0.5)' : 'rgba(22,155,98,0.15)'}`,
        borderRadius: '1rem',
        padding: '1.75rem',
        transition: 'all 0.35s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        boxShadow: hovered
          ? '0 0 30px rgba(22,155,98,0.12), 0 8px 32px rgba(0,0,0,0.4)'
          : '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '80px',
          background: `radial-gradient(circle at top right, ${feature.accent}15, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Icon */}
      <div
        style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '52px',
          height: '52px',
          background: `${feature.accent}15`,
          borderRadius: '0.75rem',
          border: `1px solid ${feature.accent}30`,
          transition: 'all 0.3s',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {feature.icon}
      </div>

      {/* Label (Irish in GA mode, English in EN mode) */}
      <div
        style={{
          color: feature.accent,
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
          fontStyle: 'italic',
        }}
      >
        {ga ? feature.english : feature.irish}
      </div>

      {/* Title (Irish as primary in GA, English as primary in EN) */}
      <h3
        style={{
          color: '#FFFFFF',
          fontSize: '1.15rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        {ga ? feature.irish : feature.english}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#9DB8A4',
          fontSize: '0.9rem',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {feature.description}
      </p>
    </div>
  )
}

export default function Features() {
  const { lang } = useLang()
  const ga = lang === 'GA'
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.2 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="features"
      style={{
        background: '#0C1C10',
        padding: '6rem 1.5rem',
        position: 'relative',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #169B62, transparent)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
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
            <span>Gnéithe / Features</span>
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
            {ga ? 'Cén Fáth ' : 'Why Choose '}
            <span
              style={{
                background: 'linear-gradient(135deg, #169B62, #20c97a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EiriClaw?
            </span>
          </h2>

          <p
            style={{
              color: '#9DB8A4',
              fontSize: '1.1rem',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {ga
              ? "Tógtha ón bhfód aníos d'úsáideoirí na hÉireann. Gach gné deartha le príobháideacht, feidhmíocht, agus bealach maireachtála na hÉireann."
              : 'Built from the ground up for Irish users. Every feature designed with privacy, performance, and the Irish way of life in mind.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} ga={ga} />
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            marginTop: '4rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: '#9DB8A4',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ height: '1px', width: '80px', background: 'rgba(22,155,98,0.3)' }} />
          <span>☘</span>
          <span style={{ fontStyle: 'italic' }}>Déanta in Éirinn le grá</span>
          <span>☘</span>
          <div style={{ height: '1px', width: '80px', background: 'rgba(22,155,98,0.3)' }} />
        </div>
      </div>
    </section>
  )
}
