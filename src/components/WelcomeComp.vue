<script setup>
import LogoComp from "@/components/LogoComp.vue";
import { useProfile } from "@/stores/profile";
import anime from 'animejs';
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const profileState = useProfile();
const { profile } = storeToRefs(profileState);

if (profile.value) {
    router.push('/')
}


onMounted(() => {
    anime({
        targets: '.welcome',
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
    <div class="w-full bg-base-100 welcome opacity-0 p-6 grid place-items-center" style="transform: scale(.98);">
        <div class="w-full">
            <div class="w-full flex justify-center">
                <p class="btn btn-ghost text-primary text-2xl font-bold font-head">
                    <LogoComp /> Paytrack
                </p>
            </div>
            <img src="/wallet.svg" class="!m-0 object-cover" alt="" />
            <div class="mx-auto">
                <h2 class="font-bold text-4xl text-center font-head">Track your spending habits with ease.</h2>
                <a href="/setup" class="btn mt-8 btn-primary uppercase w-full font-head
                    
                    ">Let's Go</a>
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

</template>
