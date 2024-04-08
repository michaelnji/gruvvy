<script setup>
import LogoComp from "@/components/LogoComp.vue";
import NavBar from "@/components/NavBar.vue";
import { profileData } from "@/lib/data/profile";
import { useProfile } from "@/stores/profile";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentTab = ref("welcome");
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

function createUser() {
	const newProfile = profileData;
	newProfile.name = name;
	newProfile.startOfWeek = chosenDay;
	newProfile.budget = budget;
	newProfile.joinDate = today;
	profileState.updateProfile(newProfile);
	router.push("/");
}
</script>
<template>
    <div class="w-full bg-base-100 p-6 grid place-items-center" v-if="currentTab === 'welcome'">
        <div class="w-full">
            <div class="w-full flex justify-center">
                <p class="btn btn-ghost text-primary text-2xl font-bold font-head">
                    <LogoComp /> Paytrack
                </p>
            </div>
            <img src="/wallet.svg" class="!m-0 object-cover" alt="" />
            <div class="mx-auto">
                <h2 class="font-bold text-4xl text-center">Track your spending habits with ease.</h2>
                <button @click="currentTab = 'setup-1'" class="btn mt-8 btn-primary uppercase w-full">Let's Go</button>
            </div>
        </div>
        <div
            class="rounded-3xl text-pretty text-opacity-80 bg-base-300 rotate-6 mt-16 p-6 mx-auto flex items-start gap-x-3">
            <i class="bx bxs-quote-alt-left bx-md"></i>
            <span class="opacity-70">
                <b> PayTrack</b> allows you to build good spending habits by showing you what you spend your
                money the most on and helps you stay on a budget.
            </span>
        </div>
    </div>
    <NavBar v-if="currentTab === 'setup-1'" />
    <div class="w-full bg-base-100 p-6 pt-24 grid place-items-center" v-if="currentTab === 'setup-1'">
        <div class="w-full">
            <h2 class="font-bold text-3xl">Let's get you setup</h2>
            <div class="mt-6 w-full rounded-3xl bg-base-300 p-6">
                <h2 class="font-medium text-lg opacity-70">What's your name?</h2>
                <label class="form-control !mt-3 w-full">
                    <input v-model.number="name" type="text"
                        class="input input-bordered w-full font-bold rounded-xl bg-base-200" />
                </label>
                <h2 class="font-medium text-lg opacity-70 mt-6">What's your monthly budget?</h2>
                <label class="form-control !mt-3 w-full">
                    <div class="flex gap-x-2">
                        <span class="text-primary-content font-bold bg-primary p-3 rounded-xl">XAF</span><input
                            v-model.number="budget" type="text" placeholder="2000"
                            class="input input-bordered bg-base-200 w-full font-bold rounded-xl" />
                    </div>
                </label>
                <h2 class="font-medium text-lg opacity-70 mt-6">Beginning of the week?</h2>
                <div class="mt-3 flex gap-2 flex-wrap w-full p-3 bg-base-200 bg-opacity-60 rounded-xl">
                    <div v-for="(item, i) in potentialStartOfTheWeek" :key="i" @click="() => {
        chosenDay = chosenDay === item.name ? 'none' : item.name
    }
        " :class="{ '!bg-opacity-100 !text-primary-content': chosenDay === item.name }"
                        class="p-1 px-3 rounded-lg border border-primary border-opacity-60 bg-primary text-primary bg-opacity-10 font-bold flex items-center gap-x-0.5 uppercase text-sm">
                        <i v-if="chosenDay !== item.name" class="bx bx-plus"></i>
                        <i v-if="chosenDay === item.name" class="bx bx-check"></i>
                        <span>{{ item.short }}</span>
                    </div>
                </div>
            </div>
            <button @click="createUser" class="btn mt-8 btn-primary uppercase w-full">Get Started</button>
        </div>
    </div>
</template>
