import { FaSkullCrossbones } from "react-icons/fa";

export default function SuspiciousFiles({ files }) {

    return (

        <div className="bg-slate-800 rounded-xl p-6 mt-6">

            <h2 className="text-xl font-bold mb-5">

                Suspicious Files

            </h2>

            {

                files.map(file => (

                    <div

                        key={file}

                        className="flex items-center border-b border-slate-700 py-3"

                    >

                        <FaSkullCrossbones

                            className="text-red-500 mr-3"

                        />

                        <span>

                            {file}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}