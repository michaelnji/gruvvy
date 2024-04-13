import { addDays } from 'date-fns'
import { idGen } from '../utils/secure'
import { categoriesData } from './categories'
import { random } from 'mathjs'

export function generateTestData(amount) {
  const data = []
  const IncomecategoriesData = ['awards', 'salary', 'allowance', 'gift']
  const ExpensecategoriesData = [
    'transit',
    'crypto',
    'food',
    'internet',
    'school',
    'shopping',
    'recreation',
    'rent',
    'subscription'
  ]
  const types = ['income', 'expense', 'income']

  for (let i = 0; i < amount; i++) {
    const type = types[Math.floor(random(0, 2))]
    let item
    if (type === 'income') {
      item = {
        type,
        id: idGen(),
        date: addDays(new Date(), i).toDateString(),
        amount: Math.floor(random(500, 5000)),
        category:
          categoriesData[type][
            IncomecategoriesData[Math.floor(random(0, IncomecategoriesData.length - 1))]
          ],
        note: ''
      }
    } else {
      item = {
        type,
        id: idGen(),
        date: addDays(new Date(), i).toDateString(),
        amount: Math.floor(random(500, 5000)),
        category:
          categoriesData[type][
            ExpensecategoriesData[Math.floor(random(0, IncomecategoriesData.length - 1))]
          ],
        note: ''
      }
    }

    data.push(item)
  }

  return data
}
