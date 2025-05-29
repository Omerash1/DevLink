import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { AuthUser } from '@/types'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

// Demo mode detection
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (err) {
        console.error('Failed to parse saved user data:', err)
        logout()
      }
    }
  }

  const login = async (loginData: LoginData) => {
    loading.value = true
    error.value = null
    
    try {
      console.log('Login attempt:', { email: loginData.email, demoMode: DEMO_MODE })
      
      // Demo mode - no real API
      if (DEMO_MODE) {
        console.log('Demo mode: Using mock authentication')
        
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Demo users
        const demoUsers = [
          { username: 'demo', email: 'demo@devlink.com', password: 'demo' },
          { username: 'admin', email: 'admin@devlink.com', password: 'admin' },
          { username: 'test', email: 'test@devlink.com', password: 'test' },
          { username: 'user', email: 'user@devlink.com', password: 'password' }
        ]
        
        const demoUser = demoUsers.find(u => 
          (u.email === loginData.email || u.username === loginData.email) && 
          u.password === loginData.password
        )
        
        if (!demoUser) {
          throw new Error('Invalid demo credentials. Try: demo/demo or admin/admin')
        }
        
        const authUser = {
          _id: 'demo-' + Date.now(),
          username: demoUser.username,
          email: demoUser.email,
          token: 'demo-token-' + Date.now()
        }
        
        user.value = {
          _id: authUser._id,
          username: authUser.username,
          email: authUser.email,
          token: authUser.token
        }
        token.value = authUser.token
        
        // Save to localStorage
        localStorage.setItem('token', authUser.token)
        localStorage.setItem('user', JSON.stringify(user.value))
        
        console.log('Demo login successful:', user.value)
        return authUser
      }
      
      // Real API mode (your existing code)
      const response = await api.post('/auth/login', loginData)
      const authUser = response.data
      
      user.value = {
        _id: authUser._id,
        username: authUser.username,
        email: authUser.email,
        token: authUser.token
      }
      token.value = authUser.token
      
      // Save to localStorage
      localStorage.setItem('token', authUser.token)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return authUser
    } catch (err: any) {
      if (DEMO_MODE) {
        error.value = err.message || 'Demo login failed'
      } else {
        error.value = err.response?.data?.message || 'Login failed'
      }
      console.error('Login error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (registerData: RegisterData) => {
    loading.value = true
    error.value = null
    
    try {
      // Demo mode
      if (DEMO_MODE) {
        console.log('Demo mode: Using mock registration')
        
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const authUser = {
          _id: 'demo-user-' + Date.now(),
          username: registerData.username,
          email: registerData.email,
          token: 'demo-token-' + Date.now()
        }
        
        user.value = {
          _id: authUser._id,
          username: authUser.username,
          email: authUser.email,
          token: authUser.token
        }
        token.value = authUser.token
        
        // Save to localStorage
        localStorage.setItem('token', authUser.token)
        localStorage.setItem('user', JSON.stringify(user.value))
        
        return authUser
      }
      
      // Real API mode (your existing code)
      const response = await api.post('/auth/register', registerData)
      const authUser = response.data
      
      user.value = {
        _id: authUser._id,
        username: authUser.username,
        email: authUser.email,
        token: authUser.token
      }
      token.value = authUser.token
      
      // Save to localStorage
      localStorage.setItem('token', authUser.token)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return authUser
    } catch (err: any) {
      if (DEMO_MODE) {
        error.value = err.message || 'Demo registration failed'
      } else {
        error.value = err.response?.data?.message || 'Registration failed'
      }
      console.error('Registration error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value && !DEMO_MODE) {
        await api.post('/auth/logout')
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state regardless of API call success
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const getProfile = async () => {
    if (!token.value) return null
    
    // Skip profile fetch in demo mode
    if (DEMO_MODE) {
      return user.value
    }
    
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/auth/me')
      const userData = response.data
      
      user.value = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        token: token.value
      }
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return user.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to get profile'
      console.error('Get profile error:', err)
      
      // If unauthorized, logout
      if (err.response?.status === 401) {
        logout()
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const updateUser = (userData: Partial<AuthUser>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Computed
    isAuthenticated,
    
    // Actions
    initAuth,
    login,
    register,
    logout,
    getProfile,
    clearError,
    updateUser
  }
})