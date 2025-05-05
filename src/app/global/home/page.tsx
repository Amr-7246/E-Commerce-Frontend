"use client"
import { HeroHighlightDemo } from "@/app/components/HighLight";
import SwiperStore from "../store/CustomSlider";
import { UseGetEntities } from "@/app/APIs/GetEntitiy";

export default function Page() {
    const {data} = UseGetEntities('categories')
    const categories = data?.data.docs
    console.log(JSON.stringify(categories))
    const Image_Banner_div = 'w-[277px] h-full rounded-lg overflow-hidden hidden relative'
    const Image_Banner_cover = 'w-full h-full bg-black/50 flex-center absolute '
return (
    <div className='page'>
        <HeroHighlightDemo >
                <div className=' flex-center mx-auto lg:w-full w-[83%] flex flex-row gap-3 rounded-lg overflow-hidden relative'>
                    <div className={`${Image_Banner_div} lg:flex `} >
                        <div className={`${Image_Banner_cover}`}/>
                        <img className='' src='/assets/photo_4_2025-04-29_20-43-40.jpg' alt="banner" />
                    </div>
                    <div className="relative h-full rounded-lg overflow-hidden">
                        <div className={`${Image_Banner_cover}`} >
                            <p className="text-[30px] font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-sky-600 to-green-600">Shop Now!</p>
                        </div>
                        <img className='' src='/assets/photo_1_2025-04-29_20-43-39.jpg' alt="banner" />
                    </div>
                    <div className={`${Image_Banner_div} md:flex `}  >
                        <div className={`${Image_Banner_cover}`}  />
                        <img src='/assets/photo_2_2025-04-29_20-43-39.jpg' alt="banner" />
                    </div>
                </div>
        </HeroHighlightDemo>
        <div className=" w-[100%] overflow-hidden" >
            <SwiperStore title={"Recommended"} category={"all"} />
            <SwiperStore title={"technology"} category={"6815626df004e1207f87b738"} />
            <SwiperStore title={"clothes"} category={"681562daf004e1207f87b73e"} />
            <SwiperStore title={"Beast seller"} category={"all"} />
        </div>
    </div>
);
}