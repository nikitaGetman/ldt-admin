import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import { createMiddlewarePipeline, notFound, notAuth, auth, logout } from '@/router/middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'AppLogin',
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/AppLogin'),
    redirect: { name: 'login' },
    meta: {
      middleware: [notAuth]
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
    redirect: { name: 'AnimalsDashboard' },
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: '/animals-dashboard',
        name: 'AnimalsDashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
      },
      {
        path: '/animal/:id',
        name: 'AnimalCard',
        props: true,
        component: () => import(/* webpackChunkName: "animal-card" */ '@/views/AnimalCard.vue')
      },
      {
        path: '/dicts',
        name: 'Dicts',
        component: () => import(/* webpackChunkName: "dicts" */ '@/views/Dicts.vue')
      },
      {
        path: '/acts',
        name: 'Acts',
        component: () => import(/* webpackChunkName: "acts" */ '@/views/Acts.vue')
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import(/* webpackChunkName: "reports" */ '@/views/Reports.vue')
      },
      {
        path: '/requests',
        name: 'Requests',
        component: () => import(/* webpackChunkName: "requests" */ '@/views/Requests.vue')
      },
      {
        path: '/logout',
        name: 'Logout',
        meta: {
          middleware: [logout]
        }
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
