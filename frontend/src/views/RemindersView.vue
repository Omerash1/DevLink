<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reminders</h1>
      </div>
      
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
      
      <EmptyState 
        v-else-if="reminders.length === 0"
        title="No reminders yet"
        description="Set reminders on your links to be notified when it's time to revisit them."
        :buttonAction="() => router.push('/dashboard')"
        buttonText="Go to Dashboard"
      />
      
      <div v-else class="space-y-4">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Upcoming Reminders</h3>
          </div>
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="reminder in upcomingReminders" :key="reminder.id" class="px-4 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white">
                    {{ reminder.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <a :href="reminder.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">
                      {{ reminder.url }}
                    </a>
                  </p>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {{ formatReminderDate(reminder.reminderDate) }}
                  </span>
                  <div class="flex mt-2">
                    <button 
                      @click="openLink(reminder)" 
                      class="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 mr-2"
                      title="Open link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <button 
                      @click="markAsDone(reminder)"
                      class="text-gray-400 hover:text-green-500 dark:text-gray-500 dark:hover:text-green-400 mr-2"
                      title="Mark as done"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      @click="rescheduleReminder(reminder)"
                      class="text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400"
                      title="Reschedule"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <div v-if="pastReminders.length > 0" class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Past Reminders</h3>
          </div>
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="reminder in pastReminders" :key="reminder.id" class="px-4 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white">
                    {{ reminder.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <a :href="reminder.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">
                      {{ reminder.url }}
                    </a>
                  </p>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    {{ formatReminderDate(reminder.reminderDate) }} (Overdue)
                  </span>
                  <div class="flex mt-2">
                    <button 
                      @click="openLink(reminder)" 
                      class="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 mr-2"
                      title="Open link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <button 
                      @click="markAsDone(reminder)"
                      class="text-gray-400 hover:text-green-500 dark:text-gray-500 dark:hover:text-green-400 mr-2"
                      title="Mark as done"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      @click="rescheduleReminder(reminder)"
                      class="text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400"
                      title="Reschedule"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
    
    <!-- Reschedule Modal -->
    <Modal v-if="showRescheduleModal" @close="showRescheduleModal = false">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Reschedule Reminder
        </h3>
      </template>
      
      <template #body>
        <form @submit.prevent="saveReschedule" class="space-y-4">
          <div>
            <label for="reminderDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New reminder date
            </label>
            <input
              id="reminderDate"
              v-model="rescheduleForm.reminderDate"
              type="datetime-local"
              required
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </form>
      </template>
      
      <template #footer>
        <Button @click="showRescheduleModal = false" variant="secondary">Cancel</Button>
        <Button @click="saveReschedule" variant="primary" class="ml-2" :loading="isSaving">
          Save
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NavBar from '@/components/NavBar.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useLinkStore } from '@/stores/link';
import { Link } from '@/types';

dayjs.extend(relativeTime);

const router = useRouter();
const toast = useToast();
const linkStore = useLinkStore();

// State
const isLoading = ref(true);
const reminders = ref<Link[]>([]);
const showRescheduleModal = ref(false);
const reminderToReschedule = ref<Link | null>(null);
const isSaving = ref(false);

const rescheduleForm = ref({
  reminderDate: ''
});

// Computed
const upcomingReminders = computed(() => {
  const now = new Date();
  return reminders.value.filter(reminder => 
    new Date(reminder.reminderDate!) > now
  ).sort((a, b) => 
    new Date(a.reminderDate!).getTime() - new Date(b.reminderDate!).getTime()
  );
});

const pastReminders = computed(() => {
  const now = new Date();
  return reminders.value.filter(reminder => 
    new Date(reminder.reminderDate!) <= now
  ).sort((a, b) => 
    new Date(b.reminderDate!).getTime() - new Date(a.reminderDate!).getTime()
  );
});

// Methods
async function fetchReminders() {
  try {
    isLoading.value = true;
    
    // This would be an API call in a real app
    // const response = await linkService.getReminders();
    // reminders.value = response.data;
    
    // Mock data for demo
    setTimeout(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      reminders.value = [
        {
          id: '1',
          title: 'React Hooks Documentation',
          url: 'https://reactjs.org/docs/hooks-intro.html',
          tags: ['1', '3'],
          isFavorite: true,
          reminderDate: tomorrow.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Vue 3 Composition API Guide',
          url: 'https://v3.vuejs.org/guide/composition-api-introduction.html',
          tags: ['1'],
          isFavorite: false,
          reminderDate: nextWeek.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
          tags: ['1', '2'],
          isFavorite: true,
          reminderDate: yesterday.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      isLoading.value = false;
    }, 1000);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    toast.error('Failed to fetch reminders');
    isLoading.value = false;
  }
}

function formatReminderDate(dateString: string): string {
  return dayjs(dateString).fromNow();
}

function openLink(reminder: Link) {
  window.open(reminder.url, '_blank');
  
  // In a real app, you would mark the link as visited
  // linkStore.markVisited(reminder.id);
}

function markAsDone(reminder: Link) {
  // In a real app, you would make an API call to remove the reminder
  reminders.value = reminders.value.filter(r => r.id !== reminder.id);
  toast.success('Reminder marked as done');
}

function rescheduleReminder(reminder: Link) {
  reminderToReschedule.value = reminder;
  
  // Format the date for datetime-local input
  const date = new Date(reminder.reminderDate!);
  const formattedDate = date.toISOString().slice(0, 16);
  
  rescheduleForm.value.reminderDate = formattedDate;
  showRescheduleModal.value = true;
}

async function saveReschedule() {
  if (!reminderToReschedule.value) return;
  
  try {
    isSaving.value = true;
    
    // In a real app, you would make an API call to update the reminder
    const index = reminders.value.findIndex(r => r.id === reminderToReschedule.value!.id);
    if (index !== -1) {
      reminders.value[index] = {
        ...reminders.value[index],
        reminderDate: new Date(rescheduleForm.value.reminderDate).toISOString()
      };
    }
    
    toast.success('Reminder rescheduled');
    showRescheduleModal.value = false;
    reminderToReschedule.value = null;
  } catch (error) {
    console.error('Error rescheduling reminder:', error);
    toast.error('Failed to reschedule reminder');
  } finally {
    isSaving.value = false;
  }
}

onMounted(() => {
  fetchReminders();
});
</script>
