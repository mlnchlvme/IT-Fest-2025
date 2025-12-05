import { computed } from 'vue'
import { useCompareStore } from '@/stores/useCompareStore'

export function useCompare(type = 'universities') {
  const store = useCompareStore()

  const isUniversity = type === 'universities'

  const selectedItems = computed(() => {
    return isUniversity ? store.selectedUniversities : store.selectedPrograms
  })

  const count = computed(() => {
    return isUniversity ? store.universityCount : store.programCount
  })

  const canAdd = computed(() => {
    return isUniversity ? store.canAddUniversity : store.canAddProgram
  })

  const hasItems = computed(() => {
    return isUniversity ? store.hasUniversities : store.hasPrograms
  })

  const isSelected = (id) => {
    return isUniversity 
      ? store.isUniversitySelected(id) 
      : store.isProgramSelected(id)
  }

  const toggle = (item) => {
    if (isUniversity) {
      store.toggleUniversity(item)
    } else {
      store.toggleProgram(item)
    }
  }

  const add = (item) => {
    if (isUniversity) {
      return store.addUniversity(item)
    } else {
      return store.addProgram(item)
    }
  }

  const remove = (id) => {
    if (isUniversity) {
      return store.removeUniversity(id)
    } else {
      return store.removeProgram(id)
    }
  }

  const clear = () => {
    if (isUniversity) {
      store.clearUniversities()
    } else {
      store.clearPrograms()
    }
  }

  // Comparison properties/columns
  const universityColumns = [
    { key: 'name', label: 'University' },
    { key: 'city', label: 'City' },
    { key: 'rating', label: 'Rating', format: (v) => `${v}/100` },
    { key: 'ranking', label: 'World Ranking', format: (v) => `#${v}` },
    { key: 'students', label: 'Students', format: (v) => v.toLocaleString() },
    { key: 'programs', label: 'Programs', format: (v) => v.length },
    { key: 'partners', label: 'Partners', format: (v) => v.length },
    { key: 'mobility', label: 'Mobility Programs', format: (v) => v.join(', ') }
  ]

  const programColumns = [
    { key: 'name', label: 'Program' },
    { key: 'degree', label: 'Degree' },
    { key: 'field', label: 'Field' },
    { key: 'duration', label: 'Duration', format: (v) => `${v} years` },
    { key: 'language', label: 'Language' },
    { key: 'price', label: 'Total Price', format: (v) => `₸${v.toLocaleString()}` },
    { key: 'pricePerYear', label: 'Price/Year', format: (v) => `₸${v.toLocaleString()}` },
    { key: 'mobility', label: 'Mobility', format: (v) => v.join(', ') }
  ]

  const columns = computed(() => {
    return isUniversity ? universityColumns : programColumns
  })

  return {
    selectedItems,
    count,
    canAdd,
    hasItems,
    isSelected,
    toggle,
    add,
    remove,
    clear,
    columns,
    maxItems: store.maxItems
  }
}
