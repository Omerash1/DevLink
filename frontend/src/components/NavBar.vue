<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/dashboard" class="flex items-center">
              <img class="h-8 w-auto" src="@/assets/logo.svg" alt="DevLink Logo" />
              <span class="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">DevLink</span>
            </router-link>
          </div>
          
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                $route.path === '/dashboard'
                  ? 'border-blue-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
              ]"
            >
              Dashboard
            </router-link>
            
            <router-link
              to="/tags"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                $route.path === '/tags'
                  ? 'border-blue-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
              ]"
            >
              Tags
            </router-link>
            
            <router-link
              to="/reminders"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                $route.path === '/reminders'
                  ? 'border-blue-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
              ]"
            >
              Reminders
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center">
          <button
            @click="toggleTheme"
            class="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg
              v-if="isDarkMode"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <div class="ml-3 relative">
            <div>
              <button
                @click="isProfileMenuOpen = !isProfileMenuOpen"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800">
                  <span class="text-sm font-medium leading-none text-blue-700 dark:text-blue-200">
                    {{ userInitials }}
                  </span>
                </span>
              </button>
            </div>
            
            <div
              v-if="isProfileMenuOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              @blur="isProfileMenuOpen = false"
            >
              <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                <p>Signed in as</p>
                <p class="font-semibold">{{ authStore.user?.email }}</p>
              </div>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click.prevent="logout"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/dashboard"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            $route.path === '/dashboard'
              ? 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-20'
              : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
          @click="isMobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        
        <router-link
          to="/tags"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            $route.path === '/tags'
              ? 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-20'
              : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
          @click="isMobileMenuOpen = false"
        >
          Tags
        </router-link>
        
        <router-link
          to="/reminders"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            $route.path === '/reminders'
              ? 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-20'
              : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
          @click="isMobileMenuOpen = false"
        >
          Reminders
        </router-link>
      </div>
      
      <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800">
              <span class="text-sm font-medium leading-none text-blue-700 dark:text-blue-200">
                {{ userInitials }}
              </span>
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800 dark:text-gray-200">
              {{ authStore.user?.username }}
            </div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ authStore.user?.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <a
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            @click.prevent="logout"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const authStore = useAuthStore()
const { isDarkMode, toggleTheme } = useTheme()

const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

// Close profile menu when clicking outside
window.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative') && isProfileMenuOpen.value) {
    isProfileMenuOpen.value = false
  }
})

// Get user initials for avatar
const userInitials = computed(() => {
  const username = authStore.user?.username || ''
  if (!username) return '?'
  
  // Get initials (first letter of first and last name)
  const parts = username.split(' ')
  if (parts.length === 1) {
    return username.charAt(0).toUpperCase()
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

// Logout function
const logout = () => {
  authStore.logout()
  isProfileMenuOpen.value = false
  isMobileMenuOpen.value = false
}
</script>