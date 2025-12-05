import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import programsData from '@/data-renewed/programs.json'
import requirementsData from '@/data-renewed/requirements.json'
import { useLanguageStore } from './useLanguageStore'

export const useProgramStore = defineStore('programs', () => {
  // State
  const programs = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const filters = ref({
    teachingLanguage: '',
    degree: '',
    duration: null,
  })
  const sortBy = ref('name')
  const sortOrder = ref('asc')

  // Getters
  const filteredPrograms = computed(() => {
    const langStore = useLanguageStore()
    let result = programs.value

    // Search filter - search in all language variants
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter((prog) => {
        const name = langStore.getTranslated(prog.name, '').toLowerCase()
        const degree = langStore.getTranslated(prog.degree, '').toLowerCase()
        const requirements = langStore.getTranslated(prog.requirements, '').toLowerCase()

        return name.includes(query) || degree.includes(query) || requirements.includes(query)
      })
    }

    // Teaching language filter (programs can be taught in multiple languages)
    if (filters.value.teachingLanguage) {
      result = result.filter(
        (prog) => prog.language && prog.language.includes(filters.value.teachingLanguage),
      )
    }

    // Degree filter
    if (filters.value.degree) {
      result = result.filter((prog) => {
        const degree = langStore.getTranslated(prog.degree, '')
        return degree === filters.value.degree
      })
    }

    // Duration filter
    if (filters.value.duration) {
      result = result.filter((prog) => prog.duration === filters.value.duration)
    }

    // Sorting
    result = [...result].sort((a, b) => {
      let comparison = 0
      switch (sortBy.value) {
        case 'name':
          const nameA = langStore.getTranslated(a.name, '')
          const nameB = langStore.getTranslated(b.name, '')
          comparison = nameA.localeCompare(nameB)
          break
        case 'duration':
          comparison = a.duration - b.duration
          break
        default:
          comparison = 0
      }
      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return result
  })

  // Available teaching languages across all programs
  const teachingLanguages = computed(() => {
    const langSet = new Set()
    programs.value.forEach((prog) => {
      if (prog.language && Array.isArray(prog.language)) {
        prog.language.forEach((lang) => langSet.add(lang))
      }
    })
    return Array.from(langSet).sort()
  })

  const degrees = computed(() => {
    const langStore = useLanguageStore()
    const degreeSet = new Set(
      programs.value.map((prog) => langStore.getTranslated(prog.degree, '')),
    )
    return Array.from(degreeSet).filter(Boolean).sort()
  })

  const durations = computed(() => {
    const durationSet = new Set(programs.value.map((prog) => prog.duration))
    return Array.from(durationSet).sort((a, b) => a - b)
  })

  // Actions
  const loadPrograms = async () => {
    loading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      programs.value = programsData
    } catch (e) {
      error.value = 'Failed to load programs'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const getProgramById = (programId) => {
    return programs.value.find((prog) => prog.program_id === parseInt(programId))
  }

  const getProgramsByUniversity = (universityId) => {
    return programs.value.filter((prog) => prog.university_id === parseInt(universityId))
  }

  const getRequirementsByProgramId = (programId) => {
    return requirementsData.filter((req) => req.program_id === parseInt(programId))
  }

  const getTranslatedProgram = (program) => {
    if (!program) return null

    const langStore = useLanguageStore()
    const requirements = getRequirementsByProgramId(program.id)
    const translatedRequirements = requirements.map((req) => ({
      ...req,
      name: langStore.getTranslated(req.name),
    }))

    return {
      ...program,
      name: langStore.getTranslated(program.name),
      degree: langStore.getTranslated(program.degree),
      description: langStore.getTranslated(program.description),
      requirements: translatedRequirements,
    }
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const setSorting = (field, order = 'asc') => {
    sortBy.value = field
    sortOrder.value = order
  }

  const resetFilters = () => {
    filters.value = {
      teachingLanguage: '',
      degree: '',
      duration: null,
    }
    searchQuery.value = ''
  }

  return {
    // State
    programs,
    loading,
    error,
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    // Getters
    filteredPrograms,
    teachingLanguages,
    degrees,
    durations,
    // Actions
    loadPrograms,
    getProgramById,
    getProgramsByUniversity,
    getRequirementsByProgramId,
    getTranslatedProgram,
    setSearchQuery,
    setFilters,
    setSorting,
    resetFilters,
  }
})
