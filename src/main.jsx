import ReactDOM from "react-dom/client";
import App from "./App";
import "./features/dashboard/assets/styles/main.scss";
import "antd/dist/reset.css";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
        <App />
    </GoogleReCaptchaProvider>
);