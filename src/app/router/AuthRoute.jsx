import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/shared/auth/authStorage";
import { ROUTES } from "@/shared/constants/routes";

export default function AuthRoute({ children }) {
    if (isAuthenticated()) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return children;
}
