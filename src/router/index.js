import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'

import { Dialog } from 'vant'

import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/article/components/test-one.vue'),
    meta: { requiresAuth: false, index: 3 }
  },

  { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },

  // 搜索模块
  { path: '/search', name: 'search', component: () => import('@/views/search/index.vue'), meta: { requiresAuth: false } },

  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article/index.vue'), props: true, meta: { requiresAuth: false, index: 2 } },
  { path: '/user/info', name: 'user-info', component: () => import('@/views/user-info/index.vue'), meta: { requiresAuth: false, index: 2 } },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home/home.vue'), meta: { requiresAuth: false, index: 1 } },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa/qa.vue'), meta: { requiresAuth: false } },
      { path: 'video', name: 'video', component: () => import('@/views/video/video.vue'), meta: { requiresAuth: true } },
      { path: 'my', name: 'my', component: () => import('@/views/my/my.vue'), meta: { requiresAuth: false, index: 1 } }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该内容需要登录才能访问，是否确认登录？'
    })
      .then(() => {
        // on confirm
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // on cancel
        next(false)
      })
  } else {
    next()
  }
})

export default router
