<script setup>
import { useCategories } from '@/stores/categories';
import { useProfile } from '@/stores/profile';
import { useTransactions } from '@/stores/transactions';
import anime from 'animejs';
import { isNaN, number } from 'mathjs';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
let amount
let date = new Date()
let note = ''
let errorMessages = ref('')
let categoriesState = useCategories()
const { categories } = storeToRefs(categoriesState)
let transactionsState = useTransactions()
let profileState = useProfile()
let expenseCategories = categoriesState.getExpenseCategories()
let incomeCategories = categoriesState.getIncomeCategories()
let chosenCategory = ref('none')
let currentPopover = ref('#income')
let popoverIsVisible = ref(false)

function addTransacton(type) {
    if (isNaN(parseInt(amount)) || amount <= 0) {
        errorMessages.value = 'Amount is invalid'
        return
    }

    if (chosenCategory.value === 'none') {
        errorMessages.value = 'Please choose a category'
        return
    }

    const updatedProfile = profileState.profile
    amount = number(amount)

    if (type === "income") {

        updatedProfile.balance = number(updatedProfile.balance + amount)
        updatedProfile.income = number(updatedProfile.income + amount)

    }

    if (type === "expense") {
        if (updatedProfile.balance - amount < 0) {
            errorMessages.value = 'amount is higher than balance'
            return
        }
        updatedProfile.balance = number(updatedProfile.balance - amount)
        updatedProfile.expense = number(updatedProfile.expense) + amount
        updatedProfile.budget_usage = number(updatedProfile.budget_usage) + amount
    }

    const currentCategoryType = categories.value[type]
    const newTransaction = {
        type,
        date,
        amount,
        note,
        category: currentCategoryType[chosenCategory.value],

    }

    transactionsState.addTransaction(newTransaction)
    profileState.updateProfile(updatedProfile)
    hidePopover(`#${type}`)
}
function showPopover(selector) {
    currentPopover.value = selector
    popoverIsVisible.value = true;
    setTimeout(() => {
        anime({
            targets: selector,
            translateY: '0px',
            easing: 'easeOutElastic(2,2)',
            duration: 500

        });
    }, 1)
}
function hidePopover(selector) {
    amount = null
    note = null
    chosenCategory.value = 'none'
    errorMessages.value = ''

    anime({
        targets: selector,
        translateY: '1200px',
        easing: 'easeOutElastic(1,2)',
        duration: 2600

    });
    setTimeout(() => {
        popoverIsVisible.value = false;
    }, 400)
}
</script>

<template>
    <div class="mt-6 flex gap-3"> <button class="btn btn-outline btn-primary text-xl btn-circle "
            @click="showPopover('#income')"><i class="bx bx-plus bx-md"></i></button>
        <button class="btn btn-outline btn-circle btn-primary text-xl " @click="showPopover('#expense')"><i
                class="bx bx-minus bx-md"></i></button>
    </div>


    <div class="fixed  bottom-0 left-0 right-0 min-h-dvh bg-black z-50 bg-opacity-60   flex items-end justify-center"
        v-if="popoverIsVisible" @click.self="hidePopover(currentPopover)">
        <div class="w-full">
            <div v-if="currentPopover === '#income'" class="rounded-t-3xl max-w-xl  h-full relative  w-full bg-base-100"
                id="income" style="transform: translateY(1200px);">
                <div class=" max-h-dvh p-6 overflow-y-scroll">
                    <div
                        class="flex items-center justify-between fixed w-full px-6 py-3 bg-base-100 top-0 left-0 right-0 rounded-t-3xl z-10 border-b border-primary !border-opacity-30">
                        <h2 class="font-bold text-3xl">Add Income</h2>
                        <button @click="hidePopover(currentPopover)" class="btn btn-ghost btn-circle">
                            <i class="bx bx-x bx-md"></i>
                        </button>
                    </div>
                    <div class="mt-9">

                        <label class="form-control !m-0 w-full ">
                            <div class="label">
                                <span class="label-text">
                                    <h3 class="font-bold text-xl mt-6 opacity-80">Amount</h3>
                                </span>

                            </div>
                            <div class="flex gap-x-2"> <span
                                    class="text-primary font-bold bg-primary bg-opacity-10 p-3 rounded-xl">XAF</span><input
                                    v-model.number="amount" type="text" placeholder="2000"
                                    class="input input-bordered w-full font-bold rounded-xl" /></div>

                        </label>
                    </div>
                    <h3 class="font-bold text-xl mt-8 opacity-80">Category</h3>
                    <p class="opacity-70 text-sm">Choose only one</p>
                    <div class="mt-3 flex gap-2 flex-wrap w-full p-3 bg-base-200 bg-opacity-60 rounded-xl">
                        <div v-for="item, i in incomeCategories" :key="i" @click="() => {
                chosenCategory = chosenCategory === item.name ? 'none' : item.name
            }" :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                            class="p-1 px-3 rounded-lg border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-bold flex items-center gap-x-0.5 text-sm">
                            <i v-if="chosenCategory !== item.name" class="bx bx-plus"></i>
                            <i v-if="chosenCategory === item.name" class="bx bx-check"></i>
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-xl mt-6 opacity-80">Notes </h3>
                    <div class="my-3">
                        <textarea class="textarea rounded-2xl textarea-bordered w-full h-24" v-model="note"
                            placeholder="notes"></textarea>
                    </div>
                    <div class=" my-3 p-2 rounded-xl text-error bg-error bg-opacity-10 flex gap-x-1 items-center text-base"
                        v-if="errorMessages">
                        <i class="bx bx-error-circle"></i> {{ errorMessages }}
                    </div>
                    <button class="btn btn-primary w-full rounded-2xl mx-auto" @click="addTransacton('income')">Add
                        Income</button>
                </div>
            </div>
            <div v-if="currentPopover === '#expense'"
                class="rounded-t-3xl max-w-xl  h-full relative  w-full bg-base-100 " id="expense"
                style="transform: translateY(1200px);">
                <div class=" max-h-dvh p-6 overflow-y-scroll">
                    <div
                        class="flex items-center justify-between fixed w-full px-6 py-3 bg-base-100 top-0 left-0 right-0 rounded-t-3xl z-10 border-b border-primary !border-opacity-30">
                        <h2 class="font-bold text-3xl">Add Expense</h2>
                        <button @click="hidePopover(currentPopover)" class="btn btn-ghost btn-circle">
                            <i class="bx bx-x bx-md"></i>
                        </button>
                    </div>
                    <div class="mt-9">

                        <label class="form-control w-full ">
                            <div class="label">
                                <span class="label-text">
                                    <h3 class="font-bold text-xl mt-6 opacity-80">Amount</h3>
                                </span>

                            </div>
                            <div class="flex gap-x-2"> <span
                                    class="text-primary font-bold bg-primary bg-opacity-10 p-3 rounded-xl">XAF</span><input
                                    v-model="amount" type="text" placeholder="2000"
                                    class="input input-bordered w-full font-bold rounded-xl" /></div>

                        </label>
                    </div>
                    <h3 class="font-bold text-xl mt-8 opacity-80">Category</h3>
                    <p class="opacity-70 text-sm">Choose only one</p>
                    <div class="mt-3 flex gap-2 flex-wrap w-full p-3 bg-base-200 bg-opacity-60 rounded-xl">
                        <div v-for="item, i in expenseCategories" :key="i"
                            @click="chosenCategory = chosenCategory === item.name ? 'none' : item.name"
                            :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                            class="p-1 px-3 rounded-lg border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-bold flex items-center gap-x-0.5 text-sm">
                            <i v-if="chosenCategory !== item.name" class="bx bx-plus"></i>
                            <i v-if="chosenCategory === item.name" class="bx bx-check"></i>
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-xl mt-6 opacity-80">Notes</h3>
                    <div class="my-3">
                        <textarea v-model="note" class="textarea rounded-2xl textarea-bordered w-full h-24"
                            placeholder="notes"></textarea>
                    </div>
                    <div class=" my-3 p-2 rounded-xl text-error bg-error bg-opacity-10 flex gap-x-1 items-center text-base"
                        v-if="errorMessages">
                        <i class="bx bx-error-circle"></i> {{ errorMessages }}
                    </div>
                    <button @click="addTransacton('expense')" class="btn btn-primary w-full rounded-2xl mx-auto">Add
                        Expense</button>
                </div>
            </div>
        </div>
    </div>
</template>