<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">DL</span>
            </div>
            <span class="ml-3 text-xl font-bold text-gray-900 dark:text-white">DevLink</span>
          </div>
          
          <!-- Auth buttons -->
          <div class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Log in
            </router-link>
            <router-link
              to="/register"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign up
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Organize your web resources<br>
          <span class="text-blue-600">with DevLink</span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Save, categorize, and rediscover important links, all in one place. 
          Never lose that useful article, tool, or documentation again.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            Get started
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
          
          <router-link
            to="/login"
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            Sign in
          </router-link>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
        Everything you need to manage your links
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Organization</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Tag and categorize your links with customizable labels and colors for easy retrieval.
          </p>
        </div>
        
        <!-- Feature 2 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Powerful Search</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Find what you need instantly with full-text search across titles, URLs, and descriptions.
          </p>
        </div>
        
        <!-- Feature 3 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Favorites & Notes</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Mark important links as favorites and add personal notes for better context.
          </p>
        </div>
      </div>
    </div>

    <!-- Demo Screenshot -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300">Dashboard Preview</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-600 dark:bg-blue-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to organize your digital life?
        </h2>
        <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of developers and professionals who trust DevLink to keep their important resources organized.
        </p>
        <router-link
          to="/register"
          class="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center"
        >
          Start for free
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xs">DL</span>
            </div>
            <span class="ml-2 text-gray-900 dark:text-white font-semibold">DevLink</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 DevLink. Built with Vue.js & Node.js
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic can go here if needed
</script>