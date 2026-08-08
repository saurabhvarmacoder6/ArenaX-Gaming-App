import { motion } from "framer-motion";
import { FaArrowRight, FaFire } from "react-icons/fa";
import br from "../img/br.png";
import cs from "../img/cs.png";
import lw from "../img/lw.png";
const categories = [
  {
    id:1,
    img:br,
    link:"/br"
  },
  {
    id:2,
    img:cs,
    link:"/cs"
  },
  {
    id:3,
    img:lw,
    link:"/lw"
  }
];
    

const CategorySection = () => {
  return (
    <section className="mt-8 px-5">

      {/* Heading */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Categories
          </h2>

          <p className="text-sm text-zinc-500 font-semibold">
            Select your favorite game mode
          </p>
        </div>

        <FaFire className="text-xl text-violet-500" />

      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">

        {categories.map((item) => (
          <motion.button
          onClick={() => window.location.href = item.link}
            key={item.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="min-w-37.5  rounded-2xl border border-zinc-800 bg-zinc-900 p-2 text-left transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800"
          >

                <img src={item.img} alt={item.title} className="h-full w-full object-contain" />
            
          </motion.button>
        ))}

      </div>

      <div className="py-3">
        <h1 className="text-gray-400 text-sm flex items-center gap-4 font-semibold "><FaArrowRight/> Scroll For More Category</h1>
      </div>

    </section>
  );
};

export default CategorySection;