import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Index = () => import('@/views/home/Index')
const MyFollow = () => import('@/views/myfollow/MyFollow')
const BlogManage = () => import('@/views/blogmanage/BlogManage')
const BlogWrite = () => import('@/views/blog/BlogWrite')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component:Index
  },
  {
    path: '/login',
    // 指定的组件
    component:Login
  },
  {
    path: '/register',
    component:Register
  },
  {
    path: '/myfollow',
    component:MyFollow
  },
  {
    path: '/blogmanage',
    component:BlogManage
  },
  {
    path: '/write',
    component:BlogWrite
  }
]
const router = new VueRouter({
  routes,
  // url模式
  mode:'history'
})

export default router
