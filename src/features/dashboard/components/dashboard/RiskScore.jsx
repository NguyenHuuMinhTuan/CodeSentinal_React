import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import calculateRisk from "../../utils/riskCalculator";

export default function RiskScore({ data }) {

    const risk = calculateRisk(
        data.findings,
        data.totalFiles,
        data.suspiciousFiles?.length
    );


    const pickColor = (v) => {
        if (v < 20) return '#10b981'; // green
        if (v < 50) return '#3b82f6'; // blue
        if (v < 80) return '#f59e0b'; // yellow
        return '#ef4444'; // red
    };

    const color = pickColor(risk);

    return (
        <div className="bg-slate-800 rounded-xl p-8 mt-6">

            <h2 className="text-2xl font-bold mb-8">Overall Risk</h2>

            <div className="w-56 mx-auto">
                <CircularProgressbar
                    value={risk}
                    text={`${risk}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                        pathColor: color,
                        textColor: color,
                        trailColor: 'rgba(255,255,255,0.06)',
                        strokeLinecap: 'butt'
                    })}
                />
            </div>

        </div>
    );

}