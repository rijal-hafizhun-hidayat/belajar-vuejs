import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress';

const routes = [
  {
    path: '/',
    name: 'profile-index',
    component: () => import('../views/profile/IndexView.vue')
  },
  {
    path: '/add',
    name: 'profile-insert',
    component: () => import('../views/profile/InsertView.vue')
  },
  {
    path: '/edit/:id',
    name: 'profile-edit',
    component: () => import('../views/profile/EditView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
