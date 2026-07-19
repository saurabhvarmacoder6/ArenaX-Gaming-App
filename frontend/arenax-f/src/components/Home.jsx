import Homehead from "./Homehead";
import HomeBanner from "./HeroBanner";
import CategorySection from "./Category";
function Home() {
  return (
    <div className="min-h-screen max-w-150 min-w-full border-2 border-purple-500 bg-[#09090B]">
        <Homehead />
        <HomeBanner/>
        <CategorySection />
    </div>
  )
}

export default Home;