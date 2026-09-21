import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3f7fd1", "#3aa876", "#f2a93b", "#e5484d", "#8a7fd8", "#4bb3c9"];

export default function ExtensionChart({ extensions }) {
    const chartData = Object.entries(extensions).map(([extension, count]) => ({
        name: extension.toUpperCase(),
        value: count,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
