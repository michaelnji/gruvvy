import AddExpenseView from '@/views/AddExpenseView.vue'
import AddIncomeView from '@/views/AddIncomeView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import TransactionView from '@/views/TransactionView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SetupView from '@/views/SetupView.vue'
import StatsView from '@/views/StatsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/transactions/:id', component: TransactionView },
    {
      path: '/',
      component: HomeViewVue
    },
    {
      path: '/settings',
      component: SettingsView
    },
    {
      path: '/setup',
      component: SetupView
    },
    {
      path: '/stats',
      component: StatsView
    },
    {
      path: '/add-expense',
      component: AddExpenseView
    },
    {
      path: '/add-income',
      component: AddIncomeView
    }
  ]
})

export default router
