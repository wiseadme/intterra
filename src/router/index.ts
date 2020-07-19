import Vue from 'vue'
import VueRouter from 'vue-router'
import TableView from '@/views/TableView'

Vue.use(VueRouter)

// добавил условный роут с id поля
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/112'
  },
  {
    path: '/:id',
    name: 'Table',
    component: TableView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
