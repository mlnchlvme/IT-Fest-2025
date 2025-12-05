<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUniversityStore } from '@/stores/useUniversityStore'
import { useCompare } from '@/composables/useCompare'
import CompareTable from '@/components/compare/CompareTable.vue'

const universityStore = useUniversityStore()
const { selectedItems, count, clear, remove, columns } = useCompare('universities')

onMounted(() => {
  universityStore.loadUniversities()
})

const handleRemove = (id) => {
  remove(id)
}
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Compare Universities</h1>
          <p class="text-slate-400">
            {{ count }} of 4 universities selected
          </p>
        </div>
        <div class="flex gap-3">
          <RouterLink 
            to="/universities"
            class="px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-colors"
          >
            + Add More
          </RouterLink>
          <button 
            v-if="count > 0"
            @click="clear"
            class="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Compare Table -->
      <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <CompareTable 
          :items="selectedItems"
          :columns="columns"
          type="universities"
          @remove="handleRemove"
        />
      </div>

      <!-- Empty State CTA -->
      <div v-if="count === 0" class="mt-8 text-center">
        <RouterLink 
          to="/universities"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          Browse Universities
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
