import { ref, computed, watch } from 'vue'

export function useSearch(items, searchKeys = ['name']) {
  const query = ref('')
  const debouncedQuery = ref('')
  let debounceTimer = null

  // Debounce the search query
  watch(query, (newValue) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedQuery.value = newValue
    }, 300)
  })

  const results = computed(() => {
    if (!debouncedQuery.value.trim()) {
      return items.value
    }

    const searchTerm = debouncedQuery.value.toLowerCase()
    
    return items.value.filter(item => {
      return searchKeys.some(key => {
        const value = getNestedValue(item, key)
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(searchTerm)
      })
    })
  })

  const hasResults = computed(() => results.value.length > 0)
  const resultCount = computed(() => results.value.length)
  const isSearching = computed(() => query.value !== debouncedQuery.value)

  const setQuery = (newQuery) => {
    query.value = newQuery
  }

  const clearQuery = () => {
    query.value = ''
    debouncedQuery.value = ''
  }

  return {
    query,
    debouncedQuery,
    results,
    hasResults,
    resultCount,
    isSearching,
    setQuery,
    clearQuery
  }
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null
  }, obj)
}
