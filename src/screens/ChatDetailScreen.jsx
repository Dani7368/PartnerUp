import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Phone, Video, Send, Paperclip, Mic, MoreHorizontal, Check, CheckCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ChatDetailScreen() {
  const { t, language, isRTL, chats, messages, activeChatId, navigate } = useApp()
  const [inputText, setInputText] = useState('')
  const [localMessages, setLocalMessages] = useState(messages[activeChatId] || [])
  const bottomRef = useRef(null)

  const chat = chats.find(c => c.id === activeChatId)
  if (!chat) { navigate('chats'); return null }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [localMessages])

  const sendMessage = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: Date.now(),
      text: { he: inputText, en: inputText },
      outgoing: true,
      time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }
    setLocalMessages(prev => [...prev, newMsg])
    setInputText('')

    // Simulate reply
    setTimeout(() => {
      const replies = {
        he: ['😊 אחלה!', 'בכיף!', 'מעניין... ספר/י עוד', '👍'],
        en: ['😊 Sounds great!', 'Sure thing!', 'Interesting... tell me more', '👍'],
      }
      const reply = {
        id: Date.now() + 1,
        text: { he: replies.he[Math.floor(Math.random() * replies.he.length)], en: replies.en[Math.floor(Math.random() * replies.en.length)] },
        outgoing: false,
        time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      }
      setLocalMessages(prev => [...prev, reply])
    }, 1200 + Math.random() * 1000)
  }

  // Group messages by time proximity (for date headers)
  const groupedMessages = localMessages.reduce((groups, msg, i) => {
    const prev = localMessages[i - 1]
    if (!prev || prev.outgoing !== msg.outgoing) {
      groups.push({ ...msg, isFirst: true })
    } else {
      groups.push(msg)
    }
    return groups
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F0EEF8' }}>
      {/* Header */}
      <div style={{
        padding: '48px 16px 12px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(204,171,216,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
        boxShadow: '0 2px 16px rgba(132,116,161,0.06)',
      }}>
        {/* Back */}
        <button
          onClick={() => navigate('chats')}
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(204,171,216,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: 'var(--c-text)' }}
        >
          <BackIcon size={20} />
        </button>

        {/* Avatar + info */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src={chat.avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
          {chat.online && (
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: '50%', background: '#4CAF8A', border: '2px solid white' }} />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{chat.name[language]}</p>
          <p style={{ fontSize: 12, color: chat.online ? '#4CAF8A' : 'var(--c-text-muted)', fontWeight: chat.online ? 600 : 400 }}>
            {chat.online ? t('online') : chat.category[language]}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[Phone, Video].map((Icon, i) => (
            <button key={i} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: i === 0 ? 'rgba(110,198,202,0.12)' : 'rgba(204,171,216,0.12)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: i === 0 ? 'var(--c-turquoise)' : 'var(--c-purple)',
            }}>
              <Icon size={17} />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        className="scrollable"
        style={{ flex: 1, padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}
      >
        {/* Date header */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: 'var(--c-text-muted)',
            background: 'rgba(255,255,255,0.6)', padding: '4px 12px', borderRadius: 100,
            backdropFilter: 'blur(8px)',
          }}>
            {isRTL ? 'היום' : 'Today'}
          </span>
        </div>

        {groupedMessages.map((msg, i) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.outgoing ? 'flex-end' : 'flex-start',
              marginBottom: msg.isFirst && i > 0 ? 12 : 2,
              animation: 'fadeInUp 0.25s forwards',
            }}
          >
            <div
              className={`bubble ${msg.outgoing ? 'bubble-outgoing' : 'bubble-incoming'}`}
            >
              {msg.text[language]}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              marginTop: 3,
              [msg.outgoing ? 'paddingRight' : 'paddingLeft']: 4,
            }}>
              <span style={{ fontSize: 10, color: 'var(--c-text-light)' }}>{msg.time}</span>
              {msg.outgoing && (
                <CheckCheck size={12} color={msg.read ? 'var(--c-turquoise)' : 'var(--c-text-light)'} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 12px 28px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(204,171,216,0.12)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        flexShrink: 0,
      }}>
        {/* Attachment */}
        <button style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'rgba(204,171,216,0.1)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--c-text-muted)', flexShrink: 0,
        }}>
          <Paperclip size={18} />
        </button>

        {/* Text input */}
        <div style={{
          flex: 1,
          background: 'rgba(245,243,250,0.8)',
          border: '1.5px solid var(--c-border)',
          borderRadius: 22,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.2s',
          minHeight: 46,
        }}>
          <textarea
            placeholder={t('typeMessage')}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              color: 'var(--c-text)',
              resize: 'none',
              lineHeight: 1.4,
              maxHeight: 100,
              overflowY: 'auto',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Send / Mic */}
        <button
          onClick={inputText.trim() ? sendMessage : undefined}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: inputText.trim() ? 'var(--grad-cyan)' : 'rgba(204,171,216,0.12)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: inputText.trim() ? '#fff' : 'var(--c-text-muted)',
            transition: 'all 0.2s',
            flexShrink: 0,
            boxShadow: inputText.trim() ? '0 4px 16px rgba(8,151,157,0.35)' : 'none',
          }}
        >
          {inputText.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  )
}
