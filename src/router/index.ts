import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { isString, isNil } from 'lodash'

export const routeList = {
  home: 'home',
  'log-in': 'log-in',
  member: 'member',
  member_list: 'member_list',
  member_detail: 'member_detail',
  member_detail_information: 'member_detail_information',
  'member_detail_deposit-and-withdrawal':
    'member_detail_deposit-and-withdrawal',
  member_detail_transaction: 'member_detail_transaction'
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
  },
  {
    path: '/member',
    name: routeList.member,
    component: () => import('../views/member/index.vue'),
    meta: {
      layout: 'LayoutDefault',
      isVerifyIdentity: false
    },
    redirect: () => {
      return {
        name: routeList.member_list
      }
    },
    children: [
      {
        path: 'list',
        name: routeList.member_list,
        component: () => import('../views/member/list/index.vue')
      },
      {
        path: 'detail/:member_id',
        name: routeList.member_detail,
        component: () => import('../views/member/detail/index.vue'),
        redirect: () => {
          return {
            name: routeList.member_detail_information
          }
        },
        children: [
          {
            path: 'information',
            name: routeList.member_detail_information,
            component: () =>
              import('../views/member/detail/information/index.vue')
          },
          {
            path: 'deposit-and-withdrawal',
            name: routeList['member_detail_deposit-and-withdrawal'],
            component: () =>
              import('../views/member/detail/deposit-and-withdrawal/index.vue')
          },
          {
            path: 'transaction',
            name: routeList.member_detail_transaction,
            component: () =>
              import('../views/member/detail/transaction/index.vue')
          }
        ]
      }
    ]
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
