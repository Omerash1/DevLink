<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tagId in modelValue"
        :key="tagId"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        :style="{
          backgroundColor: getTagById(tagId)?.color || '#3B82F6',
          color: getContrastColor(getTagById(tagId)?.color || '#3B82F6')
        }"
      >
        {{ getTagById(tagId)?.name }}
        <button
          @click="removeTag(tagId)"
          type="button"
          class="ml-1 inline-flex h-4 w-4 rounded-full items-center justify-center hover:bg-black hover:bg-opacity-20 focus:outline-none"
        >
          <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6" />
          </svg>
        </button>
      </span>
    </div>
    
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search or create tags..."
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
        @keydown.enter.prevent="handleEnter"
      />
      
      <div
        v-if="showDropdown && (filteredTags.length > 0 || searchQuery.trim())"
        class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
      >
        <div
          v-for="tag in filteredTags"
          :key="tag.id"
          @click="toggleTag(tag.id)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div class="flex items-center">
            <span
              class="inline-block h-3 w-3 rounded-full mr-2"
              :style="{ backgroundColor: tag.color }"
            ></span>
            <span class="font-normal block truncate">{{ tag.name }}</span>
            <span v-if="modelValue.includes(tag.id)" class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        
        <div
          v-if="searchQuery.trim() && !tagExists"
          @click="createNewTag"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="font-normal">Create "{{ searchQuery.trim() }}"</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTagStore } from '@/stores/tag'

interface Props {
  modelValue: string[]
}

interface Emits {
  'update:modelValue': [value: string[]]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tagStore = useTagStore()
const searchQuery = ref('')
const showDropdown = ref(false)

const filteredTags = computed(() => {
  if (!searchQuery.value.trim()) {
    return tagStore.tags
  }
  
  return tagStore.tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const tagExists = computed(() => {
  return tagStore.tags.some(tag =>
    tag.name.toLowerCase() === searchQuery.value.trim().toLowerCase()
  )
})

function getTagById(tagId: string) {
  return tagStore.tags.find(tag => tag.id === tagId)
}

function getContrastColor(hexColor: string): string {
  if (!hexColor) return '#ffffff'
  
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

function toggleTag(tagId: string) {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(tagId)
  
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(tagId)
  }
  
  emit('update:modelValue', newValue)
  searchQuery.value = ''
  showDropdown.value = false
}

function removeTag(tagId: string) {
  const newValue = props.modelValue.filter(id => id !== tagId)
  emit('update:modelValue', newValue)
}

function handleEnter() {
  if (searchQuery.value.trim() && !tagExists.value) {
    createNewTag()
  } else if (filteredTags.value.length > 0) {
    toggleTag(filteredTags.value[0].id)
  }
}

async function createNewTag() {
  try {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4']
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    const newTag = await tagStore.createTag({
      name: searchQuery.value.trim(),
      color
    })
    
    emit('update:modelValue', [...props.modelValue, newTag.id])
    searchQuery.value = ''
    showDropdown.value = false
  } catch (error) {
    console.error('Failed to create tag:', error)
  }
}

function handleFocus() {
  showDropdown.value = true
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>