import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/lib/store";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface SpendingTrendsProps {
  transactions: Transaction[];
}

const SpendingTrends = ({ transactions }: SpendingTrendsProps) => {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(now, 5 - i);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
      label: format(date, "MMM"),
    };
  });

  const data = months.map((month) => {
    const total = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          isWithinInterval(new Date(t.date), { start: month.start, end: month.end })
      )
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: month.label, expenses: total };
  });

  const hasData = data.some((d) => d.expenses > 0);
  if (!hasData) return null;

  return (
    <div className="animate-slide-up">
      <h3 className="mb-3 text-base font-semibold">Monthly Trends</h3>
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={45}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`KSh ${value.toLocaleString()}`, "Expenses"]}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(158, 64%, 36%)"
              strokeWidth={2.5}
              dot={{ fill: "hsl(158, 64%, 36%)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrends;
