<script setup>
import { ref, nextTick } from 'vue'
import { useAIAssistant } from '@/composables/useAIAssistant'
import Spinner from './Spinner.vue'

const { messages, isLoading, isOpen, sendMessage, clearMessages, toggleOpen, close } = useAIAssistant()

const userInput = ref('')
const messagesContainer = ref(null)

const handleSubmit = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  const message = userInput.value
  userInput.value = ''
  await sendMessage(message)
  
  // Scroll to bottom
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<template>
  <!-- Toggle Button -->
  <button
    @click="toggleOpen"
    class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-lg shadow-primary-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50"
  >
    <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Chat Window -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div 
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden z-50"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span class="text-lg">🤖</span>
          </div>
          <div>
            <h3 class="text-white font-semibold text-sm">AI Assistant</h3>
            <p class="text-white/70 text-xs">Ask me anything about universities</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="clearMessages" 
            class="text-white/70 hover:text-white transition-colors p-1"
            title="Clear chat"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            @click="close" 
            class="text-white/70 hover:text-white transition-colors p-1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div 
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <!-- Welcome Message -->
        <div v-if="messages.length === 0" class="text-center py-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🎓</span>
          </div>
          <h4 class="text-white font-medium mb-2">How can I help you?</h4>
          <p class="text-slate-400 text-sm">Ask me about universities, programs, or get personalized recommendations!</p>
          
          <!-- Quick Suggestions -->
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button 
              @click="userInput = 'What are the best IT programs?'"
              class="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-full hover:bg-slate-700 transition-colors"
            >
              Best IT programs
            </button>
            <button 
              @click="userInput = 'Recommend affordable universities'"
              class="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-full hover:bg-slate-700 transition-colors"
            >
              Affordable options
            </button>
            <button 
              @click="userInput = 'Programs in English'"
              class="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-full hover:bg-slate-700 transition-colors"
            >
              English programs
            </button>
          </div>
        </div>

        <!-- Message List -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[80%] rounded-2xl px-4 py-2.5',
              message.role === 'user' 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-md' 
                : 'bg-slate-800 text-slate-200 rounded-bl-md'
            ]"
          >
            <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
            <span 
              :class="[
                'text-[10px] mt-1 block',
                message.role === 'user' ? 'text-white/60' : 'text-slate-500'
              ]"
            >
              {{ formatTime(message.timestamp) }}
            </span>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
            <div class="flex items-center gap-2">
              <Spinner size="sm" />
              <span class="text-slate-400 text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="border-t border-slate-700 p-4">
        <form @submit.prevent="handleSubmit" class="flex gap-2">
          <input
            v-model="userInput"
            type="text"
            placeholder="Ask about universities..."
            class="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!userInput.trim() || isLoading"
            class="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>
