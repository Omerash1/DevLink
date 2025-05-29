<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <div
        v-for="tag in tagStore.tags"
        :key="tag.id"
        @click="toggleTag(tag.id)"
        :class="[
          'px-3 py-1 text-sm rounded-full cursor-pointer transition-colors',
          isSelected(tag.id)
            ? 'opacity-100'
            : 'opacity-70 hover:opacity-90'
        ]"
        :style="{
          backgroundColor: tag.color,
          color: getContrastColor(tag.color)
        }"
      >
        {{ tag.name }}
      </div>
      
      <button 
        @click="showCreateTag = true"
        class="px-3 py-1 text-sm rounded-full border border-dashed border-gray-400 text-gray-600 dark:text-gray-300 hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        + New Tag
      </button>
    </div>
    
    <!-- Create Tag Modal -->
    <Modal v-if="showCreateTag" @close="showCreateTag = false">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Create New Tag</h3>
      </template>
      
      <template #body>
        <form @submit.prevent="createTag" class="space-y-4">
          <div>
            <label for="tagName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tag Name
            </label>
            <input
              id="tagName"
              v-model="newTag.name"
              type="text"
              required
              class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <div class="mt-2 flex flex-wrap gap-2">
              <div
                v-for="color in colorOptions"
                :key="color"
                :style="{ backgroundColor: color }"
                :class="[
                  'w-8 h-8 rounded-full cursor-pointer',
                  newTag.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                ]"
                @click="newTag.color = color"
              ></div>
            </div>
          </div>
        </form>
      </template>
      
      <template #footer>
        <Button @click="showCreateTag = false" variant="secondary">Cancel</Button>
        <Button @click="createTag" variant="primary" class="ml-2" :loading="isCreating">Create</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useTagStore } from '@/stores/tag'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])
const tagStore = useTagStore()
const toast = useToast()

const showCreateTag = ref(false)
const isCreating = ref(false)
const newTag = ref({
  name: '',
  color: '#3B82F6' // Default blue
})

// Predefined color options
const colorOptions = [
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#64748B', // Slate
  '#84CC16', // Lime
  '#9333EA', // Violet
  '#F97316', // Orange
  '#14B8A6'  // Teal
]

// Check if a tag is selected
const isSelected = (tagId: string) => props.modelValue.includes(tagId)

// Toggle tag selection
const toggleTag = (tagId: string) => {
  let updatedTags: string[]
  
  if (isSelected(tagId)) {
    updatedTags = props.modelValue.filter(id => id !== tagId)
  } else {
    updatedTags = [...props.modelValue, tagId]
  }
  
  emit('update:modelValue', updatedTags)
}

// Calculate contrast color for text
const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Return white or black based on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

// Create a new tag
const createTag = async () => {
  if (!newTag.value.name.trim()) {
    toast.error('Tag name is required')
    return
  }
  
  try {
    isCreating.value = true
    
    const createdTag = await tagStore.createTag({
      name: newTag.value.name.trim(),
      color: newTag.value.color
    })
    
    // Add newly created tag to selection
    emit('update:modelValue', [...props.modelValue, createdTag.id])
    
    // Reset form and close modal
    newTag.value = {
      name: '',
      color: '#3B82F6'
    }
    showCreateTag.value = false
    
    toast.success('Tag created successfully')
  } catch (error) {
    toast.error('Failed to create tag')
  } finally {
    isCreating.value = false
  }
}
</script>