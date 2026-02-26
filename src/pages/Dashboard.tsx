import { useState, useEffect } from "react";
import { getTransactions, Transaction } from "@/lib/store";
import BalanceCard from "@/components/BalanceCard";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingChart from "@/components/SpendingChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-6">
      <div className="mb-5 animate-fade-in">
        <p className="text-sm text-muted-foreground">{greeting} 👋</p>
        <h1 className="text-xl font-bold">ChapaaCheck</h1>
      </div>

      <div className="space-y-5">
        <BalanceCard transactions={transactions} />
        <SpendingChart transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
