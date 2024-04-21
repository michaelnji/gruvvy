<script setup>
import Transaction from '@/components/TransactionComp.vue';
import SearchIllustration from '@/components/illustrations/searchIllustration.vue';
defineProps({
    transactions: { required: true }
});

</script>

<template>
    <div v-if="transactions.length > 0" class="grid gap-3">
        <Transaction v-for="item in transactions" :key="item.id" :transaction="item">
        </Transaction>

    </div>
    <div v-if="transactions.length <= 0" class="">
        <SearchIllustration />
        <h2 class="font-bold  text-2xl text-center opacity-40">No transactions yet</h2>
        <!-- <img src="/search.svg" class="w-full max-w-52 md:max-w-sm m-0" alt=""> -->
    </div>
</template>
