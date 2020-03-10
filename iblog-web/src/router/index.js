import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 懒加载
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Index = () => import('@/views/home/Index')
const MyFollow = () => import('@/views/myfollow/MyFollow')
const BlogManage = () => import('@/views/blogmanage/BlogManage')
const BlogWrite = () => import('@/views/blog/BlogWrite')
const ArticleInfo = () => import('@/views/home/article/ArticleInfo')
const Settings = () => import('@/views/setting/Settings')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component: Index
  },
  {
    path: '/login',
    // 指定的组件
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/myfollow',
    component: MyFollow
  },
  {
    path: '/blogmanage',
    component: BlogManage
  },
  {
    path: '/write',
    component: BlogWrite
  },
  {
    name: 'article',
    path: '/article',
    component: ArticleInfo
  },
  {
    path: '/settings',
    component: Settings
  }
]
const router = new VueRouter({
  routes,
  // url模式
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let path = to.path
  if (path === '/login' || path === '/register' || path === '/write' || path === '/article') {
    store.state.baseShow = false
  } else {
    store.state.baseShow = true
  }
  store.state.activeIndex = path
  next()
})

export default router
