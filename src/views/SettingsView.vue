<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterLink } from 'vue-router';
import anime from 'animejs';
import { watch } from 'vue';
import { useSettings } from '@/stores/settings';
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const settingsState = useSettings();
const checked = ref(settingsState.settings.theme.respectUserPreferredColorScheme)
const currency = ref(settingsState.settings.currency)
const title = ref('Settings');
const themeState = useTheme();
const { theme } = storeToRefs(themeState);

onMounted(() => {
    y.value = 0
    anime({
        targets: '.settings-page',
        opacity: 1,
        scale: {
            value: 1,

        },
        duration: 500,
        easing: 'easeOutElastic(2,2)',
    })
});

watch(checked, () => {
    settingsState.settings.theme.respectUserPreferredColorScheme = checked
    settingsState.updateSettings(settingsState.settings)
})
watch(currency, () => {
    settingsState.settings.currency = currency
    settingsState.updateSettings(settingsState.settings)
});

</script>
<template>
    <main class="min-h-screen">
        <nav class="p-3 bg-base-200 fixed top-0 left-0 right-0 w-full flex items-center gap-x-3 z-10">
            <RouterLink to="/" class="btn btn-ghost btn-circle">
                <i class="bx bx-chevron-left bx-md"></i>
            </RouterLink>
            <h2 class="font-bold text-2xl text-center w-full">{{ title }}</h2>
        </nav>
        <div class=" pt-24 pb-8 settings-page opacity-0" style="transform: scale(.98);">
            <h2 class="font-semibold px-6 text-xl">Account</h2>
            <div class='mt-3'>
                <div class=" bg-base-200 p-6 space-y-4">
                    <div class=" rounded-2xl bg-base-300 p-3 flex items-center justify-between">
                        <p class="text-sm font-medium flex items-center w-full gap-x-3"> <i
                                class="bx bx-user text-primary bx-sm"></i>Profile</p>
                        <i class="bx bx-chevron-right opacity-65 bx-md"></i>
                    </div>
                    <div class=" rounded-2xl bg-base-300 p-3 flex items-center justify-between">
                        <p class="text-sm font-medium flex items-center w-full gap-x-3"><i
                                class="bx bx-edit text-primary bx-sm"></i>Account actions</p>
                        <i class="bx bx-chevron-right opacity-65 bx-md"></i>
                    </div>
                </div>
            </div>
            <h2 class="font-semibold px-6 text-xl mt-8">General</h2>
            <div class='mt-3'>
                <div class=" bg-base-200 p-6">
                    <h2 class=" text-base font-bold  flex items-center gap-x-1"><i
                            class="bx bx-palette bx-sm text-primary"></i> Theme</h2>
                    <div class="mt-4   grid grid-cols-2 gap-2">

                        <button @click="themeState.setTheme('desert')"
                            class="btn rounded-2xl text-xs bg-[#fcfaea] text-[#955613] border-[#955613]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            Desert
                            <i class="bx bx-check bx-sm" v-if="theme === 'desert'"></i>
                        </button>
                        <button @click="themeState.setTheme('forest')"
                            class="btn rounded-2xl text-xs bg-[#e0f7d0] text-[#44951b] border-[#44951b]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            forest
                            <i class="bx bx-check bx-sm" v-if="theme === 'forest'"></i>
                        </button>
                        <button @click="themeState.setTheme('amethyst')"
                            class="btn rounded-2xl text-xs bg-[#eed6f8] text-[#bd5adb] border-[#bd5adb]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            Amethyst
                            <i class="bx bx-check bx-sm" v-if="theme === 'amethyst'"></i>
                        </button>
                        <button @click="themeState.setTheme('nord')"
                            class="btn rounded-2xl text-xs bg-[#95c2cb] text-[#3d6d7d] border-[#3d6d7d]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            Nord
                            <i class="bx bx-check bx-sm" v-if="theme === 'nord'"></i>
                        </button>
                        <button @click="themeState.setTheme('midnight')"
                            class="btn rounded-2xl text-xs bg-[#fff] text-[#000] border-[#000]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            midnight
                            <i class="bx bx-check bx-sm" v-if="theme === 'midnight'"></i>
                        </button>

                        <button @click="themeState.setTheme('white')"
                            class="btn rounded-2xl text-xs bg-[#000] text-[#fff] border-[#fff]"
                            :disabled="settingsState.settings.theme.respectUserPreferredColorScheme">
                            white
                            <i class="bx bx-check bx-sm" v-if="theme === 'white'"></i>
                        </button>
                    </div>
                    <div class="my-8 rounded-2xl bg-base-300 p-4 flex items-center justify-between">
                        <p class="text-sm  font-medium">Follow system's dark mode</p>
                        <input type="checkbox" class="toggle toggle-primary" v-model="checked" />
                    </div>
                    <h2 class="  text-base font-bold  flex items-center gap-x-1"><i
                            class="bx bx-dollar bx-sm text-primary"></i> Curency</h2>
                    <div class="mt-4 grid gap-x-3 grid-cols-2">
                        <button class="btn !grid grid-cols-2  rounded-2xl text-xs bg-base-300 text-base-content"
                            @click="currency = 'xaf'">
                            XAF
                            <transition-expand>
                                <i class="bx bx-check bx-sm" v-if="currency === 'xaf'"></i>
                            </transition-expand>
                        </button>
                        <button class="btn !grid grid-cols-2  rounded-2xl text-xs bg-base-300 text-base-content"
                            @click="currency = 'usd'">
                            USD
                            <transition-expand>
                                <i class="bx bx-check bx-sm" v-if="currency === 'usd'"></i>
                            </transition-expand>
                        </button>
                    </div>
                </div>
            </div>

            <h2 class="font-semibold px-6 text-xl mt-8">Security</h2>
            <div class='mt-3'>
                <div class=" bg-base-200 p-6">
                    <h2 class="font-semibold px-6 text-lg font-head opacity-50 flex items-center w-full gap-x-3"> <i
                            class="bx bx-lock bx-sm"></i> Coming soon</h2>
                </div>
            </div>
            <h2 class="font-semibold px-6 text-xl mt-8">About</h2>
            <div class='mt-3'>
                <div class=" bg-base-200 p-6 space-y-6">
                    <div class="  flex items-center justify-between">
                        <p class="text-sm font-medium flex items-center  gap-x-3"><i
                                class="bx bx-info-circle text-primary bx-sm"></i>App Version</p>
                        <span class="font-bold font-head">V1.0.0-3ABSEQ</span>
                    </div>
                    <div class="  flex items-center justify-between">
                        <p class="text-sm font-medium flex items-center  gap-x-3"> <i
                                class="bx bx-link-external text-primary bx-sm"></i>Github Repo</p>
                        <i class="bx bxl-github  bx-sm"></i>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
