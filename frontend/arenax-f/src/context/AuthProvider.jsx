import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessTokenState] = useState(null);

    // Set access token in React state + Axios
    const setAccessToken = (token) => {
        setAccessTokenState(token);

        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common.Authorization;
        }
    };

    const refreshAccessToken = async () => {
        try {
            const { data } = await api.post("/api/auth/refresh");

            if (data.success) {
                setAccessToken(data.accessToken);
                return data.accessToken;
            }

            return null;

        } catch (error) {
            console.log("Refresh failed:", error);
            return null;
        }
    };

    const getCurrentUser = async () => {
        try {
            const { data } = await api.get("/api/auth/me");

            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
            }

        } catch (error) {
            console.log("Get current user failed:", error);
            setUser(null);
        }
    };

    const initializeAuth = async () => {
        try {
            const token = await refreshAccessToken();

            if (!token) {
                setUser(null);
                return;
            }

            await getCurrentUser();

        } catch (error) {
            console.log("Authentication initialization failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                loading,
                refreshAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};