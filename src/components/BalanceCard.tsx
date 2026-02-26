import { TrendingUp, TrendingDown } from "lucide-react";
import { Transaction } from "@/lib/store";

interface BalanceCardProps {
  transactions: Transaction[];
}

const BalanceCard = ({ transactions }: BalanceCardProps) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg animate-fade-in">
      <p className="text-sm font-medium opacity-80">Total Balance</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight">
        KSh {balance.toLocaleString()}
      </h2>
      <div className="mt-4 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary-foreground/20 p-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] opacity-70">Income</p>
            <p className="text-sm font-semibold">KSh {totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary-foreground/20 p-1.5">
            <TrendingDown className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] opacity-70">Expenses</p>
            <p className="text-sm font-semibold">KSh {totalExpenses.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
