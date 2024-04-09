<script setup>
import BottomNavBar from '@/components/BottomNav.vue';
import ChartComp from '@/components/ChartComp.vue';
import NavBar from '@/components/NavBar.vue';
import { categoriesData } from '@/lib/data/categories';
import { iconList } from '@/lib/data/icons';
import { getDayFromDate, getReadableDate } from "@/lib/scripts/dateManager";
import { ref } from 'vue';
const income = {
	series: {
		name: "income",
		data: [1000, 2033, 100, 300, 500, 900],
	},
   categories: [11, 12, 15, 16, 18, 19, 21]
};
const expense = {
	series: {
		name: "expense",
		data: [500, 203, 1000, 3000, 5000, 1500],
	},
   categories: [11, 12, 15, 16, 18, 19, 21]
};
const categories = [
	{
		name: categoriesData.expense.crypto,
		amount: 10100,
		timesAppeared: 9,
	},
	{
		name: categoriesData.expense.food,
		amount: 14500,
		timesAppeared: 12,
	},
	{
		name: categoriesData.expense.recreation,
		amount: 14500,
		timesAppeared: 19,
	},
	{
		name: categoriesData.expense.subscription,
		amount: 14500,
		timesAppeared: 10,
	},
];
const currentChart = ref('income');
</script>

<template>
  <NavBar />
  <main class="px-2 pt-24 pb-20">
    <div class="flex justify-between items-center w-full gap-x-2">
      <button class="p-2 rounded-xl bg-primary flex items-center text-primary bg-opacity-10">
        <i class="bx bxs-left-arrow bx-sm"></i>
      </button>
      <div
        class="p-2 flex items-center justify-center rounded-xl text-xl w-full bg-primary  bg-opacity-10 font-medium"
      >
        {{ getReadableDate(new Date()) }}
      </div>
      <button class="p-2 rounded-xl bg-primary flex items-center text-primary bg-opacity-10">
        <i class="bx bxs-right-arrow bx-sm"></i>
      </button>
    </div>
    <div class="mt-8 px-4">
      <div class="flex w-full items-center justify-between">
        <h2 class="font-head m-0 !leading-none font-medium text-2xl">Transactions</h2>
        <div class="dropdown dropdown-bottom menu-dropdown-toggle dropdown-end">
          <div tabindex="0" role="button" class="btn bg-primary btn-sm text-primary bg-opacity-10  m-1">{{ currentChart }} <i class="bx bx-caret-down"></i></div>
          <ul
            tabindex="1"
            class="dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a @click="currentChart = 'income'">Income</a></li>
            <li><a @click="currentChart = 'expense'">Expenses</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-3">
        <ChartComp v-if="currentChart === 'income'"
          type="bar"
          :series="income.series"
          color="green"
          :categories="income.categories"
          :id="'income'"
        />
        <ChartComp v-if="currentChart === 'expense'"
          type="bar"
          :series="expense.series"
          color="red"
          :categories="expense.categories"
          :id="'expense'"
        />
      </div>
    </div>
    <div class="mt-4 px-4">
        <div class="rounded-2xl bg-base-200 p-6">
            <h2 class="font-head m-0 opacity-70 !leading-none text-lg">You spent the most on</h2> 
            <h1 class="font-extrabold text-3xl"> {{ getDayFromDate(new Date()) }}</h1> 
        </div>
    </div>
    <div class="mt-4 px-4">
        <div class="rounded-2xl bg-base-200 p-6">
            <h2 class="font-head m-0 opacity-70 !leading-none font-medium text-lg">Your top categories</h2> 
            <div class="grid grid-cols-2 mt-6  flex-wrap gap-2">
                <div v-for="item,i in categories" :key="i" class="p-6 bg-base-100 w-full rounded-2xl flex items-center justify-center  flex-col">
                    <span>
                         <i :class='`${iconList[item.name.icon].icon} ! text-primary  bx-lg`'></i>
                    </span>
<span class="!opacity-70 my-2 capitalize">{{ item.name.name }}</span>
<span class="text-4xl font-bold">{{  item.timesAppeared }}</span>
                </div>
            </div> 
        </div>
    </div>
     <div class="mt-4 px-4">
        <div class="rounded-2xl bg-base-200 p-6">
            <h2 class="font-head m-0 opacity-70 !leading-none text-lg">You followed your budget by</h2> 
            <div class="mt-6 flex items-center gap-4">
                <h1 class="font-extrabold text-6xl ">45%</h1> 
            <div class="h-12 flex items-center justify-center w-12 rounded-full bg-base-100"><i class="bx bx-trending-up text-success bx-sm"></i></div>
            </div>
        </div>
    </div>
  </main>
  <BottomNavBar />
</template>
