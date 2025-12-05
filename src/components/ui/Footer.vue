<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <!-- Brand -->
        <div class="brand-section">
          <RouterLink to="/" class="brand-link">
            <div class="brand-icon">
              <span class="brand-emoji">🎓</span>
            </div>
            <span class="brand-text">AI University DataHub</span>
          </RouterLink>
          <p class="brand-description">
            AI-powered platform for browsing, comparing, and analyzing universities, study programs,
            admission details, and international mobility in Kazakhstan.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="section-title">Explore</h3>
          <ul class="link-list">
            <li>
              <RouterLink to="/universities" class="footer-link"> Universities </RouterLink>
            </li>
            <li>
              <RouterLink to="/programs" class="footer-link"> Programs </RouterLink>
            </li>
            <li>
              <RouterLink to="/compare/universities" class="footer-link">
                Compare Universities
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/compare/programs" class="footer-link"> Compare Programs </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="section-title">Resources</h3>
          <ul class="link-list">
            <li>
              <a href="#" class="footer-link"> About Us </a>
            </li>
            <li>
              <a href="#" class="footer-link"> Contact </a>
            </li>
            <li>
              <a href="#" class="footer-link"> Privacy Policy </a>
            </li>
            <li>
              <a href="#" class="footer-link"> Terms of Service </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar">
        <p class="copyright">
          © {{ new Date().getFullYear() }} AI University DataHub. All rights reserved.
        </p>
        <div class="tech-stack">
          <span class="tech-label">Built with</span>
          <div class="tech-items">
            <span class="tech-vue">Vue.js</span>
            <span class="tech-separator">•</span>
            <span class="tech-css">Vanilla CSS</span>
            <span class="tech-separator">•</span>
            <span class="tech-ai">AI</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to bottom, var(--slate-900), var(--slate-950));
  border-top: 1px solid var(--slate-800);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 3rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 3rem 2rem;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.brand-section {
  grid-column: span 1;
}

@media (min-width: 768px) {
  .brand-section {
    grid-column: span 2;
  }
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  text-decoration: none;
}

.brand-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, var(--primary-500), var(--accent-500));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-emoji {
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.brand-description {
  color: var(--slate-400);
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 28rem;
}

.section-title {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}

.link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--slate-400);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-400);
}

.bottom-bar {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--slate-800);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .bottom-bar {
    flex-direction: row;
    justify-content: space-between;
  }
}

.copyright {
  color: var(--slate-500);
  font-size: 0.875rem;
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .tech-stack {
    margin-top: 0;
  }
}

.tech-label {
  color: var(--slate-500);
  font-size: 0.875rem;
}

.tech-items {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-vue {
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 500;
}

.tech-css {
  color: #06b6d4;
  font-size: 0.875rem;
  font-weight: 500;
}

.tech-ai {
  color: #a855f7;
  font-size: 0.875rem;
  font-weight: 500;
}

.tech-separator {
  color: var(--slate-600);
}
</style>
