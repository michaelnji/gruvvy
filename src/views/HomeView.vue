<script setup>
import BalanceComp from '@/components/BalanceComp.vue';
import BottomNav from '@/components/BottomNav.vue';
import BudgetSummaryComp from '@/components/BudgetSummaryComp.vue';
import ExpenseComp from '@/components/ExpenseComp.vue';
import IncomeComp from '@/components/IncomeComp.vue';
import navBar from '@/components/NavBar.vue';
import WelcomeComp from '@/components/WelcomeComp.vue';
import TransactionsList from "@/components/TransactionsList.vue";
import { getItemValue } from "@/lib/scripts/db";
import { useTransactions } from '@/stores/transactions';
import anime from 'animejs';
import { storeToRefs } from "pinia";
import { ref, onMounted } from 'vue'
import { useProfile } from "@/stores/profile";

const userProfile = getItemValue("pt-profile");
const isNewUser = ref(false)
if (!userProfile) {
  isNewUser.value = true
}
const profileState = useProfile();
const { profile } = storeToRefs(profileState);
const transactionsState = useTransactions();
// const transactions = transactionsState.filteredTransactions();
onMounted(() => {
  anime({
    targets: '.h',
    opacity: 1,
    scale: {
      value: 1,

    },
    duration: 500,
    easing: 'easeOutElastic(2,2)',
  })
});

</script>

<template>
  <div v-if="!isNewUser">
    <navBar />
    <main class=" pb-28">
      <div class="pt-10  px-4 h  opacity-0" style="transform: scale(.98);">
        <div class="flex items-center justify-between">
          <div v-if="profile.name" class="flex items-center gap-3">
            <button class="btn btn-circle !uppercase  text-2xl btn-primary">{{ profile.name.split('')[0] }}</button>
            <div>
              <h2 class="font-head m-0 !leading-none font-medium  text-2xl">
                {{ profile.name }}
              </h2>
              <p class="opacity-50"> ID: {{ profile.id }}</p>
            </div>

          </div>
          <a href="/settings" class="btn btn-ghost btn-circle">
            <i class="bx bx-cog bx-sm"></i>
          </a>
        </div>
        <div class="mt-6 w-full">
          <BalanceComp :balance='profile.balance' />
        </div>
        <div class="grid grid-cols-2 gap-2 mt-4 w-full">
          <div>
            <ExpenseComp :expense='profile.expense' />
          </div>
          <div>
            <IncomeComp :income='profile.income' />
          </div>
        </div>
        <div class="w-full mt-4">
          <BudgetSummaryComp :total="profile.budget" :current="profile.budget_usage" />
        </div>
        <div class="w-full h-0.5  my-8 bg-base-content bg-opacity-10"></div>
        <!-- transactions -->
        <h2 class=" !m-0 text-xl font-bold ">
          Recent Transactions
        </h2>
        <div class="mt-4">
          <TransactionsList :transactions='transactionsState.filteredTransactions() ' />
        </div>
      </div>
    </main>
    <footer class="fixed  bottom-0 left-0 right-0">
      <BottomNav />
    </footer>
  </div>
  <WelcomeComp v-if="isNewUser" />
</template>
