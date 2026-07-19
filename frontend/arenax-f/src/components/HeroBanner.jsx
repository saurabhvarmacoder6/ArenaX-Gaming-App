import banner from "../img/banner.png";

function HeroBanner() {
    return(
        <div className=" h-56 w-full items-center justify-center bg-[#09090B]  rounded-lg shadow-[0_0_50px_rgba(124,58,237,.45)]">
            <img src={banner} alt="herobanner" className="h-full w-full object-fill" />
        </div>
    )
}

export default HeroBanner;