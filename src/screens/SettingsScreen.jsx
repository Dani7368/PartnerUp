import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Bell, Lock, Eye, Globe, Trash2, FileText, Shield, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Toggle = ({ checked, onChange }) => (
  <label className="toggle" onClick={e => e.stopPropagation()}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
    <div
      onClick={onChange}
      style={{
        width: 52, height: 30, borderRadius: 15, cursor: 'pointer',
        background: checked ? 'var(--c-turquoise)' : 'rgba(204,171,216,0.3)',
        position: 'relative', transition: 'background 0.25s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 4, left: checked ? 26 : 4,
        width: 22, height: 22, borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }} />
    </div>
  </label>
)

const SettingRow = ({ icon: Icon, label, subtitle, value, onToggle, color = 'var(--c-purple)', ArrowIcon }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '15px 20px',
    cursor: onToggle || ArrowIcon ? 'pointer' : 'default',
  }}>
    <div style={{
      width: 38, height: 38, borderRadius: 12,
      background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon size={18} color={color} strokeWidth={1.8} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 15, fontWeight: 500 }}>{label}</p>
      {subtitle && <p style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 1 }}>{subtitle}</p>}
    </div>
    {onToggle !== undefined && <Toggle checked={value} onChange={onToggle} />}
    {ArrowIcon && <ArrowIcon size={17} color="var(--c-text-light)" />}
  </div>
)

const SectionTitle = ({ children }) => (
  <p style={{
    fontSize: 12, fontWeight: 700, color: 'var(--c-text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    padding: '20px 20px 8px',
  }}>
    {children}
  </p>
)

const Divider = () => <div style={{ height: 1, background: 'rgba(204,171,216,0.1)', marginInline: 20 }} />

export default function SettingsScreen() {
  const { t, language, setLanguage, isRTL, navigate } = useApp()
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    matchNotifications: true,
    messageNotifications: true,
    showOnline: true,
    profileVisible: true,
  })

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  const BackIcon = isRTL ? ChevronRight : ChevronLeft
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <div style={{ height: '100%', background: 'var(--c-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '52px 16px 16px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid rgba(204,171,216,0.1)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('profile')}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(204,171,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--c-text)',
          }}
        >
          <BackIcon size={20} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t('settings')}</h2>
      </div>

      {/* Content */}
      <div className="scrollable" style={{ flex: 1 }}>

        {/* Language */}
        <SectionTitle>{t('language')}</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 20, margin: '0 16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { code: 'he', flag: '🇮🇱', name: 'עברית', nameEn: 'Hebrew' },
                { code: 'en', flag: '🇺🇸', name: 'English', nameEn: 'English' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '13px 16px',
                    borderRadius: 16,
                    border: `2px solid ${language === lang.code ? 'var(--c-turquoise)' : 'var(--c-border)'}`,
                    background: language === lang.code ? 'rgba(110,198,202,0.1)' : 'rgba(245,243,250,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{lang.flag}</span>
                  <span style={{ fontSize: 14, fontWeight: language === lang.code ? 700 : 500, color: language === lang.code ? 'var(--c-turquoise)' : 'var(--c-text)' }}>
                    {isRTL ? lang.name : lang.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <SectionTitle>{t('notifications')}</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 20, margin: '0 16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <SettingRow
            icon={Bell} label={t('pushNotifications')}
            color="var(--c-purple)"
            value={settings.pushNotifications}
            onToggle={() => toggle('pushNotifications')}
          />
          <Divider />
          <SettingRow
            icon={Bell} label={t('emailNotifications')}
            color="var(--c-cyan)"
            value={settings.emailNotifications}
            onToggle={() => toggle('emailNotifications')}
          />
          <Divider />
          <SettingRow
            icon={Bell} label={isRTL ? 'התראות מאצ\'' : 'Match Notifications'}
            subtitle={isRTL ? 'כשמישהו מגיב על הפרופיל שלך' : "When someone likes your profile"}
            color="var(--c-lavender)"
            value={settings.matchNotifications}
            onToggle={() => toggle('matchNotifications')}
          />
          <Divider />
          <SettingRow
            icon={Bell} label={isRTL ? 'התראות הודעות' : 'Message Notifications'}
            color="var(--c-teal)"
            value={settings.messageNotifications}
            onToggle={() => toggle('messageNotifications')}
          />
        </div>

        {/* Privacy */}
        <SectionTitle>{t('privacy')}</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 20, margin: '0 16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <SettingRow
            icon={Eye} label={t('showOnline')}
            subtitle={isRTL ? 'אחרים יוכלו לראות שאתה מחובר' : 'Others can see when you\'re online'}
            color="var(--c-turquoise)"
            value={settings.showOnline}
            onToggle={() => toggle('showOnline')}
          />
          <Divider />
          <SettingRow
            icon={Eye} label={t('profileVisible')}
            subtitle={isRTL ? 'הפרופיל שלך מוצג לאחרים' : 'Your profile appears to others'}
            color="var(--c-purple)"
            value={settings.profileVisible}
            onToggle={() => toggle('profileVisible')}
          />
          <Divider />
          <SettingRow
            icon={Lock} label={isRTL ? 'שנה סיסמה' : 'Change Password'}
            color="var(--c-teal)"
            ArrowIcon={ArrowIcon}
          />
          <Divider />
          <SettingRow
            icon={Shield} label={isRTL ? 'אימות דו-שלבי' : 'Two-Factor Auth'}
            subtitle={isRTL ? 'מומלץ לאבטחת חשבון' : 'Recommended for account security'}
            color="var(--c-cyan)"
            ArrowIcon={ArrowIcon}
          />
        </div>

        {/* Legal */}
        <SectionTitle>{isRTL ? 'מידע' : 'Legal'}</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 20, margin: '0 16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <SettingRow icon={FileText} label={t('privacyPolicy')} color="var(--c-lavender)" ArrowIcon={ArrowIcon} />
          <Divider />
          <SettingRow icon={FileText} label={t('terms')} color="var(--c-lavender)" ArrowIcon={ArrowIcon} />
        </div>

        {/* Danger zone */}
        <SectionTitle>{isRTL ? 'אזור מסוכן' : 'Danger Zone'}</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 20, margin: '0 16px 32px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <SettingRow
            icon={AlertTriangle}
            label={isRTL ? 'השבת חשבון' : 'Deactivate Account'}
            subtitle={isRTL ? 'הפרופיל שלך יוסתר זמנית' : 'Your profile will be hidden temporarily'}
            color="var(--c-star)"
            ArrowIcon={ArrowIcon}
          />
          <Divider />
          <SettingRow
            icon={Trash2}
            label={t('deleteAccount')}
            subtitle={isRTL ? 'פעולה בלתי הפיכה' : 'This action cannot be undone'}
            color="var(--c-danger)"
            ArrowIcon={ArrowIcon}
          />
        </div>

        {/* Version */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--c-text-light)', padding: '0 0 32px' }}>
          PartnerUp {t('version')} 1.0.0
        </p>
      </div>
    </div>
  )
}
