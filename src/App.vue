<script setup>
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { getItemValue } from "$lib/scripts/db";
import { useProfile } from "./stores/profile";
import { usePreferredColorScheme } from '@vueuse/core'
import { useSettings } from '@/stores/settings';
import { watch } from "vue";
import InstallPrompterComp from '@/components/installPrompterComp.vue'
import { onMounted } from "vue";
import { ref } from "vue";

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
    const { theme: t } = getItemValue('pt-settings')

    if (t.respectUserPreferredColorScheme !== settingsState.settings.theme.respectUserPreferredColorScheme) {
      if (preferredColor.value) {
        if (preferredColor.value === 'no-preference' || preferredColor.value === 'light') themeState.setTheme('desert')
        if (preferredColor.value === 'dark') themeState.setTheme('midnight')
      }
    }
  }
});
const showPrompt = ref(false)
onMounted(() => {

  if ('BeforeInstallPromptEvent' in window) {

    let installEvent = null;
    const onInstall = () => {

      showPrompt.value = false;

      installEvent = null;
    };

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      showPrompt.value = true;
      installEvent = event;

      //? timeout needed to give time for prompt component to be created before accessing the prompt button (.prompt-btn)
      setTimeout(() => {
        const installButton = document.querySelector('.prompt-btn');
        installButton.addEventListener('click', async () => {
          if (!installEvent) {
            return;
          }

          installEvent.prompt();
          const result = await installEvent.userChoice;

          if (result.outcome === 'accepted') {
            onInstall();
          }
        });

        window.addEventListener('appinstalled', () => {
          onInstall();
        });
      }, 40);
    });


  }

});
</script>

<template>

  <div :data-theme='theme' :class="`${theme} *:transition-none duration-150  !bg-base-100  text-base-content `">
    <div class=" md:hidden">
      <InstallPrompterComp v-if="showPrompt" @close="showPrompt = false" />
      <RouterView />

    </div>
  </div>

</template>
