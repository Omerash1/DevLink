import { ref, watch } from 'vue'

const isDarkMode = ref(false)

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    updateTheme()
  }

  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    updateTheme()
  }

  const setTheme = (theme: 'light' | 'dark') => {
    isDarkMode.value = theme === 'dark'
    localStorage.setItem('theme', theme)
    updateTheme()
  }

  // Watch for changes
  watch(isDarkMode, updateTheme)

  // Initialize on first use
  if (typeof window !== 'undefined') {
    initTheme()
  }

  return {
    isDarkMode,
    toggleTheme,
    setTheme,
    initTheme
  }
}