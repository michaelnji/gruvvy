import { categoriesData } from '@/lib/data/categories'
import { getOrSetItem } from '@/lib/scripts/db'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategories = defineStore('categories', () => {


    let categories = ref(getOrSetItem('pt-categories', categoriesData))

    function getIncomeCategories() {
        return categories.value.income
    }
    function getExpenseCategories() {
        return categories.value.expense
    }

    return { categories, getIncomeCategories, getExpenseCategories }
})