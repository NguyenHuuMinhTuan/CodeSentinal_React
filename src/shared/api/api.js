import axios from "axios";

export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: DEFAULT_REQUEST_TIMEOUT_MS,
});

export default api;