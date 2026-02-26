import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Transaction, getCategoryEmoji } from "@/lib/store";

interface SpendingChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(158, 64%, 36%)",
  "hsl(38, 92%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(340, 65%, 55%)",
  "hsl(270, 50%, 55%)",
  "hsl(15, 75%, 55%)",
  "hsl(180, 50%, 45%)",
  "hsl(60, 60%, 50%)",
];

const SpendingChart = ({ transactions }: SpendingChartProps) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory = expenses.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  return (
    <div className="animate-slide-up">
      <h3 className="mb-3 text-base font-semibold">Spending Breakdown</h3>
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap gap-3">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-muted-foreground">
                {getCategoryEmoji(item.name)} {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;
