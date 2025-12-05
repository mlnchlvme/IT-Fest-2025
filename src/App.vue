<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import AIAssistant from '@/components/ui/AIAssistant.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950">
    <Navbar />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <AIAssistant />
  </div>
</template>
