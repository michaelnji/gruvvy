<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
const props = defineProps({
    percentage: {
        type: Number, required: true
    },
    total: {
        type: Number, required: true
    },
    current: {
        type: Number, required: true
    }

});
console.log(props.percentage)

</script>

<template>
    <div class="mt-4 rounded-2xl w-full p-3 bg-base-200">
        <div class="flex items-center justify-between gap-2">
            <h2 class="font-head text-xl"> Budget Usage</h2> <span class="mt-1  text-lg opacity-70">
                <small>XAF</small> <b>{{ numToSummary(current) }}</b> / {{ numToSummary(total) }}
            </span>
        </div>
        <progress class="progress h-4 my-1 w-full" :value='percentage' max="100"></progress>

    </div>
</template>