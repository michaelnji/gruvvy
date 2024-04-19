<script setup>
import {
    getDayFromDate, getReadableDateShort
} from "@/lib/scripts/dateManager";
import { useCategories } from '@/stores/categories';
import { useProfile } from '@/stores/profile';
import { useTransactions } from '@/stores/transactions';
import anime from 'animejs';
import { number } from "mathjs";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
let amount
const date = new Date();
let note = ''
const errorMessages = ref("");
const categoriesState = useCategories();
const { categories } = storeToRefs(categoriesState)
const transactionsState = useTransactions();
const profileState = useProfile();
const expenseCategories = categoriesState.getExpenseCategories();
const incomeCategories = categoriesState.getIncomeCategories();
const chosenCategory = ref("none");
const currentPopover = ref("#income");
const popoverIsVisible = ref(false);

function showCategories() {
    anime({
        targets: '#categories',
        height: '100%',
        opacity: 1
    })
}
</script>

<template>
    <main class="py-6 px-3">
        <div class="flex justify-start items-center">
            <a href="/" class="btn btn-outline btn-circle">
                <i class="bx bx-x bx-sm"></i>
            </a>
        </div>

        <div class="mt-3">
            <form class="p-6 rounded-3xl bg-base-200">
                <label class="form-control !m-0 w-full ">

                    <div class="flex gap-x-2 mt-2"> <span class="font-bold">XAF</span><input v-model.number="amount"
                            type="text" placeholder="0"
                            class="input text-5xl focus:!border-none focus:!ring-0 focus:!outline-none w-full font-bold rounded-xl" />
                    </div>

                </label>
            </form>

            <div class="mt-3 p-6 rounded-2xl bg-base-200">
                <div class="flex w-full items-center justify-between">
                    <div>
                        <h3 class="font-bold text-xl  opacity-80 font-head">Category</h3>
                        <p class="opacity-70 text-sm">Choose only one</p>
                    </div>
                    <button @click="showCategories" class="btn btn-sm btn-circle btn-ghost"><i
                            class="bx bx-caret-down"></i></button>
                </div>
                <div class="mt-3 flex gap-2 flex-wrap h-0 opacity-0" id="categories">
                    <div v-for="item, i in expenseCategories" :key="i" @click="() => {
                        chosenCategory = chosenCategory === item.name ? 'none' : item.name
                    }" :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                        class="p-1 px-2 rounded-lg cursor-pointer border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-medium flex items-center gap-x-0.5 text-base">

                        <i v-if="chosenCategory === item.name" class="bx bx-check bx-sm"></i>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>

            <div class="mt-3 p-6 rounded-3xl bg-base-200">
                <h3 class="font-bold text-xl opacity-80 font-head">Notes </h3>
                <div class="my-3">
                    <textarea class="textarea rounded-2xl textarea-bordered w-full h-24" v-model="note"
                        placeholder="notes"></textarea>
                </div>
            </div>
            <div class="mt-3 p-6 rounded-3xl bg-base-200">
                <div class="w-full flex items-center justify-between">
                    <p class="flex gap-x-2 items-center">
                        <i class="bx bx-calendar bx-sm"></i> Created on
                    </p>
                    <p class="font-bold">
                        {{ getReadableDateShort(new Date()) }}
                    </p>
                </div>
            </div>
            <div class=" my-3 p-2 rounded-xl text-error bg-error bg-opacity-10 flex gap-x-1 items-center text-base"
                v-if="errorMessages">
                <i class="bx bx-error-circle"></i> {{ errorMessages }}
            </div>
            <button class="btn mt-3 btn-primary font-head w-full rounded-2xl mx-auto"
                @click="addTransacton('income')">Add
                Income</button>
        </div>
    </main>
</template>