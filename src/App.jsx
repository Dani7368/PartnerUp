import React, { useEffect } from 'react'
import { useApp } from './context/AppContext'
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import MatchScreen from './screens/MatchScreen'
import ChatsScreen from './screens/ChatsScreen'
import ChatDetailScreen from './screens/ChatDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'

const ScreenRenderer = ({ screen }) => {
  switch (screen) {
    case 'welcome':       return <WelcomeScreen />
    case 'login':         return <LoginScreen />
    case 'onboarding':    return <OnboardingScreen />
    case 'categories':    return <CategoriesScreen />
    case 'discover':      return <DiscoverScreen />
    case 'match':         return <MatchScreen />
    case 'chats':         return <ChatsScreen />
    case 'chat-detail':   return <ChatDetailScreen />
    case 'profile':       return <ProfileScreen />
    case 'settings':      return <SettingsScreen />
    default:              return <WelcomeScreen />
  }
}

export default function App() {
  const { currentScreen, isRTL } = useApp()

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [isRTL])

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="screen screen-enter" key={currentScreen}>
          <ScreenRenderer screen={currentScreen} />
        </div>
      </div>
    </div>
  )
}
