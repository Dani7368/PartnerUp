import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'

const FilterSection = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {title}
    </p>
    {children}
  </div>
)

const AgeSlider = ({ label, min, max, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ fontSize: 13, color: 'var(--c-text-muted)', minWidth: 20 }}>{label}</span>
    <div style={{ flex: 1, position: 'relative' }}>
      <input
        type="range" min={18} max={65} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--range-pct': `${((value - 18) / (65 - 18)) * 100}%` }}
      />
    </div>
    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-turquoise)', minWidth: 28 }}>{value}</span>
  </div>
)

const FiltersModal = () => {
  const { setShowFilters, t, isRTL } = useApp()
  const [city, setCity] = useState('תל אביב-יפו')
  const [minAge, setMinAge] = useState(22)
  const [maxAge, setMaxAge] = useState(35)
  const [gender, setGender] = useState('all')
  const [tripType, setTripType] = useState([])

  const cities = isRTL
    ? ['תל אביב-יפו', 'ירושלים', 'חיפה', 'ראשון לציון', 'פתח תקווה', 'נתניה']
    : ['Tel Aviv', 'Jerusalem', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Netanya']

  const genders = [
    { id: 'all', label: isRTL ? 'הכל' : 'All' },
    { id: 'male', label: t('male') },
    { id: 'female', label: t('female') },
  ]

  const tripTypes = [
    { id: 'beach', label: t('beach'), emoji: '🏖️' },
    { id: 'city', label: t('cityTrip'), emoji: '🏙️' },
    { id: 'trek', label: t('trekking'), emoji: '🏕️' },
  ]

  const toggleTripType = (id) => {
    setTripType(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div
      className="overlay"
      style={{ background: 'rgba(42,36,64,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}
      onClick={() => setShowFilters(false)}
    >
      <div
        className="animate-slideUp"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--c-white)',
          borderRadius: '28px 28px 0 0',
          padding: '0 24px 40px',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(204,171,216,0.4)' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 24px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{t('filterTitle')}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{ fontSize: 13, color: 'var(--c-text-muted)', padding: '6px 12px', borderRadius: 20, border: '1.5px solid var(--c-border)', background: 'none' }}
            >
              {t('reset')}
            </button>
            <button onClick={() => setShowFilters(false)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(204,171,216,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Location */}
        <FilterSection title={t('location')}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`chip ${city === c ? 'selected' : ''}`}
                style={{ fontSize: 13 }}
              >
                {c}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Age range */}
        <FilterSection title={t('ageRange')}>
          <div style={{ background: 'rgba(204,171,216,0.06)', borderRadius: 16, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AgeSlider label={t('from')} value={minAge} onChange={setMinAge} />
            <AgeSlider label={t('to')} value={maxAge} onChange={setMaxAge} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--c-turquoise)', fontWeight: 600 }}>
              {minAge} – {maxAge} {isRTL ? 'שנים' : 'years'}
            </span>
          </div>
        </FilterSection>

        {/* Gender */}
        <FilterSection title={t('gender')}>
          <div style={{ display: 'flex', gap: 8 }}>
            {genders.map(g => (
              <button
                key={g.id}
                onClick={() => setGender(g.id)}
                className={`chip ${gender === g.id ? 'selected' : ''}`}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Trip type */}
        <FilterSection title={t('tripType')}>
          <div style={{ display: 'flex', gap: 8 }}>
            {tripTypes.map(tt => (
              <button
                key={tt.id}
                onClick={() => toggleTripType(tt.id)}
                className={`chip ${tripType.includes(tt.id) ? 'selected' : ''}`}
                style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', gap: 4, padding: '12px 8px', height: 72, borderRadius: 16 }}
              >
                <span style={{ fontSize: 20 }}>{tt.emoji}</span>
                <span style={{ fontSize: 11 }}>{tt.label}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Apply */}
        <button className="btn btn-primary" onClick={() => setShowFilters(false)} style={{ marginTop: 8 }}>
          {t('apply')}
        </button>
      </div>
    </div>
  )
}

export default FiltersModal
