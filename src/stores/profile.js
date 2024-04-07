import { profileData } from '@/lib/data/profile'
import { getOrSetItem, setItemValue } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfile = defineStore('profile', () => {
    let profile = ref(getOrSetItem('pt-profile', profileData))
    function updateProfile(profileData) {
        profile.value = profileData
        setItemValue('pt-profile', profileData)
    }
    return { profile, updateProfile }
})