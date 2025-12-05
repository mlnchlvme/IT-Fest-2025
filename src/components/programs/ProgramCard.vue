<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCompareStore } from '@/stores/useCompareStore'
import { useUniversityStore } from '@/stores/useUniversityStore'
import { formatPrice, formatDuration } from '@/utils/formatters'

const props = defineProps({
  program: {
    type: Object,
    required: true
  }
})

const compareStore = useCompareStore()
const universityStore = useUniversityStore()

const isSelected = computed(() => compareStore.isProgramSelected(props.program.id))

const university = computed(() => {
  return universityStore.getUniversityById(props.program.university_id)
})

const toggleCompare = () => {
  compareStore.toggleProgram(props.program)
}

const degreeColor = computed(() => {
  switch (props.program.degree) {
    case 'Bachelor': return 'bg-emerald-500/10 text-emerald-400'
    case 'Master': return 'bg-purple-500/10 text-purple-400'
    case 'PhD': return 'bg-amber-500/10 text-amber-400'
    default: return 'bg-slate-500/10 text-slate-400'
  }
})
</script>

<template>
  <div class="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span :class="[degreeColor, 'px-2 py-0.5 text-xs rounded-full font-medium']">
            {{ program.degree }}
          </span>
          <span class="text-slate-400 text-xs">•</span>
          <span class="text-slate-400 text-xs">{{ formatDuration(program.duration) }}</span>
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
          {{ program.name }}
        </h3>
        <p v-if="university" class="text-slate-400 text-sm mt-1">
          {{ university.name }}
        </p>
      </div>
      
      <!-- Language Badge -->
      <span class="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg">
        {{ program.language }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-400 text-sm mb-4 line-clamp-2">
      {{ program.description }}
    </p>

    <!-- Field -->
    <div class="flex items-center gap-2 mb-4">
      <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <span class="text-sm text-slate-300">{{ program.field }}</span>
    </div>

    <!-- Price -->
    <div class="bg-slate-900/50 rounded-xl p-4 mb-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-slate-400 text-xs mb-1">Total Cost</p>
          <p class="text-xl font-bold text-white">{{ formatPrice(program.price) }}</p>
        </div>
        <div class="text-right">
          <p class="text-slate-400 text-xs mb-1">Per Year</p>
          <p class="text-base font-medium text-primary-400">{{ formatPrice(program.pricePerYear) }}</p>
        </div>
      </div>
    </div>

    <!-- Mobility Tags -->
    <div v-if="program.mobility?.length" class="flex flex-wrap gap-2 mb-4">
      <span 
        v-for="mobility in program.mobility" 
        :key="mobility"
        class="px-2 py-1 bg-accent-500/10 text-accent-400 text-xs rounded-full"
      >
        {{ mobility }}
      </span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <RouterLink 
        :to="`/programs/${program.id}`"
        class="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
      >
        View Details
      </RouterLink>
      <button
        @click="toggleCompare"
        :class="[
          'p-2.5 rounded-xl transition-all duration-300',
          isSelected 
            ? 'bg-accent-500 text-white' 
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
        ]"
        :title="isSelected ? 'Remove from compare' : 'Add to compare'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    </div>
  </div>
</template>
