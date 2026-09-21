import "./SuspiciousFiles.scss";

export default function SuspiciousFiles({ files }) {
    if (!files || files.length === 0) {
        return <p className="suspicious-files__empty">No suspicious files detected.</p>;
    }

    return (
        <ul className="suspicious-files">
            {files.map((file) => (
                <li key={file} className="suspicious-files__item">
                    <span className="suspicious-files__marker" />
                    <span className="suspicious-files__path">{file}</span>
                </li>
            ))}
        </ul>
    );
}
