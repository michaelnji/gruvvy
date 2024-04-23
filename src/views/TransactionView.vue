<script setup>
import { iconList } from '@/lib/data/icons';
import { getReadableDate } from '@/lib/scripts/dateManager';
import { numToSummary } from '@/lib/scripts/numberFunctions';
import anime from 'animejs';
import { watch, onMounted, onBeforeUnmount } from 'vue';
import { useTransactions } from '@/stores/transactions';
import { storeToRefs } from 'pinia';
import { RouterLink, useRoute, onBeforeRouteLeave, useRouter } from 'vue-router';
import { useSettings } from '@/stores/settings';

const settingsState = useSettings();
const route = useRoute()
const router = useRouter()
const transactionsState = useTransactions()
const { transactions } = storeToRefs(transactionsState)
let transaction = transactions.value.filter(x => x.id === route.params.id)[0];
onMounted(() => {
    anime({
        targets: `#${transaction.id}`,
        translateY: '0px',
        easing: 'easeOutElastic(2,2)',
        duration: 500

    });
    anime({
        targets: ".t-overlay",
        opacity: '1',
        easing: 'easeOutElastic(2,2)',
        duration: 500

    });
});
watch(route, () => {
    transaction = transactions.value.filter(x => x.id === route.params.id)[0];
    anime({
        targets: `#${transaction.id}`,
        translateY: '0px',
        easing: 'easeOutElastic(2,2)',
        duration: 500,


    });
})
onBeforeUnmount(() => {
    anime({
        targets: `#${transaction.id}`,
        translateY: '600px',
        easing: 'easeOutElastic(2,2)',
        duration: 500

    });
});
</script>

<template>
    <main>

        <div @click.self="router.push('/')"
            class="fixed  bottom-0 left-0 right-0 h-dvh bg-base-300 z-50 bg-opacity-80 opacity-0  flex items-end justify-center t-overlay">
            <div class="rounded-t-3xl max-w-xl h-max max-h-[90%] overflow-y-scroll   w-full bg-base-100"
                :id="transaction.id" style="transform: translateY(600px);">
                <div class=" p-6 ">
                    <div class="flex items-center justify-between">
                        <div></div>
                        <RouterLink to="/" class="btn btn-ghost btn-circle">
                            <i class="bx bx-x bx-md"></i>
                        </RouterLink>
                    </div>
                    <p class="text-base font-semibold opacity-70 py-1 px-3 mb-1 rounded-xl  max-w-max"
                        :class="{ 'text-success bg-success-content': transaction.type === 'income', 'text-error bg-error-content': transaction.type === 'expense' }">

                        <span v-if="transaction.type === 'income'">+</span>
                        <span v-if="transaction.type === 'expense'">-</span>
                        {{ transaction.type }}

                    </p>
                    <h2 class="font-black mt-4 text-5xl font-head !leading-none mb-4  uppercase"><small
                            class="text-3xl">{{
            settingsState.settings.currency }} </small> {{
            numToSummary(transaction.amount) }}
                    </h2>
                    <div class="w-full flex items-center gap-3">
                        <span
                            class="font-semibold text-base text-primary bg-primary bg-opacity-10 py-1 px-3 rounded-xl flex items-center gap-x-2 capitalize"><i
                                :class='`${iconList[transaction.category.icon].icon} !opacity-70`'></i>{{
            transaction.category.name
        }}</span>
                        <span
                            class="font-semibold text-base text-secondary bg-secondary bg-opacity-10 py-1 px-3 rounded-lg capitalize flex gap-2 items-center max-w-max">

                            <span> {{
                getReadableDate(new Date(transaction.date))
                                }}</span></span>
                    </div>
                    <div class="mt-8 text-pretty" v-if="transaction.note">
                        <h2 class="font-black text-3xl mb-2">Note</h2>
                        <div class="p-6 rounded-3xl bg-base-200 text-lg font-medium font-head ">
                            <p class="opacity-80 line-clamp-3">{{ transaction.note }}</p>
                        </div>
                    </div>
                    <div class="mt-8" v-if="!transaction.note">
                        <h2 class="font-black font-head opacity-25 text-3xl mb-2">No Note</h2>

                    </div>
                    <div class="mt-8 grid grid-cols-2 gap-2">
                        <button class="btn join-item btn-error"><i class="bx bx-trash"></i>Delete</button>
                        <button class="btn btn-primary join-item"><i class="bx bx-copy"></i>copy id</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>