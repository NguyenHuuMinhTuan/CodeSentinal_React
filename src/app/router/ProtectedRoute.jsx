import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/shared/auth/authStorage";
import { ROUTES } from "@/shared/constants/routes";

export default function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
}
