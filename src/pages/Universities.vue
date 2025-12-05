<script setup>
import { onMounted, ref } from 'vue'
import { useUniversityStore } from '@/stores/useUniversityStore'
import UniversityCard from '@/components/universities/UniversityCard.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import Spinner from '@/components/ui/Spinner.vue'

const store = useUniversityStore()
const showFilters = ref(false)

onMounted(() => {
  store.loadUniversities()
})

const handleSearch = (query) => {
  store.setSearchQuery(query)
}

const handleRegionFilter = (region) => {
  store.setFilters({ region })
}

const handleReset = () => {
  store.resetFilters()
}
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Universities</h1>
        <p class="text-slate-400">Explore top universities in Kazakhstan</p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-8 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <SearchBar
              :model-value="store.searchQuery"
              @update:model-value="handleSearch"
              placeholder="Search universities..."
            />
          </div>
          <button
            @click="showFilters = !showFilters"
            class="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
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
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Region Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Region</label>
                <select
                  :value="store.filters.region"
                  @change="handleRegionFilter($event.target.value)"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                >
                  <option value="">All Regions</option>
                  <option v-for="region in store.regions" :key="region" :value="region">
                    {{ region }}
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

            <!-- Active Mobility Filters -->
            <div v-if="store.filters.mobility.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="mobility in store.filters.mobility"
                :key="mobility"
                class="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm"
              >
                {{ mobility }}
                <button @click="removeMobilityFilter(mobility)" class="hover:text-primary-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Results Count -->
      <div class="mb-6 text-slate-400 text-sm">
        Showing {{ store.filteredUniversities.length }} of
        {{ store.universities.length }} universities
      </div>

      <!-- Loading -->
      <div v-if="store.loading" class="py-20">
        <Spinner size="lg" />
      </div>

      <!-- Error -->
      <div v-else-if="store.error" class="py-20 text-center">
        <p class="text-red-400">{{ store.error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.filteredUniversities.length === 0" class="py-20 text-center">
        <div
          class="w-20 h-20 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-white font-semibold mb-2">No universities found</h3>
        <p class="text-slate-400">Try adjusting your search or filters</p>
      </div>

      <!-- University Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UniversityCard
          v-for="university in store.filteredUniversities"
          :key="university.id"
          :university="university"
        />
      </div>
    </div>
  </div>
</template>
