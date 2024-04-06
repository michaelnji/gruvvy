import { categories } from "./categories";

// this is just dummy temporary data, will be replaced with actual data
export const dummy = {
    transactions: [
        {
            amount: 200920,
            category: categories.expense.food,
            type: 'expense',
            date: new Date(),
            id: 'tntrhbrtdgbny',

        },
        {
            amount: 20920,
            category: categories.expense.crypto,
            type: 'expense',
            date: new Date(),
            id: 'tntrhbrbny',

        },
        {
            amount: 205920,
            category: categories.income.scholarship,
            type: 'income',
            date: new Date(),
            id: 'tntrhbsawfdbny',

        },
        {
            amount: 2275,
            category: categories.expense.transport,
            type: 'expense',
            date: new Date(),
            id: 'fr',
            note: 'Mystery of the Ringmaster Imagine us in Heaven The Saga of the Sphinx Secret of the three-inch visitorHow to outfox a billionaire The edge of dawn'

        },
        {
            amount: 21275,
            category: categories.income.gift,
            type: 'income',
            date: new Date(),
            id: 'f09r',
            note: 'Mystery of the Ringmaster Imagine us in Heaven The Saga of the Sphinx Secret of the three-inch visitorHow to outfox a billionaire The edge of dawn'

        },

    ]
}
