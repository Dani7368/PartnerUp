import React from 'react'
import { Home, MessageCircle, User, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`nav-item ${active ? 'active' : ''}`}
    style={{ background: 'none', border: 'none', flex: 1 }}
  >
    <div className="nav-icon">
      <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
    </div>
    <span className="nav-label">{label}</span>
  </button>
)

const BottomNav = () => {
  const { activeTab, setActiveTab, navigate, t } = useApp()

  const tabs = [
    { id: 'discover', icon: Home, label: t('discover').split(' ')[0] },
    { id: 'chats', icon: MessageCircle, label: t('chats') },
    { id: 'profile', icon: User, label: t('myProfile').split(' ')[0] },
  ]

  return (
    <div className="bottom-nav">
      {tabs.map(tab => (
        <NavItem
          key={tab.id}
          icon={tab.icon}
          label={tab.label}
          active={activeTab === tab.id}
          onClick={() => {
            setActiveTab(tab.id)
            navigate(tab.id === 'discover' ? 'discover' : tab.id === 'chats' ? 'chats' : 'profile')
          }}
        />
      ))}
    </div>
  )
}

export default BottomNav
