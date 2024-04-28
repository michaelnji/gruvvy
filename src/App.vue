<script setup>
import { useTheme } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { getItemValue } from "./lib/scripts/db";
import { useProfile } from "./stores/profile";
import { usePreferredColorScheme } from '@vueuse/core'
import { useSettings } from '@/stores/settings';
import { watch } from "vue";
import InstallPrompterComp from '@/components/installPrompterComp.vue'
import { onMounted } from "vue";
import { ref } from "vue";
import anime from 'animejs'
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
      installEvent = event;
      showPrompt.value = true;

      anime({
        targets: '#prompt-h',
        translateY: '0px',
        easing: 'easeOutElastic(2,2)',
        duration: 400,
      });

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
      }, 400);
    });


  }

});
</script>

<template>

  <div :data-theme='theme' :class="`${theme} *:transition-none duration-150  !bg-base-100  text-base-content `">
    <div class=" md:hidden">
      <InstallPrompterComp v-if="showPrompt" />
      <RouterView />

    </div>
  </div>

</template>
