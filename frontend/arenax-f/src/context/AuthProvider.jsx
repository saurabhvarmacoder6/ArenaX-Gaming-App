import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";
import { showError, showSuccess } from "../utils/toast";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/auth/me");
        showSuccess(data.msg)
        if (data.success) {
            setUser(data.user);
        } else {
            setUser(null);
        }

    } catch (error) {
        showError(error)
        console.log(error);
        setUser(null);
    } finally {
        setLoading(false);
    }
};

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}