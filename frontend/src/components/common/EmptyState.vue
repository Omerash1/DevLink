<template>
  <div class="text-center py-12">
    <div class="mx-auto h-12 w-12 text-gray-400">
      <slot name="icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
      </slot>
    </div>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
    <div v-if="buttonText && buttonAction" class="mt-6">
      <button
        @click="buttonAction"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  buttonText?: string
  buttonAction?: () => void
}

defineProps<Props>()
</script>