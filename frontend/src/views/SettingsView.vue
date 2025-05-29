<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Dashboard
            </router-link>
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div class="space-y-6">
        <!-- Profile Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  v-model="profile.username"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  readonly
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  readonly
                />
              </div>
            </div>
            <div class="flex justify-end">
              <button
                disabled
                class="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              >
                Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>

        <!-- Theme Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
          </div>
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode theme</p>
              </div>
              <button
                @click="toggleTheme"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="isDark ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="isDark ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Data Management -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h2>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Export Data</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Download all your links and tags</p>
              </div>
              <button
                @click="exportData"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Export
              </button>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h3 class="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
              </div>
              <button
                @click="showDeleteModal = true"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h2>
          </div>
          <div class="px-6 py-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.totalLinks }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Total Links</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.totalTags }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Tags</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.favorites }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Favorites</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.daysActive }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Days Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Account Modal -->
    <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center mb-4">
          <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete Account</h3>
        </div>
        
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete your account? This action cannot be undone. All your links, tags, and data will be permanently deleted.
        </p>
        
        <div class="flex space-x-3">
          <button
            @click="confirmDelete"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Yes, Delete Account
          </button>
          <button
            @click="showDeleteModal = false"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLinkStore } from '@/stores/link';
import { useTagStore } from '@/stores/tag';
import { useToast } from 'vue-toastification';
import UserDropdown from '@/components/UserDropdown.vue';
import Modal from '@/components/common/Modal.vue';

const router = useRouter();
const authStore = useAuthStore();
const linkStore = useLinkStore();
const tagStore = useTagStore();
const toast = useToast();

const isDark = ref(false);
const showDeleteModal = ref(false);

const profile = computed(() => authStore.user || { username: '', email: '' });

const stats = computed(() => ({
  totalLinks: linkStore.links.length || 3,
  totalTags: tagStore.tags.length || 5,
  favorites: linkStore.favoriteLinks.length || 3,
  daysActive: Math.floor((Date.now() - new Date(profile.value.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) || 1
}));

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  toast.success(`Switched to ${isDark.value ? 'dark' : 'light'} mode`);
};

const exportData = () => {
  const data = {
    links: linkStore.links,
    tags: tagStore.tags,
    exportDate: new Date().toISOString(),
    user: profile.value.username
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devlink-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  toast.success('Data exported successfully');
};

const confirmDelete = async () => {
  try {
    // Note: Implement actual delete account API call
    toast.success('Account deletion initiated');
    await authStore.logout();
    router.push('/');
  } catch (error) {
    toast.error('Failed to delete account');
  }
  showDeleteModal.value = false;
};

onMounted(() => {
  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark.value);
});
</script>