import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { isString, isNil } from 'lodash'

export const routeList = {
  home: 'home',
  'log-in': 'log-in'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeList.home,
    component: () => import('../views/home/index.vue'),
    alias: '/home',
    meta: {
      layout: 'LayoutDefault',
      isVerifyIdentity: false
    }
  },
  {
    path: '/log-in',
    name: routeList['log-in'],
    component: () => import('../views/log-in/index.vue'),
    meta: {
      layout: 'LayoutNormal',
      isVerifyIdentity: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { meta } = to
  const { isVerifyIdentity } = meta
  const hadToken = localStorage.getItem('access')
  if (isVerifyIdentity) {
    if (isString(hadToken)) {
      if (isNil(store.state.userProfile)) {
        await store.dispatch('getUserProfile')
      }
      next()
    } else {
      next(routeList['log-in'])
    }
  } else {
    next()
  }
})

export default router
