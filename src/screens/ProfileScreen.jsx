import React from 'react'
import { Edit2, ChevronLeft, ChevronRight, Camera, Grid3X3, Settings, Bell, Shield, HelpCircle, LogOut, Heart, Star, Map } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'

const ProfileStat = ({ value, label }) => (
  <div style={{ textAlign: 'center', flex: 1 }}>
    <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--c-teal)', lineHeight: 1 }}>{value}</p>
    <p style={{ fontSize: 11, color: 'var(--c-text-muted)', fontWeight: 500, marginTop: 3 }}>{label}</p>
  </div>
)

const Divider = () => <div style={{ height: 1, background: 'rgba(204,171,216,0.12)', margin: '4px 0' }} />

const MenuRow = ({ icon: Icon, label, subtitle, color = 'var(--c-purple)', danger, onClick, ArrowIcon }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      width: '100%',
      padding: '16px 20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'inherit',
      transition: 'background 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,171,216,0.06)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <div style={{
      width: 40, height: 40, borderRadius: 13,
      background: danger ? 'rgba(240,107,138,0.1)' : `${color}15`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon size={19} color={danger ? 'var(--c-danger)' : color} strokeWidth={1.8} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 15, fontWeight: 500, color: danger ? 'var(--c-danger)' : 'var(--c-text)' }}>{label}</p>
      {subtitle && <p style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 1 }}>{subtitle}</p>}
    </div>
    {ArrowIcon && <ArrowIcon size={18} color="var(--c-text-light)" />}
  </button>
)

const INTEREST_EMOJIS = {
  sports_i: '⚽', travel: '✈️', music: '🎵', technology: '💻', cooking: '🍳',
  art: '🎨', reading: '📚', gaming: '🎮', yoga: '🧘', photography: '📷',
  hiking: '🏕️', dancing: '💃', movies: '🎬', fitness: '💪', startups: '🚀',
}

export default function ProfileScreen() {
  const { t, language, isRTL, navigate, userProfile } = useApp()
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight

  const displayName = userProfile.name || (isRTL ? 'אורח' : 'Guest')
  const displayCity = userProfile.city || (isRTL ? 'תל אביב' : 'Tel Aviv')
  const interests = userProfile.interests.length > 0 ? userProfile.interests : ['hiking', 'photography', 'startups']

  return (
    <div style={{ height: '100%', background: 'var(--c-bg)', position: 'relative' }}>
      <div className="scrollable" style={{ height: '100%', paddingBottom: 100 }}>

        {/* Hero / Cover */}
        <div style={{
          background: 'linear-gradient(160deg, #CCABD8 0%, #8474A1 50%, #6EC6CA 100%)',
          paddingTop: 52,
          paddingBottom: 0,
          position: 'relative',
          minHeight: 200,
        }}>
          {/* Settings button */}
          <button
            onClick={() => navigate('settings')}
            style={{
              position: 'absolute', top: 52, insetInlineEnd: 20,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
            }}
          >
            <Settings size={18} />
          </button>

          {/* Avatar area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, paddingBottom: 70 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={userProfile.avatar}
                alt=""
                style={{
                  width: 100, height: 100, borderRadius: '50%',
                  border: '3.5px solid rgba(255,255,255,0.9)',
                  objectFit: 'cover',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              />
              <button style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 30, height: 30, borderRadius: '50%',
                background: '#fff', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                <Camera size={15} color="var(--c-purple)" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile card - overlapping */}
        <div style={{
          margin: '-60px 16px 0',
          background: '#fff',
          borderRadius: 24,
          padding: '20px 20px 16px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Name + edit */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>{displayName}</h2>
              <p style={{ fontSize: 13, color: 'var(--c-text-muted)', marginTop: 2 }}>📍 {displayCity}</p>
            </div>
            <button
              onClick={() => navigate('onboarding')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '8px 14px', borderRadius: 100,
                background: 'rgba(110,198,202,0.1)',
                border: '1.5px solid rgba(110,198,202,0.25)',
                color: 'var(--c-turquoise)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <Edit2 size={13} />
              {t('editProfile')}
            </button>
          </div>

          {/* Bio */}
          <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.6, marginBottom: 14 }}>
            {isRTL ? 'אוהב לגלות מקומות חדשים, לפגוש אנשים מעניינים ולצמוח כל הזמן.' : 'I love discovering new places, meeting interesting people, and constantly growing.'}
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            background: 'rgba(245,243,250,0.6)',
            borderRadius: 16,
            padding: '14px 8px',
            marginBottom: 14,
            border: '1px solid rgba(204,171,216,0.12)',
          }}>
            <ProfileStat value="47" label={isRTL ? 'לייקים' : 'Likes'} />
            <div style={{ width: 1, background: 'rgba(204,171,216,0.2)', alignSelf: 'stretch' }} />
            <ProfileStat value="12" label={isRTL ? 'מאצ\'ים' : 'Matches'} />
            <div style={{ width: 1, background: 'rgba(204,171,216,0.2)', alignSelf: 'stretch' }} />
            <ProfileStat value="5" label={isRTL ? 'שיחות' : 'Chats'} />
          </div>

          {/* Interests */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {interests.map(id => (
              <span key={id} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 14px', borderRadius: 100,
                background: 'rgba(204,171,216,0.1)',
                border: '1px solid rgba(204,171,216,0.2)',
                fontSize: 12, color: 'var(--c-purple)', fontWeight: 500,
              }}>
                {INTEREST_EMOJIS[id] || '⭐'} {t(id)}
              </span>
            ))}
          </div>
        </div>

        {/* Menu sections */}
        <div style={{ margin: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Account */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <MenuRow icon={Edit2} label={t('editProfile')} ArrowIcon={ArrowIcon} onClick={() => navigate('onboarding')} />
            <Divider />
            <MenuRow icon={Heart} label={t('editPreferences')} subtitle={isRTL ? 'שותפים לדירה, טיולים...' : 'Roommates, Travel...'} ArrowIcon={ArrowIcon} onClick={() => navigate('categories')} />
            <Divider />
            <MenuRow icon={Map} label={t('editFilters')} ArrowIcon={ArrowIcon} />
          </div>

          {/* Notifications */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <MenuRow icon={Bell} label={t('notifications')} color="var(--c-cyan)" ArrowIcon={ArrowIcon} />
            <Divider />
            <MenuRow icon={Shield} label={t('privacy')} color="var(--c-teal)" ArrowIcon={ArrowIcon} />
          </div>

          {/* Support */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <MenuRow icon={HelpCircle} label={t('help')} color="var(--c-lavender)" ArrowIcon={ArrowIcon} />
            <Divider />
            <MenuRow icon={Settings} label={t('settings')} ArrowIcon={ArrowIcon} onClick={() => navigate('settings')} />
          </div>

          {/* Logout */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <MenuRow icon={LogOut} label={t('logout')} danger onClick={() => navigate('welcome')} />
          </div>

          {/* Version */}
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--c-text-light)', padding: '8px 0 4px' }}>
            PartnerUp v1.0.0
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
