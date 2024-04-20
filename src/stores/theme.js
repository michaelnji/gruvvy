import { getOrSetItem, setItemValue } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTheme = defineStore('theme', () => {

    /** @type {{value:string}} */
    const theme = ref(getOrSetItem('pt-theme', 'desert'))

    function setTheme(val) {
        setItemValue('pt-theme', val)
        theme.value = val
    }
    return { theme, setTheme }
})