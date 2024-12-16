import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { isString, isNil } from 'lodash'

export const routeList = {
  home: 'home',
  'log-in': 'log-in',
  customer: 'customer',
  customer_list: 'customer_list',
  customer_detail: 'customer_detail',
  customer_detail_information: 'customer_detail_information',
  'customer_detail_order-list': 'customer_detail_order-list',
  'customer_detail_maintenance-list': 'customer_detail_maintenance-list',
  order: 'order',
  order_list: 'order_list',
  'order_product-list': 'order_product-list'
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
    path: '/customer',
    name: routeList.customer,
    component: () => import('../views/customer/index.vue'),
    meta: {
      layout: 'LayoutDefault',
      isVerifyIdentity: false
    },
    redirect: () => {
      return {
        name: routeList.customer_list
      }
    },
    children: [
      {
        path: 'list',
        name: routeList.customer_list,
        component: () => import('../views/customer/list/index.vue')
      },
      {
        path: 'detail/:customer_id',
        name: routeList.customer_detail,
        component: () => import('../views/customer/detail/index.vue'),
        redirect: () => {
          return {
            name: routeList.customer_detail_information
          }
        },
        children: [
          {
            path: 'information',
            name: routeList.customer_detail_information,
            component: () =>
              import('../views/customer/detail/0-information/index.vue')
          },
          {
            path: 'order-list',
            name: routeList['customer_detail_order-list'],
            component: () =>
              import('../views/customer/detail/1-order-list/index.vue')
          },
          {
            path: 'maintenance-list',
            name: routeList['customer_detail_maintenance-list'],
            component: () =>
              import('../views/customer/detail/2-maintenance-list/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    name: routeList.order,
    component: () => import('../views/order/index.vue'),
    meta: {
      layout: 'LayoutDefault',
      isVerifyIdentity: false
    },
    redirect: () => {
      return {
        name: routeList.order_list
      }
    },
    children: [
      {
        path: 'list',
        name: routeList.order_list,
        component: () => import('../views/order/list/index.vue')
      },
      {
        path: 'product-list/:order_id',
        name: routeList['order_product-list'],
        component: () => import('../views/order/product-list/index.vue')
      }
    ]
  }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

const router = createRouter({
  history: createWebHashHistory(),
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
