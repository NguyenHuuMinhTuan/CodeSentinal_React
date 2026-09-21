export const SEVERITY = {
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW",
};

export const SEVERITY_ORDER = [SEVERITY.HIGH, SEVERITY.MEDIUM, SEVERITY.LOW];

export const SEVERITY_WEIGHT = {
    [SEVERITY.HIGH]: 10,
    [SEVERITY.MEDIUM]: 5,
    [SEVERITY.LOW]: 2,
};

export const SEVERITY_COLOR = {
    [SEVERITY.HIGH]: "#e5484d",
    [SEVERITY.MEDIUM]: "#f2a93b",
    [SEVERITY.LOW]: "#4b8fe0",
};

export function riskLevelColor(score) {
    if (score < 20) return "#3aa876";
    if (score < 50) return "#4b8fe0";
    if (score < 80) return "#f2a93b";
    return "#e5484d";
}
