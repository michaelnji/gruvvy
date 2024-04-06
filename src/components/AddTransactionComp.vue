<script setup>
// import { animateEntryUp } from '@/lib/utils/animations.js'
import { categories } from '@/lib/data/categories';
import anime from 'animejs';

import { ref } from 'vue';
// import { onMounted } from 'vue'

// onMounted(() => {

// })
let chosenCategory = ref('none')

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
            @click="showPopover('#income')"><i class="bx bx-plus bx-md"></i></button>
        <button class="btn btn-outline btn-circle btn-primary text-xl " @click="showPopover('#expense')"><i
                class="bx bx-minus bx-md"></i></button>
    </div>


    <div class="fixed  bottom-0 left-0 right-0 min-h-dvh bg-black z-50 bg-opacity-60   flex items-end justify-center"
        v-if="popoverIsVisible" @click.self="hidePopover(currentPopover)">
        <div class="w-full">
            <div v-if="currentPopover === '#income'" class="rounded-t-3xl max-w-xl  h-full relative  w-full bg-base-100"
                id="income" style="transform: translateY(600px);">
                <div class=" max-h-dvh p-6 overflow-y-scroll">
                    <div class="flex items-center justify-between">
                        <h2 class="font-bold text-3xl">Add Income</h2>
                        <button @click="hidePopover(currentPopover)" class="btn btn-ghost btn-circle">
                            <i class="bx bx-x bx-md"></i>
                        </button>
                    </div>
                    <div>
                        <label class="form-control w-full ">
                            <div class="label">
                                <span class="label-text">
                                    <h3 class="font-bold text-xl mt-6 opacity-80">Amount</h3>
                                </span>

                            </div>
                            <div class="flex gap-x-2"> <span
                                    class="text-primary font-bold bg-primary bg-opacity-10 p-3 rounded-xl">XAF</span><input
                                    type="text" placeholder="2,000"
                                    class="input input-bordered w-full font-bold rounded-xl" /></div>

                        </label>
                    </div>
                    <h3 class="font-bold text-xl mt-8 opacity-80">Category</h3>
                    <p class="opacity-70">Choose one</p>
                    <div class="mt-3 flex gap-2 flex-wrap w-full p-3 bg-base-200 bg-opacity-60 rounded-xl">
                        <div v-for="item, i in categories.income" :key="i"
                            @click="chosenCategory = chosenCategory === item.name ? 'none' : item.name"
                            :class="{ '!bg-opacity-100 !text-primary-content': chosenCategory === item.name }"
                            class="p-1 px-3 rounded-lg border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-bold flex items-center gap-x-0.5 hover:bg-opacity-100 hover:text-primary-content">
                            <i v-if="chosenCategory !== item.name" class="bx bx-plus"></i>
                            <i v-if="chosenCategory === item.name" class="bx bx-check"></i>
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-xl mt-6 opacity-80">Notes</h3>
                    <div class="my-3">
                        <textarea class="textarea rounded-2xl textarea-bordered w-full" placeholder="notes"></textarea>
                    </div>
                    <button class="btn btn-primary w-full rounded-2xl mx-auto">Add Income</button>
                </div>
            </div>
            <div v-if="currentPopover === '#expense'" class="rounded-t-3xl max-w-xl px-6 py-12 h-max w-full bg-base-100"
                id="expense" style="transform: translateY(600px);">
                <h2 class="font-bold text-4xl">Add Expense</h2>
            </div>
        </div>
    </div>
</template>