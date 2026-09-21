import api from "@/shared/api/api";
import { TimeoutError } from "@/shared/utils/withTimeout";

export class LoginError extends Error {}

function isAxiosTimeout(error) {
    return error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT";
}

export async function login({ email, password, recaptchaToken }) {
    const response = await api.post("/api/auth/login", {
        email,
        password,
        recaptchaToken,
    });

    const apiResponse = response.data;

    if (!apiResponse.success) {
        throw new LoginError(apiResponse.message || "Login failed");
    }

    return apiResponse.data;
}

export function resolveLoginErrorMessage(error) {
    if (error instanceof TimeoutError || isAxiosTimeout(error)) {
        return "Login timed out after 30 seconds. Please check your connection and try again.";
    }

    if (error instanceof LoginError) return error.message;

    const backendError = error?.response?.data;
    if (backendError?.errors?.length > 0) return backendError.errors[0];
    if (backendError?.message) return backendError.message;

    return "Cannot connect to server";
}

export function facebookLoginUrl() {
    return `${import.meta.env.VITE_API_URL}/oauth2/authorization/facebook`;
}
