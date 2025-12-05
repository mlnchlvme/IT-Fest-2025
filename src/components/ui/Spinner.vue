<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <div class="spinner-container">
    <div class="spinner" :class="`spinner-${size}`"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border-radius: 9999px;
  border-style: solid;
  animation: spin 1s linear infinite;
}

.spinner-sm {
  width: 1.25rem;
  height: 1.25rem;
  border-width: 2px;
  border-top-color: var(--primary-500);
  border-right-color: rgba(59, 130, 246, 0.3);
  border-bottom-color: rgba(59, 130, 246, 0.3);
  border-left-color: rgba(59, 130, 246, 0.3);
}

.spinner-md {
  width: 2rem;
  height: 2rem;
  border-width: 3px;
  border-top-color: var(--primary-500);
  border-right-color: rgba(59, 130, 246, 0.3);
  border-bottom-color: rgba(59, 130, 246, 0.3);
  border-left-color: rgba(59, 130, 246, 0.3);
}

.spinner-lg {
  width: 3rem;
  height: 3rem;
  border-width: 4px;
  border-top-color: var(--primary-500);
  border-right-color: rgba(59, 130, 246, 0.3);
  border-bottom-color: rgba(59, 130, 246, 0.3);
  border-left-color: rgba(59, 130, 246, 0.3);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
