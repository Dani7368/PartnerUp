import React from 'react'
import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const CATEGORIES = [
  { id: 'roommates', emoji: '🏠', color: '#CCABD8', bg: 'rgba(204,171,216,0.12)' },
  { id: 'tripsIsrael', emoji: '🗺️', color: '#8474A1', bg: 'rgba(132,116,161,0.1)' },
  { id: 'tripsAbroad', emoji: '✈️', color: '#6EC6CA', bg: 'rgba(110,198,202,0.12)' },
  { id: 'sports', emoji: '⚽', color: '#08979D', bg: 'rgba(8,151,157,0.1)' },
  { id: 'study', emoji: '📚', color: '#CCABD8', bg: 'rgba(204,171,216,0.12)' },
  { id: 'projects', emoji: '💡', color: '#6EC6CA', bg: 'rgba(110,198,202,0.12)' },
  { id: 'business', emoji: '💼', color: '#055B5C', bg: 'rgba(5,91,92,0.1)' },
]

export default function CategoriesScreen() {
  const { t, isRTL, navigate, selectedCategories, setSelectedCategories } = useApp()

  const toggle = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ height: '100%', background: 'var(--grad-hero)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 8px', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'var(--grad-mixed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 8px 24px rgba(8,151,157,0.3)',
        }}>
          <span style={{ fontSize: 28 }}>🔍</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
          {t('whatAreYouLookingFor')}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>
          {t('whatAreYouLookingForSub')}
        </p>
      </div>

      {/* Category grid */}
      <div className="scrollable" style={{ flex: 1, padding: '16px 24px', paddingBottom: 120 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CATEGORIES.map(({ id, emoji, color, bg }) => {
            const selected = selectedCategories.includes(id)
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="animate-fadeInUp"
                style={{
                  padding: '20px 16px',
                  borderRadius: 20,
                  border: `2px solid ${selected ? color : 'rgba(204,171,216,0.2)'}`,
                  background: selected ? bg : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: selected
                    ? `0 8px 24px ${color}40`
                    : 'var(--shadow-sm)',
                  transform: selected ? 'scale(1.02)' : 'scale(1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                  position: 'relative',
                  textAlign: 'inherit',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Check badge */}
                {selected && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    insetInlineEnd: 12,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 2px 8px ${color}50`,
                  }}>
                    <Check size={13} color="white" strokeWidth={3} />
                  </div>
                )}

                {/* Emoji */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: selected ? `${color}20` : 'rgba(204,171,216,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  border: `1px solid ${selected ? `${color}30` : 'rgba(204,171,216,0.15)'}`,
                }}>
                  {emoji}
                </div>

                {/* Label */}
                <div>
                  <p style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: selected ? color : 'var(--c-text)',
                    lineHeight: 1.3,
                  }}>
                    {t(id)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected count */}
        {selectedCategories.length > 0 && (
          <div className="animate-fadeInUp" style={{
            marginTop: 16,
            padding: '14px 18px',
            background: 'rgba(110,198,202,0.08)',
            border: '1px solid rgba(110,198,202,0.2)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-turquoise)' }} />
            <span style={{ fontSize: 14, color: 'var(--c-turquoise)', fontWeight: 600 }}>
              {selectedCategories.length} {isRTL ? 'קטגוריות נבחרו' : 'categories selected'}
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '16px 24px 36px',
        background: 'linear-gradient(to top, var(--c-bg) 70%, transparent)',
      }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate('discover')}
          disabled={selectedCategories.length === 0}
          style={{ height: 58, fontSize: 16, opacity: selectedCategories.length === 0 ? 0.5 : 1 }}
        >
          {t('startSearch')}
        </button>
      </div>
    </div>
  )
}
