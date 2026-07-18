import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

// Premium utility palette mapping directly to common statuses
const STATUS_COLORS: Record<string, string> = {
  Active: "#059669", // Refined Emerald
  Inactive: "#e11d48", // Refined Rose
};

const DEFAULT_COLORS = ["#3b82f6", "#64748b"];

// Consistent Tailwind-styled tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl border border-slate-800 text-xs">
        <p className="font-semibold text-slate-400 mb-0.5">{data.name}</p>
        <p className="font-medium text-sm">
          Count: <span className="text-blue-400 font-bold">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function StatusChart({ data }: Props) {
  const totalEmployees = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Employment Status
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Ratio of active vs. inactive personnel profiles.
        </p>
      </div>

      <div className="relative w-full h-[220px] flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={88}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    STATUS_COLORS[entry.name] ||
                    DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text displaying overall volume metrics inside donut ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-2xl font-black text-gray-800 tracking-tight">
            {totalEmployees}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Total
          </span>
        </div>
      </div>

      {/* Clean Custom Bottom Legend Matrix */}
      <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-4 text-xs">
        {data.map((entry, index) => {
          const color =
            STATUS_COLORS[entry.name] ||
            DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          const percentage =
            totalEmployees > 0
              ? Math.round((entry.value / totalEmployees) * 100)
              : 0;

          return (
            <div
              key={entry.name}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50/80 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-gray-600 truncate">
                  {entry.name}
                </span>
              </div>
              <span className="font-semibold text-gray-900 ml-2">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
