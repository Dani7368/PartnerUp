import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function LoginScreen() {
  const { t, isRTL, navigate } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const BackIcon = isRTL ? ChevronRight : ChevronLeft

  return (
    <div style={{ height: '100%', background: 'var(--grad-hero)', display: 'flex', flexDirection: 'column' }}>
      {/* Back */}
      <div style={{ padding: '52px 20px 0' }}>
        <button
          onClick={() => navigate('welcome')}
          style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)', border: '1px solid var(--c-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--c-text)',
          }}
        >
          <BackIcon size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="scrollable" style={{ flex: 1, padding: '24px 24px 40px' }}>
        {/* Headline */}
        <div className="animate-fadeInUp" style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
            {isRTL ? 'ברוכים השבים!' : 'Welcome Back!'}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--c-text-muted)' }}>
            {isRTL ? 'התחבר/י לחשבון שלך' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <div className="animate-fadeInUp delay-100" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 8 }}>
              {isRTL ? 'אימייל' : 'Email'}
            </label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon input-icon-start" />
              <input
                className="input input-with-icon-start"
                type="email"
                placeholder={isRTL ? 'your@email.com' : 'your@email.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ height: 56 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 8 }}>
              {isRTL ? 'סיסמה' : 'Password'}
            </label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon input-icon-start" />
              <input
                className="input input-with-icon-start"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ height: 56 }}
              />
              <button
                onClick={() => setShowPw(s => !s)}
                className="input-icon input-icon-end"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                {showPw ? <EyeOff size={18} color="var(--c-text-muted)" /> : <Eye size={18} color="var(--c-text-muted)" />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
            <button style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--c-purple)', fontWeight: 600, cursor: 'pointer' }}>
              {t('forgotPassword')}
            </button>
          </div>

          {/* Login button */}
          <button
            className="btn btn-primary"
            onClick={() => navigate('discover')}
            style={{ height: 58, fontSize: 16, marginTop: 8 }}
          >
            {t('login')}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
            <span style={{ fontSize: 12, color: 'var(--c-text-light)' }}>{t('orContinueWith')}</span>
            <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { icon: '🍎', label: 'Apple' },
              { icon: 'G', label: 'Google', fw: 900 },
            ].map(({ icon, label, fw }) => (
              <button
                key={label}
                style={{
                  flex: 1,
                  height: 52,
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.8)',
                  border: '1.5px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--c-text)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontSize: fw ? 17 : 22, fontWeight: fw || 400 }}>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Register link */}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t('noAccount')} </span>
            <button
              onClick={() => navigate('onboarding')}
              style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 700, color: 'var(--c-turquoise)', cursor: 'pointer' }}
            >
              {t('register')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
