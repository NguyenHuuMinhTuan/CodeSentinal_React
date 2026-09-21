import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { facebookLoginUrl } from "../services/authService";
import "./LoginForm.scss";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { submit, loading, error } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        submit({ email, password });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="login-form__group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <div className="login-form__error" role="alert">{error}</div>}

            <button type="submit" className="login-form__submit" disabled={loading}>
                {loading ? "Authenticating…" : "Sign in"}
            </button>

            <a href={facebookLoginUrl()} className="login-form__oauth">
                Continue with Facebook
            </a>
        </form>
    );
}
