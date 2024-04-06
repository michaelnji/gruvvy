<script setup>
// import { animateEntryUp } from '@/lib/utils/animations.js'
import anime from 'animejs';

import { ref } from 'vue';
// import { onMounted } from 'vue'

// onMounted(() => {

// })
let currentPopover = ref('#income')
let popoverIsVisible = ref(false)
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
    anime({
        targets: selector,
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
    <div class="mt-3 flex gap-3"> <button class="btn btn-outline btn-primary text-xl btn-circle "
            @click="showPopover('#income')"><i class="pi pi-plus"></i></button>
        <button class="btn btn-outline btn-circle btn-primary text-xl " @click="showPopover('#expense')"><i
                class="pi pi-minus"></i></button>
    </div>


    <div class="fixed  bottom-0 left-0 right-0 h-dvh bg-black z-50 bg-opacity-60  flex items-end justify-center"
        v-if="popoverIsVisible" @click="hidePopover(currentPopover)">
        <div class="w-full">
            <div v-if="currentPopover === '#income'" class="rounded-t-3xl max-w-xl px-6 py-12 h-max w-full bg-base-100"
                id="income" style="transform: translateY(600px);">
                <h2 class="font-bold text-3xl">Add Income</h2>
                <form class="mt-3">
                    <label class="form-control w-full ">
                        <div class="label">
                            <span class="label-text text-lg !opacity-70">Amount</span>

                        </div>
                        <div class="flex gap-x-2"> <span
                                class="text-primary font-bold bg-primary bg-opacity-10 p-3 rounded-xl">XAF</span><input
                                type="text" placeholder="2,000" class="input input-bordered w-full font-bold" /></div>

                    </label>
                </form>
            </div>
            <div v-if="currentPopover === '#expense'" class="rounded-t-3xl max-w-xl px-6 py-12 h-max w-full bg-base-100"
                id="expense" style="transform: translateY(600px);">
                <h2 class="font-bold text-4xl">Add Expense</h2>
            </div>
        </div>
    </div>
</template>