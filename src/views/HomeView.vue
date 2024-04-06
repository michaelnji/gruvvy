<script setup>
import BalanceComp from '@/components/BalanceComp.vue';
import BudgetSummaryComp from '@/components/BudgetSummaryComp.vue';
import ExpenseComp from '@/components/ExpenseComp.vue';
import IncomeComp from '@/components/IncomeComp.vue';
import navBar from '@/components/NavBar.vue';
import TransactionsList from '@/components/TransactionsList.vue';
import { dummy } from '@/lib/data/dummy';
import { getReadableDate } from '@/lib/scripts/dateManager';


</script>

<template>
  <main class=" pb-20">
    <navBar />
    <div class="pt-24  px-4 ">
      <div class="flex items-center gap-3">
        <button class="btn  text-2xl btn-primary text-orange-50">M</button>
        <div>
          <h2 class="font-head m-0 !leading-none font-medium  text-3xl">
            Hello Michael
          </h2>
          <p class="opacity-70"> {{ getReadableDate(new Date()) }}</p>
        </div>

      </div>
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
        <BudgetSummaryComp :percentage="100000 / 500500 * 100" :total="500500" :current="100000" />
      </div>
      <div class="w-full h-0.5  my-8 bg-base-300"></div>
      <!-- transactions -->
      <h2 class="font-head !m-0 text-3xl font-medium ">
        Recent Transactions
      </h2>
      <div class="mt-4">
        <TransactionsList :transactions='[...dummy.transactions]' />
      </div>
    </div>
  </main>
</template>
