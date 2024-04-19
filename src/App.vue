<script setup>
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { getItemValue } from "./lib/scripts/db";
import { useProfile } from "./stores/profile";

const themeState = useTheme();
const { theme } = storeToRefs(themeState);
const userProfile = getItemValue("pt-profile");
const profileState = useProfile();
profileState.updateProfile(userProfile);

</script>

<template>

  <div :data-theme='theme' :class="`${theme}  !bg-base-100 dark:bg-base-300 text-base-content `">
    <div class=" md:hidden">
      <RouterView />

    </div>
  </div>

</template>
