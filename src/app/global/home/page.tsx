"use client"
import { HeroHighlightDemo } from "@/app/components/HighLight";
import SwiperStore from "../store/CustomSlider";
import { UseGetEntities } from "@/app/APIs/GetEntitiy";
import Link from "next/link";
import Image from 'next/image';

export default function Page() {
    const {data} = UseGetEntities('categories')
    const categories = data?.data.docs
    console.log(JSON.stringify(categories))
    const Image_Banner_div = '  object-cover w-[40%] rounded-lg overflow-hidden hidden relative'
    const Image_Banner_cover = 'w-full h-full bg-black/50 flex-center absolute '
    const Image_Banner_Itself = ''
return (
    <div className='page'>
        {/* <HeroHighlightDemo > */}
                <div className=' flex-center mx-auto md:w-[90%] max-w-[550px] md:max-w-[2000px] flex flex-row gap-3 rounded-lg overflow-hidden relative'>
                    <div className={`${Image_Banner_div} lg:flex `} >
                        <div className={`${Image_Banner_cover}`}/>
                        <img className={`${Image_Banner_Itself}`} src='/assets/photo_4_2025-04-29_20-43-40.jpg' alt="banner"  />
                        {/* <Image className={`${Image_Banner_Itself}`} src='/assets/photo_4_2025-04-29_20-43-40.jpg' alt="banner" width={277} height={180} style={{objectFit:'cover', width:'100%', height:'100%'}} /> */}
                    </div>
                    <div className="relative h-full w-full md:w-[90%] rounded-lg overflow-hidden">
                        <div className={`${Image_Banner_cover}`} >
                            <Link href={"/global/store"} className="text-[20px] md:text-[20px] font-medium text-stone-900 hover:border-amber-200 hover:text-transparent hover:bg-clip-text duration-700 rounded-md border border-orange-950 px-5 py-1 backdrop-blur-2xl bg-gradient-to-r from-amber-200/50 via-orange-900/50 to-amber-200/50 hover:from-amber-200 hover:to-amber-200 hover:via-orange-700" >
                                Shop Now!
                            </Link>
                        </div>
                        {/* <Image className={`${Image_Banner_Itself}  `} src='/assets/photo_1_2025-04-29_20-43-39.jpg' alt="banner" width={277} height={180} style={{objectFit:'cover', width:'100%', height:'100%'}} /> */}
                        <img className={`${Image_Banner_Itself}  `} src='/assets/photo_1_2025-04-29_20-43-39.jpg' alt="banner" />
                    </div>
                    <div className={`${Image_Banner_div} md:flex `} >
                        <div className={`${Image_Banner_cover}`}  />
                        {/* <Image className={`${Image_Banner_Itself}`} src='/assets/photo_2_2025-04-29_20-43-39.jpg' alt="banner" width={277} height={180} style={{objectFit:'cover', width:'100%', height:'100%'}} /> */}
                        <img className={`${Image_Banner_Itself}`} src='/assets/photo_2_2025-04-29_20-43-39.jpg' alt="banner"  />
                    </div>
                </div>
        {/* </HeroHighlightDemo> */}
        <div className=" w-[100%] overflow-hidden" >
            <SwiperStore title={"Recommended"} category={"recommended"} />
            <SwiperStore title={"technology"} category={"6815626df004e1207f87b738"} />
            <SwiperStore title={"clothes"} category={"681562daf004e1207f87b73e"} />
            {/* <SwiperStore title={"Beast seller"} category={"recommended"} /> */}
        </div>
    </div>
);
}