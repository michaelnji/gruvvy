<script setup>
import Transaction from '@/components/TransactionComp.vue'
defineProps({
    transactions: { required: true }
});

</script>

<template>
    <div class="grid gap-3">
        <Transaction v-for="item in transactions" :key="item.id" :transaction="item">
        </Transaction>

    </div>
</template>
