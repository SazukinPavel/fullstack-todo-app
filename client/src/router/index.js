import { createRouter, createWebHashHistory } from 'vue-router'
import TodosPage from '../pages/TodosPage.vue'
import TodoPage from '../pages/TodoPage.vue'

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
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router