<script setup>
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { getItemValue } from "./lib/scripts/db";
import { useRouter } from "vue-router";
import { useProfile } from "./stores/profile";

const router = useRouter();
const themeState = useTheme();
const { theme } = storeToRefs(themeState);
const userProfile = getItemValue("pt-profile");
if (!userProfile) {
	router.push("/setup");
}
const profileState = useProfile();
profileState.updateProfile(userProfile);
</script>

<template>
  <div class="">
    <div :data-theme='theme' :class="`${theme}  !bg-base-100 dark:bg-base-300 text-base-content `">
      <div class=" md:max-w-xl md:mx-auto">
        <RouterView/>

      </div>
    </div>
  </div>
</template>
