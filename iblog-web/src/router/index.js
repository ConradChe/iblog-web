import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Home = () => import('@/views/Home')
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
    component: Home,
    children:[
      {
        path: '/',
        redirect: '/index'
      },
      {
        path: '/index',
        component: Index
      },
      {
        path: '/myfollow',
        component: MyFollow
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
        name: 'article',
        path: '/article',
        component: ArticleInfo
      },
      {
        path: '/settings',
        component: Settings
      }
    ]
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
    path: '/write',
    component: BlogWrite
  }

]
const router = new VueRouter({
  routes,
  // url模式
  mode: 'history'
})
export default router
