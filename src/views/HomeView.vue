<script setup>
import BalanceComp from '@/components/BalanceComp.vue';
import BudgetSummaryComp from '@/components/BudgetSummaryComp.vue';
import ExpenseComp from '@/components/ExpenseComp.vue';
import IncomeComp from '@/components/IncomeComp.vue';
import navBar from '@/components/NavBar.vue';
import TransactionsList from '@/components/TransactionsList.vue';
import { dummy } from '@/lib/data/dummy';


</script>

<template>
  <main class=" pb-20">
    <navBar />
    <div class="pt-24  px-6 ">
      <h2 class="font-head m-0 !leading-none font-extrabold  text-3xl">
        Account Overview
      </h2>
      <div class="mt-6 w-full">
        <BalanceComp :balance='999900' />
      </div>
      <div class="grid grid-cols-2 gap-2 mt-4 w-full">
        <div>
          <ExpenseComp :expense='94394995' />
        </div>
        <div>
          <IncomeComp :income='900000' />
        </div>
      </div>
      <div class="w-full mt-4">
        <BudgetSummaryComp :percentage="3901229 / 65009099 * 100" :total="65009099" :current="3901229" />
      </div>
      <div class="w-full h-0.5  my-8 bg-base-300"></div>
      <!-- transactions -->
      <h2 class="font-head !m-0 text-3xl font-black ">
        Recent Transactions
      </h2>
      <div class="mt-4">
        <TransactionsList :transactions='[...dummy.transactions]' />
      </div>
    </div>
  </main>
</template>
