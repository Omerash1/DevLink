<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeOnBackdrop && $emit('close')"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative transform transition-all bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full"
          @click.stop
        >
          <!-- Header -->
          <div v-if="$slots.header" class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <slot name="header" />
            <button
              v-if="showCloseButton"
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-6">
            <slot name="body">
              <slot />
            </slot>
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="flex items-center justify-end space-x-2 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
            <slot name="footer" />
          </div>
          
          <!-- Close button (if no header) -->
          <button
            v-if="showCloseButton && !$slots.header"
            @click="$emit('close')"
            class="absolute -top-2 -right-2 z-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface Props {
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
  showCloseButton: true
})

const emit = defineEmits<{
  close: []
}>()

// Close modal on escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  // Restore body scroll
  document.body.style.overflow = ''
})
</script>