import { idGen } from "../utils/secure";

export const profileData = {
    name: '',
    id: idGen(),
    joinDate: new Date(),
    budget: 0,
    budget_usage: 0,
    balance: 0,
    income: 0,
    expense: 0
}