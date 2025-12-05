/**
 * Format price in Kazakhstani Tenge
 * @param {number} price - Price in tenge
 * @returns {string} Formatted price
 */
export function formatPrice(price) {
  if (price === null || price === undefined) return 'N/A'
  return `₸${price.toLocaleString('en-US')}`
}

/**
 * Format price per year
 * @param {number} totalPrice - Total program price
 * @param {number} duration - Duration in years
 * @returns {string} Formatted price per year
 */
export function formatPricePerYear(totalPrice, duration) {
  if (!totalPrice || !duration) return 'N/A'
  const perYear = Math.round(totalPrice / duration)
  return `₸${perYear.toLocaleString('en-US')}/year`
}

/**
 * Format rating display
 * @param {number} rating - Rating out of 100
 * @returns {string} Formatted rating
 */
export function formatRating(rating) {
  if (rating === null || rating === undefined) return 'N/A'
  return `${rating}/100`
}

/**
 * Get rating color class based on value
 * @param {number} rating - Rating out of 100
 * @returns {string} CSS class for color
 */
export function getRatingColor(rating) {
  if (rating >= 90) return 'text-green-500'
  if (rating >= 80) return 'text-blue-500'
  if (rating >= 70) return 'text-yellow-500'
  return 'text-gray-500'
}

/**
 * Format duration
 * @param {number} years - Duration in years
 * @returns {string} Formatted duration
 */
export function formatDuration(years) {
  if (!years) return 'N/A'
  return years === 1 ? '1 year' : `${years} years`
}

/**
 * Format world ranking
 * @param {number} ranking - World ranking number
 * @returns {string} Formatted ranking
 */
export function formatRanking(ranking) {
  if (!ranking) return 'N/A'
  return `#${ranking}`
}

/**
 * Format student count
 * @param {number} count - Number of students
 * @returns {string} Formatted count
 */
export function formatStudentCount(count) {
  if (!count) return 'N/A'
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K students`
  }
  return `${count} students`
}

/**
 * Format founded year
 * @param {number} year - Foundation year
 * @returns {string} Formatted founding info
 */
export function formatFounded(year) {
  if (!year) return 'N/A'
  const age = new Date().getFullYear() - year
  return `Est. ${year} (${age} years)`
}

/**
 * Format list of items with conjunction
 * @param {Array} items - Array of strings
 * @param {number} limit - Max items to show
 * @returns {string} Formatted list
 */
export function formatList(items, limit = 3) {
  if (!items || items.length === 0) return 'None'
  if (items.length <= limit) return items.join(', ')
  return `${items.slice(0, limit).join(', ')} +${items.length - limit} more`
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Format relative time
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  if (!date) return ''
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now - then) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return formatDate(date)
}
