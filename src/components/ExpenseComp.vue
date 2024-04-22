<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
import { useSettings } from '@/stores/settings';
const settingsState = useSettings();
const props = defineProps({
    expense: {
        type: Number, required: true
    }
});

</script>
<template>
    <div class="bg-error-content border border-error border-opacity-20   p-3  rounded-2xl w-full  md:max-w-xl  ">
        <div>
            <h2 class="font-semibold m-0 !leading-none font-head text-2xl text-error  md:text-4xl">
                <small class="text-base uppercase">{{ settingsState.settings.currency }}</small> {{
                    numToSummary(props.expense) }}
            </h2>
            <p class=" opacity-70 text-md text-error"> Expense</p>
        </div>

    </div>
</template>