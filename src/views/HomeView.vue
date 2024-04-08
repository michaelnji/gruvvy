<script setup>
import BalanceComp from '@/components/BalanceComp.vue';
import BudgetSummaryComp from '@/components/BudgetSummaryComp.vue';
import ExpenseComp from '@/components/ExpenseComp.vue';
import IncomeComp from '@/components/IncomeComp.vue';
import navBar from '@/components/NavBar.vue';
import TransactionsList from "@/components/TransactionsList.vue";
import { useTransactions } from '@/stores/transactions';
import BottomNav from '@/components/BottomNav.vue';
import { storeToRefs } from "pinia";
import { useProfile } from "@/stores/profile";
const profileState = useProfile();
const { profile } = storeToRefs(profileState);
const transactionsState = useTransactions();
// const transactions = transactionsState.filteredTransactions();


</script>

<template>
  <main class=" pb-20 relative">

    <navBar />
    <div class="pt-24  px-4 ">
      <div v-if="profile.name" class="flex items-center gap-3">
        <button class="btn btn-circle !uppercase  text-xl btn-primary">{{ profile.name.split('')[0] }}</button>
        <div>
          <h2 class="font-head m-0 !leading-none font-medium  text-2xl">
            Hello {{ profile.name }}
          </h2>
          <p class="opacity-50"> ID: {{ profile.id }}</p>
        </div>

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
      <div class="w-full h-0.5  my-8 bg-base-300"></div>
      <!-- transactions -->
      <h2 class="font-head !m-0 text-3xl font-medium ">
        Recent Transactions
      </h2>
      <div class="mt-4">
        <TransactionsList :transactions='transactionsState.filteredTransactions()' />
      </div>
    </div>
  </main>
  <footer class="fixed  bottom-0 left-0 right-0">
    <BottomNav />
  </footer>
</template>
