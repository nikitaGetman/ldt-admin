import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import { createMiddlewarePipeline, notFound } from '@/router/middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'AppLogin',
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/AppLogin'),
    redirect: { name: 'login' },
    meta: {
      // middleware: [notAuth]
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Auth" */ '@/views/Login')
      }
    ]
  },
  {
    path: '/',
    name: 'AppMain',
    component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/AppMain'),
    redirect: { name: 'summary' },
    meta: {
      // middleware: [auth]
    },
    children: [
      {
        path: '/',
        name: 'summary',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const middleware = to.matched.reduce(
    (guards, matchedRoute) => {
      const routeGuards = matchedRoute.meta.middleware
        ? matchedRoute.meta.middleware.filter(someGuard => !guards.includes(someGuard))
        : []

      return routeGuards.length ? [...guards, ...routeGuards] : guards
    },
    [notFound]
  )

  createMiddlewarePipeline({ to, from, next, store }, middleware)()
})

export default router
