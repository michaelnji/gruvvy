<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="btm-nav border-t r-b border-primary border-opacity-20 !py-5">
        <RouterLink to="/" class="group" exactActiveClass="text-primary *:bg-base-300">
            <span class="pt-1 px-6 rounded-full group-hover:bg-base-300 transition duration-300 text-3xl">

                <i class='bx bx-home bx-md'></i>
            </span>
        </RouterLink>
        <RouterLink to="/stats" class=" group" exactActiveClass="text-primary *:bg-base-200">
            <span class=" px-6 pt-1 rounded-full group-hover:bg-base-300 transition duration-300">

                <i class='bx bx-doughnut-chart bx-md'></i>
            </span>
        </RouterLink>
        <RouterLink to="/settings" class=" group" exactActiveClass="text-primary *:bg-base-300">
            <span class=" px-6 pt-1 rounded-full group-hover:bg-base-300 transition duration-300">

                <i class='bx bx-cog bx-md'></i>
            </span>
        </RouterLink>
    </div>
</template>