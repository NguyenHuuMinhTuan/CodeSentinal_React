import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import calculateRisk from "../../utils/riskCalculator";
import { riskLevelColor } from "@/shared/constants/severity";
import "./RiskScore.scss";

export default function RiskScore({ findings, totalFiles, suspiciousCount }) {
    const risk = calculateRisk(findings, totalFiles, suspiciousCount);
    const color = riskLevelColor(risk);

    return (
        <div className="risk-score">
            <div className="risk-score__gauge">
                <CircularProgressbar
                    value={risk}
                    text={`${risk}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                        pathColor: color,
                        textColor: color,
                        trailColor: "rgba(255,255,255,0.06)",
                        strokeLinecap: "butt",
                        textSize: "20px",
                    })}
                />
            </div>
        </div>
    );
}
