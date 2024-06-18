<!-- component to prompt user to install app -->
<script setup>
import anime from 'animejs';
import { onMounted } from 'vue';
const emit = defineEmits(['close'])
onMounted(() => {
    anime({
        targets: '#prompt-h',
        translateY: 0,
        easing: 'easeOutElastic(2,2)',
        duration: 500,
    });
})
function hidePrompt() {
    anime({
        targets: '#prompt-h',
        translateY: '-300px',
        easing: 'easeOutElastic(2,2)',
        duration: 500

    });
    anime({
        targets: '.prompt-overlay',
        opacity: 0,
        easing: 'easeOutElastic(2,2)',
        duration: 300,
        delay: 450

    });
    setTimeout(() => { emit('close') }, 800)

}
</script>
<template>
    <div @click.self="hidePrompt"
        class="fixed w-svw h-dvh top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 p-4 z-50 prompt-overlay">
        <div class="rounded-2xl p-6 bg-base-200 text-center shadow-2xl" id="prompt-h"
            style="transform: translateY(-300px);">
            <!--  -->
            <h2 class="font-head text-2xl font-bold">Install PayTrack?</h2>
            <p class=" mt-2 opacity-85 text-center">This app can be installed and used offline as a standalone app.</p>
            <button class="mt-4 btn font-head btn-primary rounded-xl prompt-btn w-full">
                Install</button>
            <button class="mt-2 font-head btn bg-primary-content text-primary rounded-xl w-full"
                @click.slef="hidePrompt">
                No Thanks</button>
        </div>
    </div>
</template>