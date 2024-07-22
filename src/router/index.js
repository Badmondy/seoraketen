import { createRouter, createWebHistory } from 'vue-router'
import HomeView  from '../views/HomeView.vue'
import SettingView from "../views/SettingView.vue";
import StoredDataView from "../views/StoredDataView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path:'/settings',
      name:'Settings',
      component:SettingView,
    },
    {
      path:'/data',
      name:'Stored data',
      component: StoredDataView
    }
  ]
})

export default router
