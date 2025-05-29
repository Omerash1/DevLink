<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="flex items-center">
          <div class="bg-blue-600 text-white p-2 rounded-lg mr-3">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">DevLink</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Sign in to DevLink
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Or
        <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          create a new account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Debug Info -->
        <div v-if="showDebug" class="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
          <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">Debug Info:</h4>
          <p class="text-xs text-blue-600 dark:text-blue-300">Demo Mode: {{ DEMO_MODE ? 'ON' : 'OFF' }}</p>
          <p class="text-xs text-blue-600 dark:text-blue-300">Loading: {{ authStore.loading }}</p>
          <p class="text-xs text-blue-600 dark:text-blue-300">Error: {{ authStore.error || 'None' }}</p>
          <p class="text-xs text-blue-600 dark:text-blue-300">Form Data: {{ JSON.stringify(form) }}</p>
        </div>

        <!-- Demo Users Help -->
        <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md">
          <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Demo Users:</h4>
          <div class="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
            <p>• Username: <code>demo</code> Password: <code>demo</code></p>
            <p>• Username: <code>admin</code> Password: <code>admin</code></p>
            <p>• Username: <code>test</code> Password: <code>test</code></p>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email or Username
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="text"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter email or username"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <!-- Error Display -->
          <div v-if="authStore.error" class="text-red-600 dark:text-red-400 text-sm text-center">
            {{ authStore.error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="authStore.loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>

          <!-- Demo Account Button -->
          <div>
            <button
              type="button"
              @click="useDemoAccount"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Use demo account
            </button>
          </div>

          <!-- Debug Toggle -->
          <div class="text-center">
            <button
              type="button"
              @click="showDebug = !showDebug"
              class="text-xs text-gray-500 hover:text-gray-700"
            >
              {{ showDebug ? 'Hide' : 'Show' }} Debug Info
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const showDebug = ref(false)
const DEMO_MODE = ref(true) // Will be set properly from env

const handleLogin = async () => {
  console.log('Login form submitted:', form.value)
  
  if (!form.value.email || !form.value.password) {
    toast.error('Please fill in all fields')
    return
  }

  try {
    console.log('Calling authStore.login...')
    await authStore.login({
      email: form.value.email,
      password: form.value.password
    })
    
    console.log('Login successful, redirecting...')
    toast.success('Login successful!')
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Login failed:', error)
    toast.error(error.message || 'Login failed')
  }
}

const useDemoAccount = () => {
  form.value.email = 'demo'
  form.value.password = 'demo'
  handleLogin()
}

onMounted(() => {
  // Clear any existing errors
  authStore.clearError()
  
  // Check if already authenticated
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
  
  // Set demo mode detection
  DEMO_MODE.value = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL
})
</script>