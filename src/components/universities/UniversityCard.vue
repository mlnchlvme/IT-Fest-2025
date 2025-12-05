<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCompareStore } from '@/stores/useCompareStore'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useProgramStore } from '@/stores/useProgramStore'
import { getRatingColor } from '@/utils/formatters'

const props = defineProps({
  university: {
    type: Object,
    required: true,
  },
})

const compareStore = useCompareStore()
const langStore = useLanguageStore()
const programStore = useProgramStore()

const isSelected = computed(() => compareStore.isUniversitySelected(props.university.id))

const toggleCompare = () => {
  compareStore.toggleUniversity(props.university)
}

// Get translated university data
const name = computed(() => langStore.getTranslated(props.university.name))
const description = computed(() => langStore.getTranslated(props.university.description))
const region = computed(() => langStore.getTranslated(props.university.region))
const country = computed(() => langStore.getTranslated(props.university.country))

// Count programs for this university
const programCount = computed(() => {
  return programStore.programs.filter((p) => p.university_id === props.university.id).length
})
</script>

<template>
  <div
    class="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
  >
    <!-- Header with University Name -->
    <div class="relative bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-6">
      <!-- Rating Badge -->
      <div
        class="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2"
      >
        <span :class="getRatingColor(university.rating * 10)" class="font-bold">{{
          university.rating
        }}</span>
        <span class="text-slate-400 text-sm">/10</span>
      </div>

      <!-- Logo placeholder -->
      <div v-if="university.logo_url" class="w-16 h-16 mb-3 bg-white rounded-xl overflow-hidden">
        <img :src="university.logo_url" :alt="name" class="w-full h-full object-contain" />
      </div>
      <div
        v-else
        class="w-16 h-16 mb-3 bg-slate-700 rounded-xl flex items-center justify-center text-2xl"
      >
        🎓
      </div>

      <!-- Region Badge -->
      <div class="flex items-center gap-2 text-white/90">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="text-sm font-medium">{{ region }}, {{ country }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
        {{ name }}
      </h3>
      <p class="text-slate-400 text-sm mb-4 line-clamp-2">
        {{ description }}
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="bg-slate-900/50 rounded-xl p-3">
          <p class="text-slate-400 text-xs mb-1">Programs</p>
          <p class="text-white font-semibold">{{ programCount }}</p>
        </div>
        <div class="bg-slate-900/50 rounded-xl p-3">
          <p class="text-slate-400 text-xs mb-1">Rating</p>
          <p class="text-white font-semibold">{{ university.rating }}/10</p>
        </div>
      </div>

      <!-- Contact Info -->
      <div v-if="university.contacts?.phone || university.contacts?.email" class="mb-4 space-y-1">
        <div
          v-if="university.contacts.phone"
          class="flex items-center gap-2 text-xs text-slate-400"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>{{ university.contacts.phone }}</span>
        </div>
        <div
          v-if="university.contacts.email"
          class="flex items-center gap-2 text-xs text-slate-400"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>{{ university.contacts.email }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <RouterLink
          :to="`/universities/${university.id}`"
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
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white',
          ]"
          :title="isSelected ? 'Remove from compare' : 'Add to compare'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
