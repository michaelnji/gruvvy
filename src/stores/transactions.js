import { getOrSetItem, setItemValue } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { idGen } from '@/lib/utils/secure'

export const useTransactions = defineStore('transactions', () => {


    const transactions = ref(getOrSetItem('pt-transactions', []))
    function addTransaction(transaction) {
        const mutatedTransaction = {
          ...transaction,
          id: idGen()
        }
        transactions.value.push(mutatedTransaction)
        return setItemValue('pt-transactions', transactions.value)
    }
    function filteredTransactions() {

        return [...transactions.value].reverse().filter((x, i) => i < 4)
    }
    return { transactions, addTransaction, filteredTransactions }
})