import { defaultSettings } from '@/lib/data/settings'
import { getOrSetItem, setItemValue } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettings = defineStore('settings', () => {
  let settings = ref(getOrSetItem('pt-settings', defaultSettings))

  function updateSettings(updatedSettings) {
    settings.value = updatedSettings
    setItemValue('pt-settings', updatedSettings)
  }
  return { settings, updateSettings }
})
