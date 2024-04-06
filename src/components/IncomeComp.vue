<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
const props = defineProps({
    income: {
        type: Number, required: true
    }
});

</script>
<template>
    <div class="bg-success bg-opacity-10  p-3 rounded-2xl w-full  md:max-w-xl  ">
        <div>
            <h2 class="font-semibold !m-0 !leading-none font-head text-2xl  text-success md:text-4xl">
                <small class="text-base">XAF</small> {{ numToSummary(props.income) }}
            </h2>
            <span class=" opacity-70 text-md text-success"> Income</span>
        </div>

    </div>
</template>