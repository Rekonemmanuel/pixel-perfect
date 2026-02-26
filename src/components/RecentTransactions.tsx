import { Transaction, getCategoryEmoji } from "@/lib/store";
import { useNavigate } from "react-router-dom";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const recent = transactions.slice(0, 5);

  return (
    <div className="animate-slide-up">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent Transactions</h3>
        {transactions.length > 5 && (
          <button
            onClick={() => navigate("/transactions")}
            className="text-xs font-medium text-primary"
          >
            See all
          </button>
        )}
      </div>
      {recent.length === 0 ? (
        <div className="rounded-xl bg-card p-8 text-center">
          <p className="text-3xl">💸</p>
          <p className="mt-2 text-sm text-muted-foreground">
            No transactions yet. Tap + to add one!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recent.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm transition-all hover:shadow-md"
            >
              <span className="text-xl">{getCategoryEmoji(t.category)}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{t.description || t.category}</p>
                <p className="text-[11px] text-muted-foreground">{t.category}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === "income" ? "text-income" : "text-expense"
                }`}
              >
                {t.type === "income" ? "+" : "-"}KSh {t.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
