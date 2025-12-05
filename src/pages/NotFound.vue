<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-20">
    <div class="text-center px-4">
      <!-- 404 Illustration -->
      <div class="relative mb-8">
        <div class="text-[150px] sm:text-[200px] font-bold text-slate-800 leading-none select-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      <!-- Message -->
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p class="text-slate-400 text-lg max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved to a different location.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink 
          to="/"
          class="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
        >
          Go Home
        </RouterLink>
        <RouterLink 
          to="/universities"
          class="px-8 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
        >
          Browse Universities
        </RouterLink>
      </div>

      <!-- Quick Links -->
      <div class="mt-12 flex items-center justify-center gap-8 text-sm">
        <RouterLink to="/universities" class="text-slate-400 hover:text-primary-400 transition-colors">
          Universities
        </RouterLink>
        <RouterLink to="/programs" class="text-slate-400 hover:text-primary-400 transition-colors">
          Programs
        </RouterLink>
        <RouterLink to="/compare/universities" class="text-slate-400 hover:text-primary-400 transition-colors">
          Compare
        </RouterLink>
      </div>
    </div>
  </div>
</template>
