<script setup>
import BottomNavBar from '@/components/BottomNav.vue';
import ChartComp from '@/components/ChartComp.vue';
import NavBar from '@/components/NavBar.vue';
import { iconList } from '@/lib/data/icons';
import {
  getDayFromDate, getReadableDateShort
} from "@/lib/scripts/dateManager";
import { extractDatesFromData, extractAmountsFromData, extractAmountsAndDatesFromData, getMostUsedCategory, sortDatesDescending } from '@/lib/utils/stats';
import { useTransactions } from '@/stores/transactions';
import { getDate } from 'date-fns';
import { computed, onMounted, ref } from 'vue';
import { numToSummary } from '@/lib/scripts/numberFunctions';
import anime from 'animejs';

const currentChart = ref("income");
const transactionsState = useTransactions();

const startIndex = ref(0)
const endIndex = computed(() => {
  return startIndex.value + 6
})

const data = computed(() => {

  const transactions = [...transactionsState.transactions].sort((a, b) => new Date(b.date).toLocaleString() < new Date(a.date).toLocaleString() ? 1 : -1).reverse()

  const extractedExpenseDates = [...extractDatesFromData(transactions, "expense").ISODates];
  const extractedIncomeDates = [...extractDatesFromData(transactions, "income").ISODates];
  const currentWeek = sortDatesDescending([...new Set([...extractedExpenseDates, ...extractedIncomeDates])]).filter((date, i) => i >= startIndex.value && i <= endIndex.value)
  let currentWeekDays = []

  for (const item in currentWeek) {
    currentWeekDays[item] = getDate(new Date(currentWeek[item]))
    currentWeek[item] = new Date(currentWeek[item])
  }
  const currentWeekIncomeTransactionsAmounts = extractAmountsFromData(transactions, 'income', currentWeek).reverse();
  const currentWeekExpenseTransactionsAmounts = extractAmountsFromData(transactions, 'expense', currentWeek).reverse();

  const currentWeekTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= new Date(currentWeek[currentWeek.length - 1]) && transactionDate <= new Date(currentWeek[0])
  })

  const mostExpensiveDay = extractAmountsAndDatesFromData(transactions, 'expense', currentWeek).sort((a, b) =>
    b.amount < a.amount ? 1 : -1
  ).reverse()[0]

  currentWeekDays = currentWeekDays.reverse()

  return { currentWeek, currentWeekDays, currentWeekIncomeTransactionsAmounts, currentWeekExpenseTransactionsAmounts, currentWeekTransactions, transactions, mostExpensiveDay }
});


const mostUsedCategories = computed(() => getMostUsedCategory(data.value.currentWeekTransactions));
const expenseSeries = computed(() => { return { name: 'expense', data: data.value.currentWeekExpenseTransactionsAmounts } })
const incomeSeries = computed(() => { return { name: 'income', data: data.value.currentWeekIncomeTransactionsAmounts } });
const avgDailySpending = computed(() => {
  let amount = 0
  for (const a in data.value.currentWeekExpenseTransactionsAmounts) {
    const element = data.value.currentWeekExpenseTransactionsAmounts[a];
    amount = amount + element
  }
  return Math.floor(amount / data.value.currentWeekExpenseTransactionsAmounts.length)

});

onMounted(() => {
  anime({
    targets: '.i',
    opacity: 1,
    scale: 1,
    duration: 500,
    easing: 'easeOutElastic(2,2)',
  })
});

</script>

<template>
  <NavBar />
  <!-- ! potential bug, which prevents stats from being rendered if week isn't complete. Investigation in progress -->
  <main class="px-4 pt-10 pb-28 i opacity-0" style="transform: scale(0.98);" v-if="data.currentWeek.length >= 7">
    <div class="flex justify-between items-center w-full gap-x-2">
      <button class="p-2 rounded-xl bg-primary flex items-center text-primary bg-opacity-10"
        @click="() => startIndex = data.currentWeek.length < 7 ? 0 : endIndex">
        <i class="bx bxs-left-arrow bx-sm"></i>
      </button>
      <div class="p-2 flex items-center justify-center rounded-xl text-xl w-full bg-primary  bg-opacity-10 font-medium">
        {{ getReadableDateShort(new Date(data.currentWeek[data.currentWeek.length - 1])) }} - {{
    getReadableDateShort(new
      Date(data.currentWeek[0])) }}
      </div>
      <button class="p-2 rounded-xl bg-primary flex items-center text-primary bg-opacity-10"
        @click="() => startIndex = startIndex === 0 ? 0 : startIndex - 6">
        <i class="bx bxs-right-arrow bx-sm"></i>
      </button>
    </div>
    <div class="mt-8 px-4">
      <div class="flex w-full items-center justify-between">
        <h2 class=" m-0 !leading-none font-bold text-xl">Transactions</h2>
        <div class="dropdown dropdown-bottom menu-dropdown-toggle dropdown-end">
          <div tabindex="0" role="button" class="btn bg-primary btn-sm text-primary bg-opacity-10  m-1">{{ currentChart
            }} <i class="bx bx-caret-down"></i></div>
          <ul tabindex="1" class="dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 !capitalize">
            <li><a @click="currentChart = 'income'">Income</a></li>
            <li><a @click="currentChart = 'expense'">Expenses</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-3">
        <ChartComp v-if="currentChart === 'income'" type="bar" :series="incomeSeries" color="green"
          :categories="data.currentWeekDays" :id="'income'" />
        <ChartComp v-if="currentChart === 'expense'" type="bar" :series="expenseSeries" color="red"
          :categories="data.currentWeekDays" :id="'expense'" />
      </div>
    </div>
    <div class="mt-4 px-4">
      <div class="rounded-2xl bg-base-200 p-6">
        <h2 class=" m-0 opacity-70 !leading-none text-lg">You spent the most on</h2>
        <h1 class="font-extrabold font-head text-3xl"> {{ getDayFromDate(new Date(data.mostExpensiveDay.date)) }}</h1>
      </div>
    </div>
    <div class="mt-4 px-4">
      <div class="rounded-2xl bg-base-200 p-6">
        <h2 class=" m-0 opacity-70 !leading-none font-medium text-lg">Your top categories</h2>
        <div class="grid grid-cols-3 mt-6  flex-wrap gap-2">
          <div v-for="item, i in mostUsedCategories" :key="i"
            class="p-3 bg-base-100 w-full rounded-xl flex items-center justify-center  flex-col">
            <span>
              <i :class='`${iconList[item.name.icon].icon} ! text-primary  bx-md`'></i>
            </span>
            <span class="!opacity-70 my-1 text-sm capitalize">{{ item.name.name }}</span>
            <span class="text-2xl font-bold font-head">{{ item.timesAppeared }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 px-4">
      <div class="rounded-2xl bg-base-200 p-6">
        <h2 class=" m-0 opacity-70 !leading-none text-lg"> Average daily spending</h2>
        <div class="mt-1 flex items-center gap-4">
          <h1 class="font-extrabold font-head text-5xl "><small class="text-2xl">XAF</small> {{
            numToSummary(avgDailySpending) }}
          </h1>
        </div>
      </div>
    </div>
  </main>
  <main class="px-2 pt-24 pb-28 i opacity-0" style="transform: scale(0.98);" v-if="data.currentWeek.length < 7">
    <img src="/stats.svg" alt="">

    <h2 class="font-head text-3xl font-medium text-center">
      Not enough data yet
    </h2>
    <p class="opacity-80 mt-4 text-md text-center text-pretty">Continue using PayTrack for at least 7 days to see
      statistics
    </p>

  </main>
  <BottomNavBar />
</template>
