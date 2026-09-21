import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2";
import { setSession } from "@/shared/auth/authStorage";
import { ROUTES } from "@/shared/constants/routes";
import { withTimeout } from "@/shared/utils/withTimeout";
import { login, resolveLoginErrorMessage } from "../services/authService";

const LOGIN_TIMEOUT_MS = 30_000;

function validateCredentials({ email, password }) {
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";
    return null;
}

async function performLogin({ email, password, executeRecaptcha }) {
    const recaptchaToken = await executeRecaptcha("login");
    return login({ email, password, recaptchaToken });
}

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const submit = useCallback(async ({ email, password }) => {
        setError("");

        const validationError = validateCredentials({ email, password });
        if (validationError) {
            setError(validationError);
            return;
        }

        if (!executeRecaptcha) {
            setError("reCAPTCHA is not ready");
            return;
        }

        setLoading(true);
        try {
            const session = await withTimeout(
                performLogin({ email, password, executeRecaptcha }),
                LOGIN_TIMEOUT_MS,
                "Login timed out after 30 seconds. Please check your connection and try again."
            );

            setSession({
                ...session,
                username: session.username || session.email || email,
            });
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            const message = resolveLoginErrorMessage(err);

            await Swal.fire({
                icon: "error",
                title: "Login failed",
                text: message,
                confirmButtonText: "OK",
                confirmButtonColor: "#3f7fd1",
                background: "#111b2d",
                color: "#e4e9f2",
            });
        } finally {
            setLoading(false);
        }
    }, [executeRecaptcha, navigate]);

    return { submit, loading, error };
}
