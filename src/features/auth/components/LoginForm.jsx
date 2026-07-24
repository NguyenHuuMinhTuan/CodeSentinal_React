import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom"; // 1. Thêm navigate
import api from "@/shared/api/api";
import "./LoginForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState(""); // 2. Đổi username -> email
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleFacebookLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/facebook";
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        // 3. Validate client đầu vào theo biến mới
        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        try {
            setLoading(true);

            if (!executeRecaptcha) {
                setError("reCAPTCHA is not ready");
                return;
            }

            const recaptchaToken = await executeRecaptcha("login");

            // CHÈN THÊM DÒNG NÀY ĐỂ KIỂM TRA
            console.log("=== RECAPTCHA TOKEN THÀNH CÔNG ===", recaptchaToken);

            const response = await api.post(
                "/api/auth/login",
                {
                    email, // 4. Gửi đúng trường 'email' khớp với LoginRequest của Spring Boot
                    password,
                    recaptchaToken
                }
            );

            // 5. Đọc data thành công theo cấu trúc ApiResponse chung
            const apiResponse = response.data;
            if (apiResponse.success) {
                console.log("Login Success:", apiResponse.data);

                // Lưu token (sau này dùng JWT thì lưu vào đây)
                if (apiResponse.data.accessToken) {
                    localStorage.setItem("accessToken", apiResponse.data.accessToken);
                    localStorage.setItem("refreshToken", apiResponse.data.refreshToken);
                }

                // Chuyển hướng sang trang Dashboard
                navigate("/dashboard");
            } else {
                setError(apiResponse.message || "Login failed");
            }

        } catch (err) {
            // 6. Bắt lỗi chuẩn theo cấu trúc ApiResponse từ GlobalExceptionHandler trả về
            const backendError = err?.response?.data;
            if (backendError && backendError.message) {
                // Nếu dính lỗi Validation, hiển thị lỗi đầu tiên trong mảng errors (nếu có)
                if (backendError.errors && backendError.errors.length > 0) {
                    setError(backendError.errors[0]);
                } else {
                    setError(backendError.message); // Hiển thị "Invalid credentials", v.v.
                }
            } else {
                setError("Cannot connect to server");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email" // Đổi type thành email để browser tự check format cơ bản
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
            </button>
            <button
                type="button"
                className="facebook-btn"
                onClick={handleFacebookLogin}
            >
                Continue with Facebook
            </button>
        </form>
    );
}