import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import MainLayout from "../../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import { ROUTES } from "../../shared/constants/routes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.HOME}
                    element={<Navigate to={ROUTES.DASHBOARD} replace />}
                />

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <AuthRoute>
                            <LoginPage />
                        </AuthRoute>
                    }
                />

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <DashboardPage />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
