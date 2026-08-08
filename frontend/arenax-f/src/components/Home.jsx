import Homehead from "./Homehead";
import HomeBanner from "./HeroBanner";
import CategorySection from "./Category";
import FeaturedMatches from "./FeaturedMatches";
function Home() {
  return (
    <div className="min-h-screen max-w-150 min-w-full bg-[#09090B]">
        <Homehead />
        <HomeBanner/>
        <CategorySection />
        <FeaturedMatches/>
    </div>
  )
}

export default Home;