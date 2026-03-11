import { useState, useEffect, useRef } from 'react'

const steps = [
  {
    id: 1,
    irish: 'Teanga',
    english: 'Language',
    icon: '🌐',
    desc: 'Roghnaigh do theanga / Choose your language',
  },
  {
    id: 2,
    irish: 'Comhtháthuithe',
    english: 'Integrations',
    icon: '🔗',
    desc: 'Nasc le d\'aipeanna / Connect your apps',
  },
  {
    id: 3,
    irish: 'Príobháideacht',
    english: 'Privacy',
    icon: '🔒',
    desc: 'Socruithe príobháideachta / Privacy settings',
  },
  {
    id: 4,
    irish: 'Críochnaithe',
    english: 'Done',
    icon: '☘',
    desc: 'Sábháil agus íoslódáil / Save and download',
  },
]

const integrationOptions = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Control desktop via WhatsApp' },
  { id: 'telegram', label: 'Telegram', icon: '✈️', desc: 'Telegram bot integration' },
  { id: 'discord', label: 'Discord', icon: '🎮', desc: 'Discord server commands' },
  { id: 'slack', label: 'Slack', icon: '⚡', desc: 'Slack workspace automation' },
  { id: 'teams', label: 'Microsoft Teams', icon: '💼', desc: 'Enterprise Teams integration' },
  { id: 'google', label: 'Google Workspace', icon: '🔵', desc: 'Gmail, Drive, Calendar' },
]

export default function ConfigWizard() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    language: 'en',
    integrations: ['whatsapp'],
    privacy: {
      analytics: 0,
      telemetry: 0,
      localOnly: 100,
      shareUsage: 0,
    },
  })
  const [copied, setCopied] = useState(false)
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

  const toggleIntegration = (id) => {
    setConfig((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(id)
        ? prev.integrations.filter((i) => i !== id)
        : [...prev.integrations, id],
    }))
  }

  const updatePrivacy = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
  }

  const generatedConfig = {
    version: '2.1.0',
    language: config.language,
    locale: config.language === 'ga' ? 'ga-IE' : 'en-IE',
    integrations: {
      enabled: config.integrations,
      whatsapp: config.integrations.includes('whatsapp') ? { enabled: true, port: 8765 } : { enabled: false },
      telegram: config.integrations.includes('telegram') ? { enabled: true, botToken: 'YOUR_TOKEN' } : { enabled: false },
    },
    privacy: {
      analytics: config.privacy.analytics > 50,
      telemetry: config.privacy.telemetry > 50,
      localOnly: config.privacy.localOnly > 50,
      shareUsage: config.privacy.shareUsage > 50,
    },
    gdpr: {
      compliant: true,
      dataResidency: 'Ireland',
      dpa: 'DPC-IE',
    },
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedConfig, null, 2)).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="config"
      ref={sectionRef}
      style={{
        background: '#0C1C10',
        padding: '6rem 1.5rem',
        position: 'relative',
      }}
    >
      {/* Top glow */}
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

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
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
            <span>Cumraíocht / Configuration</span>
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
            Cumraigh{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF883E, #ffaa6e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              go héasca
            </span>
          </h2>
          <p style={{ color: '#9DB8A4', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Configure easily — Build your personal config in 4 steps. No coding required.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}
          className="wizard-grid"
        >
          {/* Left: Wizard */}
          <div>
            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#9DB8A4', fontSize: '0.78rem' }}>
                  Céim {step} de {steps.length}
                </span>
                <span style={{ color: '#169B62', fontSize: '0.78rem', fontWeight: 600 }}>
                  {Math.round((step / steps.length) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(step / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => s.id < step + 1 && setStep(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    background:
                      s.id === step
                        ? 'rgba(22,155,98,0.15)'
                        : s.id < step
                        ? 'rgba(22,155,98,0.08)'
                        : 'rgba(12,28,16,0.6)',
                    border: `1px solid ${
                      s.id === step
                        ? 'rgba(22,155,98,0.5)'
                        : s.id < step
                        ? 'rgba(22,155,98,0.25)'
                        : 'rgba(26,48,32,0.8)'
                    }`,
                    borderRadius: '0.375rem',
                    padding: '0.375rem 0.625rem',
                    color: s.id <= step ? '#169B62' : '#9DB8A4',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: s.id < step + 1 ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{s.icon}</span>
                  <span>{s.english}</span>
                  {s.id < step && <span style={{ fontSize: '0.7rem' }}>✓</span>}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div
              key={step}
              style={{
                background: 'rgba(12,28,16,0.8)',
                border: '1px solid rgba(22,155,98,0.2)',
                borderRadius: '1rem',
                padding: '2rem',
                animation: 'fade-in-up 0.3s ease-out',
                minHeight: '320px',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#169B62', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {steps[step - 1].irish}
                </div>
                <h3 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                  {steps[step - 1].desc.split('/')[1]?.trim() || steps[step - 1].english}
                </h3>
                <p style={{ color: '#9DB8A4', fontSize: '0.85rem', margin: 0 }}>
                  {steps[step - 1].desc.split('/')[0]?.trim()}
                </p>
              </div>

              {/* Step 1: Language */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { value: 'en', label: 'English', sub: 'Default interface language', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
                    { value: 'ga', label: 'Gaeilge', sub: 'Comhéadan iomlán as Gaeilge', flag: '🇮🇪' },
                  ].map((lang) => (
                    <label
                      key={lang.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: config.language === lang.value ? 'rgba(22,155,98,0.1)' : 'rgba(5,15,8,0.5)',
                        border: `1px solid ${config.language === lang.value ? 'rgba(22,155,98,0.4)' : 'rgba(26,48,32,0.8)'}`,
                        borderRadius: '0.625rem',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="language"
                        value={lang.value}
                        checked={config.language === lang.value}
                        onChange={() => setConfig((prev) => ({ ...prev, language: lang.value }))}
                        style={{ accentColor: '#169B62' }}
                      />
                      <span style={{ fontSize: '1.5rem' }}>{lang.flag}</span>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>{lang.label}</div>
                        <div style={{ color: '#9DB8A4', fontSize: '0.75rem' }}>{lang.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 2: Integrations */}
              {step === 2 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                  {integrationOptions.map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        background: config.integrations.includes(opt.id)
                          ? 'rgba(22,155,98,0.1)'
                          : 'rgba(5,15,8,0.5)',
                        border: `1px solid ${config.integrations.includes(opt.id) ? 'rgba(22,155,98,0.4)' : 'rgba(26,48,32,0.8)'}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="checkbox"
                        className="checkbox-celtic"
                        checked={config.integrations.includes(opt.id)}
                        onChange={() => toggleIntegration(opt.id)}
                      />
                      <span style={{ fontSize: '1.1rem' }}>{opt.icon}</span>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.8rem' }}>{opt.label}</div>
                        <div style={{ color: '#9DB8A4', fontSize: '0.68rem' }}>{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 3: Privacy */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { key: 'localOnly', label: 'Local Processing Only', desc: 'Force all AI to run on-device', safe: true },
                    { key: 'analytics', label: 'Anonymous Analytics', desc: 'Help improve EiriClaw (no PII)', safe: false },
                    { key: 'telemetry', label: 'Crash Reports', desc: 'Send anonymous crash logs', safe: false },
                    { key: 'shareUsage', label: 'Share Usage Patterns', desc: 'Aggregate feature usage stats', safe: false },
                  ].map((setting) => (
                    <div key={setting.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                        <div>
                          <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>
                            {setting.label}
                          </span>
                          {setting.safe && (
                            <span
                              style={{
                                marginLeft: '0.5rem',
                                background: 'rgba(22,155,98,0.15)',
                                color: '#169B62',
                                padding: '0.1rem 0.4rem',
                                borderRadius: '2rem',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                              }}
                            >
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            color: config.privacy[setting.key] > 50 ? '#169B62' : '#9DB8A4',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                          }}
                        >
                          {config.privacy[setting.key] > 50 ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <p style={{ color: '#9DB8A4', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>
                        {setting.desc}
                      </p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.privacy[setting.key]}
                        onChange={(e) => updatePrivacy(setting.key, Number(e.target.value))}
                        className="slider-celtic"
                        style={{
                          background: `linear-gradient(to right, #169B62 ${config.privacy[setting.key]}%, #1A3020 ${config.privacy[setting.key]}%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Done */}
              {step === 4 && (
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '4rem',
                      animation: 'float 4s ease-in-out infinite',
                      marginBottom: '1rem',
                    }}
                  >
                    ☘
                  </div>
                  <h3 style={{ color: '#169B62', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    Tá tú réidh! / You're ready!
                  </h3>
                  <p style={{ color: '#9DB8A4', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Your EiriClaw configuration is ready. Download and place it in the EiriClaw config directory.
                  </p>
                  <button
                    onClick={handleCopy}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #169B62, #20c97a)',
                      color: 'white',
                      border: 'none',
                      padding: '0.875rem',
                      borderRadius: '0.625rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(22,155,98,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {copied ? (
                      <><span>✓</span> Cóipeáilte!</>
                    ) : (
                      <><span>💾</span> Sábháil Cumraíocht</>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {step < 4 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
                <button
                  onClick={() => step > 1 && setStep(step - 1)}
                  disabled={step === 1}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(22,155,98,0.3)',
                    color: step === 1 ? '#9DB8A4' : '#169B62',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: step === 1 ? 'not-allowed' : 'pointer',
                    opacity: step === 1 ? 0.5 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  ← Ar ais
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  style={{
                    background: 'linear-gradient(135deg, #169B62, #20c97a)',
                    border: 'none',
                    color: 'white',
                    padding: '0.625rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,155,98,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Ar aghaidh →
                </button>
              </div>
            )}
          </div>

          {/* Right: Live Config Preview */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <span style={{ color: '#9DB8A4', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Live Preview — config.json
              </span>
              <button
                onClick={handleCopy}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(22,155,98,0.3)',
                  color: copied ? '#169B62' : '#9DB8A4',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? '✓ Copied!' : '⎘ Copy'}
              </button>
            </div>

            <div
              className="terminal"
              style={{
                height: 'calc(100% - 2.5rem)',
                minHeight: '420px',
                overflow: 'auto',
              }}
            >
              <div
                className="terminal-header"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div className="terminal-dot" style={{ background: '#FF5F56' }} />
                <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
                <div className="terminal-dot" style={{ background: '#27C93F' }} />
                <span style={{ color: '#9DB8A4', fontSize: '0.75rem', marginLeft: '0.5rem', fontFamily: 'monospace' }}>
                  config.json
                </span>
              </div>
              <div
                style={{
                  padding: '1.25rem',
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: '0.75rem',
                  lineHeight: 1.7,
                  color: '#9DB8A4',
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {JSON.stringify(generatedConfig, null, 2)
                    .replace(/"([^"]+)":/g, (_, key) => `"<span style="color:#C9A84C">${key}</span>":`)
                    .split('\n')
                    .map((line, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                    ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wizard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
