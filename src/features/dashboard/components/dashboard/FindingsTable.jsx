import { useMemo, useState } from "react";
import FindingCard from "./FindingCard";
import { Input, Select } from "antd";
import { color } from "framer-motion";
import "./FindingsTable.scss";

export default function FindingsTable({ findings }) {

    const [search, setSearch] = useState("");

    const [severity, setSeverity] = useState("ALL");

    const filtered = useMemo(() => {

        return findings.filter(item => {

            const matchSeverity =
                severity === "ALL" ||
                item.severity === severity;

            const keyword =
                search.toLowerCase();

            const matchSearch =

                item.file.toLowerCase().includes(keyword) ||

                item.type.toLowerCase().includes(keyword) ||

                item.detector.toLowerCase().includes(keyword);

            return matchSeverity && matchSearch;

        });

    }, [findings, search, severity]);

    return (

        <div className="bg-slate-800 rounded-xl p-6 mt-6">

            <h2 className="text-2xl font-bold mb-6">

                Findings

            </h2>


            <div className="findings-filter">

                <Input
                    className="findings-filter-input"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select
                    className="findings-filter-select"
                    value={severity}
                    onChange={(val) => setSeverity(val)}
                    options={[
                        { value: 'ALL', label: 'ALL' },
                        { value: 'HIGH', label: 'HIGH' },
                        { value: 'MEDIUM', label: 'MEDIUM' },
                        { value: 'LOW', label: 'LOW' }
                    ]}
                    style={{ minWidth: 120 }}
                />

            </div>

            {

                filtered.map((finding, index) => (

                    <FindingCard

                        key={index}

                        finding={finding}

                    />

                ))

            }

        </div>

    );

}