<script setup>
import { RouterLink } from 'vue-router';
import AddTransaction from '@/components/AddTransactionComp.vue';
</script>
<template>
    <div class="btm-nav bg-base-200 amethyst:!bg-base-100 border-t  border-primary border-opacity-20 !py-11">
        <RouterLink to="/" class="group " exactActiveClass="text-primary *:bg-base-100 *:font-extrabold">
            <i class='bx bx-detail bx-sm !bg-transparent'></i>
            <span class="pt-1 px-3 rounded-full group-hover:bg-base-300 transition duration-300 text-sm">
                Overview
            </span>
        </RouterLink>
        <AddTransaction />
        <RouterLink to="/stats" class="group " exactActiveClass="text-primary *:bg-base-100 *:font-extrabold">
            <i class='bx bx-stats bx-sm !bg-transparent'></i>
            <span class="pt-1 px-3 rounded-full group-hover:bg-base-300 transition duration-300 text-sm">
                Statistics
            </span>
        </RouterLink>
        <!-- <RouterLink to="/settings" class="group " exactActiveClass="text-primary *:bg-base-100 *:font-extrabold">
            <i class='bx bx-cog bx-sm !bg-transparent'></i>
            <span class="pt-1 px-3 rounded-full group-hover:bg-base-300 transition duration-300 text-sm">
                Settings
            </span>
        </RouterLink> -->

    </div>
</template>