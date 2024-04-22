<script setup>
import LogoComp from "@/components/LogoComp.vue";
import UserIllustration from '@/components/illustrations/userIllustration.vue'
import NavBar from "@/components/NavBar.vue";
import { profileData } from "@/lib/data/profile";
import { useProfile } from "@/stores/profile";
import anime from 'animejs';
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const errorMessages = ref("");
const router = useRouter();
const chosenDay = ref("none");
let name;
let budget;
const today = new Date();
const potentialStartOfTheWeek = [
    { name: "Saturday", short: "sat" },
    { name: "Sunday", short: "sun" },
    { name: "Monday", short: "mon" },
];
const profileState = useProfile();
const { profile } = storeToRefs(profileState);

if (profile.value) {
    router.push('/')
}

function createUser() {
    if (!Number.isNaN(Number.parseInt(name)) || !name || name.length <= 1) {
        errorMessages.value = "Name is invalid.";
        return;
    }
    if (Number.isNaN(budget) || !budget) {
        errorMessages.value = "Budget is invalid.";
        return;
    }
    if (Number.parseInt(budget) <= 10000) {
        errorMessages.value = "Budget must be more than 10,000.";
        return;
    }
    if (chosenDay.value === "none") {
        errorMessages.value = "Please choose a day";
        return;
    }

    errorMessages.value = ''
    const newProfile = profileData;
    newProfile.name = name.toString();
    newProfile.startOfWeek = chosenDay;
    newProfile.budget = Number.parseInt(budget);
    newProfile.joinDate = today;
    profileState.updateProfile(newProfile);
    router.push("/");
}
onMounted(() => {
    y.value = 0
    anime({
        targets: '.setup',
        opacity: 1,
        scale: {
            value: 1,

        },
        duration: 500,
        easing: 'easeOutElastic(2,2)',
    })
});

</script>
<template>

    <NavBar />
    <div class="w-full min-h-screen bg-base-100 p-4 pt-0 setup opacity-0 grid place-items-center"
        style="transform: scale(.98);">
        <div class="w-[80%]">
            <UserIllustration />
        </div>
        <div class="w-full">
            <h2 class="font-bold font-head text-center text-3xl">Let's get going</h2>
            <div class="mt-6 w-full rounded-3xl bg-base-200 p-6">
                <h2 class="font-medium  text-lg opacity-70">What's your name?</h2>
                <label class="form-control !mt-3 w-full">
                    <input v-model="name" type="text"
                        class="input input-bordered w-full font-bold rounded-xl bg-base-100 font-head" />
                </label>
                <h2 class="font-medium  text-lg opacity-70 mt-6">What's your monthly budget?</h2>
                <label class="form-control !mt-3 w-full">
                    <div class="flex gap-x-2">
                        <span
                            class="text-primary-content font-bold bg-primary p-3 rounded-xl uppercase">XAF</span><input
                            v-model.number="budget" type="text" placeholder="2000"
                            class="input input-bordered text-2xl bg-base-100 w-full font-bold rounded-xl font-head" />
                    </div>
                </label>
                <h2 class="font-medium text-lg opacity-70 mt-6 ">When does your week start?</h2>
                <div class="mt-3 flex gap-2 flex-wrap w-full">
                    <div v-for="(item, i) in potentialStartOfTheWeek" :key="i" @click="() => {
                        chosenDay = chosenDay === item.name ? 'none' : item.name
                    }
                        " :class="{ '!bg-opacity-100 !text-primary-content': chosenDay === item.name }"
                        class="p-1 font-head cursor-pointer px-3 rounded-lg border border-primary border-opacity-60 bg-primary bg-opacity-10 font-bold flex items-center gap-x-0.5 uppercase text-base">

                        <i v-if="chosenDay === item.name" class="bx bx-check bx-sm"></i>
                        <span>{{ item.short }}</span>
                    </div>
                </div>
            </div>
            <transition-expand>
                <div class=" my-3 p-2 rounded-xl text-error bg-error-content  flex gap-x-2  text-base font-semibold"
                    v-if="errorMessages">
                    <i class="bx bx-error-circle bx-sm"></i> {{ errorMessages }}
                </div>
            </transition-expand>
            <button @click="createUser" class="btn mt-4 btn-primary uppercase w-full font-head">Get Started</button>
        </div>
    </div>
</template>
