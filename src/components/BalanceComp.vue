<script setup>
import AddTransactionComp from '@/components/AddTransactionComp.vue';
import { numToSummary } from '@/lib/scripts/numberFunctions';
// balance of the user, passed as a prop
const props = defineProps({
    balance: {
        type: Number, required: true
    }
});

</script>
<template>
    <div
        class=" p-6 border border-base-300 bg-base-200  rounded-3xl w-full  md:max-w-xl  flex gap-x-2 items-center justify-between">
        <div>
            <h2 class=" font-black m-0 !leading-none font-head text-5xl md:text-6xl">
                <small class="text-lg">XAF</small> {{ numToSummary(props.balance) }}
            </h2>
            <p class="mt-0.5 !opacity-70 text-lg">Account Balance</p>

        </div>
        <!-- <div class="p-3 rounded-full bg-base-300">
            <i class="pi pi-wallet text-2xl text-primary "></i>
        </div> -->
    </div>
</template>