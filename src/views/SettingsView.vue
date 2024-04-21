<script setup>
import { ref } from 'vue'
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterLink } from 'vue-router';

const title = ref('Settings');
const themeState = useTheme();
const { theme } = storeToRefs(themeState);
</script>
<template>
    <main class="min-h-screen">
        <nav class="p-3 bg-base-200 flex items-center gap-x-3">
            <RouterLink to="/" class="btn btn-ghost btn-circle">
                <i class="bx bx-chevron-left bx-md"></i>
            </RouterLink>
            <h2 class="font-bold text-2xl text-center w-full">{{ title }}</h2>
        </nav>
        <div class="mt-6 ">
            <h2 class="font-semibold px-6 text-2xl">General</h2>
            <div class='mt-3'>
                <div class=" bg-base-200 p-6">
                    <h2 class=" text-base font-bold  flex items-center gap-x-1"><i
                            class="bx bx-palette bx-sm text-primary"></i> Theme</h2>
                    <div class="mt-4   grid grid-cols-2 gap-2">

                        <button @click="themeState.setTheme('desert')"
                            class="btn rounded-2xl text-xs bg-[#fcfaea] text-[#955613] border-[#955613]">
                            Desert
                            <i class="bx bx-check bx-sm" v-if="theme === 'desert'"></i>
                        </button>
                        <button @click="themeState.setTheme('forest')"
                            class="btn rounded-2xl text-xs bg-[#e0f7d0] text-[#44951b] border-[#44951b]">
                            forest
                            <i class="bx bx-check bx-sm" v-if="theme === 'forest'"></i>
                        </button>
                        <button @click="themeState.setTheme('amethyst')"
                            class="btn rounded-2xl text-xs bg-[#eed6f8] text-[#bd5adb] border-[#bd5adb]">
                            Amethyst
                            <i class="bx bx-check bx-sm" v-if="theme === 'amethyst'"></i>
                        </button>
                        <button @click="themeState.setTheme('nord')"
                            class="btn rounded-2xl text-xs bg-[#95c2cb] text-[#3d6d7d] border-[#3d6d7d]">
                            Nord
                            <i class="bx bx-check bx-sm" v-if="theme === 'nord'"></i>
                        </button>
                        <button @click="themeState.setTheme('midnight')"
                            class="btn rounded-2xl text-xs bg-[#fff] text-[#000] border-[#000]">
                            midnight
                            <i class="bx bx-check bx-sm" v-if="theme === 'midnight'"></i>
                        </button>
                        <button disabled class="btn rounded-2xl bg-[#95c2cb] text-[#3d6d7d] border-[#3d6d7d]">
                            more coming
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
