import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'
// import

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home/home.vue') },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa/qa.vue') },
      { path: 'video', name: 'video', component: () => import('@/views/video/video.vue') },
      { path: 'my', name: 'my', component: () => import('@/views/my/my.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
