<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useUniversityStore } from '@/stores/useUniversityStore'
import { useProgramStore } from '@/stores/useProgramStore'
import UniversityCard from '@/components/universities/UniversityCard.vue'
import Spinner from '@/components/ui/Spinner.vue'

const universityStore = useUniversityStore()
const programStore = useProgramStore()

onMounted(() => {
  universityStore.loadUniversities()
  programStore.loadPrograms()
})

const featuredUniversities = computed(() => {
  return universityStore.universities.slice(0, 3)
})

const stats = computed(() => {
  const statsArr = [
    { label: 'Universities', value: universityStore.universities?.length || 0, icon: '🏛️' },
    { label: 'Programs', value: programStore.programs?.length || 0, icon: '📚' },
    { label: 'Cities', value: universityStore.cities?.length || 0, icon: '🌆' },
  ]

  // Only show mobility programs if there are any
  if (universityStore.mobilityPrograms?.length > 0) {
    statsArr.push({
      label: 'Mobility Programs',
      value: universityStore.mobilityPrograms.length,
      icon: '✈️',
    })
  }

  return statsArr
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900/20 to-slate-900 py-20 lg:py-32"
    >
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8"
          >
            <span class="text-primary-400 text-sm font-medium">🤖 AI-Powered Platform</span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Perfect
            <span
              class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"
            >
              University
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in">
            AI-powered platform for browsing, comparing, and analyzing universities, study programs,
            and international mobility opportunities in Kazakhstan.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <RouterLink
              to="/universities"
              class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Universities
            </RouterLink>
            <RouterLink
              to="/programs"
              class="w-full sm:w-auto px-8 py-4 bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Programs
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-slate-900/50 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-4xl mb-2">{{ stat.icon }}</div>
            <div class="text-3xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="text-slate-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Universities -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">Featured Universities</h2>
            <p class="text-slate-400">Top-rated universities in Kazakhstan</p>
          </div>
          <RouterLink
            to="/universities"
            class="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
        </div>

        <div v-if="universityStore.loading" class="py-20">
          <Spinner size="lg" />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UniversityCard v-for="uni in featuredUniversities" :key="uni.id" :university="uni" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-slate-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">Why Choose AI DataHub?</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">
            Everything you need to make informed decisions about your education
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-primary-500/50 transition-colors"
          >
            <div
              class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-2xl">🤖</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">AI-Powered Recommendations</h3>
            <p class="text-slate-400 text-sm">
              Get personalized university and program recommendations based on your preferences and
              goals.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-primary-500/50 transition-colors"
          >
            <div
              class="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-2xl">⚖️</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Compare Side-by-Side</h3>
            <p class="text-slate-400 text-sm">
              Compare universities and programs side by side to make the best choice for your
              future.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-primary-500/50 transition-colors"
          >
            <div
              class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-2xl">✈️</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Mobility Programs</h3>
            <p class="text-slate-400 text-sm">
              Explore international exchange and mobility opportunities like Erasmus+, DAAD, and
              more.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p class="text-white/80 mb-8 max-w-xl mx-auto">
            Ask our AI assistant for personalized recommendations or explore our catalog of
            universities and programs.
          </p>
          <RouterLink
            to="/universities"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Get Started
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
