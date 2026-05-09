import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import translations from '../i18n/translations'

const AppContext = createContext(null)

const MOCK_CHATS = [
  {
    id: 1,
    name: { he: 'דניאל, 28', en: 'Daniel, 28' },
    lastMessage: { he: 'היי! אני רוצה לדעת עוד על הדירה', en: 'Hey! Would love to know more about the apartment' },
    time: '10:30',
    unread: 2,
    online: true,
    avatar: 'https://i.pravatar.cc/100?img=12',
    category: { he: 'שותף לדירה', en: 'Roommate' },
  },
  {
    id: 2,
    name: { he: 'שחר, 25', en: 'Shahar, 25' },
    lastMessage: { he: 'שותפים לדירה בתל אביב, אחלה!', en: 'Roommates in Tel Aviv, sounds great!' },
    time: '09:12',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/100?img=20',
    category: { he: 'שותף לדירה', en: 'Roommate' },
  },
  {
    id: 3,
    name: { he: 'מאיה, 27', en: 'Maya, 27' },
    lastMessage: { he: 'יונה פמיים בשבוע...', en: 'Yoga twice a week...' },
    time: 'אתמול',
    unread: 0,
    online: true,
    avatar: 'https://i.pravatar.cc/100?img=32',
    category: { he: 'ספורט', en: 'Sports' },
  },
  {
    id: 4,
    name: { he: 'יובל, 30', en: 'Yuval, 30' },
    lastMessage: { he: 'יש לי רעיון לסטארטאפ...', en: 'I have a startup idea...' },
    time: 'אתמול',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/100?img=53',
    category: { he: 'שותף עסקי', en: 'Business Partner' },
  },
  {
    id: 5,
    name: { he: 'עומר, 26', en: 'Omer, 26' },
    lastMessage: { he: 'אני לא מסכים לחלוטין...', en: "I totally disagree..." },
    time: '2 ימים',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/100?img=60',
    category: { he: 'טיולים בחו"ל', en: 'Trips Abroad' },
  },
]

const MOCK_MESSAGES = {
  1: [
    { id: 1, text: { he: 'היי! 👋', en: 'Hey! 👋' }, outgoing: false, time: '10:30', read: true },
    { id: 2, text: { he: 'היי דניאל! שמח לראות את הפרופיל שלך', en: 'Hey Daniel! Happy to see your profile' }, outgoing: true, time: '10:31', read: true },
    { id: 3, text: { he: 'גם אני אוהב לטייל בטבע ולגלות מקומות חדשים', en: 'I also love hiking and discovering new places' }, outgoing: false, time: '10:32', read: true },
    { id: 4, text: { he: 'איכה כינא נצא לצאת לגלות יחד! 🌟', en: 'How about we go explore together! 🌟' }, outgoing: true, time: '10:33', read: true },
    { id: 5, text: { he: 'בשמחה! הכיפות הכחושות לכם 🌿', en: 'Absolutely! The adventures await 🌿' }, outgoing: false, time: '10:34', read: false },
  ]
}

const DISCOVER_PROFILES = [
  {
    id: 1,
    name: { he: 'דניאל', en: 'Daniel' },
    age: 28,
    city: { he: 'תל אביב-יפו', en: 'Tel Aviv-Yafo' },
    avatar: 'https://i.pravatar.cc/600?img=12',
    categories: [
      { he: 'טיולים בארץ', en: 'Trips in Israel' },
      { he: 'ספורט', en: 'Sports' },
      { he: 'שותף לדירה', en: 'Roommate' },
    ],
    interests: ['hiking', 'photography', 'fitness'],
    about: {
      he: 'אוהב, טבע, הרים, מוזיקה טובה וביירות. מחפש שותפים לטיולים בארץ ולחוויות חדשות.',
      en: 'I love nature, mountains, good music and beirut. Looking for travel partners for trips around Israel and new experiences.',
    },
    lookingFor: {
      he: 'שותפים לטיולים בארץ ולחוויה חדשה',
      en: 'Partners for trips in Israel and new experiences',
    },
  },
  {
    id: 2,
    name: { he: 'שרה', en: 'Sarah' },
    age: 25,
    city: { he: 'ירושלים', en: 'Jerusalem' },
    avatar: 'https://i.pravatar.cc/600?img=45',
    categories: [
      { he: 'לימודים', en: 'Study' },
      { he: 'פרויקטים', en: 'Projects' },
    ],
    interests: ['reading', 'technology', 'music'],
    about: {
      he: 'סטודנטית למדעי המחשב, אוהבת מוזיקה ואמנות. מחפשת שותפה ללימודים ולפרויקטים.',
      en: 'CS student, love music and art. Looking for a study buddy and project collaborator.',
    },
    lookingFor: {
      he: 'שותפה ללימודים ולפרויקטים',
      en: 'Study and project partner',
    },
  },
  {
    id: 3,
    name: { he: 'אלון', en: 'Alon' },
    age: 32,
    city: { he: 'חיפה', en: 'Haifa' },
    avatar: 'https://i.pravatar.cc/600?img=33',
    categories: [
      { he: 'שותף עסקי', en: 'Business Partner' },
      { he: 'פרויקטים', en: 'Projects' },
    ],
    interests: ['startups', 'technology', 'fitness'],
    about: {
      he: 'יזם עם ניסיון של 5 שנים בהייטק. מחפש שותף עסקי לסטארטאפ חדש בתחום ה-AI.',
      en: '5 years of startup experience in high-tech. Looking for a business partner for a new AI startup.',
    },
    lookingFor: {
      he: 'שותף עסקי לסטארטאפ',
      en: 'Business partner for a startup',
    },
  },
  {
    id: 4,
    name: { he: 'מיכל', en: 'Michal' },
    age: 27,
    city: { he: 'תל אביב-יפו', en: 'Tel Aviv-Yafo' },
    avatar: 'https://i.pravatar.cc/600?img=47',
    categories: [
      { he: 'ספורט', en: 'Sports' },
      { he: 'טיולים בחו"ל', en: 'Trips Abroad' },
    ],
    interests: ['yoga', 'hiking', 'photography'],
    about: {
      he: 'מאמנת כושר ויוגה. מחפשת שותפה לספורט ולטיולים בחו"ל.',
      en: 'Fitness and yoga instructor. Looking for a sports and travel buddy.',
    },
    lookingFor: {
      he: 'שותפה לספורט ולטיולים',
      en: 'Sports and travel partner',
    },
  },
  {
    id: 5,
    name: { he: 'נועם', en: 'Noam' },
    age: 24,
    city: { he: 'רמת גן', en: 'Ramat Gan' },
    avatar: 'https://i.pravatar.cc/600?img=14',
    categories: [
      { he: 'שותף לדירה', en: 'Roommate' },
      { he: 'לימודים', en: 'Study' },
    ],
    interests: ['gaming', 'movies', 'cooking'],
    about: {
      he: 'סטודנט למשפטים, אוהב בישול ומשחקי וידאו. מחפש שותף לדירה ברמת גן.',
      en: 'Law student, love cooking and video games. Looking for a roommate in Ramat Gan.',
    },
    lookingFor: {
      he: 'שותף לדירה ולימודים',
      en: 'Roommate and study partner',
    },
  },
]

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('he')
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [activeTab, setActiveTab] = useState('discover')
  const [activeChatId, setActiveChatId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState(null)
  const [profiles] = useState(DISCOVER_PROFILES)
  const [chats] = useState(MOCK_CHATS)
  const [messages] = useState(MOCK_MESSAGES)
  const [userProfile, setUserProfile] = useState({
    name: '',
    birthDate: '',
    gender: '',
    city: '',
    smoking: '',
    pets: '',
    cleanliness: '',
    sleepSchedule: '',
    interests: [],
    avatar: 'https://i.pravatar.cc/200?img=5',
  })

  const isRTL = language === 'he'
  const t = useCallback((key) => translations[language][key] || key, [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  const navigate = useCallback((screen, options = {}) => {
    setCurrentScreen(screen)
    if (options.tab) setActiveTab(options.tab)
    if (options.chatId != null) setActiveChatId(options.chatId)
  }, [])

  const value = {
    language, setLanguage,
    isRTL,
    t,
    currentScreen,
    navigate,
    onboardingStep, setOnboardingStep,
    selectedCategories, setSelectedCategories,
    activeTab, setActiveTab,
    activeChatId, setActiveChatId,
    showFilters, setShowFilters,
    matchedProfile, setMatchedProfile,
    profiles,
    chats,
    messages,
    userProfile, setUserProfile,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
