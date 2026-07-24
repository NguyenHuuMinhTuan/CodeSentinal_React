import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#3b82f6"
];

export default function SeverityChart({ data }) {

    const counter = {
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0
    };

    data.findings.forEach(item => {

        counter[item.severity]++;

    });

    const chartData = Object.entries(counter).map(

        ([name, value]) => ({
            name,
            value
        })

    );

    return (

        <div className="bg-slate-800 rounded-xl p-5">

            <h2 className="text-xl font-bold mb-5">

                Severity Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        outerRadius={120}
                        label
                    >

                        {

                            chartData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Legend />

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}