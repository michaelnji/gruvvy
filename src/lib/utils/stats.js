import { categoriesData } from '@/lib/data/categories'
import { getDate } from 'date-fns'


export function filterTransactionsByDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Filter transactions within the specified date range
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= start && transactionDate <= end
  })

  return filteredTransactions
}

// extracts and formats the unique dates/days of the given array of transactions, many with the same date
//? used to generate days for the x-axis of the chart (income & expense)
export function extractDatesFromData(data, type) {
  let dates = []
  let days = []
  for (const item in data) {
    if (data[item].type === type) {
      dates.push(new Date(data[item].date).toDateString())
      days.push(getDate(new Date(data[item].date)))
    }
  }
  dates = [...new Set(dates)]
  days = [...new Set(days)]

  return {
    ISODates: dates,
    days
  }
}

export function extractAmountsAndDatesFromData(data, type, dates) {
  let amounts = []
  for (const item in data) {
    if (data[item].type === type) {
      for (const date in dates) {
        if (new Date(dates[date]).toDateString() === new Date(data[item].date).toDateString()) {
          amounts.push({ date: dates[date], amount: data[item].amount })
        }
      }
    }
  }
  const temp = amounts
  amounts = []
  for (const date in dates) {
    let counter = 0
    for (const item in temp) {
      if (new Date(temp[item].date).toDateString() === new Date(dates[date]).toDateString()) {
        if (temp[item].amount) counter = counter + temp[item].amount
        else {
          counter = temp[item].amount
        }
      }
    }

    amounts.push({ date: dates[date], amount: counter })
  }
  return amounts
}
export function extractAmountsFromData(data, type, dates) {
  let amounts = []
  for (const item in data) {
    if (data[item].type === type) {
      for (const date in dates) {
        if (new Date(dates[date]).toDateString() === new Date(data[item].date).toDateString()) {
          amounts.push({ date: dates[date], amount: data[item].amount })
        }
      }
    }
  }
  const temp = amounts
  amounts = []
  for (const date in dates) {
    let counter = 0
    for (const item in temp) {
      if (new Date(temp[item].date).toDateString() === new Date(dates[date]).toDateString()) {
        if (temp[item].amount) counter = counter + temp[item].amount
        else {
          counter = temp[item].amount
        }
      }
    }

    amounts.push(counter)
  }
  return amounts
}

export function getMostUsedCategory(data) {
  const categories = []
  const temp = []
  for (const item in data) {
    temp.push(data[item].category.name)
  }
  const uniqueCategories = [...new Set(temp)]
  for (const category in uniqueCategories) {
    const currentCategory = uniqueCategories[category]
    let counter = 0
    let amount = 0
    for (const k in data) {
      const element = data[k]
      if (element.category.name === currentCategory) {
        counter = counter + 1
        amount = amount + element.amount
      }
    }
    categories.push({
      name: categoriesData.expense[currentCategory] ?? categoriesData.income[currentCategory],
      amount,
      timesAppeared: counter
    })
  }

  for (const category in categories) {
    for (const item in categories) {
      if (categories[item].timesAppeared < categories[category].timesAppeared) {
        const temp = categories[category]
        categories[category] = categories[item]
        categories[item] = temp
      }
    }
  }

  return categories
}

export function sortDatesDescending(dates) {
  return dates.sort((a, b) =>
    new Date(b).toLocaleString() > new Date(a).toLocaleString() ? 1 : -1
  )
}
