import Splash from './components/Splash'
import { Toaster } from "react-hot-toast";
import Home from './components/Home'
import BRTournaments from './components/BRTournaments'
import CSTournaments from './components/CSTournaments'
import LWTournaments from './components/LWTournaments'
import TournamentDetails from './components/TournamentDetails'
import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './bottompages/BottomNav'
import Wallet from './bottompages/Wallet'
import Signup from './components/Signup'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ProtectedRoute from './context/ProtectedRoute'
import PublicRoute from './context/PublicRoute'
import Profile from './bottompages/Profile'
import PaymentOrderData from './components/PaymentOrderData'
import Withdraw from './components/withdraw'
import AdminRoutes from './context/AdminRoutes'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import WithdrawRequest from './admin/WithdrawRequest'
import PaymentOrder from './admin/PaymentOrder'
import Users from './admin/Users'
import Tournaments from './admin/Tournaments'
import CreateTournaments from './admin/CreateTournaments'
import NewPassword from './components/NewPassword'
import UpdateTournament from './admin/updateTournaments'
import JoinTournament from './components/JoinTournament'
function App() {

  const location = useLocation();
  const hideBottomNav = ["/", "/signup", "/login", "/forgot-password", "/new-password",
    "/admin", "/admin/withdraw", "/admin/payment-orders", "/admin/users", "/admin/tournaments",
    "/admin/create-tournaments"].includes(location.pathname) ||
    location.pathname.startsWith("/admin/update-tournaments/");
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#171722",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/br" element={<BRTournaments />} />
          <Route path="/cs" element={<CSTournaments />} />
          <Route path="/lw" element={<LWTournaments />} />
          <Route path="/detail/:id" element={<TournamentDetails />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-data" element={<PaymentOrderData />} />
          <Route path="/join-tournament/:id" element={<JoinTournament />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="withdraw" element={<WithdrawRequest />} />
            <Route path="payment-orders" element={<PaymentOrder />} />
            <Route path="users" element={<Users />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="create-tournaments" element={<CreateTournaments />} />
            <Route path="update-tournaments/:id" element={<UpdateTournament />} />
          </Route>
        </Route>

      </Routes>
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}

export default App