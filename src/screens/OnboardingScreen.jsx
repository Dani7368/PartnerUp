import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Camera, Check, MapPin, Calendar, User, Cigarette, PawPrint, Sun, Moon } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TOTAL_STEPS = 6

const ALL_INTERESTS = [
  { id: 'sports_i', emoji: '⚽' },
  { id: 'travel', emoji: '✈️' },
  { id: 'music', emoji: '🎵' },
  { id: 'technology', emoji: '💻' },
  { id: 'cooking', emoji: '🍳' },
  { id: 'art', emoji: '🎨' },
  { id: 'reading', emoji: '📚' },
  { id: 'gaming', emoji: '🎮' },
  { id: 'yoga', emoji: '🧘' },
  { id: 'photography', emoji: '📷' },
  { id: 'hiking', emoji: '🏕️' },
  { id: 'dancing', emoji: '💃' },
  { id: 'movies', emoji: '🎬' },
  { id: 'fitness', emoji: '💪' },
  { id: 'startups', emoji: '🚀' },
  { id: 'volunteer', emoji: '🤝' },
  { id: 'pets_i', emoji: '🐶' },
  { id: 'sustainability', emoji: '🌱' },
  { id: 'meditation', emoji: '🕯️' },
  { id: 'fashion', emoji: '👗' },
]

const CITIES_HE = ['תל אביב-יפו', 'ירושלים', 'חיפה', 'ראשון לציון', 'פתח תקווה', 'נתניה', 'באר שבע', 'בני ברק', 'אשדוד', 'רמת גן']
const CITIES_EN = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Ashdod', 'Ramat Gan']

const OptionCard = ({ selected, onClick, children, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '14px 12px',
      borderRadius: 16,
      border: `2px solid ${selected ? 'var(--c-turquoise)' : 'var(--c-border)'}`,
      background: selected ? 'rgba(110,198,202,0.1)' : 'rgba(255,255,255,0.7)',
      color: selected ? 'var(--c-turquoise)' : 'var(--c-text)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: selected ? '0 4px 16px rgba(8,151,157,0.15)' : 'none',
      minHeight: 80,
      ...style,
    }}
  >
    {children}
  </button>
)

// Step 1: Photo Upload
const StepPhoto = ({ t, profile, setProfile }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t('uploadPhoto')}</h2>
      <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t('uploadPhotoSub')}</p>
    </div>

    {/* Main photo */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: 140,
        height: 140,
        borderRadius: '50%',
        background: profile.avatar ? undefined : 'linear-gradient(135deg, rgba(204,171,216,0.3), rgba(110,198,202,0.3))',
        border: '3px solid rgba(204,171,216,0.4)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(132,116,161,0.15)',
      }}>
        {profile.avatar
          ? <img src={profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <User size={48} color="var(--c-lavender)" strokeWidth={1.5} />
        }
      </div>
      <button
        onClick={() => setProfile(p => ({ ...p, avatar: 'https://i.pravatar.cc/200?img=5' }))}
        style={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--grad-cyan)',
          border: '3px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(8,151,157,0.3)',
        }}
      >
        <Camera size={18} color="white" />
      </button>
    </div>

    {/* Photo grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, width: '100%' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            borderRadius: 16,
            background: 'rgba(204,171,216,0.1)',
            border: '2px dashed rgba(204,171,216,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Camera size={20} color="var(--c-lavender)" strokeWidth={1.5} />
        </div>
      ))}
      <div style={{
        aspectRatio: '1',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        <img src="https://i.pravatar.cc/150?img=5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      </div>
    </div>
  </div>
)

// Step 2: Basic Info
const StepBasicInfo = ({ t, isRTL, profile, setProfile }) => {
  const cities = isRTL ? CITIES_HE : CITIES_EN
  const [cityQuery, setCityQuery] = useState('')
  const filteredCities = cities.filter(c => c.toLowerCase().includes(cityQuery.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{t('createProfile')}</h2>
        <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{isRTL ? 'ספר לנו קצת עליך' : 'Tell us a bit about yourself'}</p>
      </div>

      {/* Name */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 8 }}>
          {t('yourName')}
        </label>
        <div className="input-wrapper">
          <User size={18} className="input-icon input-icon-start" />
          <input
            className="input input-with-icon-start"
            placeholder={t('namePlaceholder')}
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
          />
        </div>
      </div>

      {/* Birth date */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 8 }}>
          {t('birthDate')}
        </label>
        <div className="input-wrapper">
          <Calendar size={18} className="input-icon input-icon-start" />
          <input
            className="input input-with-icon-start"
            type="date"
            value={profile.birthDate}
            onChange={e => setProfile(p => ({ ...p, birthDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 10 }}>
          {t('gender')}
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'male', label: t('male'), emoji: '👨' },
            { id: 'female', label: t('female'), emoji: '👩' },
            { id: 'other', label: t('nonBinary'), emoji: '🌈' },
          ].map(g => (
            <OptionCard key={g.id} selected={profile.gender === g.id} onClick={() => setProfile(p => ({ ...p, gender: g.id }))}>
              <span style={{ fontSize: 20 }}>{g.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{g.label}</span>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 8 }}>
          {t('city')}
        </label>
        <div className="input-wrapper">
          <MapPin size={18} className="input-icon input-icon-start" />
          <input
            className="input input-with-icon-start"
            placeholder={t('cityPlaceholder')}
            value={cityQuery || profile.city}
            onChange={e => { setCityQuery(e.target.value); setProfile(p => ({ ...p, city: e.target.value })) }}
          />
        </div>
        {cityQuery && (
          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: 12, marginTop: 4, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            {filteredCities.slice(0, 4).map(c => (
              <button
                key={c}
                onClick={() => { setProfile(p => ({ ...p, city: c })); setCityQuery('') }}
                style={{ display: 'block', width: '100%', padding: '12px 16px', textAlign: 'inherit', background: 'none', border: 'none', fontSize: 14, cursor: 'pointer', borderBottom: '1px solid rgba(204,171,216,0.1)' }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Step 3: Lifestyle
const StepLifestyle = ({ t, profile, setProfile }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{t('lifestyle')}</h2>
    </div>

    {/* Smoking */}
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <Cigarette size={16} /> {t('smoking')}
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { id: 'non', label: t('nonSmoker'), emoji: '🚭' },
          { id: 'occasional', label: t('occasional'), emoji: '💨' },
          { id: 'smoker', label: t('smoker'), emoji: '🚬' },
        ].map(o => (
          <OptionCard key={o.id} selected={profile.smoking === o.id} onClick={() => setProfile(p => ({ ...p, smoking: o.id }))}>
            <span style={{ fontSize: 20 }}>{o.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{o.label}</span>
          </OptionCard>
        ))}
      </div>
    </div>

    {/* Pets */}
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <PawPrint size={16} /> {t('pets')}
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {[
          { id: 'has', label: t('hasPets'), emoji: '🐾' },
          { id: 'no', label: t('noPets'), emoji: '🙅' },
          { id: 'love', label: t('lovePets'), emoji: '❤️' },
          { id: 'allergic', label: t('allergic'), emoji: '🤧' },
        ].map(o => (
          <button
            key={o.id}
            onClick={() => setProfile(p => ({ ...p, pets: o.id }))}
            className={`chip ${profile.pets === o.id ? 'selected' : ''}`}
          >
            <span>{o.emoji}</span>
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Cleanliness */}
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'block', marginBottom: 10 }}>
        ✨ {t('cleanliness')}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { id: 'very', label: t('veryClean'), emoji: '🌟' },
          { id: 'clean', label: t('clean'), emoji: '✅' },
          { id: 'average', label: t('average'), emoji: '😊' },
          { id: 'relaxed', label: t('relaxed'), emoji: '😎' },
        ].map(o => (
          <button
            key={o.id}
            onClick={() => setProfile(p => ({ ...p, cleanliness: o.id }))}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 18px',
              borderRadius: 14,
              border: `2px solid ${profile.cleanliness === o.id ? 'var(--c-turquoise)' : 'var(--c-border)'}`,
              background: profile.cleanliness === o.id ? 'rgba(110,198,202,0.08)' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'inherit',
            }}
          >
            <span style={{ fontSize: 22, width: 28 }}>{o.emoji}</span>
            <span style={{ fontSize: 14, fontWeight: profile.cleanliness === o.id ? 600 : 400, color: profile.cleanliness === o.id ? 'var(--c-turquoise)' : 'var(--c-text)' }}>
              {o.label}
            </span>
            {profile.cleanliness === o.id && (
              <div style={{ marginInlineStart: 'auto', width: 22, height: 22, borderRadius: '50%', background: 'var(--c-turquoise)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={13} color="white" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Sleep schedule */}
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <Moon size={15} /> {t('sleepHours')}
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { id: 'early', label: t('earlyBird'), icon: <Sun size={18} /> },
          { id: 'night', label: t('nightOwl'), icon: <Moon size={18} /> },
          { id: 'mixed', label: t('mixed'), icon: '🌗' },
        ].map(o => (
          <OptionCard key={o.id} selected={profile.sleepSchedule === o.id} onClick={() => setProfile(p => ({ ...p, sleepSchedule: o.id }))}>
            {typeof o.icon === 'string' ? <span style={{ fontSize: 20 }}>{o.icon}</span> : o.icon}
            <span style={{ fontSize: 10, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{o.label}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  </div>
)

// Step 4: Interests
const StepInterests = ({ t, profile, setProfile }) => {
  const toggle = (id) => {
    setProfile(p => ({
      ...p,
      interests: p.interests.includes(id) ? p.interests.filter(i => i !== id) : [...p.interests, id],
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{t('interests')}</h2>
        <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t('selectInterests')}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {ALL_INTERESTS.map(({ id, emoji }) => {
          const selected = profile.interests.includes(id)
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 16px',
                borderRadius: 100,
                border: `1.5px solid ${selected ? 'transparent' : 'var(--c-border)'}`,
                background: selected ? 'var(--grad-cyan)' : 'rgba(255,255,255,0.7)',
                color: selected ? '#fff' : 'var(--c-text)',
                fontSize: 13,
                fontWeight: selected ? 600 : 400,
                cursor: 'pointer',
                boxShadow: selected ? '0 4px 16px rgba(8,151,157,0.25)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 17 }}>{emoji}</span>
              <span>{t(id)}</span>
            </button>
          )
        })}
      </div>

      {profile.interests.length > 0 && (
        <div style={{
          background: 'rgba(110,198,202,0.08)',
          border: '1px solid rgba(110,198,202,0.2)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <Check size={16} color="var(--c-turquoise)" />
          <span style={{ fontSize: 13, color: 'var(--c-turquoise)', fontWeight: 600 }}>
            {profile.interests.length} {profile.interests.length === 1 ? (t('interests').slice(0, -1)) : t('interests')}
          </span>
        </div>
      )}
    </div>
  )
}

export default function OnboardingScreen() {
  const { t, isRTL, navigate, userProfile, setUserProfile } = useApp()
  const [step, setStep] = useState(1)

  const canContinue = () => {
    if (step === 1) return true
    if (step === 2) return userProfile.name.length > 1
    if (step === 3) return true
    if (step === 4) return userProfile.interests.length >= 3
    return true
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1)
    else navigate('categories')
  }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft

  return (
    <div style={{ height: '100%', background: 'var(--grad-hero)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 0' }}>
        {/* Back + steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}
            >
              <BackIcon size={20} color="var(--c-text)" />
            </button>
          )}

          {/* Progress dots */}
          <div style={{ flex: 1 }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
            </div>
          </div>

          <span style={{ fontSize: 12, color: 'var(--c-text-muted)', fontWeight: 600, flexShrink: 0 }}>
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="screen-enter scrollable" style={{ flex: 1, padding: '8px 24px', paddingBottom: 120 }} key={step}>
        {step === 1 && <StepPhoto t={t} profile={userProfile} setProfile={setUserProfile} />}
        {step === 2 && <StepBasicInfo t={t} isRTL={isRTL} profile={userProfile} setProfile={setUserProfile} />}
        {step === 3 && <StepLifestyle t={t} profile={userProfile} setProfile={setUserProfile} />}
        {step === 4 && <StepInterests t={t} profile={userProfile} setProfile={setUserProfile} />}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 72, animation: 'heartbeat 1.2s ease-in-out infinite' }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 800 }}>{isRTL ? 'כמעט סיימנו!' : "Almost Done!"}</h2>
            <p style={{ fontSize: 15, color: 'var(--c-text-muted)', maxWidth: 280 }}>
              {isRTL ? 'עוד שלב אחרון לפני שנמצא לך את השותף המושלם' : 'One last step before we find your perfect partner'}
            </p>
          </div>
        )}
        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 20, textAlign: 'center' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--grad-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 40px rgba(8,151,157,0.35)', animation: 'pulse-glow 2s ease-in-out infinite' }}>
              <Check size={48} color="white" strokeWidth={2.5} />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800 }}>{isRTL ? 'הפרופיל מוכן!' : 'Profile Ready!'}</h2>
            <p style={{ fontSize: 15, color: 'var(--c-text-muted)', maxWidth: 280 }}>
              {isRTL ? 'בוא/י נמצא לך את השותפים המדהימים שלך' : "Let's find your amazing partners"}
            </p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 36px',
        background: 'linear-gradient(to top, var(--c-bg) 70%, transparent)',
      }}>
        <button
          className={`btn ${canContinue() ? 'btn-primary' : ''}`}
          onClick={handleNext}
          disabled={!canContinue()}
          style={{
            opacity: canContinue() ? 1 : 0.5,
            fontSize: 16,
            height: 58,
          }}
        >
          {step === TOTAL_STEPS ? (isRTL ? 'בוא נתחיל!' : "Let's Go!") : t('continue')}
        </button>
      </div>
    </div>
  )
}
