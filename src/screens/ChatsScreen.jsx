import React from 'react'
import { Search, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'

export default function ChatsScreen() {
  const { t, language, isRTL, chats, navigate, setActiveChatId } = useApp()

  const openChat = (chatId) => {
    setActiveChatId(chatId)
    navigate('chat-detail')
  }

  return (
    <div style={{ height: '100%', background: 'var(--c-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 16px',
        background: 'rgba(245,243,250,0.95)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t('chats')}</h2>
          <div style={{
            width: 38,
            height: 20,
            borderRadius: 10,
            background: 'var(--grad-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }}>
            {chats.filter(c => c.unread > 0).length}
          </div>
        </div>

        {/* Search */}
        <div className="input-wrapper">
          <Search size={17} className="input-icon input-icon-start" />
          <input
            className="input input-with-icon-start"
            placeholder={isRTL ? 'חפש שיחות...' : 'Search chats...'}
            style={{ height: 46, borderRadius: 14, fontSize: 14 }}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="scrollable" style={{ flex: 1, paddingBottom: 100 }}>
        {chats.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', gap: 16, padding: 40, textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(204,171,216,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={36} color="var(--c-lavender)" strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>{t('noChats')}</h3>
            <p style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t('noChatsSub')}</p>
          </div>
        ) : (
          <div>
            {/* Active / unread section */}
            {chats.some(c => c.unread > 0) && (
              <div style={{ padding: '16px 20px 8px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {isRTL ? 'חדש' : 'New'}
                </p>
              </div>
            )}

            {chats.map((chat, i) => (
              <button
                key={chat.id}
                onClick={() => openChat(chat.id)}
                className="animate-fadeInUp"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'inherit',
                  position: 'relative',
                  animationDelay: `${i * 0.05}s`,
                  animationFillMode: 'backwards',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,171,216,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={chat.avatar}
                    alt={chat.name[language]}
                    style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: chat.unread > 0 ? '2.5px solid var(--c-turquoise)' : '2.5px solid transparent' }}
                  />
                  {/* Online indicator */}
                  {chat.online && (
                    <div style={{
                      position: 'absolute',
                      bottom: 2, right: 2,
                      width: 14, height: 14,
                      borderRadius: '50%',
                      background: '#4CAF8A',
                      border: '2.5px solid var(--c-bg)',
                    }} />
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: chat.unread > 0 ? 700 : 500, color: 'var(--c-text)' }}>
                        {chat.name[language]}
                      </span>
                      {/* Category badge */}
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 100,
                        background: 'rgba(110,198,202,0.12)',
                        color: 'var(--c-turquoise)',
                        border: '1px solid rgba(110,198,202,0.2)',
                      }}>
                        {chat.category[language]}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: chat.unread > 0 ? 'var(--c-turquoise)' : 'var(--c-text-light)', fontWeight: chat.unread > 0 ? 600 : 400, flexShrink: 0 }}>
                      {chat.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{
                      fontSize: 13,
                      color: chat.unread > 0 ? 'var(--c-text)' : 'var(--c-text-muted)',
                      fontWeight: chat.unread > 0 ? 500 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}>
                      {chat.lastMessage[language]}
                    </p>
                    {chat.unread > 0 && (
                      <div style={{
                        minWidth: 22,
                        height: 22,
                        borderRadius: 11,
                        background: 'var(--grad-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#fff',
                        marginInlineStart: 8,
                        flexShrink: 0,
                      }}>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* Older section */}
            <div style={{ padding: '8px 20px 4px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {isRTL ? 'ישנות' : 'Earlier'}
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
