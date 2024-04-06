import { getOrSetItem } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactions = defineStore('transactions', () => {


    let transactions = ref(getOrSetItem('pt-transactions', []))

    return { transactions, }
})