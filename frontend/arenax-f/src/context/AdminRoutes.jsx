import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";

const AdminRoutes = () => {
const { user, loading } = useContext(AuthContext);

if (loading) {
    return <Loading />;
}

if (!user) {
    return <Navigate to="/" />;
}

if (user.role !== "admin") {
    return <Navigate to="/home" />;
}


return <Outlet />}

export default AdminRoutes;