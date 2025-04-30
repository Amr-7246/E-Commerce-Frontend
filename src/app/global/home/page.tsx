import { HeroHighlightDemo } from "@/app/components/HighLight";
import Link from "next/link";
import Store from "../store/Store";
import Image from "next/image";
import SwiperStore from "../store/CustomSlider";

export default function Page() {
    return (
        <div className="page">
            <div className='flex-center flex-col gap-5 w-full '>
                <HeroHighlightDemo >
                    <div className='flex-center lg:w-full flex-col gap-5'>
                        <div className='lg:w-[96%] w-[85%] max-h-[400px] flex flex-row gap-3 rounded-lg overflow-hidden relative'>
                            <div className='w-[277px] h-full rounded-lg overflow-hidden hidden lg:flex relative ' >
                                <div className='w-full h-full bg-black/50 flex-center absolute' />
                                <img className='' src='/assets/photo_4_2025-04-29_20-43-40.jpg' alt="banner" />
                            </div>
                            <div className="relative h-full rounded-lg overflow-hidden">
                                <div className='w-full h-full bg-black/50 flex-center absolute'>
                                    <p className="text-[30px] font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-sky-600 to-green-600">Shop Now!</p>
                                </div>
                                <img className='' src='/assets/photo_1_2025-04-29_20-43-39.jpg' alt="banner" />
                            </div>
                            <div className='w-[277px] h-full hidden rounded-lg overflow-hidden md:flex relative' >
                                <div className='w-full h-full bg-black/50 flex-center absolute' />
                                <img src='/assets/photo_2_2025-04-29_20-43-39.jpg' alt="banner" />
                            </div>
                        </div>
                        {/* <Link href={'/global/store'}  className='btn font-bold w-[40%]' >Go to stor</Link> */}
                    </div>
                </HeroHighlightDemo>

                    <SwiperStore title={"Recommended"} category={"all"} />
                    <SwiperStore title={"technology"} category={"tech"} />
                    <SwiperStore title={"clothes"} category={"clothes"} />
                    <SwiperStore title={"Beast seller"} category={"all"} />
            </div>
        </div>
    );
}