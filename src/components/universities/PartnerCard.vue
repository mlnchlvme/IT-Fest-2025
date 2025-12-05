<script setup>
defineProps({
  partner: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-primary-500/50 transition-all duration-300 group">
    <div class="flex items-start gap-4">
      <!-- Partner Image -->
      <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700">
        <img 
          :src="partner.image" 
          :alt="partner.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <!-- Partner Info -->
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-medium text-sm group-hover:text-primary-400 transition-colors truncate">
          {{ partner.name }}
        </h4>
        <p class="text-slate-400 text-xs mt-1">
          {{ partner.city }}, {{ partner.country }}
        </p>
        
        <!-- Partner Type -->
        <span class="inline-block mt-2 px-2 py-0.5 bg-primary-500/10 text-primary-400 text-xs rounded-full">
          {{ partner.type }}
        </span>
      </div>
    </div>

    <!-- Programs -->
    <div v-if="partner.programs?.length" class="mt-3 flex flex-wrap gap-1.5">
      <span 
        v-for="program in partner.programs" 
        :key="program"
        class="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-full"
      >
        {{ program }}
      </span>
    </div>
  </div>
</template>
