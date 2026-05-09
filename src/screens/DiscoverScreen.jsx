import React, { useState, useRef, useCallback } from 'react'
import { X, Heart, Star, SlidersHorizontal, ChevronLeft, ChevronRight, MapPin, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'
import FiltersModal from '../components/FiltersModal'

const INTEREST_EMOJIS = {
  sports_i: '⚽', travel: '✈️', music: '🎵', technology: '💻', cooking: '🍳',
  art: '🎨', reading: '📚', gaming: '🎮', yoga: '🧘', photography: '📷',
  hiking: '🏕️', dancing: '💃', movies: '🎬', fitness: '💪', startups: '🚀',
  volunteer: '🤝', pets_i: '🐶', sustainability: '🌱', meditation: '🕯️', fashion: '👗',
}

const CATEGORY_COLORS = {
  'שותף לדירה': '#8474A1', 'Roommate': '#8474A1',
  'טיולים בארץ': '#08979D', 'Trips in Israel': '#08979D',
  'ספורט': '#6EC6CA', 'Sports': '#6EC6CA',
  'שותף עסקי': '#055B5C', 'Business Partner': '#055B5C',
  'לימודים': '#CCABD8', 'Study': '#CCABD8',
  'פרויקטים': '#6EC6CA', 'Projects': '#6EC6CA',
  'טיולים בחו"ל': '#CCABD8', 'Trips Abroad': '#CCABD8',
}

function SwipeCard({ profile, isTop, isNext, isThird, onSwipe, language, t }) {
  const cardRef = useRef(null)
  const startRef = useRef(null)
  const currentRef = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [delta, setDelta] = useState({ x: 0, y: 0 })
  const [showInfo, setShowInfo] = useState(false)

  const getPointerCoords = (e) => {
    const touch = e.touches?.[0]
    return { x: touch ? touch.clientX : e.clientX, y: touch ? touch.clientY : e.clientY }
  }

  const handleStart = useCallback((e) => {
    if (e.target.closest('button') && !e.target.closest('.drag-area')) return
    const { x, y } = getPointerCoords(e)
    startRef.current = { x, y }
    setIsDragging(true)
  }, [])

  const handleMove = useCallback((e) => {
    if (!isDragging || !startRef.current) return
    e.preventDefault()
    const { x, y } = getPointerCoords(e)
    const dx = x - startRef.current.x
    const dy = y - startRef.current.y
    setDelta({ x: dx, y: dy })
  }, [isDragging])

  const handleEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 100
    if (delta.x > threshold) { onSwipe('right'); return }
    if (delta.x < -threshold) { onSwipe('left'); return }
    setDelta({ x: 0, y: 0 })
  }, [isDragging, delta, onSwipe])

  if (!isTop && !isNext && !isThird) return null

  const rotation = isTop ? (delta.x / 18) : 0
  const opacity = isTop ? Math.max(0, 1 - Math.abs(delta.x) / 400) : 1
  const likeOpacity = isTop ? Math.max(0, Math.min(1, delta.x / 80)) : 0
  const nopeOpacity = isTop ? Math.max(0, Math.min(1, -delta.x / 80)) : 0

  const scale = isTop ? 1 : isNext ? 0.94 : 0.88
  const translateY = isTop ? 0 : isNext ? 12 : 24

  return (
    <div
      ref={cardRef}
      className={`discover-card ${isTop ? 'is-top' : ''}`}
      style={{
        bottom: isTop ? 120 : isNext ? 106 : 92,
        height: isTop ? '72vh' : isNext ? '69vh' : '66vh',
        transform: `translateX(${delta.x}px) translateY(${delta.y * 0.3}px) rotate(${rotation}deg) scale(${scale}) translateY(${translateY}px)`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity,
        zIndex: isTop ? 3 : isNext ? 2 : 1,
        willChange: 'transform',
      }}
      onMouseDown={isTop ? handleStart : undefined}
      onMouseMove={isTop ? handleMove : undefined}
      onMouseUp={isTop ? handleEnd : undefined}
      onMouseLeave={isTop ? handleEnd : undefined}
      onTouchStart={isTop ? handleStart : undefined}
      onTouchMove={isTop ? handleMove : undefined}
      onTouchEnd={isTop ? handleEnd : undefined}
    >
      {/* Background image */}
      <img
        src={profile.avatar}
        alt={profile.name[language]}
        className="discover-card-image"
        style={{ height: '100%', width: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
        draggable="false"
      />

      {/* Dark overlay */}
      <div className="discover-card-overlay" />

      {/* Swipe hints */}
      {isTop && (
        <>
          <div className="swipe-hint swipe-hint-like" style={{ opacity: likeOpacity }}>💚 LIKE</div>
          <div className="swipe-hint swipe-hint-skip" style={{ opacity: nopeOpacity }}>✕ NOPE</div>
        </>
      )}

      {/* Info toggle */}
      {isTop && (
        <button
          onClick={() => setShowInfo(s => !s)}
          style={{
            position: 'absolute',
            top: 16,
            insetInlineEnd: 16,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 5,
          }}
        >
          <Info size={18} />
        </button>
      )}

      {/* Card info */}
      <div className="discover-card-info">
        {showInfo ? (
          // Expanded info
          <div className="animate-fadeInUp" style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(16px)',
            borderRadius: 20,
            padding: 20,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              {profile.name[language]}, {profile.age}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
              <MapPin size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{profile.city[language]}</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 12 }}>
              {profile.about[language]}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {profile.interests.map(int => (
                <span key={int} style={{
                  padding: '5px 12px',
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 100,
                  fontSize: 12,
                  color: '#fff',
                }}>
                  {INTEREST_EMOJIS[int]} {int}
                </span>
              ))}
            </div>
          </div>
        ) : (
          // Compact info
          <div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 4, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
              {profile.name[language]}, {profile.age}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
              <MapPin size={14} color="rgba(255,255,255,0.75)" />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{profile.city[language]}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {profile.categories.map(cat => (
                <span key={cat[language]} style={{
                  padding: '5px 12px',
                  background: `${CATEGORY_COLORS[cat[language]] || '#8474A1'}CC`,
                  backdropFilter: 'blur(4px)',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}>
                  {cat[language]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DiscoverScreen() {
  const { t, language, isRTL, profiles, showFilters, setShowFilters, navigate, setMatchedProfile } = useApp()
  const [cardIndex, setCardIndex] = useState(0)
  const [swipedCards, setSwipedCards] = useState([])

  const remaining = profiles.filter((_, i) => !swipedCards.includes(i))

  const handleSwipe = useCallback((direction, index = 0) => {
    if (direction === 'right') {
      // Simulate match on every 3rd like
      if ((swipedCards.filter(i => profiles[i]).length + 1) % 3 === 0) {
        setMatchedProfile(remaining[index])
        setTimeout(() => navigate('match'), 300)
      }
    }
    const profileIndex = profiles.indexOf(remaining[index])
    setSwipedCards(prev => [...prev, profileIndex])
  }, [remaining, swipedCards, profiles, navigate, setMatchedProfile])

  const BackIcon = isRTL ? ChevronRight : ChevronLeft

  return (
    <div style={{ height: '100%', background: 'var(--grad-hero)', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '52px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(245,243,250,0.95) 60%, transparent)',
      }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--c-text-muted)', fontWeight: 600, marginBottom: 2 }}>
            {isRTL ? 'שלום!' : 'Hello!'}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{t('discover')}</h2>
        </div>
        <button
          onClick={() => setShowFilters(true)}
          style={{
            width: 46,
            height: 46,
            borderRadius: 16,
            background: '#fff',
            border: '1.5px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--c-purple)',
          }}
        >
          <SlidersHorizontal size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Card stack */}
      {remaining.length > 0 ? (
        <>
          {remaining.slice(0, 3).map((profile, i) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              isTop={i === 0}
              isNext={i === 1}
              isThird={i === 2}
              onSwipe={(dir) => handleSwipe(dir, i)}
              language={language}
              t={t}
            />
          ))}
        </>
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          textAlign: 'center',
          padding: '0 40px',
        }}>
          <span style={{ fontSize: 64 }}>🔍</span>
          <h3 style={{ fontSize: 22, fontWeight: 700 }}>{t('noMoreProfiles')}</h3>
          <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t('noMoreProfilesSub')}</p>
          <button className="btn btn-primary" onClick={() => setShowFilters(true)} style={{ marginTop: 8, width: 'auto', padding: '14px 32px' }}>
            {t('filters')}
          </button>
        </div>
      )}

      {/* Action buttons */}
      {remaining.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 108,
          left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          zIndex: 5,
          padding: '0 20px',
        }}>
          {/* Skip */}
          <button
            onClick={() => handleSwipe('left')}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#fff',
              border: '2px solid rgba(204,171,216,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(132,116,161,0.15)',
              color: 'var(--c-text-muted)',
              transition: 'all 0.2s',
            }}
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          {/* Star / Favorite */}
          <button
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#fff',
              border: '2px solid rgba(255,179,71,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(255,179,71,0.2)',
              color: '#FFB347',
            }}
          >
            <Star size={22} fill="rgba(255,179,71,0.3)" />
          </button>

          {/* Like */}
          <button
            onClick={() => handleSwipe('right')}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'var(--grad-cyan)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(8,151,157,0.4)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
          >
            <Heart size={26} fill="white" color="white" />
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />

      {/* Filters Modal */}
      {showFilters && <FiltersModal />}
    </div>
  )
}
