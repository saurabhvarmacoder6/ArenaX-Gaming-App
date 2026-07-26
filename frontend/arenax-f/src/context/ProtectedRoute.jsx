import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";

export default function ProtectedRoute() {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}