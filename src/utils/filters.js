/**
 * Filter by text search
 * @param {Array} items - Array of items
 * @param {string} query - Search query
 * @param {Array} keys - Keys to search in
 * @returns {Array} Filtered items
 */
export function filterBySearch(items, query, keys = ['name']) {
  if (!query || !query.trim()) return items
  const searchTerm = query.toLowerCase().trim()
  
  return items.filter(item => {
    return keys.some(key => {
      const value = getNestedValue(item, key)
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(searchTerm)
    })
  })
}

/**
 * Filter by exact value match
 * @param {Array} items - Array of items
 * @param {string} key - Key to filter by
 * @param {*} value - Value to match
 * @returns {Array} Filtered items
 */
export function filterByValue(items, key, value) {
  if (value === null || value === undefined || value === '') return items
  return items.filter(item => getNestedValue(item, key) === value)
}

/**
 * Filter by numeric range
 * @param {Array} items - Array of items
 * @param {string} key - Key to filter by
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {Array} Filtered items
 */
export function filterByRange(items, key, min = -Infinity, max = Infinity) {
  return items.filter(item => {
    const value = getNestedValue(item, key)
    if (value === null || value === undefined) return false
    return value >= min && value <= max
  })
}

/**
 * Filter by array includes
 * @param {Array} items - Array of items
 * @param {string} key - Key to filter by (should be array)
 * @param {*} value - Value to check for
 * @returns {Array} Filtered items
 */
export function filterByArrayIncludes(items, key, value) {
  if (!value) return items
  return items.filter(item => {
    const arr = getNestedValue(item, key)
    if (!Array.isArray(arr)) return false
    return arr.includes(value)
  })
}

/**
 * Filter by multiple array values (any match)
 * @param {Array} items - Array of items
 * @param {string} key - Key to filter by (should be array)
 * @param {Array} values - Values to check for
 * @returns {Array} Filtered items
 */
export function filterByArrayAny(items, key, values) {
  if (!values || values.length === 0) return items
  return items.filter(item => {
    const arr = getNestedValue(item, key)
    if (!Array.isArray(arr)) return false
    return values.some(v => arr.includes(v))
  })
}

/**
 * Sort items by key
 * @param {Array} items - Array of items
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted items
 */
export function sortBy(items, key, order = 'asc') {
  return [...items].sort((a, b) => {
    const valueA = getNestedValue(a, key)
    const valueB = getNestedValue(b, key)
    
    let comparison = 0
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB)
    } else {
      comparison = (valueA || 0) - (valueB || 0)
    }
    
    return order === 'asc' ? comparison : -comparison
  })
}

/**
 * Sort items by multiple keys
 * @param {Array} items - Array of items
 * @param {Array} sortKeys - Array of { key, order } objects
 * @returns {Array} Sorted items
 */
export function sortByMultiple(items, sortKeys) {
  return [...items].sort((a, b) => {
    for (const { key, order = 'asc' } of sortKeys) {
      const valueA = getNestedValue(a, key)
      const valueB = getNestedValue(b, key)
      
      let comparison = 0
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB)
      } else {
        comparison = (valueA || 0) - (valueB || 0)
      }
      
      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison
      }
    }
    return 0
  })
}

/**
 * Get unique values from array of items
 * @param {Array} items - Array of items
 * @param {string} key - Key to extract
 * @returns {Array} Unique values
 */
export function getUniqueValues(items, key) {
  const values = items.map(item => getNestedValue(item, key))
  return [...new Set(values.filter(v => v !== null && v !== undefined))]
}

/**
 * Get unique values from array fields
 * @param {Array} items - Array of items
 * @param {string} key - Key to extract (should be array)
 * @returns {Array} Unique values
 */
export function getUniqueArrayValues(items, key) {
  const allValues = items.flatMap(item => {
    const arr = getNestedValue(item, key)
    return Array.isArray(arr) ? arr : []
  })
  return [...new Set(allValues)]
}

// Helper function
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null
  }, obj)
}
