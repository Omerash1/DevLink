<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-6">
      <component :is="iconComponent" class="w-12 h-12 text-gray-500 dark:text-gray-400" />
    </div>
    
    <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    
    <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">
      {{ description }}
    </p>
    
    <slot>
      <Button v-if="buttonText" @click="$emit('action')" variant="primary">
        {{ buttonText }}
      </Button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'link', 'tag', 'search', 'reminder', 'alert'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['action'])

// Render the appropriate icon based on the icon prop
const iconComponent = computed(() => {
  switch (props.icon) {
    case 'link':
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )
        }
      }
    case 'tag':
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          )
        }
      }
    case 'search':
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )
        }
      }
    case 'reminder':
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      }
    case 'alert':
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        }
      }
    case 'info':
    default:
      return {
        render() {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      }
  }
})
</script>