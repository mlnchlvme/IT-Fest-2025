import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCompareStore = defineStore('compare', () => {
  // State
  const selectedUniversities = ref([])
  const selectedPrograms = ref([])
  const maxItems = 4

  // Getters
  const universityCount = computed(() => selectedUniversities.value.length)
  const programCount = computed(() => selectedPrograms.value.length)

  const canAddUniversity = computed(() => selectedUniversities.value.length < maxItems)
  const canAddProgram = computed(() => selectedPrograms.value.length < maxItems)

  const hasUniversities = computed(() => selectedUniversities.value.length > 0)
  const hasPrograms = computed(() => selectedPrograms.value.length > 0)

  // Actions
  const addUniversity = (university) => {
    if (canAddUniversity.value && !isUniversitySelected(university.id)) {
      selectedUniversities.value.push(university)
      return true
    }
    return false
  }

  const removeUniversity = (universityId) => {
    const index = selectedUniversities.value.findIndex((u) => u.id === universityId)
    if (index > -1) {
      selectedUniversities.value.splice(index, 1)
      return true
    }
    return false
  }

  const toggleUniversity = (university) => {
    if (isUniversitySelected(university.id)) {
      removeUniversity(university.id)
    } else {
      addUniversity(university)
    }
  }

  const isUniversitySelected = (universityId) => {
    return selectedUniversities.value.some((u) => u.id === universityId)
  }

  const clearUniversities = () => {
    selectedUniversities.value = []
  }

  const addProgram = (program) => {
    if (canAddProgram.value && !isProgramSelected(program.program_id)) {
      selectedPrograms.value.push(program)
      return true
    }
    return false
  }

  const removeProgram = (programId) => {
    const index = selectedPrograms.value.findIndex((p) => p.program_id === programId)
    if (index > -1) {
      selectedPrograms.value.splice(index, 1)
      return true
    }
    return false
  }

  const toggleProgram = (program) => {
    if (isProgramSelected(program.program_id)) {
      removeProgram(program.program_id)
    } else {
      addProgram(program)
    }
  }

  const isProgramSelected = (programId) => {
    return selectedPrograms.value.some((p) => p.program_id === programId)
  }

  const clearPrograms = () => {
    selectedPrograms.value = []
  }

  const clearAll = () => {
    clearUniversities()
    clearPrograms()
  }

  return {
    // State
    selectedUniversities,
    selectedPrograms,
    maxItems,
    // Getters
    universityCount,
    programCount,
    canAddUniversity,
    canAddProgram,
    hasUniversities,
    hasPrograms,
    // Actions
    addUniversity,
    removeUniversity,
    toggleUniversity,
    isUniversitySelected,
    clearUniversities,
    addProgram,
    removeProgram,
    toggleProgram,
    isProgramSelected,
    clearPrograms,
    clearAll,
  }
})
