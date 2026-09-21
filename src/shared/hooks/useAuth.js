import { useCallback, useState } from "react";
import { clearSession, getUsername, isAuthenticated } from "@/shared/auth/authStorage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(isAuthenticated);
    const [username, setUsername] = useState(getUsername);

    const logout = useCallback(() => {
        clearSession();
        setAuthenticated(false);
        setUsername(null);
    }, []);

    return { authenticated, username, logout };
}
