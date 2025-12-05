<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'universities',
    validator: (v) => ['universities', 'programs'].includes(v)
  }
})

const emit = defineEmits(['remove'])

const getValue = (item, column) => {
  const value = item[column.key]
  if (column.format && value !== null && value !== undefined) {
    return column.format(value)
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value ?? 'N/A'
}

const getBestValue = (column) => {
  if (!column.key) return null
  
  const values = props.items.map(item => item[column.key])
  
  // For rating, students, ranking (higher is better except ranking)
  if (['rating', 'students'].includes(column.key)) {
    const max = Math.max(...values.filter(v => typeof v === 'number'))
    return max
  }
  
  // For price (lower is better)
  if (['price', 'pricePerYear'].includes(column.key)) {
    const min = Math.min(...values.filter(v => typeof v === 'number'))
    return min
  }
  
  // For ranking (lower is better)
  if (column.key === 'ranking') {
    const min = Math.min(...values.filter(v => typeof v === 'number'))
    return min
  }
  
  return null
}

const isBestValue = (item, column) => {
  const best = getBestValue(column)
  if (best === null) return false
  return item[column.key] === best
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[600px]">
      <!-- Header (items) -->
      <thead>
        <tr class="border-b border-slate-700">
          <th class="py-4 px-4 text-left text-slate-400 text-sm font-medium w-32">
            Criteria
          </th>
          <th 
            v-for="item in items" 
            :key="item.id"
            class="py-4 px-4 text-center"
          >
            <div class="flex flex-col items-center gap-2">
              <span class="text-white font-semibold text-sm">{{ item.name }}</span>
              <button
                @click="emit('remove', item.id)"
                class="text-slate-400 hover:text-red-400 transition-colors p-1"
                title="Remove from comparison"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Body (criteria rows) -->
      <tbody>
        <tr 
          v-for="column in columns.slice(1)" 
          :key="column.key"
          class="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
        >
          <!-- Criteria label -->
          <td class="py-4 px-4 text-slate-400 text-sm font-medium">
            {{ column.label }}
          </td>

          <!-- Values for each item -->
          <td 
            v-for="item in items" 
            :key="item.id"
            class="py-4 px-4 text-center"
          >
            <span 
              :class="[
                'text-sm',
                isBestValue(item, column) 
                  ? 'text-emerald-400 font-semibold' 
                  : 'text-slate-300'
              ]"
            >
              {{ getValue(item, column) }}
              <span v-if="isBestValue(item, column)" class="ml-1">✓</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="py-12 text-center">
      <div class="w-20 h-20 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 class="text-white font-semibold mb-2">No items to compare</h3>
      <p class="text-slate-400 text-sm">
        Add {{ type }} from the catalog to start comparing
      </p>
    </div>
  </div>
</template>
