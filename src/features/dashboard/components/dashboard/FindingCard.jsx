import { useState } from "react";
import { SEVERITY_COLOR } from "@/shared/constants/severity";
import "./FindingCard.scss";

export default function FindingCard({ finding, hideType = false }) {
    const [open, setOpen] = useState(false);
    const color = SEVERITY_COLOR[finding.severity];

    return (
        <div className="finding-card" style={{ borderLeftColor: color }}>
            <button
                type="button"
                className="finding-card__summary"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <div>
                    {!hideType && (
                        <>
                            <span className="finding-card__severity" style={{ color }}>
                                {finding.severity}
                            </span>
                            <h3 className="finding-card__type">{finding.type}</h3>
                        </>
                    )}
                    <p className="finding-card__file">{finding.file}</p>
                </div>

                <div className="finding-card__meta">
                    <div>{finding.detector}</div>
                    <div>Line {finding.line}</div>
                </div>
            </button>

            {open && (
                <div className="finding-card__details">
                    <h4>Matched keyword</h4>
                    <p>{finding.matchedKeyword}</p>

                    <h4>Code snippet</h4>
                    <pre>{finding.codeSnippet}</pre>

                    <h4>Detector</h4>
                    <p>{finding.detector}</p>
                </div>
            )}
        </div>
    );
}
