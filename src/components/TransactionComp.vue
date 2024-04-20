<script setup>
import { iconList } from '@/lib/data/icons';
import { getReadableDate } from '@/lib/scripts/dateManager';
import { numToSummary } from '@/lib/scripts/numberFunctions';
import anime from 'animejs';
import { ref } from 'vue';
// import { onMounted } from 'vue'

// onMounted(() => {

// })
const props = defineProps({
    transaction: { required: true }
});

const popoverIsVisible = ref(false);
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
            <h2 class=" text-xl flex gap-x-2 items-center font-extrabold">
                <span> <small class="text-sm">XAF </small> {{ numToSummary(transaction.amount) }}</span>
                <span class="badge !rounded-xl badge-success badge-outline badge-sm"
                    v-if="transaction.type === 'income'">inc</span>
                <span class="badge !rounded-lg badge-error badge-outline badge-sm"
                    v-if="transaction.type === 'expense'">exp</span>
            </h2>
            <!-- <p class=" opacity-70  ">{{ getReadableDate(transaction.date) }}</p> -->
        </div>
        <div
            class="rounded-xl bg-base-300  p-1.5 px-2 flex !items-center capitalize text-md gap-1 !text-opacity-70 font-head">
            <i :class='`${iconList[transaction.category.icon].icon} !opacity-70  !bx-sm`'></i>
            {{ transaction.category.name }}
        </div>
    </div>

    <div class="fixed  bottom-0 left-0 right-0 h-dvh bg-black z-50 bg-opacity-60  flex items-end justify-center"
        v-if="popoverIsVisible" @click.self="hidePopover">
        <div class="rounded-t-3xl max-w-xl   w-full bg-base-100" :id="transaction.id"
            style="transform: translateY(600px);">
            <div class="max-h-dvh p-6 overflow-y-scroll">
                <div class="flex items-center justify-between">
                    <div></div>
                    <button @click="hidePopover()" class="btn btn-ghost btn-circle">
                        <i class="bx bx-x bx-md"></i>
                    </button>
                </div>
                <p class="text-lg font-semibold opacity-70 py-1 px-3 mb-1 rounded-xl bg-opacity-10 max-w-max"
                    :class="{ 'text-success bg-success': transaction.type === 'income', 'text-error bg-error': transaction.type === 'expense' }">

                    <span v-if="transaction.type === 'income'">+</span>
                    <span v-if="transaction.type === 'expense'">-</span>
                    {{ transaction.type }}

                </p>
                <h2 class="font-black text-5xl font-head !leading-none mb-4"><small>XAF </small>{{
        numToSummary(transaction.amount) }}
                </h2>
                <div class="w-full flex items-center gap-3">
                    <span
                        class="font-semibold text-lg text-primary bg-primary bg-opacity-10 py-1 px-3 rounded-xl flex items-center gap-x-2 capitalize"><i
                            :class='`${iconList[transaction.category.icon].icon} !opacity-70 text-xl`'></i>{{
        transaction.category.name
    }}</span>
                    <span
                        class="font-semibold text-lg text-secondary bg-secondary bg-opacity-10 py-1 px-3 rounded-lg capitalize flex gap-2 items-center max-w-max">

                        <span> {{
            getReadableDate(new Date(transaction.date))
                            }}</span></span>
                </div>
                <div class="mt-8 text-pretty" v-if="transaction.note">
                    <h2 class="font-black text-3xl mb-2">Note</h2>
                    <div class="p-6 rounded-3xl bg-base-200 text-lg font-medium font-head ">
                        <p class="opacity-80">{{ transaction.note }}</p>
                    </div>
                </div>
                <div class="mt-8" v-if="!transaction.note">
                    <h2 class="font-black font-head opacity-25 text-3xl mb-2">No Note</h2>

                </div>
            </div>
        </div>
    </div>
</template>