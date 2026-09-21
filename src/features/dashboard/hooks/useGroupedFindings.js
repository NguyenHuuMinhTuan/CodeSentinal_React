import { useMemo } from "react";
import { SEVERITY_ORDER } from "@/shared/constants/severity";

function highestSeverity(items) {
    return SEVERITY_ORDER.find((level) => items.some((item) => item.severity === level))
        ?? items[0]?.severity;
}

export default function useGroupedFindings(findings) {
    return useMemo(() => {
        const groups = new Map();

        findings.forEach((finding) => {
            const key = finding.type || "UNKNOWN";
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(finding);
        });

        return Array.from(groups.entries())
            .map(([type, items]) => ({
                type,
                items,
                count: items.length,
                severity: highestSeverity(items),
            }))
            .sort((a, b) => {
                const rank = SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
                return rank !== 0 ? rank : b.count - a.count;
            });
    }, [findings]);
}
