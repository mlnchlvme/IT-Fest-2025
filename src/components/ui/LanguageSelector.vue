<script setup>
import { useLanguageStore } from '@/stores/useLanguageStore'

const langStore = useLanguageStore()
</script>

<template>
  <div class="language-selector">
    <button
      v-for="lang in langStore.languages"
      :key="lang.code"
      @click="langStore.setLanguage(lang.code)"
      class="lang-btn"
      :class="{ active: langStore.currentLanguage === lang.code }"
      :title="lang.name"
    >
      <span class="flag">{{ lang.flag }}</span>
      <span class="code">{{ lang.code.toUpperCase() }}</span>
    </button>
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  background: transparent;
  border: 1px solid var(--slate-700);
  border-radius: 0.5rem;
  color: var(--slate-300);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.lang-btn:hover {
  background-color: rgba(51, 65, 85, 0.5);
  border-color: var(--slate-600);
  color: white;
}

.lang-btn.active {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
  color: white;
}

.flag {
  font-size: 1rem;
  line-height: 1;
}

.code {
  font-weight: 500;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .code {
    display: none;
  }

  .lang-btn {
    padding: 0.5rem;
  }
}
</style>
