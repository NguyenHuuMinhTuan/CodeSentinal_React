import { useState } from "react";
import { SEVERITY_COLOR } from "@/shared/constants/severity";
import FindingCard from "./FindingCard";
import "./FindingGroup.scss";

export default function FindingGroup({ group }) {
    const [open, setOpen] = useState(false);
    const color = SEVERITY_COLOR[group.severity];

    return (
        <div className="finding-group" style={{ borderLeftColor: color }}>
            <button
                type="button"
                className="finding-group__summary"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <div className="finding-group__heading">
                    <span className="finding-group__severity" style={{ color }}>
                        {group.severity}
                    </span>
                    <h3 className="finding-group__type">{group.type}</h3>
                </div>

                <span className="finding-group__count">
                    {group.count} {group.count === 1 ? "occurrence" : "occurrences"}
                </span>
            </button>

            {open && (
                <div className="finding-group__items">
                    {group.items.map((finding) => (
                        <FindingCard
                            key={`${finding.file}:${finding.line}`}
                            finding={finding}
                            hideType
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
