<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <nav class="px-4 py-5 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center max-w-7xl mx-auto">
        <div class="flex items-center">
          <img src="@/assets/logo.svg" alt="DevLink Logo" class="h-10 w-auto" />
          <span class="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">DevLink</span>
        </div>
        <div class="flex items-center space-x-4">
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
          <router-link 
            to="/login" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            Log in
          </router-link>
          <router-link 
            to="/register" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main>
      <div class="relative pt-16 pb-20 sm:pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span class="block">Organize your web resources</span>
              <span class="block text-blue-600 dark:text-blue-400">with DevLink</span>
            </h1>
            <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Save, categorize, and rediscover important links, all in one place. Never lose that useful article, tool, or documentation again.
            </p>
            <div class="mt-10 flex justify-center">
              <div class="rounded-md shadow">
                <router-link 
                  to="/register" 
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </router-link>
              </div>
              <div class="ml-3 rounded-md shadow">
                <router-link 
                  to="/login" 
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                >
                  Sign in
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="bg-white dark:bg-gray-800 py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Features</h2>
            <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage your links
            </p>
          </div>

          <div class="mt-10">
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Save & Organize Links</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Save important URLs, add descriptions, and organize them with custom tags. No more bookmarks scattered across different browsers.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Custom Tags & Notes</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Create colorful tags to categorize your links. Add detailed notes to remember why you saved something for future reference.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Set Reminders</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Set reminders for links you want to revisit later. Never forget to read that important article or check that documentation.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Powerful Search</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Quickly find what you're looking for with full-text search across your links, tags, and notes. Filter by favorites, tags, and more.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Easy on the eyes with support for both light and dark modes. Automatically switches based on your system preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div class="-mt-6">
                    <div>
                      <span class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </div>
                    <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Responsive Design</h3>
                    <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Access your links from any device. DevLink works seamlessly on desktop, tablet, and mobile with a fully responsive design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Section -->
      <div class="relative bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-5">
              <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Try it out with our demo account
              </h2>
              <p class="mt-4 text-lg text-gray-500 dark:text-gray-300">
                Want to see DevLink in action? You can use our demo account to explore all features without signing up.
              </p>
              <div class="mt-8">
                <button 
                  @click="loginWithDemoAccount"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Try Demo Account
                </button>
              </div>
            </div>
            <div class="mt-12 lg:mt-0 lg:col-span-7">
              <div class="relative">
                <div class="aspect-w-16 aspect-h-9 rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="@/assets/dashboard-preview.png" 
                    alt="DevLink Dashboard Preview" 
                    class="object-cover"
                    onerror="this.src='https://via.placeholder.com/800x450?text=DevLink+Dashboard'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img src="@/assets/logo.svg" alt="DevLink Logo" class="h-8 w-auto" />
            <span class="ml-2 text-lg font-bold text-blue-600 dark:text-blue-400">DevLink</span>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} DevLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const isDarkMode = ref(document.documentElement.classList.contains('dark'));

// Toggle dark/light mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Login with demo account
const loginWithDemoAccount = async () => {
  try {
    await authStore.login('demo@example.com', 'demopassword');
    router.push('/dashboard');
  } catch (error) {
    console.error('Demo login failed:', error);
  }
};
</script>