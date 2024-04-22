<script setup>
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { getItemValue } from "./lib/scripts/db";
import { useProfile } from "./stores/profile";
import { usePreferredColorScheme } from '@vueuse/core'
import { useSettings } from '@/stores/settings';
import { watch } from "vue";
const settingsState = useSettings();
const preferredColor = usePreferredColorScheme()
const themeState = useTheme();
const { theme } = storeToRefs(themeState);
const userProfile = getItemValue("pt-profile");
const profileState = useProfile();
profileState.updateProfile(userProfile);

if (settingsState.settings.theme.respectUserPreferredColorScheme) {
  if (preferredColor.value) {
    if (preferredColor.value === 'no-preference' || preferredColor.value === 'light') themeState.setTheme('desert')
    if (preferredColor.value === 'dark') themeState.setTheme('midnight')
  }
}
watch(preferredColor, () => {
  if (settingsState.settings.theme.respectUserPreferredColorScheme) {
    if (preferredColor.value) {
      if (preferredColor.value === 'no-preference' || preferredColor.value === 'light') themeState.setTheme('desert')
      if (preferredColor.value === 'dark') themeState.setTheme('midnight')
    }
  }
});
watch(settingsState, () => {
  if (settingsState.settings.theme.respectUserPreferredColorScheme) {
    if (preferredColor.value) {
      if (preferredColor.value === 'no-preference' || preferredColor.value === 'light') themeState.setTheme('desert')
      if (preferredColor.value === 'dark') themeState.setTheme('midnight')
    }
  }
  else {
    themeState.setTheme('desert')
  }
});

</script>

<template>

  <div :data-theme='theme' :class="`${theme} *:transition-none duration-150  !bg-base-100  text-base-content `">
    <div class=" md:hidden">
      <RouterView />

    </div>
  </div>

</template>
