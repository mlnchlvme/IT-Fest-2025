<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProgramStore } from '@/stores/useProgramStore'
import { useUniversityStore } from '@/stores/useUniversityStore'
import { useCompareStore } from '@/stores/useCompareStore'
import { formatPrice, formatDuration } from '@/utils/formatters'
import Spinner from '@/components/ui/Spinner.vue'

const route = useRoute()
const programStore = useProgramStore()
const universityStore = useUniversityStore()
const compareStore = useCompareStore()

onMounted(() => {
  programStore.loadPrograms()
  universityStore.loadUniversities()
})

const program = computed(() => {
  return programStore.getProgramById(route.params.id)
})

const university = computed(() => {
  if (!program.value) return null
  return universityStore.getUniversityById(program.value.university_id)
})

const isInCompare = computed(() => {
  if (!program.value) return false
  return compareStore.isProgramSelected(program.value.id)
})

const toggleCompare = () => {
  if (program.value) {
    compareStore.toggleProgram(program.value)
  }
}

const degreeColor = computed(() => {
  if (!program.value) return ''
  switch (program.value.degree) {
    case 'Bachelor': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'Master': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    case 'PhD': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  }
})
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="programStore.loading" class="py-20">
        <Spinner size="lg" />
      </div>

      <!-- Not Found -->
      <div v-else-if="!program" class="py-20 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Program Not Found</h2>
        <RouterLink to="/programs" class="text-primary-400 hover:text-primary-300">
          ← Back to Programs
        </RouterLink>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Breadcrumb -->
        <nav class="mb-6 text-sm">
          <RouterLink to="/programs" class="text-slate-400 hover:text-white transition-colors">
            Programs
          </RouterLink>
          <span class="text-slate-600 mx-2">/</span>
          <span class="text-slate-300">{{ program.name }}</span>
        </nav>

        <!-- Header Card -->
        <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span :class="[degreeColor, 'px-3 py-1 border rounded-full text-sm font-medium']">
                  {{ program.degree }}
                </span>
                <span class="text-slate-400 text-sm">{{ formatDuration(program.duration) }}</span>
                <span class="text-slate-600">•</span>
                <span class="text-slate-400 text-sm">{{ program.language }}</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ program.name }}</h1>
              <RouterLink 
                v-if="university"
                :to="`/universities/${university.id}`"
                class="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {{ university.name }}
              </RouterLink>
            </div>

            <button
              @click="toggleCompare"
              :class="[
                'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                isInCompare 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              ]"
            >
              {{ isInCompare ? 'Remove from Compare' : 'Add to Compare' }}
            </button>
          </div>

          <!-- Price Section -->
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="bg-slate-900/50 rounded-xl p-5">
              <p class="text-slate-400 text-sm mb-1">Total Program Cost</p>
              <p class="text-2xl font-bold text-white">{{ formatPrice(program.price) }}</p>
            </div>
            <div class="bg-slate-900/50 rounded-xl p-5">
              <p class="text-slate-400 text-sm mb-1">Per Year</p>
              <p class="text-2xl font-bold text-primary-400">{{ formatPrice(program.pricePerYear) }}</p>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Description -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h2 class="text-xl font-bold text-white mb-4">About This Program</h2>
              <p class="text-slate-300 leading-relaxed">{{ program.description }}</p>
            </div>

            <!-- Requirements -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h2 class="text-xl font-bold text-white mb-4">Requirements</h2>
              <ul class="space-y-3">
                <li 
                  v-for="req in program.requirements" 
                  :key="req"
                  class="flex items-start gap-3 text-slate-300"
                >
                  <svg class="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ req }}
                </li>
              </ul>
            </div>

            <!-- Career Paths -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h2 class="text-xl font-bold text-white mb-4">Career Opportunities</h2>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="career in program.careers" 
                  :key="career"
                  class="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-xl text-sm"
                >
                  {{ career }}
                </span>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Info -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Quick Info</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Field</span>
                  <span class="text-white">{{ program.field }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Duration</span>
                  <span class="text-white">{{ formatDuration(program.duration) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Language</span>
                  <span class="text-white">{{ program.language }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Degree</span>
                  <span class="text-white">{{ program.degree }}</span>
                </div>
              </div>
            </div>

            <!-- Mobility Programs -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Mobility Options</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="mobility in program.mobility" 
                  :key="mobility"
                  class="px-3 py-1.5 bg-accent-500/10 text-accent-400 rounded-full text-sm"
                >
                  {{ mobility }}
                </span>
              </div>
            </div>

            <!-- University Link -->
            <RouterLink 
              v-if="university"
              :to="`/universities/${university.id}`"
              class="block bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 hover:opacity-90 transition-opacity"
            >
              <h3 class="text-white font-semibold mb-2">{{ university.name }}</h3>
              <p class="text-white/70 text-sm mb-3">{{ university.city }}, {{ university.country }}</p>
              <span class="text-white text-sm font-medium">View University →</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
