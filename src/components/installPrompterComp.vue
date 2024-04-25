<script setup>
import anime from 'animejs';
import { onMounted } from 'vue';

onMounted(() => {

    anime({
        targets: '.prompt',
        translateY: '0px',
        easing: 'easeOutElastic(2,2)',
        duration: 500

    });
});
</script>
<template>
    <div class="fixed w-svw h-dvh top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 p-4 z-50 prompt-overlay">
        <div class="rounded-2xl p-6 bg-base-200 shadow-2xl prompt" style="transform: translateY(-200px);">
            <h2 class="font-head text-2xl font-bold">Install PayTrack?</h2>
            <p class=" mt-2 opacity-85">This app can be installed and used offline as a standalone app.</p>
            <button class="mt-4 btn btn-primary rounded-xl prompt-btn w-full">
                Install</button>
        </div>
    </div>
</template>