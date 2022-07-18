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
  },
  {
    path:'/register',
    name: 'register-page',
    component: RegisterPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router