import useAuth from "@/shared/hooks/useAuth";
import { ROUTES } from "@/shared/constants/routes";
import { useNavigate } from "react-router-dom";
import "./MainLayout.scss";

export default function MainLayout({ children }) {
    const { username, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN, { replace: true });
    };

    return (
        <div className="app-shell">
            <header className="app-shell__topbar">
                <div className="app-shell__brand">CODESENTINEL</div>
                <div className="app-shell__status">
                    <span className="app-shell__status-dot" />
                    ENGINE READY
                </div>

                <div className="app-shell__session">
                    {username && <span className="app-shell__username">{username}</span>}
                    <button
                        type="button"
                        className="app-shell__logout"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>
            </header>

            <main className="app-shell__content">{children}</main>
        </div>
    );
}
