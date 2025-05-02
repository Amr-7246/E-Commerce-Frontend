import { HeroHighlightDemo } from "@/app/components/HighLight";
import SwiperStore from "../store/CustomSlider";

export default function Page() {
    const Image_Banner_div = 'w-[277px] h-full rounded-lg overflow-hidden hidden lg:flex relative'
    const Image_Banner_cover = 'w-full h-full bg-black/50 flex-center absolute '
return (
    <div className='page'>
        <HeroHighlightDemo >
                <div className=' flex-center w-full flex flex-row gap-3 rounded-lg overflow-hidden relative'>
                    <div className={`${Image_Banner_div}`} >
                        <div className={`${Image_Banner_cover}`}/>
                        <img className='' src='/assets/photo_4_2025-04-29_20-43-40.jpg' alt="banner" />
                    </div>
                    <div className="relative h-full rounded-lg overflow-hidden">
                        <div className={`${Image_Banner_cover}`} >
                            <p className="text-[30px] font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-sky-600 to-green-600">Shop Now!</p>
                        </div>
                        <img className='' src='/assets/photo_1_2025-04-29_20-43-39.jpg' alt="banner" />
                    </div>
                    <div  className={`${Image_Banner_div}`}  >
                        <div className={`${Image_Banner_cover}`}  />
                        <img src='/assets/photo_2_2025-04-29_20-43-39.jpg' alt="banner" />
                    </div>
                </div>
        </HeroHighlightDemo>
        <div className=" w-[100%] overflow-hidden" >
            <SwiperStore title={"Recommended"} category={"all"} />
            <SwiperStore title={"technology"} category={"tech"} />
            <SwiperStore title={"clothes"} category={"clothes"} />
            <SwiperStore title={"Beast seller"} category={"all"} />
        </div>
    </div>
);
}