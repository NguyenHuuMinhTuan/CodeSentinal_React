import "./LoadingOverlay.scss";

export default function LoadingOverlay({ loading, label = "Analyzing archive…" }) {
    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-overlay__bar" />
            <p className="loading-overlay__label">{label}</p>
        </div>
    );
}
