import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const LanguageToggle = ({ language, setLanguage }) => (
  <div style={{
    display: 'flex',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: 100,
    padding: 3,
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.35)',
  }}>
    {[
      { code: 'he', flag: '🇮🇱', label: 'עב' },
      { code: 'en', flag: '🇺🇸', label: 'EN' },
    ].map(({ code, flag, label }) => (
      <button
        key={code}
        onClick={() => setLanguage(code)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '7px 16px',
          borderRadius: 100,
          background: language === code ? 'rgba(255,255,255,0.9)' : 'transparent',
          color: language === code ? 'var(--c-purple)' : 'rgba(255,255,255,0.8)',
          fontSize: 13,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.25s',
          boxShadow: language === code ? '0 2px 8px rgba(132,116,161,0.2)' : 'none',
        }}
      >
        <span>{flag}</span>
        <span>{label}</span>
      </button>
    ))}
  </div>
)

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
    {/* Logo mark */}
    <div style={{
      width: 88,
      height: 88,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(12px)',
      border: '2px solid rgba(255,255,255,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
    }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        {/* Two intertwined hearts */}
        <path
          d="M14 22C14 17.58 17.58 14 22 14C24.21 14 26.21 14.88 27.67 16.34L26 18L24.33 16.34C22.87 14.88 20.87 14 18.66 14C14.25 14 10.66 17.58 10.66 22C10.66 24.21 11.55 26.21 13 27.67L26 40.67L39 27.67C40.46 26.21 41.34 24.21 41.34 22C41.34 17.58 37.75 14 33.34 14C31.13 14 29.13 14.88 27.67 16.34"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M26 18L28 16C29.5 14.5 31.5 13.5 33.5 13.5C37.9 13.5 41.5 17.1 41.5 21.5C41.5 23.7 40.6 25.7 39.1 27.2L26 40.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="26" cy="26" r="4" fill="white" opacity="0.9" />
      </svg>
    </div>
  </div>
)

const FloatingOrb = ({ style }) => (
  <div style={{
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.15)',
    ...style,
  }} />
)

export default function WelcomeScreen() {
  const { t, language, setLanguage, navigate } = useApp()

  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(160deg, #CCABD8 0%, #9580B8 30%, #6EC6CA 70%, #08979D 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative orbs */}
      <FloatingOrb style={{ width: 200, height: 200, top: -60, right: -60, animationDelay: '0s' }} />
      <FloatingOrb style={{ width: 140, height: 140, bottom: 100, left: -40 }} />
      <FloatingOrb style={{ width: 80, height: 80, top: '40%', right: 20 }} />
      <FloatingOrb style={{ width: 60, height: 60, top: '25%', left: 30 }} />

      {/* Language toggle - top */}
      <div style={{ width: '100%', padding: '52px 24px 0', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      {/* Hero section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        gap: 16,
      }}>
        {/* Logo */}
        <div className="animate-float">
          <Logo />
        </div>

        {/* Brand name */}
        <div className="animate-fadeInUp" style={{ marginTop: 8 }}>
          <h1 style={{
            fontSize: 42,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.15)',
            lineHeight: 1,
          }}>
            PartnerUp
          </h1>
        </div>

        {/* Tagline */}
        <div className="animate-fadeInUp delay-100">
          <p style={{
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.6,
            maxWidth: 260,
          }}>
            {t('tagline')}
          </p>
        </div>

        {/* Floating cards preview */}
        <div className="animate-fadeInUp delay-200" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 8, height: 110 }}>
          {[
            { emoji: '🏠', label: { he: 'שותפים לדירה', en: 'Roommates' }, rotate: -6, translateY: 12 },
            { emoji: '✈️', label: { he: 'טיולים', en: 'Travel' }, rotate: 0, translateY: -8 },
            { emoji: '💼', label: { he: 'עסקי', en: 'Business' }, rotate: 6, translateY: 12 },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.22)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 16,
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                transform: `rotate(${card.rotate}deg) translateY(${card.translateY}px)`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                minWidth: 84,
              }}
            >
              <span style={{ fontSize: 22 }}>{card.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
                {card.label[language]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA section */}
      <div className="animate-fadeInUp delay-300" style={{
        width: '100%',
        padding: '0 24px 52px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Register */}
        <button
          className="btn"
          onClick={() => navigate('onboarding')}
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
          {t('register')}
        </button>

        {/* Login */}
        <button
          className="btn"
          onClick={() => navigate('login')}
          style={{
            background: 'rgba(255,255,255,0.18)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            height: 58,
            borderRadius: 100,
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.4)',
          }}
        >
          {t('login')}
        </button>

        {/* Social login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
            {t('orContinueWith')}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: '🍎', label: t('continueWithApple') },
            { icon: 'G', label: t('continueWithGoogle'), isG: true },
          ].map(({ icon, label, isG }) => (
            <button
              key={label}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                borderRadius: 16,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: isG ? 16 : 20, fontWeight: isG ? 900 : 400 }}>{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
