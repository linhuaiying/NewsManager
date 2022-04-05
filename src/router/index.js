import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsMainView from '../views/NewsMainView.vue'
import HomeMainView from '../views/HomeMainView.vue'
import CommentsMainView from '../views/CommentsMainView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children : [
      {
        path: '/user',
        name: 'HomeMainView',
        component: HomeMainView
      },
      {
        path: '/news',
        name: 'NewsMainView',
        component: NewsMainView
      },
      {
        path: '/comments',
        name: 'CommentsMainView',
        component: CommentsMainView
      },
     ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
