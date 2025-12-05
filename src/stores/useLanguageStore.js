import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  // Load language from localStorage or default to English
  const currentLanguage = ref(localStorage.getItem('preferred-language') || 'en')

  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ]

  // Set language and persist to localStorage
  const setLanguage = (langCode) => {
    if (['en', 'ru', 'kz'].includes(langCode)) {
      currentLanguage.value = langCode
      localStorage.setItem('preferred-language', langCode)
    }
  }

  // Helper function to get translated text from multilingual object
  const getTranslated = (multilingualObj, fallback = '') => {
    if (!multilingualObj) return fallback

    // If it's already a string, return it
    if (typeof multilingualObj === 'string') return multilingualObj

    // Try current language, then English, then any available language
    return (
      multilingualObj[currentLanguage.value] ||
      multilingualObj['en'] ||
      multilingualObj['ru'] ||
      multilingualObj['kz'] ||
      fallback
    )
  }

  // Helper to get translated text with explicit language
  const getTranslatedWith = (multilingualObj, langCode, fallback = '') => {
    if (!multilingualObj) return fallback
    if (typeof multilingualObj === 'string') return multilingualObj
    return multilingualObj[langCode] || multilingualObj['en'] || fallback
  }

  // Computed property for current language object
  const currentLanguageObj = computed(() => {
    return languages.find((lang) => lang.code === currentLanguage.value) || languages[0]
  })

  return {
    currentLanguage,
    languages,
    currentLanguageObj,
    setLanguage,
    getTranslated,
    getTranslatedWith,
  }
})
