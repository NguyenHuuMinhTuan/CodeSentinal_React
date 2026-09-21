import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SEVERITY_ORDER, SEVERITY_COLOR } from "@/shared/constants/severity";

export default function SeverityChart({ findings }) {
    const counts = SEVERITY_ORDER.reduce((acc, level) => ({ ...acc, [level]: 0 }), {});
    findings.forEach((item) => {
        if (item.severity in counts) counts[item.severity] += 1;
    });

    const chartData = SEVERITY_ORDER.map((name) => ({ name, value: counts[name] }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {chartData.map((entry) => (
                        <Cell key={entry.name} fill={SEVERITY_COLOR[entry.name]} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
