import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home.vue'
import Login from '@views/Login.vue'
import Permission from '@/views/Permission.vue'

Vue.use(VueRouter)

// 所有权限通用路由表
export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    index: 'login',
    name: 'login',
    title: '登录',
  },
  {
    path: '/',
    redirect: '/home',
    component: Home,
    name: 'home',
    index: 'home',
    title: '首页'
  },
  {
    path: '/top',
    index: 'top',
    name: 'top',
    title: '推荐',
    component: () => import('@views/TopList'),
    children: [
      {
        path: 'movies',
        index: 'movies',
        name: 'movies',
        title: '电影',
        component: () => import('@views/Movies.vue')
      },
      {
        path: 'books',
        index: 'books',
        name: 'books',
        title: '书籍',
        component: () => import('@views/Books.vue')
      },
      {
        path: 'musics',
        index: 'musics',
        name: 'musics',
        title: '音乐',
        component: () => import('@views/Musics.vue')
      },
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Home,
    name: '权限测试',
    meta: {
      roles: [
          'admin',
          'super_editor'
      ]
    },
    children: [
      {
        path: 'index',
        component: Permission,
        name: '权限测试页',
        meta: {
          roles: ['admin', 'super_editor']
        }
      },
      {
        path: 'set',
        index: 'set',
        name: 'set',
        title: '设置',
        component: () => import('@views/Set.vue')
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    component: () => import('@views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: constantRoutes,
})

export default router
