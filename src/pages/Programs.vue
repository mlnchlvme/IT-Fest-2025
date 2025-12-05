<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProgramStore } from '@/stores/useProgramStore'
import { useUniversityStore } from '@/stores/useUniversityStore'
import ProgramCard from '@/components/programs/ProgramCard.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import Spinner from '@/components/ui/Spinner.vue'

const programStore = useProgramStore()
const universityStore = useUniversityStore()
const showFilters = ref(false)

onMounted(() => {
  programStore.loadPrograms()
  universityStore.loadUniversities()
})

const handleSearch = (query) => {
  programStore.setSearchQuery(query)
}

const handleSort = (event) => {
  const [field, order] = event.target.value.split(':')
  programStore.setSorting(field, order)
}

const handleReset = () => {
  programStore.resetFilters()
}
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Programs</h1>
        <p class="text-slate-400">Find the perfect study program for your career</p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-8 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <SearchBar 
              :model-value="programStore.searchQuery"
              @update:model-value="handleSearch"
              placeholder="Search programs..."
            />
          </div>
          <select
            @change="handleSort"
            class="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <option value="name:asc">Name A-Z</option>
            <option value="name:desc">Name Z-A</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="duration:asc">Duration: Short to Long</option>
          </select>
          <button
            @click="showFilters = !showFilters"
            class="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        <!-- Filter Panel -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="showFilters" class="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Field Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Field</label>
                <select
                  :value="programStore.filters.field"
                  @change="programStore.setFilters({ field: $event.target.value })"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                >
                  <option value="">All Fields</option>
                  <option v-for="field in programStore.fields" :key="field" :value="field">
                    {{ field }}
                  </option>
                </select>
              </div>

              <!-- Language Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Language</label>
                <select
                  :value="programStore.filters.language"
                  @change="programStore.setFilters({ language: $event.target.value })"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                >
                  <option value="">All Languages</option>
                  <option v-for="lang in programStore.languages" :key="lang" :value="lang">
                    {{ lang }}
                  </option>
                </select>
              </div>

              <!-- Degree Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Degree</label>
                <select
                  :value="programStore.filters.degree"
                  @change="programStore.setFilters({ degree: $event.target.value })"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                >
                  <option value="">All Degrees</option>
                  <option v-for="degree in programStore.degrees" :key="degree" :value="degree">
                    {{ degree }}
                  </option>
                </select>
              </div>

              <!-- Reset -->
              <div class="flex items-end">
                <button
                  @click="handleReset"
                  class="w-full px-4 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Results Count -->
      <div class="mb-6 text-slate-400 text-sm">
        Showing {{ programStore.filteredPrograms.length }} of {{ programStore.programs.length }} programs
      </div>

      <!-- Loading -->
      <div v-if="programStore.loading" class="py-20">
        <Spinner size="lg" />
      </div>

      <!-- Error -->
      <div v-else-if="programStore.error" class="py-20 text-center">
        <p class="text-red-400">{{ programStore.error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="programStore.filteredPrograms.length === 0" class="py-20 text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-white font-semibold mb-2">No programs found</h3>
        <p class="text-slate-400">Try adjusting your search or filters</p>
      </div>

      <!-- Program Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProgramCard 
          v-for="program in programStore.filteredPrograms" 
          :key="program.id"
          :program="program"
        />
      </div>
    </div>
  </div>
</template>
