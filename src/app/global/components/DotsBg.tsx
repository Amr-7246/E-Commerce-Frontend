import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const DotsBackground = () => {
return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-900">
        {/* Tiny dots */}
            <div className="absolute inset-0  text-sky-500 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
        {/* Light lines */}
            <svg className="absolute inset-0 w-full h-full  text-sky-500 opacity-20" xmlns="http://www.w3.org/2000/svg" >
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" >
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
        <div className="z-10 flex-center flex-col relative w-full h-full overflow-hidden">
            <div className="w-full h-full flex-center flex-col gap-5 absolute">
                <p className="text-[30px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-from)] via-[var(--btn-I)] to-[var(--color-price)]"> Shop Now! </p>
                <Link href="/global/store" className="btn text-[var(--btn-II)] font-bold w-[40%]"> Go to store </Link>
            </div>
            {/* Decorative Images Floating Around */}
            {/* <Image
        src="/assets/photo_1_2025-04-24_17-53-25.jpg"
        alt="banner"
        width={400}
        height={400}
        className=" banner-image absolute top-20 left-10 rotate-[5deg] opacity-100 "
      />
      <Image
        src="/assets/photo_3_2025-04-24_17-53-25.jpg"
        alt="banner"
        width={380}
        height={380}
        className="banner-image absolute bottom-100 left-100 rotate-[10deg] opacity-100"
        /> */}
        {/* <Image
          src="/assets/photo_2_2025-04-24_17-53-25.jpg"
          alt="banner"
          width={320}
          height={320}
          className="banner-image absolute top-32 right-12 rotate-[-12deg] opacity-80"
        /> */}
      {/* <Image
        src="/assets/photo_5_2025-04-24_17-53-26.jpg"
        alt="banner"
        width={290}
        height={290}
        className="banner-image absolute bottom-10 right-24 rotate-[-8deg] opacity-80"
      /> */}
      {/* <Image
        src="/assets/photo_6_2025-04-24_17-53-26.jpg"
        alt="banner"
        width={410}
        height={310}
        className="banner-image absolute top-1/2 left-5 rotate-[5deg] opacity-80"
      /> */}
        </div>
    </div>
);
};

export default DotsBackground;
