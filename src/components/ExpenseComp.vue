<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
const props = defineProps({
    expense: {
        type: Number, required: true
    }
});

</script>
<template>
    <div class="bg-error bg-opacity-10  p-3  rounded-2xl w-full  md:max-w-xl  ">
        <div>
            <h2 class="font-semibold m-0 !leading-none font-head text-2xl text-error  md:text-4xl">
                <small class="text-base">XAF</small> {{ numToSummary(props.expense) }}
            </h2>
            <p class=" opacity-70 text-md text-error"> Expense</p>
        </div>

    </div>
</template>