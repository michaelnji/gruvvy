<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
defineProps({
    total: {
        type: Number, required: true
    },
    current: {
        type: Number, required: true
    }

});


</script>

<template>
    <div class="mt-4 rounded-2xl w-full p-3 bg-base-200">
        <div class="flex items-center justify-between gap-2">
            <h2 class=" text-lg opacity-80"> Budget used</h2> <span class="mt-1  text-md opacity-70">
                <b>{{ numToSummary(current) }}</b> / {{ numToSummary(total) }}
            </span>
        </div>
        <progress class="progress h-4 my-1 w-full" :value='current / total * 100' max="100"></progress>

    </div>
</template>