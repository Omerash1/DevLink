<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img class="mx-auto h-16 w-auto" src="@/assets/logo.svg" alt="DevLink Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to DevLink
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            create a new account
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            class="w-full"
            :loading="isLoading"
          >
            Sign in
          </Button>
        </div>
        
        <div v-if="error" class="text-center text-red-500 text-sm">
          {{ error }}
        </div>
        
        <!-- Demo Account Button -->
        <div class="text-center">
          <button
            type="button"
            @click="useDemoAccount"
            class="font-medium text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Use demo account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const handleLogin = async () => {
  try {
    error.value = ''
    isLoading.value = true
    
    await authStore.login(form.email, form.password)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Failed to login. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

const useDemoAccount = () => {
  form.email = 'demo@example.com'
  form.password = 'demopassword'
  handleLogin()
}
</script>