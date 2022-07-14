import { createRouter, createWebHashHistory } from 'vue-router'
import TodosPage from '../pages/TodosPage.vue'
import TodoPage from '../pages/TodoPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
  {
    path:'/',
    redirect:'/todos'
  },
  {
    path:'/todos',
    name: 'todos-page',
    component: TodosPage,
    children:[
      
    ]
  },
  {
    path: '/todos/:id',
    name: 'todo-page',
    props: true,
    component: TodoPage
  },
  {
    path:'/login',
    name: 'login-page',
    component: LoginPage,
    children:[
      
    ]
  },
  {
    path:'/register',
    name: 'register-page',
    component: RegisterPage,
    children:[
      
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router