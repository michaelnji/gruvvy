import { getOrSetItem, setItemValue } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTheme = defineStore('theme', () => {

    /** @type {{value:string}} */
    let theme = ref(getOrSetItem('pt-theme', 'light'))

    function setTheme(val) {
        setItemValue('pt-theme', val)
        theme.value = val
    }
    return { theme, setTheme }
})