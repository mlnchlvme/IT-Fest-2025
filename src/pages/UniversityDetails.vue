<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUniversityStore } from '@/stores/useUniversityStore'
import { useProgramStore } from '@/stores/useProgramStore'
import { useCompareStore } from '@/stores/useCompareStore'
import {
  formatRating,
  formatStudentCount,
  formatFounded,
  formatRanking,
  getRatingColor,
} from '@/utils/formatters'
import ProgramCard from '@/components/programs/ProgramCard.vue'
import PartnerCard from '@/components/universities/PartnerCard.vue'
import Spinner from '@/components/ui/Spinner.vue'

const route = useRoute()
const universityStore = useUniversityStore()
const programStore = useProgramStore()
const compareStore = useCompareStore()

onMounted(() => {
  universityStore.loadUniversities()
  programStore.loadPrograms()
})

const university = computed(() => {
  return universityStore.getUniversityById(route.params.id)
})

const programs = computed(() => {
  if (!university.value) return []
  return programStore.getProgramsByUniversity(university.value.id)
})

const isInCompare = computed(() => {
  if (!university.value) return false
  return compareStore.isUniversitySelected(university.value.id)
})

const toggleCompare = () => {
  if (university.value) {
    compareStore.toggleUniversity(university.value)
  }
}
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="universityStore.loading" class="py-20">
        <Spinner size="lg" />
      </div>

      <!-- Not Found -->
      <div v-else-if="!university" class="py-20 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">University Not Found</h2>
        <RouterLink to="/universities" class="text-primary-400 hover:text-primary-300">
          ← Back to Universities
        </RouterLink>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Breadcrumb -->
        <nav class="mb-6 text-sm">
          <RouterLink to="/universities" class="text-slate-400 hover:text-white transition-colors">
            Universities
          </RouterLink>
          <span class="text-slate-600 mx-2">/</span>
          <span class="text-slate-300">{{ university.name }}</span>
        </nav>

        <!-- Hero Section -->
        <div class="relative rounded-3xl overflow-hidden mb-8">
          <img
            :src="university.image"
            :alt="university.name"
            class="w-full h-64 sm:h-80 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"
          ></div>

          <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span :class="[getRatingColor(university.rating), 'text-2xl font-bold']">
                    {{ university.rating }}
                  </span>
                  <span class="text-slate-400">/100</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-slate-400">{{ formatRanking(university.ranking) }} World</span>
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {{ university.name }}
                </h1>
                <p class="text-slate-300 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  {{ university.city }}, {{ university.country }}
                </p>
              </div>

              <div class="flex gap-3">
                <button
                  @click="toggleCompare"
                  :class="[
                    'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                    isInCompare
                      ? 'bg-accent-500 text-white'
                      : 'bg-slate-800 text-white hover:bg-slate-700',
                  ]"
                >
                  {{ isInCompare ? 'Remove from Compare' : 'Add to Compare' }}
                </button>
                <a
                  :href="university.website"
                  target="_blank"
                  class="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid lg:grid-cols-3 gap-8 mb-12">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h2 class="text-xl font-bold text-white mb-4">About</h2>
              <p class="text-slate-300 leading-relaxed">{{ university.description }}</p>
            </div>

            <!-- Programs -->
            <div>
              <h2 class="text-xl font-bold text-white mb-4">Programs ({{ programs.length }})</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <ProgramCard v-for="program in programs" :key="program.id" :program="program" />
              </div>
              <div
                v-if="programs.length === 0"
                class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center"
              >
                <p class="text-slate-400">No programs available</p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Stats -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Quick Facts</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-slate-400">Founded</span>
                  <span class="text-white">{{ university.founded }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Students</span>
                  <span class="text-white">{{ formatStudentCount(university.students) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Programs</span>
                  <span class="text-white">{{ university.programs.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Partners</span>
                  <span class="text-white">{{ university.partners.length }}</span>
                </div>
              </div>
            </div>

            <!-- Mobility Programs -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Mobility Programs</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="mobility in university.mobility"
                  :key="mobility"
                  class="px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-sm"
                >
                  {{ mobility }}
                </span>
              </div>
            </div>

            <!-- Accreditation -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Accreditation</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="acc in university.accreditation"
                  :key="acc"
                  class="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm"
                >
                  {{ acc }}
                </span>
              </div>
            </div>

            <!-- Facilities -->
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Facilities</h3>
              <ul class="space-y-2">
                <li
                  v-for="facility in university.facilities"
                  :key="facility"
                  class="flex items-center gap-2 text-slate-300 text-sm"
                >
                  <svg
                    class="w-4 h-4 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {{ facility }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Partner Universities -->
        <div v-if="partners.length" class="mb-12">
          <h2 class="text-xl font-bold text-white mb-4">Partner Universities</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PartnerCard v-for="partner in partners" :key="partner.id" :partner="partner" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
