import "./LoginPage.css";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>ANTI</h1>

                    <p>
                        Secure Source Scanner
                    </p>
                </div>

                <LoginForm />

            </div>
        </div>
    );
}