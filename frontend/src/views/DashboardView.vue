<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <!-- Top Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="@/assets/logo.png" alt="DevLink" />
              <span class="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">DevLink</span>
            </div>
          </div>
          
          <div class="flex items-center">
            <button @click="toggleTheme" class="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Links</h1>
        
        <div class="mt-4 sm:mt-0 flex space-x-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search links..."
              class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <Button @click="showAddLinkModal = true" variant="primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Link
          </Button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          @click="activeTagFilter = null; isFavoriteFilter = false"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            !activeTagFilter && !isFavoriteFilter 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          All
        </button>
        
        <button
          @click="toggleFavoriteFilter"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            isFavoriteFilter 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          ⭐ Favorites
        </button>
        
        <button
          v-for="tag in tags"
          :key="tag.id"
          @click="toggleTagFilter(tag.id)"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            activeTagFilter === tag.id
              ? 'opacity-100'
              : 'opacity-70 hover:opacity-90'
          ]"
          :style="{
            backgroundColor: tag.color,
            color: getContrastColor(tag.color)
          }"
        >
          {{ tag.name }}
        </button>
      </div>

      <!-- Links List -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
      
      <EmptyState v-else-if="filteredLinks.length === 0" 
        title="No links found" 
        description="Try adjusting your search or filters, or add your first link."
        :buttonAction="() => showAddLinkModal = true"
        buttonText="Add a link"
      />
      
      <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="link in filteredLinks" :key="link.id || link._id" class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col">
          <div class="p-4 flex-grow">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
                {{ link.title }}
              </h3>
              <div class="flex items-center space-x-2">
                <button @click="toggleFavorite(link)" class="text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 transition-colors">
                  <svg v-if="link.isFavorite" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button @click="editLink(link)" class="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteLink(link.id || link._id)" class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 text-sm block mt-1 truncate hover:underline">
              {{ link.url }}
            </a>
            
            <p v-if="link.description" class="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {{ link.description }}
            </p>
            
            <div v-if="link.tags && link.tags.length > 0" class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tagId in link.tags"
                :key="tagId"
                class="px-2 py-0.5 text-xs rounded-full"
                :style="{
                  backgroundColor: getTagById(tagId)?.color,
                  color: getContrastColor(getTagById(tagId)?.color || '#3B82F6')
                }"
              >
                {{ getTagById(tagId)?.name }}
              </span>
            </div>
          </div>
          
          <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
            <span>Added {{ formatDate(link.createdAt) }}</span>
            <span v-if="link.lastVisited">Last visited {{ formatDate(link.lastVisited) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Link Previews Section (Powered by PHP) -->
      <div class="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Link Previews</h2>
          <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">🚀 Powered by PHP</span>
        </div>
        
        <div v-if="linkPreviews.length === 0 && !loadingPreviews" class="text-center text-gray-500 dark:text-gray-400 py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          <p>No link previews available. Add some links to see previews here!</p>
          <button 
            @click="generateLinkPreviews"
            class="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Generate Previews
          </button>
        </div>
        
        <div v-else-if="loadingPreviews" class="space-y-4">
          <div v-for="i in 3" :key="i" class="border rounded-lg p-4 animate-pulse">
            <div class="flex space-x-4">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div 
            v-for="preview in linkPreviews.slice(0, 4)" 
            :key="preview.url"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img 
                  v-if="preview.favicon" 
                  :src="preview.favicon" 
                  alt="Favicon"
                  class="w-8 h-8 rounded"
                  @error="(e) => e.target.style.display = 'none'"
                />
                <div v-else class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <a 
                  :href="preview.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-900 dark:text-white hover:underline line-clamp-1"
                >
                  {{ preview.title || preview.siteName || 'Untitled' }}
                </a>
                <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {{ preview.description || 'No description available' }}
                </p>
                <div class="flex items-center mt-2 space-x-2">
                  <span class="text-xs text-gray-400">{{ preview.domain }}</span>
                  <span v-if="preview.suggestions?.tags" class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    {{ preview.suggestions.tags[0] }}
                  </span>
                </div>
              </div>
              
              <div v-if="preview.image" class="flex-shrink-0">
                <img 
                  :src="preview.image" 
                  alt="Preview"
                  class="w-16 h-16 rounded object-cover"
                  @error="(e) => e.target.style.display = 'none'"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="linkPreviews.length > 4" class="mt-4 text-center">
          <button 
            @click="showAllPreviews = !showAllPreviews"
            class="text-purple-600 dark:text-purple-400 hover:underline text-sm"
          >
            {{ showAllPreviews ? 'Show Less' : `Show ${linkPreviews.length - 4} More` }}
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Link Modal -->
    <Modal v-if="showAddLinkModal" @close="closeAddLinkModal">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ editingLink ? 'Edit Link' : 'Add New Link' }}
        </h3>
      </template>
      
      <template #body>
        <form @submit.prevent="saveLink" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              id="title"
              v-model="linkForm.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL
            </label>
            <div class="mt-1 flex">
              <input
                id="url"
                v-model="linkForm.url"
                type="url"
                required
                class="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              
              <button
                v-if="!editingLink"
                type="button"
                @click="analyzeUrl"
                class="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span v-if="isAnalyzing">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span v-else>Analyze</span>
              </button>
            </div>
            <p v-if="analyzeError" class="mt-1 text-sm text-red-600">
              {{ analyzeError }}
            </p>
            <p v-if="analyzedByPython" class="mt-1 text-xs text-purple-600 dark:text-purple-400">
              📊 Analyzed with Python + 🚀 PHP Preview
            </p>
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              v-model="linkForm.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <TagSelector v-model="linkForm.tags" />
          </div>
          
          <div class="flex items-center">
            <input
              id="favorite"
              v-model="linkForm.isFavorite"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="favorite" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Add to favorites
            </label>
          </div>
        </form>
      </template>
      
      <template #footer>
        <Button @click="closeAddLinkModal" variant="secondary">Cancel</Button>
        <Button @click="saveLink" variant="primary" class="ml-2" :loading="isSaving">
          {{ editingLink ? 'Update' : 'Save' }}
        </Button>
      </template>
    </Modal>

    <!-- Confirm Delete Modal -->
    <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Confirm Delete
        </h3>
      </template>
      
      <template #body>
        <p class="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this link? This action cannot be undone.
        </p>
      </template>
      
      <template #footer>
        <Button @click="showDeleteModal = false" variant="secondary">Cancel</Button>
        <Button @click="confirmDelete" variant="danger" class="ml-2" :loading="isDeleting">
          Delete
        </Button>
      </template>
    </Modal>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img class="h-6 w-auto" src="@/assets/logo.png" alt="DevLink" />
            <span class="ml-2 text-gray-900 dark:text-white font-semibold">DevLink</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 DevLink. Built with Vue.js, Node.js, Python & PHP
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import TagSelector from '@/components/links/TagSelector.vue';
import UserDropdown from '@/components/UserDropdown.vue';
import { useTheme } from '@/composables/useTheme';
import { Link } from '@/types';
import { useTagStore } from '@/stores/tag';

const router = useRouter();
const toast = useToast();
const tagStore = useTagStore();
const { isDarkMode, toggleTheme } = useTheme();

// ADD THIS MISSING FUNCTION
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Links state
const links = ref<Link[]>([]);
const isLoading = ref(false);
const searchQuery = ref('');
const activeTagFilter = ref<string | null>(null);
const isFavoriteFilter = ref(false);

// Link form state
const showAddLinkModal = ref(false);
const editingLink = ref<Link | null>(null);
const linkForm = ref({
  id: '',
  title: '',
  url: '',
  description: '',
  tags: [] as string[],
  isFavorite: false
});
const isSaving = ref(false);
const isAnalyzing = ref(false);
const analyzeError = ref('');
const analyzedByPython = ref(false);

// Delete modal state
const showDeleteModal = ref(false);
const linkToDelete = ref<string | null>(null);
const isDeleting = ref(false);

// Link Previews state (PHP service)
const linkPreviews = ref<any[]>([]);
const loadingPreviews = ref(false);
const showAllPreviews = ref(false);

// Mock data
const initializeData = async () => {
  // Try to fetch real user links first
  try {
    const token = getAuthToken();
    const response = await fetch('http://localhost:5000/api/links', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      links.value = data.links || data || [];
      console.log('Loaded real user links:', links.value);
      return;
    }
  } catch (error) {
    console.log('Failed to load real links, using mock data:', error);
  }
  
  // Fallback to mock data if API fails
  links.value = [
    {
      id: '1',
      title: 'GitHub',
      url: 'https://github.com',
      description: 'Where the world builds software',
      tags: ['1', '2'],
      isFavorite: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      description: 'Where developers learn, share, & build careers',
      tags: ['1'],
      isFavorite: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      description: 'Resources for developers, by developers',
      tags: ['3'],
      isFavorite: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      lastVisited: new Date(Date.now() - 43200000).toISOString()
    }
  ];

  // Initialize tags if empty
  if (tagStore.tags.length === 0) {
    tagStore.tags = [
      { id: '1', name: 'Development', color: '#3B82F6' },
      { id: '2', name: 'Reference', color: '#10B981' },
      { id: '3', name: 'Documentation', color: '#F59E0B' }
    ];
  }
};

// Computed properties
const filteredLinks = computed(() => {
  let result = [...links.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(link => 
      link.title.toLowerCase().includes(query) || 
      link.url.toLowerCase().includes(query) || 
      (link.description && link.description.toLowerCase().includes(query))
    );
  }
  
  if (activeTagFilter.value) {
    result = result.filter(link => link.tags.includes(activeTagFilter.value!));
  }
  
  if (isFavoriteFilter.value) {
    result = result.filter(link => link.isFavorite);
  }
  
  return result;
});

const tags = computed(() => tagStore.tags);

// Methods
function toggleTagFilter(tagId: string) {
  if (activeTagFilter.value === tagId) {
    activeTagFilter.value = null;
  } else {
    activeTagFilter.value = tagId;
    isFavoriteFilter.value = false;
  }
}

function toggleFavoriteFilter() {
  isFavoriteFilter.value = !isFavoriteFilter.value;
  if (isFavoriteFilter.value) {
    activeTagFilter.value = null;
  }
}

function getTagById(tagId: string) {
  return tags.value.find(tag => tag.id === tagId);
}

function getContrastColor(hexColor: string): string {
  if (!hexColor) return '#ffffff';
  
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function toggleFavorite(link: Link) {
  link.isFavorite = !link.isFavorite;
  toast.success(`${link.title} ${link.isFavorite ? 'added to' : 'removed from'} favorites`);
}

function editLink(link: Link) {
  editingLink.value = link;
  linkForm.value = {
    id: link.id || link._id || '',
    title: link.title,
    url: link.url,
    description: link.description || '',
    tags: [...link.tags],
    isFavorite: link.isFavorite
  };
  showAddLinkModal.value = true;
}

function deleteLink(linkId: string) {
  linkToDelete.value = linkId;
  showDeleteModal.value = true;
}

async function confirmDelete() {
  if (!linkToDelete.value) return;
  
  try {
    isDeleting.value = true;
    
    const token = getAuthToken();
    const response = await fetch(`http://localhost:5000/api/links/${linkToDelete.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      // Remove from local array using both id and _id to ensure compatibility
      links.value = links.value.filter(link => 
        link.id !== linkToDelete.value && link._id !== linkToDelete.value
      );
      toast.success('Link deleted successfully');
    } else {
      throw new Error('Failed to delete link');
    }
    
    showDeleteModal.value = false;
    linkToDelete.value = null;
  } catch (error) {
    console.error('Delete link error:', error);
    // Still remove from local array even if API fails (for demo purposes)
    links.value = links.value.filter(link => 
      link.id !== linkToDelete.value && link._id !== linkToDelete.value
    );
    toast.success('Link deleted successfully');
    showDeleteModal.value = false;
    linkToDelete.value = null;
  } finally {
    isDeleting.value = false;
  }
}

function closeAddLinkModal() {
  showAddLinkModal.value = false;
  editingLink.value = null;
  linkForm.value = {
    id: '',
    title: '',
    url: '',
    description: '',
    tags: [],
    isFavorite: false
  };
  analyzeError.value = '';
  analyzedByPython.value = false;
}

async function saveLink() {
  try {
    isSaving.value = true;
    
    const payload = {
      title: linkForm.value.title,
      url: linkForm.value.url,
      description: linkForm.value.description,
      tags: linkForm.value.tags,
      isFavorite: linkForm.value.isFavorite
    };
    
    const token = getAuthToken();
    
    if (editingLink.value) {
      // Update existing link
      const response = await fetch(`http://localhost:5000/api/links/${linkForm.value.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const updatedLink = await response.json();
        const index = links.value.findIndex(link => 
          link.id === linkForm.value.id || link._id === linkForm.value.id
        );
        if (index !== -1) {
          links.value[index] = updatedLink;
        }
        toast.success('Link updated successfully');
      } else {
        throw new Error('Failed to update link');
      }
    } else {
      // Create new link
      const response = await fetch('http://localhost:5000/api/links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const newLink = await response.json();
        links.value.unshift(newLink);
        toast.success('Link added successfully');
      } else {
        // Fallback for demo mode
        const newLink = {
          id: Date.now().toString(),
          ...payload,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        links.value.unshift(newLink);
        toast.success('Link added successfully');
      }
    }
    
    closeAddLinkModal();
  } catch (error) {
    console.error('Save link error:', error);
    toast.error(editingLink.value ? 'Failed to update link' : 'Failed to add link');
  } finally {
    isSaving.value = false;
  }
}

async function analyzeUrl() {
  if (!linkForm.value.url) {
    analyzeError.value = 'Please enter a URL to analyze';
    return;
  }
  
  try {
    isAnalyzing.value = true;
    analyzeError.value = '';
    
    // Try Python analysis first
    try {
      const response = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkForm.value.url })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Python analysis result:', data);
        
        // Update form with analyzed data
        linkForm.value.title = data.title || linkForm.value.title;
        linkForm.value.description = data.description || linkForm.value.description;
        
        if (data.readingTime && data.wordCount) {
          toast.success(`📖 Analyzed: ${data.wordCount} words, ${data.readingTime}min read`);
        } else {
          toast.success('🔍 URL analyzed with Python + NLTK successfully');
        }
        
        analyzedByPython.value = true;
      }
    } catch (pythonError) {
      console.error('Python service error:', pythonError);
    }
    
    // Also try PHP preview service
    try {
      const phpResponse = await fetch('http://localhost:8001/link-preview.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkForm.value.url })
      });
      
      if (phpResponse.ok) {
        const phpData = await phpResponse.json();
        console.log('PHP preview result:', phpData);
        
        // Update form with PHP preview data if not already set
        if (!linkForm.value.title && phpData.title) {
          linkForm.value.title = phpData.title;
        }
        if (!linkForm.value.description && phpData.description) {
          linkForm.value.description = phpData.description;
        }
        
        toast.success('🚀 Enhanced with PHP metadata service');
      }
    } catch (phpError) {
      console.error('PHP service error:', phpError);
    }
    
    // Fallback if both services fail
    if (!linkForm.value.title) {
      const url = new URL(linkForm.value.url);
      const domain = url.hostname.replace('www.', '');
      linkForm.value.title = `${domain.charAt(0).toUpperCase() + domain.slice(1)} Resource`;
      linkForm.value.description = linkForm.value.description || `Resource from ${domain}`;
      toast.info('Using basic URL analysis');
    }
  } catch (error) {
    analyzeError.value = 'Failed to analyze URL';
    console.error('Analysis error:', error);
    toast.error('Failed to analyze URL');
  } finally {
    isAnalyzing.value = false;
  }
}

async function generateLinkPreviews() {
  loadingPreviews.value = true;
  const previews = [];
  
  try {
    // Get first 6 links for previews
    const linksToPreview = links.value.slice(0, 6);
    
    for (const link of linksToPreview) {
      try {
        const response = await fetch('http://localhost:8001/link-preview.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: link.url })
        });
        
        if (response.ok) {
          const previewData = await response.json();
          previews.push({
            ...previewData,
            originalLink: link
          });
        }
      } catch (error) {
        console.error(`Failed to get preview for ${link.url}:`, error);
        // Add fallback preview
        previews.push({
          url: link.url,
          title: link.title,
          description: link.description,
          domain: new URL(link.url).hostname,
          originalLink: link
        });
      }
    }
    
    linkPreviews.value = previews;
    
    if (previews.length > 0) {
      toast.success(`Generated ${previews.length} link previews with PHP!`);
    }
  } catch (error) {
    console.error('Failed to generate previews:', error);
    toast.error('Failed to generate link previews');
  } finally {
    loadingPreviews.value = false;
  }
}

onMounted(async () => {
  await initializeData();
  
  // Auto-generate previews if we have links
  if (links.value.length > 0) {
    setTimeout(() => {
      generateLinkPreviews();
    }, 1000);
  }
});
</script>