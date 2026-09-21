import { useMemo, useState } from "react";

export default function useFindingsFilter(findings) {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("ALL");

    const filtered = useMemo(() => {
        const keyword = search.toLowerCase();

        return findings.filter((item) => {
            const matchSeverity = severity === "ALL" || item.severity === severity;
            const matchSearch =
                item.file.toLowerCase().includes(keyword) ||
                item.type.toLowerCase().includes(keyword) ||
                item.detector.toLowerCase().includes(keyword);

            return matchSeverity && matchSearch;
        });
    }, [findings, search, severity]);

    return { search, setSearch, severity, setSeverity, filtered };
}
