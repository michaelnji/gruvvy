<script setup>
import { useCategories } from '@/stores/categories';
import { useProfile } from '@/stores/profile';
import { useTransactions } from '@/stores/transactions';
import anime from 'animejs';
import { number } from "mathjs";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useSettings } from '@/stores/settings';
import { useFocus } from '@vueuse/core'
import { iconList } from '@/lib/data/icons';

const settingsState = useSettings();
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
const optionsIsVisible = ref(false);
const target = ref(null)
const incomeAmountTarget = ref()
const incomeAmountTargetFocus = useFocus(incomeAmountTarget, { initialValue: true })
const expenseAmountTarget = ref()
const expenseAmountTargetFocus = useFocus(expenseAmountTarget, { initialValue: true })
function addTransacton(type) {
    if (Number.isNaN(Number.parseInt(amount)) || amount <= 0) {
					errorMessages.value = "Amount is invalid";
					return;
				}

				if (chosenCategory.value === "none") {
					errorMessages.value = "Please choose a category";
					return;
				}

				const updatedProfile = profileState.profile;
				amount = number(amount);

				if (type === "income") {
					updatedProfile.balance = number(updatedProfile.balance + amount);
					updatedProfile.income = number(updatedProfile.income + amount);
				}

				if (type === "expense") {
					if (updatedProfile.balance - amount < 0) {
						errorMessages.value = "amount is higher than balance";
						return;
					}
					updatedProfile.balance = number(updatedProfile.balance - amount);
					updatedProfile.expense = number(updatedProfile.expense) + amount;
					updatedProfile.budget_usage =
						number(updatedProfile.budget_usage) + amount;
				}

				const currentCategoryType = categories.value[type];
				const newTransaction = {
					type,
					date,
					amount,
					note,
					category: currentCategoryType[chosenCategory.value],
				};

				transactionsState.addTransaction(newTransaction);
				profileState.updateProfile(updatedProfile);
				hidePopover(`#${type}`);
}
function showPopover(selector) {
    currentPopover.value = selector
    popoverIsVisible.value = true;
    setTimeout(() => {
        anime({
            targets: '.overlay',
            opacity: 1,
            duration: 200,
            easing: 'linear'

        });
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
    optionsIsVisible.value = false;

    anime({
        targets: selector,
        translateY: '1200px',
        easing: 'easeOutElastic(1,2)',
        duration: 2600

    });
    anime({
        targets: '.overlay',
        opacity: 0,
        duration: 2700

    });
    setTimeout(() => {
        popoverIsVisible.value = false;
    }, 400)
}
function toggleOptions() {
    if (optionsIsVisible.value) {
        anime({
            targets: '.options',
            opacity: 0,
            easing: 'easeOutElastic(1,2)',
            duration: 300

        });

        optionsIsVisible.value = false;

        return
    }
    optionsIsVisible.value = true;
    setTimeout(() => {
        anime({
            targets: '.options',
            translateY: '-9rem',
            opacity: 1,
            easing: 'easeOutElastic(1,2)',
            duration: 600

        });
    }, 100);

}

// onClickOutside(target => {
//     optionsIsVisible.value = false
//     console.log(target)
// });
</script>

<template>
    <div class="relative">
        <div v-if="optionsIsVisible" ref="target"
            class="flex p-6 absolute z-20 gap-x-6 rounded-3xl bg-base-100 border border-primary border-opacity-30 shadow-xl transform translate-y-12 opacity-0 options">
            <button class=" flex-col rounded-xl border border-success bg-success-content text-success  p-3 text-xl "
                @click="showPopover('#income')">
                <i class='bx bx-upload bx-sm !bg-transparent'></i>
                <span class="text-sm">
                    income
                </span>
            </button>
            <button class=" flex-col rounded-xl border border-error bg-error-content text-error  p-3 text-xl "
                @click="showPopover('#expense')">
                <i class='bx bx-download bx-sm !bg-transparent'></i>
                <span class=" text-sm">
                    expense
                </span>
            </button>


        </div>
        <div class=" transform -translate-y-8 ">
            <button class="btn btn-primary  btn-lg shadow-lg shadow-primary btn-circle "
                :class="{ '!rotate-45': optionsIsVisible === true }" @click="toggleOptions"><i
                    class="bx bx-plus bx-md"></i></button>

        </div>
    </div>


    <div class="fixed overlay opacity-0 !p-0  !top-0 !left-0 !right-0 min-h-max h-screen bg-black  bg-opacity-60 grid place-items-end"
        style="z-index: 1000 !important;" v-if="popoverIsVisible" @click.self="hidePopover(currentPopover)">

        <div v-if="currentPopover === '#income'"
            class="    !w-screen bg-base-100 rounded-t-3xl h-[90%] p-6 overflow-scroll " id="income"
            style="transform: translateY(1200px);">
            <div>
                <div
                    class="flex items-center justify-end !fixed w-full px-6 py-3 bg-base-100 top-0 left-0 right-0 rounded-t-3xl z-10 ">

                    <button @click="hidePopover(currentPopover)" class="btn btn-ghost btn-circle">
                        <i class="bx bx-x bx-md"></i>
                    </button>
                </div>
                <div class="mt-2">

                    <label class="form-control !m-0 w-full ">
                        <div class="label">
                            <span class="label-text">
                                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Amount</h3>
                            </span>

                        </div>
                        <div class="flex gap-x-3 items-center"> <span
                                class="text-primary font-bold bg-primary bg-opacity-10 p-3 rounded-xl uppercase text-2xl">{{
            settingsState.settings.currency }}</span><input v-model.number="amount" type="text"
                                ref="incomeAmountTarget" placeholder="0"
                                class="input !p-0 !rounded-none focus:!border-b-0 focus:!border-t-0 focus:!border-l-0 focus:!border-r-0  focus:!ring-0 focus:!outline-none   w-full font-bold  text-5xl placeholder:text-primary placeholder:opacity-60" />
                        </div>

                    </label>
                </div>
                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Category</h3>
                <p class="opacity-70 text-sm">Choose only one</p>
                <div class="mt-4 gap-2 flex flex-wrap ">

                    <div v-for="item, i in incomeCategories" :key="i" @click="() => {
            chosenCategory = chosenCategory === item.name ? 'none' : item.name
        }" :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                        class="p-1 px-2 rounded-lg cursor-pointer border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-medium flex items-center justify-center gap-x-2 text-md transition-all duration-150 capitalize font-head">


                        <i :class='`${iconList[incomeCategories[item.name].icon].icon} !opacity-70  bx-sm`'></i>
                        <span>{{ item.name }}</span>
                    </div>

                </div>
                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Notes </h3>
                <div class="my-3">
                    <textarea class="textarea rounded-2xl textarea-bordered w-full h-24" v-model="note"
                        placeholder="notes"></textarea>
                </div>
                <transition-expand>
                    <div class=" my-3 p-2 rounded-xl text-error bg-error-content  flex gap-x-2 font-bold items-center text-base"
                        v-if="errorMessages">
                        <i class="bx bx-error-circle bx-sm"></i> {{ errorMessages }}
                    </div>
                </transition-expand>
                <button class="btn btn-primary font-head w-full rounded-2xl mx-auto"
                    @click="addTransacton('income')">Add
                    Income</button>
            </div>
        </div>
        <div v-if="currentPopover === '#expense'"
            class="   w-full bg-base-100 rounded-t-3xl h-[90%] p-6 overflow-scroll " id="expense"
            style="transform: translateY(1200px);">
            <div>
                <div
                    class="flex items-center justify-end fixed w-full px-6 pt-3 bg-base-100 top-0 left-0 right-0 rounded-t-3xl z-10 ">

                    <button @click="hidePopover(currentPopover)" class="btn btn-ghost btn-circle">
                        <i class="bx bx-x bx-md"></i>
                    </button>
                </div>
                <div class="mt-2">

                    <label class="form-control w-full ">
                        <div class="label">
                            <span class="label-text">
                                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Amount</h3>
                            </span>

                        </div>
                        <div class="flex gap-x-3 items-center"> <span
                                class="text-primary font-bold bg-primary bg-opacity-10 p-3 text-3xl rounded-xl uppercase">{{
            settingsState.settings.currency }}</span><input v-model="amount" type="text"
                                ref="expenseAmountTarget" placeholder="0"
                                class="input !p-0 !rounded-none focus:!border-b-0 focus:!border-t-0 focus:!border-l-0 focus:!border-r-0  focus:!ring-0 focus:!outline-none   w-full font-bold  text-5xl placeholder:text-primary placeholder:opacity-60" />
                        </div>

                    </label>
                </div>
                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Category</h3>
                <p class="opacity-70 text-sm">Choose only one</p>
                <div class="mt-4  gap-2 flex flex-wrap w-full">
                    <div v-for="item, i in expenseCategories" :key="i">
                        <div @click="chosenCategory = chosenCategory === item.name ? 'none' : item.name"
                            :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                            class="p-1 px-2 rounded-lg cursor-pointer border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-medium font-head flex items-center gap-x-2 capitalize transition-all duration-150">

                            <i :class='`${iconList[expenseCategories[item.name].icon].icon} !opacity-70  bx-sm`'></i>
                            <span class='text-md'>{{ item.name }}</span>


                        </div>
                    </div>
                </div>
                <h3 class="font-bold text-xl mt-6 opacity-80 font-head">Notes</h3>
                <div class="my-3">
                    <textarea v-model="note" class="textarea rounded-2xl textarea-bordered w-full h-24"
                        placeholder="notes"></textarea>
                </div>
                <transition-expand>
                    <div class=" my-3 p-2 rounded-xl text-error bg-error-content  flex gap-x-2 font-bold items-center text-base"
                        v-if="errorMessages">
                        <i class="bx bx-error-circle bx-sm"></i> {{ errorMessages }}
                    </div>
                </transition-expand>
                <button @click="addTransacton('expense')"
                    class="btn btn-primary w-full rounded-2xl font-head mx-auto">Add
                    Expense</button>
            </div>

        </div>
    </div>
</template>