import { useState, useEffect, useRef } from 'react'
import { useLang } from '../LangContext'

const categories = {
  Work: {
    irish: 'Obair',
    icon: '💼',
    cases: [
      {
        title: 'Document Summarisation',
        irish: 'Achoimre Doiciméad',
        icon: '📄',
        desc: 'Summarise any PDF, Word doc or email thread in seconds.',
        detail: 'Upload any document and EiriClaw extracts key points, action items, and summaries — all processed locally on your device. Works with Irish and English documents.',
        tag: 'Productivity',
      },
      {
        title: 'Email Management',
        irish: 'Bainistíocht Ríomhphoist',
        icon: '📧',
        desc: 'Draft replies, filter junk, and organise your inbox automatically.',
        detail: 'AI-powered email triage that understands context and tone. Draft professional responses in seconds, auto-categorise by project, and never miss an important message.',
        tag: 'Automation',
      },
      {
        title: 'Code Review',
        irish: 'Athbhreithniú Cód',
        icon: '🔍',
        desc: 'Instant AI code review with Irish developer context.',
        detail: 'Review PRs, spot bugs, suggest optimisations and generate tests. Supports Python, JavaScript, TypeScript, Go and more. Understands Irish coding conventions.',
        tag: 'Developer',
      },
      {
        title: 'Price Monitoring',
        irish: 'Monatóireacht Praghais',
        icon: '📊',
        desc: 'Track Irish market prices, utilities and competitor costs.',
        detail: 'Monitor Aldi, Lidl, Dunnes, Tesco and other Irish retailers. Set alerts for price drops and get daily digests of the best deals near you.',
        tag: 'Finance',
      },
    ],
  },
  Home: {
    irish: 'Baile',
    icon: '🏠',
    cases: [
      {
        title: 'Real-time Translation',
        irish: 'Aistriúchán Fíor-ama',
        icon: '🌐',
        desc: 'Instant English ↔ Gaeilge translation with Irish dialect support.',
        detail: 'Full support for Munster, Connacht, and Ulster dialects. Translate documents, conversations, and even live captions for meetings. Perfect for Gaeltacht communities.',
        tag: 'Language',
      },
      {
        title: 'Met Éireann Weather',
        irish: 'Aimsir Met Éireann',
        icon: '⛅',
        desc: 'Live Irish weather with Gaeltacht region forecasts.',
        detail: 'Integrated with Met Éireann API for hyper-local Irish weather. Get forecasts for your exact townland, storm warnings, and tide times for coastal areas.',
        tag: 'Irish',
      },
      {
        title: 'Travel Booking',
        irish: 'Áirithint Taistil',
        icon: '✈️',
        desc: 'Book Ryanair, Dublin Bus, and Irish Rail from any app.',
        detail: 'Send a message in WhatsApp: "Book me a bus to Cork on Friday" and EiriClaw handles it. Integrates with Dublin Bus, Irish Rail, Bus Éireann, and Dublin Airport.',
        tag: 'Travel',
      },
      {
        title: 'News Digest',
        irish: 'Achoimre Nuachta',
        icon: '📰',
        desc: 'Daily digest from RTÉ, Irish Times, and The Journal.',
        detail: 'Morning briefings curated from Irish sources. Summarised in plain English (or Gaeilge), filtered by topics you care about — no clickbait, no tabloids.',
        tag: 'Irish',
      },
    ],
  },
  Creativity: {
    irish: 'Cruthaitheacht',
    icon: '🎨',
    cases: [
      {
        title: 'Writing Assistant',
        irish: 'Cúntóir Scríbhneoireachta',
        icon: '✍️',
        desc: 'Write blog posts, essays and creative pieces with AI assistance.',
        detail: 'Brainstorm ideas, outline articles, refine drafts, and check grammar — all offline. Supports Irish writing styles and Gaeilge grammar checking.',
        tag: 'Writing',
      },
      {
        title: 'Image Captioning',
        irish: 'Fotheideal Íomhá',
        icon: '🖼️',
        desc: 'Auto-generate captions and alt-text for your images.',
        detail: 'Perfect for photographers, bloggers and social media managers. Generate SEO-optimised alt-text, Instagram captions, and accessibility descriptions locally.',
        tag: 'Creative',
      },
      {
        title: 'Music Discovery',
        irish: 'Fionnachtain Ceoil',
        icon: '🎵',
        desc: 'Discover Irish traditional music and contemporary artists.',
        detail: 'Get recommendations for trad sessions, upcoming gigs at Vicar Street or the Cork Jazz Festival. Connects with Spotify and Apple Music to build playlists.',
        tag: 'Music',
      },
      {
        title: 'Recipe Finder',
        irish: 'Aimsitheoir Oidis',
        icon: '🍲',
        desc: 'Irish recipes from soda bread to modern Dublin cuisine.',
        detail: 'Search by ingredients, dietary requirements and occasion. Includes traditional Irish recipes, modern Dublin restaurant-style dishes, and Gaelic seasonal cooking.',
        tag: 'Food',
      },
    ],
  },
}

function CaseCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  const tagColor = {
    Productivity: '#169B62',
    Automation: '#C9A84C',
    Developer: '#5865F2',
    Finance: '#FF883E',
    Language: '#169B62',
    Irish: '#C9A84C',
    Travel: '#FF883E',
    Writing: '#169B62',
    Creative: '#C9A84C',
    Music: '#FF883E',
    Food: '#169B62',
  }

  const color = tagColor[item.tag] || '#169B62'

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'rgba(12,28,16,0.8)',
        border: `1px solid ${expanded ? 'rgba(22,155,98,0.45)' : 'rgba(22,155,98,0.15)'}`,
        borderRadius: '0.875rem',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: expanded ? '0 0 25px rgba(22,155,98,0.1)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!expanded) {
          e.currentTarget.style.borderColor = 'rgba(22,155,98,0.35)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!expanded) {
          e.currentTarget.style.borderColor = 'rgba(22,155,98,0.15)'
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '1.5rem',
              background: `${color}15`,
              border: `1px solid ${color}30`,
              borderRadius: '0.5rem',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {item.icon}
          </span>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</div>
            <div style={{ color: color, fontSize: '0.72rem', fontStyle: 'italic', fontWeight: 600 }}>
              {item.irish}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`,
              padding: '0.15rem 0.5rem',
              borderRadius: '2rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {item.tag}
          </span>
          <span
            style={{
              color: '#9DB8A4',
              fontSize: '1rem',
              transition: 'transform 0.3s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}
          >
            ▾
          </span>
        </div>
      </div>

      <p style={{ color: '#9DB8A4', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
        {item.desc}
      </p>

      {expanded && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(26,48,32,0.8)',
            color: '#9DB8A4',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            animation: 'fade-in-up 0.3s ease-out',
          }}
        >
          {item.detail}
        </div>
      )}
    </div>
  )
}

export default function UseCases() {
  const { lang } = useLang()
  const ga = lang === 'GA'
  const [activeTab, setActiveTab] = useState('Work')
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

  const activeCategory = categories[activeTab]

  return (
    <section
      id="use-cases"
      ref={sectionRef}
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
            <span>Cásanna Úsáide / Use Cases</span>
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
            {ga ? 'Cad is féidir ' : 'What can you '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #e8c870)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {ga ? 'leat a dhéanamh?' : 'do with it?'}
            </span>
          </h2>
          <p style={{ color: '#9DB8A4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            {ga
              ? 'Ó Dhún Laoghaire go Dún na nGall, oibríonn EiriClaw do gach úsáideoir in Éirinn.'
              : "What can you do? — From Dún Laoghaire to Donegal, EiriClaw works for every Irish user."
            }
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                background: activeTab === key ? 'rgba(22,155,98,0.15)' : 'transparent',
                color: activeTab === key ? '#169B62' : '#9DB8A4',
                border: `1px solid ${activeTab === key ? 'rgba(22,155,98,0.4)' : 'rgba(26,48,32,0.8)'}`,
                borderRadius: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.borderColor = 'rgba(22,155,98,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.color = '#9DB8A4'
                  e.currentTarget.style.borderColor = 'rgba(26,48,32,0.8)'
                }
              }}
            >
              <span>{cat.icon}</span>
              <span>{ga ? cat.irish : key}</span>
              <span
                style={{
                  color: '#9DB8A4',
                  fontSize: '0.7rem',
                  fontStyle: 'italic',
                }}
              >
                / {ga ? key : cat.irish}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          key={activeTab}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            animation: 'fade-in-up 0.4s ease-out',
          }}
        >
          {activeCategory.cases.map((item, i) => (
            <CaseCard key={i} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(22,155,98,0.05)',
            border: '1px solid rgba(22,155,98,0.15)',
            borderRadius: '1rem',
          }}
        >
          <p style={{ color: '#9DB8A4', marginBottom: '1rem', fontSize: '0.95rem' }}>
            {ga
              ? 'Cliceáil cárta ar bith le tuilleadh a fhoghlaim. Oibríonn gach gné 100% as líne — gan idirlíon ag teastáil.'
              : 'Click any card to learn more. All features work 100% offline — no internet required.'
            }
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(ga
              ? ['Gan Idirlíon', 'RGCS Sábháilte', 'Gaeilge Réidh', 'APIs Éireannacha']
              : ['Zero Internet', 'GDPR Safe', 'Gaeilge Ready', 'Irish APIs']
            ).map((badge) => (
              <span
                key={badge}
                style={{
                  background: 'rgba(22,155,98,0.1)',
                  border: '1px solid rgba(22,155,98,0.25)',
                  color: '#169B62',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
