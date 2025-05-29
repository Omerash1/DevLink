<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.title }"
      />
      <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
    </div>

    <div>
      <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
      <input
        id="url"
        v-model="form.url"
        type="url"
        required
        class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.url }"
      />
      <p v-if="errors.url" class="mt-1 text-sm text-red-500">{{ errors.url }}</p>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
      <input
        id="description"
        v-model="form.description"
        type="text"
        class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
      <TagSelector v-model="form.tags" />
    </div>

    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
      <textarea
        id="notes"
        v-model="form.notes"
        rows="3"
        class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>

    <div class="flex items-center">
      <input
        id="favorite"
        v-model="form.isFavorite"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label for="favorite" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        Add to favorites
      </label>
    </div>

    <div>
      <label for="reminder" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Set reminder (optional)
      </label>
      <input
        id="reminder"
        v-model="form.reminderDate"
        type="datetime-local"
        class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div class="flex justify-end space-x-2">
      <Button @click="$emit('cancel')" type="button" variant="secondary">Cancel</Button>
      <Button type="submit" :loading="isSubmitting">{{ submitButtonText }}</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import Button from '@/components/common/Button.vue'
import TagSelector from './links/TagSelector.vue'
import { Link } from '@/types'
import { isValidUrl } from '@/utils/validators'

const props = defineProps<{
  initialData?: Partial<Link>
  isEdit?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])
const toast = useToast()

const isSubmitting = ref(false)
const errors = reactive({
  title: '',
  url: ''
})

const form = reactive({
  title: '',
  url: '',
  description: '',
  tags: [] as string[],
  notes: '',
  isFavorite: false,
  reminderDate: ''
})

const submitButtonText = computed(() => props.isEdit ? 'Update Link' : 'Save Link')

// Populate form with initial data if editing
onMounted(() => {
  if (props.initialData) {
    form.title = props.initialData.title || ''
    form.url = props.initialData.url || ''
    form.description = props.initialData.description || ''
    form.tags = props.initialData.tags || []
    form.notes = props.initialData.notes || ''
    form.isFavorite = props.initialData.isFavorite || false
    
    if (props.initialData.reminderDate) {
      // Convert to ISO string and format for datetime-local input
      const date = new Date(props.initialData.reminderDate)
      form.reminderDate = date.toISOString().slice(0, 16)
    }
  }
})

// Validate the form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.title = ''
  errors.url = ''
  
  // Validate title
  if (!form.title.trim()) {
    errors.title = 'Title is required'
    isValid = false
  } else if (form.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
    isValid = false
  }
  
  // Validate URL
  if (!form.url.trim()) {
    errors.url = 'URL is required'
    isValid = false
  } else if (!isValidUrl(form.url)) {
    errors.url = 'Please enter a valid URL'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }
  
  try {
    isSubmitting.value = true
    
    // Prepare data
    const linkData = {
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      tags: form.tags,
      notes: form.notes.trim(),
      isFavorite: form.isFavorite,
      reminderDate: form.reminderDate ? new Date(form.reminderDate).toISOString() : undefined
    }
    
    // Emit data to parent
    emit('submit', linkData)
  } catch (error) {
    console.error('Form submission error:', error)
    toast.error('An error occurred while saving the link')
  } finally {
    isSubmitting.value = false
  }
}
</script>