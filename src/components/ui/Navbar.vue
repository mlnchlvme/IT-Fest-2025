<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCompareStore } from '@/stores/useCompareStore'
import LanguageSelector from '@/components/ui/LanguageSelector.vue'

const route = useRoute()
const compareStore = useCompareStore()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Universities', path: '/universities' },
  { name: 'Programs', path: '/programs' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <!-- Logo -->
        <RouterLink to="/" class="logo-link">
          <div class="logo-icon">
            <span class="logo-emoji">🎓</span>
          </div>
          <span class="logo-text"> AI DataHub </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.name }}
          </RouterLink>

          <!-- Language Selector -->
          <LanguageSelector />

          <!-- Compare Dropdown -->
          <div class="dropdown">
            <button class="nav-link dropdown-btn">
              Compare
              <span
                v-if="compareStore.universityCount + compareStore.programCount > 0"
                class="badge"
              >
                {{ compareStore.universityCount + compareStore.programCount }}
              </span>
              <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div class="dropdown-menu">
              <RouterLink to="/compare/universities" class="dropdown-item">
                Universities
                <span v-if="compareStore.universityCount" class="count-badge">
                  {{ compareStore.universityCount }}
                </span>
              </RouterLink>
              <RouterLink to="/compare/programs" class="dropdown-item">
                Programs
                <span v-if="compareStore.programCount" class="count-badge">
                  {{ compareStore.programCount }}
                </span>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="mobile-menu-btn">
          <svg
            v-if="!isMobileMenuOpen"
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMobileMenuOpen" class="mobile-nav">
        <div class="mobile-nav-links">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="mobile-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.name }}
          </RouterLink>
          <RouterLink
            to="/compare/universities"
            @click="isMobileMenuOpen = false"
            class="mobile-link"
          >
            Compare Universities
          </RouterLink>
          <RouterLink to="/compare/programs" @click="isMobileMenuOpen = false" class="mobile-link">
            Compare Programs
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(to right, var(--slate-900), var(--slate-800), var(--slate-900));
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, var(--primary-500), var(--accent-500));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-icon {
  transform: scale(1.1);
}

.logo-emoji {
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(to right, white, var(--slate-300));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color: var(--slate-300);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  color: white;
  background-color: rgba(51, 65, 85, 0.5);
}

.nav-link.active {
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--primary-400);
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  background-color: var(--accent-500);
  color: white;
  font-size: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.dropdown:hover .chevron {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: var(--slate-800);
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--slate-700);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(0.5rem);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: var(--slate-300);
  text-decoration: none;
  transition: all 0.3s ease;
}

.dropdown-item:first-child {
  border-radius: 0.75rem 0.75rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.75rem 0.75rem;
}

.dropdown-item:hover {
  background-color: rgba(51, 65, 85, 0.5);
  color: white;
}

.count-badge {
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--primary-400);
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.mobile-menu-btn {
  display: block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--slate-400);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu-btn:hover {
  color: white;
  background-color: rgba(51, 65, 85, 0.5);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.mobile-nav {
  padding-bottom: 1rem;
  animation: slideUp 0.3s ease-out;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--slate-300);
  text-decoration: none;
  transition: all 0.3s ease;
}

.mobile-link:hover {
  color: white;
  background-color: rgba(51, 65, 85, 0.5);
}

.mobile-link.active {
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--primary-400);
}
</style>
