import Splash from './components/Splash'
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
import Profile from './components/Profile'
function App() {

  const location = useLocation();
  const hideBottomNav = ["/", "/signup", "/login", "/forgot-password"].includes(location.pathname);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/br" element={<BRTournaments />} />
          <Route path="/cs" element={<CSTournaments />} />
          <Route path="/lw" element={<LWTournaments />} />
          <Route path="/detail" element={<TournamentDetails />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}

export default App