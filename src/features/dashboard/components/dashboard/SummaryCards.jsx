import "./SummaryCards.scss";

export default function SummaryCards({ totalFiles, findingsCount, suspiciousCount, extensionsCount }) {
    const stats = [
        { key: "files", label: "Files scanned", value: totalFiles },
        { key: "findings", label: "Findings", value: findingsCount },
        { key: "suspicious", label: "Suspicious files", value: suspiciousCount },
        { key: "extensions", label: "Extensions", value: extensionsCount },
    ];

    return (
        <div className="summary-cards">
            {stats.map((s) => (
                <div key={s.key} className="summary-cards__item">
                    <div className="summary-cards__label">{s.label}</div>
                    <div className="summary-cards__value">{s.value}</div>
                </div>
            ))}
        </div>
    );
}
