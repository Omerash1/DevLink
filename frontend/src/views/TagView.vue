<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Tags</h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Organize your links with custom tags
            </p>
          </div>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            New Tag
          </button>
        </div>
      </div>

      <!-- Tags Grid -->
      <div v-if="tags.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="tag in tags"
          :key="tag._id"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div
                class="w-4 h-4 rounded-full mr-3"
                :style="{ backgroundColor: tag.color }"
              ></div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ tag.name }}</h3>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editTag(tag)"
                class="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button
                @click="deleteTag(tag._id!)"
                class="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ getTagLinkCount(tag._id!) }} links
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tags</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new tag.</p>
        <div class="mt-6">
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            New Tag
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Tag Modal -->
    <Modal v-if="showCreateModal || showEditModal" @close="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ isEditing ? 'Edit Tag' : 'Create New Tag' }}
        </h3>
        
        <form @submit.prevent="isEditing ? updateTag() : createTag()">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tag Name
            </label>
            <input
              v-model="tagForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter tag name"
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="color in colorOptions"
                :key="color"
                type="button"
                @click="tagForm.color = color"
                class="w-8 h-8 rounded-full border-2 transition-all"
                :class="tagForm.color === color ? 'border-gray-400 scale-110' : 'border-gray-200'"
                :style="{ backgroundColor: color }"
              ></button>
            </div>
            <input
              v-model="tagForm.color"
              type="color"
              class="mt-2 w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              :disabled="!tagForm.name.trim()"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTagStore } from '@/stores/tag';
import { useLinkStore } from '@/stores/link';
import type { Tag } from '@/types';
import Modal from '@/components/common/Modal.vue';
import { useToast } from 'vue-toastification';

const tagStore = useTagStore();
const linkStore = useLinkStore();
const toast = useToast();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const isEditing = ref(false);
const editingTagId = ref<string | null>(null);

const tagForm = ref({
  name: '',
  color: '#3B82F6'
});

const colorOptions = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
  '#8B5CF6', '#F97316', '#06B6D4', '#84CC16',
  '#EC4899', '#6B7280'
];

const tags = computed(() => tagStore.tags);

const getTagLinkCount = (tagId: string) => {
  return linkStore.links.filter(link => link.tags.includes(tagId)).length;
};

const createTag = async () => {
  try {
    await tagStore.createTag(tagForm.value);
    toast.success('Tag created successfully');
    closeModal();
  } catch (error) {
    toast.error('Failed to create tag');
  }
};

const editTag = (tag: Tag) => {
  tagForm.value = {
    name: tag.name,
    color: tag.color
  };
  editingTagId.value = tag._id!;
  isEditing.value = true;
  showEditModal.value = true;
};

const updateTag = async () => {
  if (!editingTagId.value) return;
  
  try {
    await tagStore.updateTag(editingTagId.value, tagForm.value);
    toast.success('Tag updated successfully');
    closeModal();
  } catch (error) {
    toast.error('Failed to update tag');
  }
};

const deleteTag = async (tagId: string) => {
  if (confirm('Are you sure you want to delete this tag? It will be removed from all links.')) {
    try {
      await tagStore.deleteTag(tagId);
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('Failed to delete tag');
    }
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  isEditing.value = false;
  editingTagId.value = null;
  tagForm.value = {
    name: '',
    color: '#3B82F6'
  };
};

onMounted(async () => {
  await tagStore.fetchTags();
  await linkStore.fetchLinks();
});
</script>