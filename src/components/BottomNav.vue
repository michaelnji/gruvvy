<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="btm-nav border-t r-b border-primary border-opacity-20 !py-5">
        <RouterLink to="/" class="group" exactActiveClass="text-primary *:bg-base-300">
            <i class="pi pi-home text-3xl py-2 px-6 rounded-full group-hover:bg-base-300 transition duration-300"></i>
        </RouterLink>
        <RouterLink to="/stats" class=" group" exactActiveClass="text-primary *:bg-base-200">
            <i
                class="pi pi-chart-line text-3xl py-2 px-6 rounded-full group-hover:bg-base-200 transition duration-200"></i>
        </RouterLink>
        <RouterLink to="/settings" class=" group" exactActiveClass="text-primary *:bg-base-300">
            <i
                class="pi pi-cog text-3xl hover:pi-spin py-2 px-6 rounded-full group-hover:bg-base-300 transition duration-300"></i>
        </RouterLink>
    </div>
</template>