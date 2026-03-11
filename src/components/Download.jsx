import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LangContext'

const RELEASE_BASE = 'https://github.com/eiriclaw/eiriclaw/releases/latest/download'

const platforms = [
  {
    name: 'macOS',
    icon: '',
    variants: ['Apple Silicon (M1/M2/M3)', 'Intel x86_64'],
    downloadUrls: [
      `${RELEASE_BASE}/EiriClaw-arm64.dmg`,
      `${RELEASE_BASE}/EiriClaw-x64.dmg`,
    ],
    size: '190 MB',
    requirements: 'macOS 12.0+',
    primary: true,
    checksum: 'sha256: verified',
  },
  {
    name: 'Windows',
    icon: '',
    variants: ['Windows 10/11 (64-bit)'],
    downloadUrls: [
      `${RELEASE_BASE}/EiriClaw-Setup.exe`,
    ],
    size: '158 MB',
    requirements: 'Windows 10 21H2+',
    primary: false,
    checksum: 'sha256: verified',
  },
]

const requirements = [
  { label: 'RAM', value: '8 GB minimum, 16 GB recommended' },
  { label: 'Storage', value: '2 GB free disk space' },
  { label: 'CPU', value: 'Apple M1+ or Intel Core i5 (8th gen+)' },
  { label: 'macOS', value: '12.0 Monterey or later' },
  { label: 'Windows', value: '10 21H2 (64-bit) or Windows 11' },
  { label: 'Internet', value: 'Only for initial download — fully offline after' },
]

function DownloadCard({ platform, ga }) {
  const [hovered, setHovered] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [activeVariant, setActiveVariant] = useState(0)

  const handleDownload = () => {
    const url = platform.downloadUrls[activeVariant] ?? platform.downloadUrls[0]
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloading(true)
    setTimeout(() => setDownloading(false), 3000)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(22,155,98,0.08)' : 'rgba(12,28,16,0.8)',
        border: `1px solid ${platform.primary
          ? hovered ? '#169B62' : 'rgba(22,155,98,0.35)'
          : hovered ? 'rgba(22,155,98,0.4)' : 'rgba(22,155,98,0.2)'}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        transition: 'all 0.3s ease',
        boxShadow: platform.primary
          ? hovered
            ? '0 0 40px rgba(22,155,98,0.2), 0 8px 32px rgba(0,0,0,0.4)'
            : '0 0 20px rgba(22,155,98,0.1)'
          : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Popular badge */}
      {platform.primary && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(22,155,98,0.15)',
            border: '1px solid rgba(22,155,98,0.35)',
            color: '#169B62',
            padding: '0.2rem 0.625rem',
            borderRadius: '2rem',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
          }}
        >
          POPULAR
        </div>
      )}

      {/* Platform Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            background: 'rgba(22,155,98,0.1)',
            border: '1px solid rgba(22,155,98,0.25)',
            borderRadius: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
          }}
        >
          {platform.name === 'macOS' ? (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#9DB8A4">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#9DB8A4">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.949"/>
            </svg>
          )}
        </div>
        <div>
          <h3 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}>
            {platform.name}
          </h3>
          <div style={{ color: '#9DB8A4', fontSize: '0.8rem', marginTop: '0.2rem' }}>
            {platform.requirements}
          </div>
        </div>
      </div>

      {/* Variant Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ color: '#9DB8A4', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {ga ? 'Roghnaigh Leagan' : 'Select Version'}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {platform.variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(i)}
              style={{
                background: activeVariant === i ? 'rgba(22,155,98,0.15)' : 'rgba(12,28,16,0.6)',
                border: `1px solid ${activeVariant === i ? 'rgba(22,155,98,0.5)' : 'rgba(26,48,32,0.8)'}`,
                color: activeVariant === i ? '#169B62' : '#9DB8A4',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* File Info */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          color: '#9DB8A4',
          fontSize: '0.8rem',
        }}
      >
        <span>📦 {platform.size}</span>
        <span style={{ color: '#169B62' }}>v2.1.0</span>
        <span>🔒 {ga ? 'Sínithe & Fíoraithe' : 'Signed & Notarised'}</span>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          width: '100%',
          background: downloading
            ? 'rgba(22,155,98,0.15)'
            : platform.primary
            ? 'linear-gradient(135deg, #169B62 0%, #20c97a 50%, #169B62 100%)'
            : 'transparent',
          backgroundSize: platform.primary && !downloading ? '200% 100%' : 'auto',
          animation: platform.primary && !downloading ? 'shimmer 3s linear infinite' : 'none',
          color: downloading ? '#9DB8A4' : 'white',
          border: platform.primary ? 'none' : '2px solid rgba(22,155,98,0.5)',
          padding: '0.875rem',
          borderRadius: '0.625rem',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
        onMouseEnter={(e) => {
          if (!downloading) {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(22,155,98,0.4)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {downloading ? (
          <>
            <span>⏳</span> {ga ? 'Ag ullmhú íoslódála...' : 'Preparing download...'}
          </>
        ) : (
          <>
            <span>⬇</span>
            {`Íoslódáil ${platform.name}`}
          </>
        )}
      </button>

      {/* Checksum */}
      <div
        style={{
          marginTop: '0.75rem',
          color: '#9DB8A4',
          fontSize: '0.68rem',
          fontFamily: 'monospace',
          opacity: 0.7,
        }}
      >
        {platform.checksum}
      </div>
    </div>
  )
}

export default function Download() {
  const { lang } = useLang()
  const ga = lang === 'GA'
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="download"
      ref={sectionRef}
      style={{
        background: '#050F08',
        padding: '6rem 1.5rem',
        position: 'relative',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(22,155,98,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
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
              background: 'rgba(22,155,98,0.1)',
              border: '1px solid rgba(22,155,98,0.25)',
              borderRadius: '2rem',
              padding: '0.375rem 1rem',
              marginBottom: '1.25rem',
              color: '#169B62',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            <span>⬇</span>
            <span>v2.1.0 — Bealtaine Release</span>
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
            Íoslódáil{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #169B62, #20c97a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EiriClaw
            </span>
          </h2>
          <p style={{ color: '#9DB8A4', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            {ga
              ? 'Íoslódáil EiriClaw — Saor, go deo. Gan cárta creidmheasa. Gan chuntas ag teastáil.'
              : 'Download EiriClaw — Free, forever. No credit card required. No account needed.'
            }
          </p>
        </div>

        {/* Platform Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}
        >
          {platforms.map((p) => (
            <DownloadCard key={p.name} platform={p} ga={ga} />
          ))}
        </div>

        {/* System Requirements */}
        <div
          style={{
            background: 'rgba(12,28,16,0.8)',
            border: '1px solid rgba(22,155,98,0.15)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          <h3
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1.05rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>💻</span> {ga ? 'Riachtanais Córais' : 'System Requirements'}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {requirements.map((req) => (
              <div
                key={req.label}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.625rem',
                  background: 'rgba(5,15,8,0.5)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(26,48,32,0.6)',
                }}
              >
                <span
                  style={{
                    color: '#169B62',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    minWidth: '70px',
                    flexShrink: 0,
                  }}
                >
                  {req.label}
                </span>
                <span style={{ color: '#9DB8A4', fontSize: '0.8rem' }}>{req.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shamrock Guarantee */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(22,155,98,0.08), rgba(22,155,98,0.03))',
            border: '1px solid rgba(22,155,98,0.25)',
            borderRadius: '1rem',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        >
          <div
            style={{
              fontSize: '3.5rem',
              animation: 'float 5s ease-in-out infinite',
              flexShrink: 0,
            }}
          >
            ☘
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: '#169B62',
                fontWeight: 800,
                fontSize: '1.15rem',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {ga ? 'Ráthaíocht an tSeamróige' : 'The Shamrock Guarantee'}
              <span
                style={{
                  background: 'rgba(201,168,76,0.15)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: '#C9A84C',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '2rem',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                }}
              >
                30 DAYS
              </span>
            </h3>
            <p style={{ color: '#9DB8A4', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
              {ga
                ? 'Mura n-oibríonn EiriClaw go foirfe ar do mheaisín laistigh de 30 lá, cuideoidh muid leat go pearsanta — nó tabharfaidh muid aisíocaíocht iomlán. Ar ár n-onóir mar chuideachta Éireannach.'
                : 'If EiriClaw does not work perfectly on your machine within 30 days, we will personally help you get it running — or provide a full refund on any premium features. On our honour as an Irish company.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
