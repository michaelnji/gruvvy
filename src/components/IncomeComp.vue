<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
import { useSettings } from '@/stores/settings';
const settingsState = useSettings();
const props = defineProps({
    income: {
        type: Number, required: true
    }
});

</script>
<template>
    <div class="bg-success-content border border-success border-opacity-20   p-3 rounded-2xl w-full  md:max-w-xl  ">
        <div>
            <h2 class="font-semibold !m-0 !leading-none font-head text-2xl  text-success md:text-4xl">
                <small class="text-base uppercase">{{ settingsState.settings.currency }}</small> {{
                    numToSummary(props.income) }}
            </h2>
            <span class=" opacity-70 text-md text-success"> Income</span>
        </div>

    </div>
</template>