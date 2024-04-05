<script setup>
import BottomNav from '@/components/BottomNav.vue';
import { useTheme } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
// theme gotten from stoe. is reactive
const themeState = useTheme();
const { theme } = storeToRefs(themeState);
</script>

<template>
  <div class="">
    <div :data-theme='theme' :class="`${theme}  !bg-base-100 dark:bg-base-300 text-base-content `">
      <div class=" md:max-w-xl md:mx-auto">
        <RouterView />
        <div class="fixed  bottom-0 left-0 right-0">
          <BottomNav />
        </div>
      </div>
    </div>
  </div>
</template>
