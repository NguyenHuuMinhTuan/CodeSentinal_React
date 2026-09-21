import "./LoginPage.scss";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-card__header">
                    <h1>CODESENTINEL</h1>
                    <p>Source code security scanner</p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
}
