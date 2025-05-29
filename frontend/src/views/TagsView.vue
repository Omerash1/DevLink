<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Tags</h1>
        
        <Button @click="showAddTagModal = true" variant="primary" class="mt-4 sm:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Tag
        </Button>
      </div>
      
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
      
      <EmptyState 
        v-else-if="tags.length === 0"
        title="No tags yet"
        description="Create tags to organize your links."
        :buttonAction="() => showAddTagModal = true"
        buttonText="Create a tag"
      />
      
      <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="tag in tags" :key="tag.id" class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="p-5">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div 
                  class="h-4 w-4 rounded-full mr-3" 
                  :style="{ backgroundColor: tag.color }"
                ></div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ tag.name }}
                </h3>
              </div>
              <div class="flex space-x-2">
                <button @click="editTag(tag)" class="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDeleteTag(tag)" class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-1">
              <div 
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1"
              >
                {{ tagLinkCounts[tag.id] || 0 }} links
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Add/Edit Tag Modal -->
    <Modal v-if="showAddTagModal" @close="closeAddTagModal">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ editingTag ? 'Edit Tag' : 'Add New Tag' }}
        </h3>
      </template>
      
      <template #body>
        <form @submit.prevent="saveTag" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              v-model="tagForm.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <div class="mt-1 flex items-center">
              <input
                id="color"
                v-model="tagForm.color"
                type="color"
                class="h-8 w-8 border-gray-300 dark:border-gray-700 rounded-md"
              />
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {{ tagForm.color }}
              </span>
            </div>
          </div>
        </form>
      </template>
      
      <template #footer>
        <Button @click="closeAddTagModal" variant="secondary">Cancel</Button>
        <Button @click="saveTag" variant="primary" class="ml-2" :loading="isSaving">
          {{ editingTag ? 'Update' : 'Save' }}
        </Button>
      </template>
    </Modal>
    
    <!-- Delete Confirmation Modal -->
    <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Confirm Delete
        </h3>
      </template>
      
      <template #body>
        <p class="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete the tag "{{ tagToDelete?.name }}"? This will remove the tag from all links.
        </p>
      </template>
      
      <template #footer>
        <Button @click="showDeleteModal = false" variant="secondary">Cancel</Button>
        <Button @click="deleteTag" variant="danger" class="ml-2" :loading="isDeleting">
          Delete
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import NavBar from '@/components/NavBar.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useTagStore } from '@/stores/tag';
import { useLinkStore } from '@/stores/link';
import { Tag } from '@/types';
import { isValidHexColor } from '@/utils/validators';

const toast = useToast();
const tagStore = useTagStore();
const linkStore = useLinkStore();

// State
const showAddTagModal = ref(false);
const showDeleteModal = ref(false);
const editingTag = ref<Tag | null>(null);
const tagToDelete = ref<Tag | null>(null);
const isSaving = ref(false);
const isDeleting = ref(false);
const tagLinkCounts = ref<Record<string, number>>({});

const tagForm = ref({
  name: '',
  color: '#3B82F6'
});

// Computed
const isLoading = computed(() => tagStore.loading);
const tags = computed(() => tagStore.tags);

// Methods
async function fetchTagLinkCounts() {
  try {
    const links = await linkStore.fetchLinks();
    
    // Count links per tag
    const counts: Record<string, number> = {};
    linkStore.links.forEach(link => {
      link.tags.forEach(tagId => {
        counts[tagId] = (counts[tagId] || 0) + 1;
      });
    });
    
    tagLinkCounts.value = counts;
  } catch (error) {
    console.error('Error fetching tag link counts:', error);
  }
}

function editTag(tag: Tag) {
  editingTag.value = tag;
  tagForm.value = {
    name: tag.name,
    color: tag.color
  };
  showAddTagModal.value = true;
}

function confirmDeleteTag(tag: Tag) {
  tagToDelete.value = tag;
  showDeleteModal.value = true;
}

async function deleteTag() {
  if (!tagToDelete.value) return;
  
  try {
    isDeleting.value = true;
    await tagStore.deleteTag(tagToDelete.value.id);
    showDeleteModal.value = false;
    tagToDelete.value = null;
  } catch (error) {
    console.error('Error deleting tag:', error);
  } finally {
    isDeleting.value = false;
  }
}

function closeAddTagModal() {
  showAddTagModal.value = false;
  editingTag.value = null;
  tagForm.value = {
    name: '',
    color: '#3B82F6'
  };
}

async function saveTag() {
  try {
    // Validate form
    if (!tagForm.value.name.trim()) {
      toast.error('Tag name is required');
      return;
    }
    
    if (!isValidHexColor(tagForm.value.color)) {
      toast.error('Please enter a valid hex color code');
      return;
    }
    
    isSaving.value = true;
    
    if (editingTag.value) {
      await tagStore.updateTag(editingTag.value.id, {
        name: tagForm.value.name,
        color: tagForm.value.color
      });
    } else {
      await tagStore.createTag({
        name: tagForm.value.name,
        color: tagForm.value.color
      });
    }
    
    closeAddTagModal();
  } catch (error) {
    console.error('Error saving tag:', error);
  } finally {
    isSaving.value = false;
  }
}

onMounted(async () => {
  await tagStore.fetchTags();
  fetchTagLinkCounts();
});
</script>
