import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const getCurrentUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const result = await res.json();
            if (result.success) {
                setUser(result.user)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.log(error);
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}