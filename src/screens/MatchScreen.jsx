import React, { useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function MatchScreen() {
  const { t, language, matchedProfile, navigate, userProfile } = useApp()

  if (!matchedProfile) {
    navigate('discover')
    return null
  }

  const myAvatar = userProfile.avatar || 'https://i.pravatar.cc/200?img=5'

  return (
    <div className="match-overlay">
      {/* Animated bg particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            borderRadius: '50%',
            background: `rgba(255,255,255,${Math.random() * 0.4 + 0.1})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, width: '100%', padding: '0 32px' }}>
        {/* Title */}
        <div className="animate-fadeInDown" style={{ marginBottom: 8 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            ✨ {language === 'he' ? 'מזל טוב' : 'Congratulations'} ✨
          </div>
          <h1 style={{
            fontSize: 42,
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}>
            {t('itsAMatch')}
          </h1>
        </div>

        <p className="animate-fadeIn delay-200" style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.85)',
          marginBottom: 0,
        }}>
          {t('matchSub')}
        </p>

        {/* Photos */}
        <div className="match-photos animate-scaleIn delay-100" style={{ position: 'relative', height: 160, marginTop: 8 }}>
          {/* My photo */}
          <img
            src={myAvatar}
            alt="me"
            className="match-photo match-photo-1"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(calc(-100% - 4px))' }}
          />
          {/* Their photo */}
          <img
            src={matchedProfile.avatar}
            alt="match"
            className="match-photo match-photo-2"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(4px)' }}
          />
          {/* Heart */}
          <div className="match-heart" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Heart size={22} fill="var(--c-like)" color="var(--c-like)" />
          </div>
        </div>

        {/* Profile info */}
        <div className="animate-fadeInUp delay-300" style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 20,
          padding: '16px 24px',
          marginTop: 20,
          marginBottom: 28,
        }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            {matchedProfile.name[language]}, {matchedProfile.age}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
            {matchedProfile.city[language]}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 10 }}>
            {matchedProfile.categories.map(cat => (
              <span key={cat[language]} style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 100,
                fontSize: 12,
                color: '#fff',
                fontWeight: 600,
              }}>
                {cat[language]}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="animate-fadeInUp delay-400" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            className="btn"
            onClick={() => navigate('chats')}
            style={{
              background: '#fff',
              color: 'var(--c-purple)',
              fontSize: 16,
              fontWeight: 700,
              height: 58,
              borderRadius: 100,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              border: 'none',
            }}
          >
            💬 {t('startChat')}
          </button>
          <button
            onClick={() => navigate('discover')}
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              height: 52,
              borderRadius: 100,
              cursor: 'pointer',
            }}
          >
            {t('keepSwiping')}
          </button>
        </div>
      </div>
    </div>
  )
}
