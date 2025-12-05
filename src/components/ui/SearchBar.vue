<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  debounce: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const localValue = ref(props.modelValue)
let debounceTimer = null

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

const handleInput = (event) => {
  const value = event.target.value
  localValue.value = value
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
    emit('search', value)
  }, props.debounce)
}

const clearSearch = () => {
  localValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<template>
  <div class="relative group">
    <!-- Search Icon -->
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg class="w-5 h-5 text-slate-400 group-focus-within:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <!-- Input -->
    <input
      :value="localValue"
      @input="handleInput"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-12 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
    />
    
    <!-- Clear Button -->
    <button
      v-if="localValue"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
