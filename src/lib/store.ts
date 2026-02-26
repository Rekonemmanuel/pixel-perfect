export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
}

const TRANSACTIONS_KEY = "chapaacheck_transactions";
const BUDGETS_KEY = "chapaacheck_budgets";
const SAVINGS_KEY = "chapaacheck_savings";

export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addTransaction = (t: Omit<Transaction, "id">): Transaction => {
  const transactions = getTransactions();
  const newT = { ...t, id: crypto.randomUUID() };
  transactions.unshift(newT);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  return newT;
};

export const deleteTransaction = (id: string) => {
  const transactions = getTransactions().filter((t) => t.id !== id);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getBudgets = (): Budget[] => {
  const data = localStorage.getItem(BUDGETS_KEY);
  return data ? JSON.parse(data) : [
    { category: "Food", limit: 5000 },
    { category: "Transport", limit: 3000 },
    { category: "Entertainment", limit: 2000 },
    { category: "Shopping", limit: 4000 },
    { category: "Other", limit: 3000 },
  ];
};

export const saveBudgets = (budgets: Budget[]) => {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const getSavingsGoal = (): number => {
  return Number(localStorage.getItem(SAVINGS_KEY)) || 10000;
};

export const setSavingsGoal = (amount: number) => {
  localStorage.setItem(SAVINGS_KEY, String(amount));
};

export const EXPENSE_CATEGORIES = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Education", "Health", "Other"];
export const INCOME_CATEGORIES = ["Allowance", "Part-time Job", "Freelance", "Gift", "Other"];

export const getCategoryEmoji = (cat: string): string => {
  const map: Record<string, string> = {
    Food: "🍔", Transport: "🚌", Entertainment: "🎮", Shopping: "🛍️",
    Bills: "💡", Education: "📚", Health: "💊", Other: "📦",
    Allowance: "💰", "Part-time Job": "💼", Freelance: "💻", Gift: "🎁",
  };
  return map[cat] || "📦";
};
