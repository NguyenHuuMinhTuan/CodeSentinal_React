import { useState } from "react";

export default function FindingCard({ finding }) {

    const [open, setOpen] = useState(false);

    const severityColor = {

        HIGH: "bg-red-500",

        MEDIUM: "bg-yellow-500",

        LOW: "bg-blue-500"

    };

    return (

        <div className="border border-slate-700 rounded-xl mb-4">

            <div

                className="p-5 cursor-pointer"

                onClick={() =>

                    setOpen(!open)

                }

            >

                <div className="flex justify-between">

                    <div>

                        <span

                            className={`px-3 py-1 rounded-full text-xs ${severityColor[finding.severity]}`}

                        >

                            {finding.severity}

                        </span>

                        <h3 className="mt-3 text-lg font-bold">
                            <span className="error-code">{finding.type}</span>
                        </h3>

                        <p className="text-gray-400">

                            {finding.file}

                        </p>

                    </div>

                    <div className="text-right">

                        <div>

                            {finding.detector}

                        </div>

                        <div>

                            Line {finding.line}

                        </div>

                    </div>

                </div>

            </div>

            {

                open && (

                    <div className="bg-slate-900 p-5">

                        <h4 className="font-bold">

                            Matched Keyword

                        </h4>

                        <p>

                            {finding.matchedKeyword}

                        </p>

                        <h4 className="font-bold mt-5">

                            Code Snippet

                        </h4>

                        <pre className="bg-black rounded-lg p-4 overflow-auto">

                            {finding.codeSnippet}

                        </pre>

                        <h4 className="font-bold mt-5">

                            Detector

                        </h4>

                        <p>

                            {finding.detector}

                        </p>

                    </div>

                )

            }

        </div>

    );

}