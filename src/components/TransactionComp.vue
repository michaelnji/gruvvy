<script setup>
import { iconList } from '@/lib/data/icons';
import { getReadableDate } from '@/lib/scripts/dateManager';
import { numToSummary } from '@/lib/scripts/numberFunctions';
// import { animateEntryUp } from '@/lib/utils/animations.js'
import anime from 'animejs';

import { ref } from 'vue';
// import { onMounted } from 'vue'

// onMounted(() => {

// })
const props = defineProps({
    transaction: { required: true }
});
let popoverIsVisible = ref(false)
function showPopover() {
    popoverIsVisible.value = true;
    setTimeout(() => {
        anime({
            targets: `#${props.transaction.id}`,
            translateY: '0px',
            easing: 'easeOutElastic(2,2)',
            duration: 500

        });
    }, 1)
}
function hidePopover() {
    anime({
        targets: `#${props.transaction.id}`,
        translateY: '600px',
        easing: 'easeOutElastic(1,2)',
        duration: 1000

    });
    setTimeout(() => {
        popoverIsVisible.value = false;
    }, 300)
}
</script>

<template>
    <div class=" bg-base-200 rounded-2xl p-3  flex items-center justify-between gap-3" @click="showPopover">
        <div>
            <h2 class=" text-2xl flex gap-x-2 items-center  font-medium">
                <span> <small>XAF </small> {{ numToSummary(transaction.amount) }}</span>
                <span class="badge !rounded-xl badge-success badge-outline badge-sm"
                    v-if="transaction.type === 'income'">inc</span>
                <span class="badge !rounded-lg badge-error badge-outline badge-sm"
                    v-if="transaction.type === 'expense'">exp</span>
            </h2>
            <p class=" opacity-70  ">{{ getReadableDate(transaction.date) }}</p>
        </div>
        <div class="rounded-xl bg-base-100  p-1.5 px-2 flex items-center capitalize text-md gap-2 !text-opacity-70">
            <i :class='`${iconList[transaction.category].icon} !opacity-70`'></i>
            {{ transaction.category }}
        </div>
    </div>

    <div class="fixed  bottom-0 left-0 right-0 h-dvh bg-black z-50 bg-opacity-60  flex items-end justify-center"
        v-if="popoverIsVisible" @click="hidePopover">
        <div class="rounded-t-3xl max-w-xl px-6 py-12 h-max w-full bg-base-100" :id="transaction.id"
            style="transform: translateY(600px);">
            <p class="text-2xl font-semibold opacity-70">{{ transaction.type }}</p>
            <h2 class="font-black text-6xl !leading-none mb-4"><small>XAF </small>{{ numToSummary(transaction.amount) }}
            </h2>
            <div class="w-full flex items-center gap-3">
                <span
                    class="font-semibold text-lg text-primary bg-primary bg-opacity-10 py-2 px-4 rounded-xl capitalize">{{
        transaction.category
    }}</span>
                <span
                    class="font-semibold text-lg text-secondary bg-secondary bg-opacity-10 py-2 px-4 rounded-lg capitalize flex gap-2 items-center max-w-max">
                    <i class="pi pi-calendar text-lg"></i>
                    <span> {{
            getReadableDate(transaction.date)
                        }}</span></span>
            </div>
            <div class="mt-8" v-if="transaction.note">
                <h2 class="font-black text-3xl mb-2">Note</h2>
                <div class="p-6 rounded-3xl bg-base-200 text-xl font-medium">
                    <p class="opacity-80">{{ transaction.note }}</p>
                </div>
            </div>
            <div class="mt-8" v-if="!transaction.note">
                <h2 class="font-black opacity-25 text-3xl mb-2">No Note</h2>

            </div>
        </div>
    </div>
</template>