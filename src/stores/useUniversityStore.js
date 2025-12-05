import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import universitiesData from '@/data-renewed/universities.json'
import { useLanguageStore } from './useLanguageStore'

export const useUniversityStore = defineStore('universities', () => {
  // State
  const universities = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const filters = ref({
    region: '',
    minRating: 0,
  })

  // Getters
  const filteredUniversities = computed(() => {
    const langStore = useLanguageStore()
    let result = universities.value

    // Search filter - search in all language variants
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter((uni) => {
        const name = langStore.getTranslated(uni.name, '').toLowerCase()
        const region = langStore.getTranslated(uni.region, '').toLowerCase()
        const description = langStore.getTranslated(uni.description, '').toLowerCase()

        return name.includes(query) || region.includes(query) || description.includes(query)
      })
    }

    // Region filter
    if (filters.value.region) {
      result = result.filter((uni) => {
        const region = langStore.getTranslated(uni.region, '')
        return region === filters.value.region
      })
    }

    // Rating filter
    if (filters.value.minRating > 0) {
      result = result.filter((uni) => uni.rating >= filters.value.minRating)
    }

    return result
  })

  const regions = computed(() => {
    const langStore = useLanguageStore()
    const regionSet = new Set(
      universities.value.map((uni) => langStore.getTranslated(uni.region, '')),
    )
    return Array.from(regionSet).filter(Boolean).sort()
  })

  // Cities computed property (alias for regions for backward compatibility)
  const cities = computed(() => {
    return regions.value
  })

  // Mobility programs - currently empty as no mobility data in new structure
  // TODO: Add mobility programs data once available
  const mobilityPrograms = computed(() => {
    return []
  })

  // Actions
  const loadUniversities = async () => {
    loading.value = true
    error.value = null
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      universities.value = universitiesData
    } catch (e) {
      error.value = 'Failed to load universities'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const getUniversityById = (id) => {
    return universities.value.find((uni) => uni.id === parseInt(id))
  }

  const getTranslatedUniversity = (university) => {
    if (!university) return null

    const langStore = useLanguageStore()
    return {
      ...university,
      name: langStore.getTranslated(university.name),
      description: langStore.getTranslated(university.description),
      region: langStore.getTranslated(university.region),
      country: langStore.getTranslated(university.country),
      address: langStore.getTranslated(university.address),
      contactAddress: langStore.getTranslated(university.contacts?.address),
    }
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      region: '',
      minRating: 0,
    }
    searchQuery.value = ''
  }

  return {
    // State
    universities,
    loading,
    error,
    searchQuery,
    filters,
    // Getters
    filteredUniversities,
    regions,
    cities,
    mobilityPrograms,
    // Actions
    loadUniversities,
    getUniversityById,
    getTranslatedUniversity,
    setSearchQuery,
    setFilters,
    resetFilters,
  }
})
