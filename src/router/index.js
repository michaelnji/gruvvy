import AddExpenseView from '@/views/AddExpenseView.vue'
import AddIncomeView from '@/views/AddIncomeView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SetupView from '@/views/SetupView.vue'
import StatsView from '@/views/StatsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '/',
      component: HomeViewVue
    }, 
    {
      name: '/settings',
      component: SettingsView
    },
    {
      name: '/setup',
      component: SetupView
    },
    {
      name: '/stats',
      component: StatsView
    },
    {
      name: '/add-expense',
      component: AddExpenseView
    },
    {
      name: '/add-income',
      component: AddIncomeView
    },

  ]
})

export default router
