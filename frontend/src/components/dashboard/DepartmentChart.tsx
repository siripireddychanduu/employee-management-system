import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    department: string;
    count: number;
  }[];
}

// Custom modern tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl border border-slate-800 text-xs">
        <p className="font-semibold text-slate-400 mb-0.5">{label}</p>
        <p className="font-medium text-sm">
          Employees:{" "}
          <span className="text-blue-400 font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DepartmentChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Distribution
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Total active headcount grouped by internal departments.
        </p>
      </div>

      <div className="w-full h-[300px] text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            {/* Soft, clean horizontal grids only */}
            <CartesianGrid
              stroke="#f1f5f9"
              vertical={false}
              strokeDasharray="4"
            />

            <XAxis
              dataKey="department"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              allowDecimals={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#f8fafc", radius: 6 }}
            />

            {/* Premium solid brand color block with elegant curved crown */}
            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
