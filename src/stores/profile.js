import { setItemValue } from "@/lib/scripts/db";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfile = defineStore('profile', () => {
    const profile = ref({});
    function updateProfile(profileData) {
        profile.value = profileData
        setItemValue('pt-profile', profileData)
    }
    return { profile, updateProfile }
})
