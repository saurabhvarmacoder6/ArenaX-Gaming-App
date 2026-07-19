import Splash from './components/Splash'
import Home from './components/Home'
import BRTournaments from './components/BRTournaments'
import CSTournaments from './components/CSTournaments'
import LWTournaments from './components/LWTournaments'
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#09090B]">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/br" element={<BRTournaments />} />
        <Route path="/cs" element={<CSTournaments />} />
        <Route path="/lw" element={<LWTournaments />} />
      </Routes>
    </div>
  )
}

export default App