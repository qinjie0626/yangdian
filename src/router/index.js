import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
const Index =()=>import('@/components/index')
const Commodity =()=>import('@/components/commodity')
const Register =()=>import('@/components/register')
const Login =()=>import('@/components/login')
// 二级路由
const Classify =()=>import('@/components/pages/classify')
const Home =()=>import('@/components/pages/home')
const Mycenter =()=>import('@/components/pages/mycenter')
const ShoppingCar =()=>import('@/components/pages/shoppingcar')
Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior(to,from,savaedPosition){
    if(savaedPosition){
      return savaedPosition
    }else{
      return {
        x:0,
        y:0
      }
    }
  },
  routes: [
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/home',
          component:Home
        },
        {
          path:'/classify',
          component:Classify
        },
        {
          path:'/shoppingcar',
          component:ShoppingCar
        },
        {
          path:'/mycenter',
          component:Mycenter
        },
      ]
    },
    {
      path:'/commodity',
      component:Commodity
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'*',
      redirect:'/home'
    }
  ]
})
