<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <span class="text-xl font-bold text-gray-900">DEVLINK</span>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Username -->
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          
          <!-- Password -->
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          
          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            </span>
            {{ loading ? 'Creating account...' : 'Sign up' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  // Clear previous errors
  error.value = '';
  
  // Basic validation
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }
  
  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long';
    return;
  }

  loading.value = true;

  try {
    // Create registration data object
    const registerData = {
      username: form.value.username.trim(),
      email: form.value.email.trim(),
      password: form.value.password
    };

    console.log('Sending registration data:', registerData);

    await authStore.register(registerData);
    
    toast.success('Account created successfully!');
    router.push('/dashboard');
  } catch (err: any) {
    console.error('Registration error:', err);
    error.value = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>