import { Input, Select } from "antd";
import FindingGroup from "./FindingGroup";
import useFindingsFilter from "../../hooks/useFindingsFilter";
import useGroupedFindings from "../../hooks/useGroupedFindings";
import "./FindingsTable.scss";

export default function FindingsTable({ findings }) {
    const { search, setSearch, severity, setSeverity, filtered } = useFindingsFilter(findings);
    const groups = useGroupedFindings(filtered);

    return (
        <div className="findings-table">
            <div className="findings-table__filters">
                <Input
                    className="findings-table__search"
                    placeholder="Search file, type or detector…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />

                <Select
                    className="findings-table__severity"
                    value={severity}
                    onChange={setSeverity}
                    options={[
                        { value: "ALL", label: "All severities" },
                        { value: "HIGH", label: "High" },
                        { value: "MEDIUM", label: "Medium" },
                        { value: "LOW", label: "Low" },
                    ]}
                />
            </div>

            {groups.length === 0 ? (
                <p className="findings-table__empty">No findings match the current filters.</p>
            ) : (
                groups.map((group) => <FindingGroup key={group.type} group={group} />)
            )}
        </div>
    );
}
