import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Universities from '@/pages/Universities.vue'
import UniversityDetails from '@/pages/UniversityDetails.vue'
import Programs from '@/pages/Programs.vue'
import ProgramDetails from '@/pages/ProgramDetails.vue'
import CompareUniversities from '@/pages/CompareUniversities.vue'
import ComparePrograms from '@/pages/ComparePrograms.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'AI University DataHub' }
  },
  {
    path: '/universities',
    name: 'Universities',
    component: Universities,
    meta: { title: 'Universities | AI University DataHub' }
  },
  {
    path: '/universities/:id',
    name: 'UniversityDetails',
    component: UniversityDetails,
    meta: { title: 'University Details | AI University DataHub' }
  },
  {
    path: '/programs',
    name: 'Programs',
    component: Programs,
    meta: { title: 'Programs | AI University DataHub' }
  },
  {
    path: '/programs/:id',
    name: 'ProgramDetails',
    component: ProgramDetails,
    meta: { title: 'Program Details | AI University DataHub' }
  },
  {
    path: '/compare/universities',
    name: 'CompareUniversities',
    component: CompareUniversities,
    meta: { title: 'Compare Universities | AI University DataHub' }
  },
  {
    path: '/compare/programs',
    name: 'ComparePrograms',
    component: ComparePrograms,
    meta: { title: 'Compare Programs | AI University DataHub' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 Not Found | AI University DataHub' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'AI University DataHub'
  next()
})

export default router
