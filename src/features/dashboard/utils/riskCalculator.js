import { SEVERITY_WEIGHT } from "@/shared/constants/severity";

export default function calculateRisk(findings, totalFiles, suspiciousFilesCount) {

    if (!findings || findings.length === 0) return 0;

    // Aggregate by file, cap each file to the highest-severity weight
    const perFile = {};
    findings.forEach(item => {
        const file = item.file || 'unknown';
        const w = SEVERITY_WEIGHT[item.severity] || 0;
        perFile[file] = Math.max(perFile[file] || 0, w);
    });

    const score = Object.values(perFile).reduce((a, b) => a + b, 0);

    const maxScore = (suspiciousFilesCount && suspiciousFilesCount > 0)
        ? suspiciousFilesCount * 10
        : Math.max(totalFiles, Object.keys(perFile).length) * 10;

    return Math.min(Math.round(score / maxScore * 100), 100);

}